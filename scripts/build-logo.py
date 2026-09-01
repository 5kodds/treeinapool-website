#!/usr/bin/env python3
"""Turn the master logo render into the transparent assets the site ships.

Run via `npm run logo`. See scripts/build-logo.mjs for the rationale.
"""

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MASTER = ROOT / "assets-src" / "treeinapool-logo-master.png"

# A pixel counts as background only if it is this close to pure white AND
# reachable from the edge of the canvas.
WHITE_FLOOR = 236  # below this on any channel, definitely artwork
WHITE_CEIL = 252  # at or above this, fully transparent if exterior

# The two loop holes are enclosed by the mark, so an edge-connected fill
# can never reach them — they stayed white against a dark tab. They are
# distinguishable from the highlights that must survive: measured on this
# artwork the holes are pure neutral white (saturation 0) while the pale
# sheen on the tube is blue-tinted (saturation ~37). Anything near-white
# AND near-neutral is therefore background, wherever it sits.
SAT_MAX = 12


def load_master() -> Image.Image:
    if not MASTER.exists():
        raise SystemExit(f"missing master artwork: {MASTER}")
    return Image.open(MASTER).convert("RGBA")


def build_alpha(image: Image.Image) -> Image.Image:
    """Alpha from exterior whiteness, found by flood fill from the border."""
    width, height = image.size
    pixels = image.load()

    exterior = bytearray(width * height)
    queue = deque()

    def consider(x: int, y: int) -> None:
        index = y * width + x
        if exterior[index]:
            return
        r, g, b, _ = pixels[x, y]
        if min(r, g, b) < WHITE_FLOOR:
            return
        exterior[index] = 1
        queue.append((x, y))

    for x in range(width):
        consider(x, 0)
        consider(x, height - 1)
    for y in range(height):
        consider(0, y)
        consider(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if x > 0:
            consider(x - 1, y)
        if x < width - 1:
            consider(x + 1, y)
        if y > 0:
            consider(x, y - 1)
        if y < height - 1:
            consider(x, y + 1)

    # Ramp alpha across the anti-aliased rim rather than hard-cutting it,
    # so the edge stays smooth at every display size.
    span = WHITE_CEIL - WHITE_FLOOR
    alpha = Image.new("L", (width, height), 255)
    alpha_pixels = alpha.load()
    for y in range(height):
        row = y * width
        for x in range(width):
            r, g, b, _ = pixels[x, y]
            whiteness = min(r, g, b)
            if whiteness < WHITE_FLOOR:
                continue
            # Exterior is settled by the flood fill. Enclosed background —
            # the loop holes — is caught by neutrality instead.
            if not exterior[row + x] and (max(r, g, b) - whiteness) > SAT_MAX:
                continue
            if whiteness >= WHITE_CEIL:
                alpha_pixels[x, y] = 0
            else:
                alpha_pixels[x, y] = int(
                    255 * (WHITE_CEIL - whiteness) / span
                )
    return alpha


def trim(image: Image.Image, pad_ratio: float = 0.02) -> Image.Image:
    """Crop to the mark, keeping a hair of breathing room."""
    box = image.getbbox()
    if box is None:
        return image
    left, top, right, bottom = box
    pad = int(max(right - left, bottom - top) * pad_ratio)
    return image.crop(
        (
            max(left - pad, 0),
            max(top - pad, 0),
            min(right + pad, image.width),
            min(bottom + pad, image.height),
        )
    )


def square(image: Image.Image) -> Image.Image:
    """Centre the mark on a transparent square so icons aren't distorted."""
    side = max(image.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(
        image,
        ((side - image.width) // 2, (side - image.height) // 2),
        image,
    )
    return canvas


def save(image: Image.Image, path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    resized = image.resize((size, size), Image.LANCZOS)
    # Quantising to a palette keeps the alpha and cuts the file by ~10x;
    # the mark is flat enough that 255 colours is visually lossless.
    resized.quantize(colors=255, method=Image.FASTOCTREE).save(
        path, optimize=True
    )
    print(f"  {path.relative_to(ROOT)}  {size}x{size}  {path.stat().st_size // 1024} KB")


def main() -> None:
    master = load_master()
    master.putalpha(build_alpha(master))
    mark = square(trim(master))
    print(f"trimmed to {mark.size[0]}x{mark.size[1]} (from {master.size[0]}x{master.size[1]})")

    # 512 is ample: the header renders at 28px, so this covers 3x displays
    # with room to spare, and next/image resizes per request anyway.
    save(mark, ROOT / "src" / "assets" / "treeinapool-logo.png", 512)
    save(mark, ROOT / "src" / "app" / "icon.png", 512)
    save(mark, ROOT / "src" / "app" / "apple-icon.png", 180)


if __name__ == "__main__":
    main()
