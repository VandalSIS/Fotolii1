#!/usr/bin/env python3
"""Process MasajGO logo: create transparent version + OG image."""
from PIL import Image
import os

SRC = "public/logo-original.png"
OUT_LOGO = "public/logo.png"
OUT_OG = "public/og-image.png"

def remove_white_bg(img: Image.Image, threshold: int = 240) -> Image.Image:
    """Convert near-white pixels to transparent."""
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (255, 255, 255, 0)
            else:
                brightness = (r + g + b) / 3
                if brightness > 200:
                    alpha = int(255 * (255 - brightness) / 55)
                    pixels[x, y] = (r, g, b, max(0, min(255, alpha)))
    return img


def crop_to_content(img: Image.Image) -> Image.Image:
    """Crop transparent borders."""
    bbox = img.getbbox()
    if bbox:
        return img.crop(bbox)
    return img


def make_og_image(original: Image.Image, size=(1200, 630)) -> Image.Image:
    """Create OG image: white background, centered logo."""
    og = Image.new("RGB", size, (255, 255, 255))  # white background as in original
    logo = original.copy()
    max_w = int(size[0] * 0.55)
    max_h = int(size[1] * 0.75)
    logo.thumbnail((max_w, max_h), Image.LANCZOS)
    x = (size[0] - logo.width) // 2
    y = (size[1] - logo.height) // 2
    if logo.mode == "RGBA":
        og.paste(logo, (x, y), logo)
    else:
        og.paste(logo, (x, y))
    return og


def main() -> None:
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    src = Image.open(SRC)

    transparent = remove_white_bg(src.copy())
    transparent = crop_to_content(transparent)
    transparent.save(OUT_LOGO, "PNG", optimize=True)
    print(f"Saved transparent logo: {OUT_LOGO} ({transparent.size})")

    og_src = Image.open(SRC).convert("RGB")
    og = make_og_image(og_src)
    og.save(OUT_OG, "PNG", optimize=True)
    print(f"Saved OG image: {OUT_OG} ({og.size})")


if __name__ == "__main__":
    main()
