#!/usr/bin/env python3
"""Crop MasajGO logo to remove the 'Distribuitor oficial...' subtitle below MASAJGO."""
from PIL import Image
import os

LOGO = "public/logo.png"
OG = "public/og-image.png"


def find_subtitle_top(img: Image.Image) -> int:
    """Detect the top of the small subtitle row beneath MASAJGO.

    Strategy:
      - work in RGBA, alpha = content
      - count non-transparent pixels per row
      - find content bands separated by empty rows; the last band is the subtitle
    """
    img = img.convert("RGBA")
    w, h = img.size
    pixels = img.load()

    row_density = []
    for y in range(h):
        count = 0
        for x in range(w):
            if pixels[x, y][3] > 16:
                count += 1
        row_density.append(count)

    bands: list[tuple[int, int]] = []
    in_band = False
    start = 0
    for y, c in enumerate(row_density):
        if c > 4 and not in_band:
            in_band = True
            start = y
        elif c <= 4 and in_band:
            in_band = False
            bands.append((start, y))
    if in_band:
        bands.append((start, h))

    if len(bands) < 2:
        return h

    return bands[-1][0]


def crop_logo() -> None:
    img = Image.open(LOGO).convert("RGBA")
    top = find_subtitle_top(img)
    gap = 8
    new_h = max(top - gap, int(img.height * 0.6))
    cropped = img.crop((0, 0, img.width, new_h))
    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
    cropped.save(LOGO, "PNG", optimize=True)
    print(f"Cropped logo saved: {LOGO} ({cropped.size})")


def make_og(logo_path: str, out_path: str, size=(1200, 630)) -> None:
    og = Image.new("RGB", size, (255, 255, 255))
    logo = Image.open(logo_path).convert("RGBA")
    max_w = int(size[0] * 0.55)
    max_h = int(size[1] * 0.75)
    logo.thumbnail((max_w, max_h), Image.LANCZOS)
    x = (size[0] - logo.width) // 2
    y = (size[1] - logo.height) // 2
    og.paste(logo, (x, y), logo)
    og.save(out_path, "PNG", optimize=True)
    print(f"OG image regenerated: {out_path} ({og.size})")


def main() -> None:
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    crop_logo()
    make_og(LOGO, OG)


if __name__ == "__main__":
    main()
