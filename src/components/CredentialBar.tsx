import { CREDENTIALS } from "@/lib/site";

/**
 * Certification row for the footer. Renders nothing while no credential has
 * been earned, so the site is never carrying an empty badge frame or, worse,
 * a mark it has no right to. Each entry links to the issuer's own directory,
 * because a badge a visitor cannot verify is decoration.
 */
export function CredentialBar() {
  if (CREDENTIALS.length === 0) return null;

  return (
    <div className="border-t border-[var(--color-divider)] py-6">
      <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-2">
        Certified by
      </span>
      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
        {CREDENTIALS.map((credential) => (
          <li key={credential.name}>
            <a
              href={credential.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm no-underline"
            >
              {credential.logo && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={credential.logo}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-auto"
                />
              )}
              <span>
                <span className="block font-semibold">{credential.name}</span>
                <span className="block text-[13px] text-muted-2">
                  {credential.note}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
