import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared Open Graph card. Every dynamic page renders through this so a
 * shared link carries its own title rather than the generic site card.
 * Satori needs an explicit display on any element with more than one
 * child, hence the flex declarations throughout.
 */
export function renderOgImage({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#f2f2f3",
        color: "#1d1f20",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#416180",
          fontWeight: 600,
        }}
      >
        {kicker}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? 56 : 68,
          fontWeight: 600,
          textTransform: "uppercase",
          lineHeight: 1.08,
          letterSpacing: 1,
          maxWidth: "92%",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(29,31,32,0.16)",
          paddingTop: 24,
          fontSize: 24,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex" }}>TreeInAPool</div>
        <div style={{ display: "flex", color: "#416180" }}>treeinapool.com</div>
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
