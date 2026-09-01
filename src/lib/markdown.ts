export type TocEntry = { id: string; text: string };

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, (char) => ESCAPES[char]);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Only same-origin and http(s) destinations are linkable. */
function safeHref(href: string): string | null {
  const trimmed = href.trim();
  if (/^(https?:\/\/|\/|#|mailto:)/i.test(trimmed)) return escapeHtml(trimmed);
  return null;
}

function renderInline(text: string): string {
  const codeSpans: string[] = [];
  // NUL-delimited markers, so restoring cannot collide with digits in prose.
  const withPlaceholders = text.replace(/`([^`]+)`/g, (_, code: string) => {
    codeSpans.push(`<code>${escapeHtml(code)}</code>`);
    return `\u0000${codeSpans.length - 1}\u0000`;
  });

  let html = escapeHtml(withPlaceholders)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (match, label: string, href: string) => {
        const safe = safeHref(href);
        return safe ? `<a href="${safe}">${label}</a>` : match;
      },
    );

  html = html.replace(
    /\u0000(\d+)\u0000/g,
    (_, index: string) => codeSpans[Number(index)],
  );
  return html;
}

/**
 * Renders the markdown subset the insight articles use, headings,
 * paragraphs, lists, blockquotes and inline formatting. Runs at build time
 * over repo-authored content, so no parser dependency is pulled in.
 */
export function renderMarkdown(markdown: string): {
  html: string;
  toc: TocEntry[];
} {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  const toc: TocEntry[] = [];

  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let quote: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    out.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType || listItems.length === 0) return;
    const items = listItems
      .map((item) => `<li>${renderInline(item)}</li>`)
      .join("");
    out.push(`<${listType}>${items}</${listType}>`);
    listItems = [];
    listType = null;
  };

  const flushQuote = () => {
    if (quote.length === 0) return;
    out.push(
      `<blockquote><p>${renderInline(quote.join(" "))}</p></blockquote>`,
    );
    quote = [];
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim() === "") {
      flushAll();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      if (level === 2) toc.push({ id, text });
      out.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(line);
    if (bullet) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(bullet[1]);
      continue;
    }

    const numbered = /^\d+\.\s+(.*)$/.exec(line);
    if (numbered) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(numbered[1]);
      continue;
    }

    const quoted = /^>\s?(.*)$/.exec(line);
    if (quoted) {
      flushParagraph();
      flushList();
      quote.push(quoted[1]);
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }

  flushAll();
  return { html: out.join("\n"), toc };
}
