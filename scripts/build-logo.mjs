#!/usr/bin/env node
/**
 * Regenerates the logo assets from the master artwork.
 *
 *   npm run logo
 *
 * The master (assets-src/treeinapool-logo-master.png) is the original
 * render on a solid white field. This produces the transparent, trimmed
 * versions the site actually ships:
 *
 *   src/assets/treeinapool-logo.png  header mark (next/image optimises delivery)
 *   src/app/icon.png                 browser tab icon
 *   src/app/apple-icon.png           iOS home screen
 *
 * Background removal is edge-connected, not a global colour key: the mark
 * contains pale highlights that a naive "delete white" would punch holes
 * through. Alpha is taken from how white each exterior pixel is, so the
 * soft anti-aliased rim stays smooth instead of turning jagged.
 *
 * Delegates to the Python implementation because Pillow is the only image
 * library available here; see scripts/build-logo.py.
 */
import { spawnSync } from "node:child_process";

const result = spawnSync("python3", ["scripts/build-logo.py"], {
  stdio: "inherit",
});

process.exit(result.status ?? 1);
