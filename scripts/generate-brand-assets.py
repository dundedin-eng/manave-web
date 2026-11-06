#!/usr/bin/env python3
"""
Generates the PLACEHOLDER brand artwork in public/brand/ procedurally
(watercolor-style agave washes, paper texture, logo/monogram/favicon).

These are stand-ins so the site ships looking finished. To use commissioned art,
simply overwrite the files in public/brand/ keeping the same filenames
(or edit src/data/brandAssets.ts). No code changes required.

Requires: pillow numpy scipy fonttools  (+ brotli for woff2).  Run: npm run assets
"""
import os, math, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import gaussian_filter, map_coordinates

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "brand")
os.makedirs(OUT, exist_ok=True)
PARCHMENT = np.array([246, 240, 229], float)
AGAVE = np.array([91, 110, 90], float)
SAGE = np.array([135, 151, 133], float)
DEEP = np.array([63, 86, 76], float)
GOLD = np.array([180, 154, 99], float)


def smooth_noise(h, w, scale, rng, amp=1.0):
    n = rng.standard_normal((h, w))
    return gaussian_filter(n, scale) * (amp * scale)  # roughly unit-ish scaled


def paper(h, w, rng, strength=1.0):
    """Cold-press paper: fibres + grain. Returns float RGB 0..255"""
    base = np.ones((h, w, 3)) * PARCHMENT
    g = rng.standard_normal((h, w))
    fine = gaussian_filter(g, 0.8)
    mid = gaussian_filter(rng.standard_normal((h, w)), 3)
    big = gaussian_filter(rng.standard_normal((h, w)), 40)
    tex = fine * 2.2 + mid * 9 + big * 120
    base += (tex * strength)[..., None] * np.array([1.0, 0.98, 0.92])
    return base


def leaf_mask(h, w, cx, cy, ang, length, width, curve, rng, ss=1):
    """Tapered spear leaf polygon -> soft mask with wobbly watercolor edge."""
    pts_l, pts_r = [], []
    n = 60
    for i in range(n + 1):
        t = i / n
        # width profile: swells then tapers to a point
        prof = (math.sin(math.pi * min(1, t * 0.95 + 0.02)) ** 0.7) * (1 - t * 0.35)
        wd = width * prof
        # leaf spine curves
        a = ang + curve * (t ** 1.5)
        x = cx + math.cos(ang) * length * t + math.cos(ang + math.pi / 2) * curve * length * 0.25 * t * t
        y = cy + math.sin(ang) * length * t + math.sin(ang + math.pi / 2) * curve * length * 0.25 * t * t
        nx, ny = math.cos(a + math.pi / 2), math.sin(a + math.pi / 2)
        pts_l.append((x + nx * wd, y + ny * wd))
        pts_r.append((x - nx * wd, y - ny * wd))
    poly = pts_l + pts_r[::-1]
    img = Image.new("L", (w, h), 0)
    ImageDraw.Draw(img).polygon(poly, fill=255)
    m = np.asarray(img, float) / 255
    # wobble edges
    dx = smooth_noise(h, w, 14, rng, 1.0) * 1.2
    dy = smooth_noise(h, w, 14, rng, 1.0) * 1.2
    yy, xx = np.mgrid[0:h, 0:w]
    m = map_coordinates(m, [yy + dy, xx + dx], order=1, mode="constant")
    return gaussian_filter(m, 1.2)


def wash(canvas, mask, color, opacity, rng, tip_dir=None):
    """Multiply a watercolor wash through `mask` onto canvas (in place)."""
    h, w = mask.shape
    edge = np.clip(mask - gaussian_filter(mask, 7), 0, 1) * 2.4      # pigment pooling at the edge
    pool = gaussian_filter(rng.standard_normal((h, w)), 25)
    pool = (pool - pool.min()) / (np.ptp(pool) + 1e-9)               # blotchy density
    gran = gaussian_filter(rng.standard_normal((h, w)), 1.0) * 0.35  # granulation
    dens = np.clip(opacity * (0.55 + 0.6 * pool) + edge * 0.35 + gran * opacity, 0, 1) * mask
    tint = color[None, None, :] / 255.0
    canvas *= (1 - dens[..., None] * (1 - tint))
    return canvas


def agave(canvas, cx, cy, radius, rng, n_back=14, n_front=9, hflip=False, lighter=1.0):
    h, w, _ = canvas.shape
    # back ring: lighter sage leaves, fan upward (agave rosette seen from the side)
    for ring, (n, spread, col, op, ln) in enumerate([
        (n_back, (-2.95, -0.19), SAGE, 0.55 * lighter, 1.0),
        (n_front, (-2.55, -0.59), AGAVE, 0.62 * lighter, 0.88),
        (6, (-2.2, -0.94), DEEP, 0.58 * lighter, 0.7),
    ]):
        for i in range(n):
            t = (i + rng.uniform(-0.25, 0.25)) / max(1, n - 1)
            ang = spread[0] + (spread[1] - spread[0]) * t
            length = radius * ln * rng.uniform(0.85, 1.08)
            width = radius * 0.075 * ln * rng.uniform(0.85, 1.15)
            curve = rng.uniform(-0.35, 0.35) + (0.25 if ang < -1.57 else -0.25)
            m = leaf_mask(h, w, cx, cy, ang, length, width, curve, rng)
            c = col * rng.uniform(0.9, 1.1)
            wash(canvas, m, np.clip(c, 0, 255), op, rng)
            # lighter central vein: lift pigment slightly
            canvas += (gaussian_filter(m, 6) - gaussian_filter(m, 12))[..., None] * 18 * lighter
    return canvas


def splatter(canvas, rng, n, region, color):
    h, w, _ = canvas.shape
    x0, y0, x1, y1 = region
    tint = color / 255.0
    for _ in range(n):
        x, y = int(rng.uniform(x0, x1)), int(rng.uniform(y0, y1))
        r = rng.uniform(1.5, 6)
        ya, yb, xa, xb = max(0, y - 14), min(h, y + 14), max(0, x - 14), min(w, x + 14)
        if yb <= ya or xb <= xa:
            continue
        yy, xx = np.ogrid[ya:yb, xa:xb]
        patch = np.exp(-((xx - x) ** 2 + (yy - y) ** 2) / (2 * r * r)) * rng.uniform(0.15, 0.4)
        canvas[ya:yb, xa:xb] *= 1 - patch[..., None] * (1 - tint)


def vignette_wash(canvas, rng, color, opacity, cx, cy, rad):
    h, w, _ = canvas.shape
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xx - cx) / rad) ** 2 + ((yy - cy) / rad) ** 2)
    m = np.clip(1 - d, 0, 1) ** 1.6
    m = m * (0.6 + 0.4 * gaussian_filter(rng.random((h, w)), 30) / 0.5)
    wash(canvas, np.clip(m, 0, 1), color, opacity, rng)


def to_img(arr):
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


# ---------------------------------------------------------------- hero (desktop)
def hero(w, h, seed, mobile=False):
    rng = np.random.default_rng(seed)
    c = paper(h, w, rng)
    if mobile:
        vignette_wash(c, rng, SAGE, 0.10, w * 0.55, h * 0.78, w * 0.9)
        agave(c, w * 0.5, h * 0.93, w * 1.05, rng, 12, 8)
        splatter(c, rng, 40, (0, h * 0.5, w, h), AGAVE)
    else:
        vignette_wash(c, rng, SAGE, 0.10, w * 0.8, h * 0.85, w * 0.55)
        agave(c, w * 0.76, h * 1.02, h * 0.98, rng, 15, 10)
        agave(c, w * 0.99, h * 1.05, h * 0.62, rng, 9, 6, lighter=0.8)
        splatter(c, rng, 60, (w * 0.45, h * 0.15, w, h), AGAVE)
    # soft left fade so text stays legible
    if not mobile:
        fade = np.clip((w * 0.62 - np.arange(w)) / (w * 0.62), 0, 1) ** 1.2
        c = c * (1 - fade[None, :, None] * 0.0) + PARCHMENT * (fade[None, :, None]) * 0.0
    return to_img(c)


# ---------------------------------------------------------------- watermark (RGBA)
def watermark(size, seed):
    rng = np.random.default_rng(seed)
    c = np.ones((size, size, 3)) * 255
    agave(c, size * 0.5, size * 0.96, size * 0.95, rng, 15, 10)
    # alpha = how much pigment was laid down
    lum = c.mean(axis=2)
    alpha = np.clip((255 - lum) / 110, 0, 1)
    tint = np.ones((size, size, 3)) * DEEP
    rgba = np.dstack([tint, alpha * 255])
    return Image.fromarray(np.clip(rgba, 0, 255).astype(np.uint8), "RGBA")


def texture(size, seed):
    rng = np.random.default_rng(seed)
    # tileable: generate and blend with wrapped edges via periodic gaussian
    g = lambda s: gaussian_filter(rng.standard_normal((size, size)), s, mode="wrap")
    tex = g(0.7) * 2.4 + g(2.5) * 8 + g(30) * 90
    c = np.ones((size, size, 3)) * PARCHMENT + tex[..., None] * np.array([1, 0.98, 0.92])
    return to_img(c)


# ---------------------------------------------------------------- vector marks
def glyph_paths(text, font_path, size, tracking=0.0):
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    f = TTFont(font_path)
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    upm = f["head"].unitsPerEm
    s = size / upm
    x = 0.0
    parts = []
    for ch in text:
        gn = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (s, 0, 0, -s, x, 0))
        gs[gn].draw(tp)
        d = pen.getCommands()
        if d:
            parts.append(d)
        x += gs[gn].width * s + tracking
    return " ".join(parts), x - tracking


def font_for(name):
    here = os.path.join(os.path.dirname(__file__), ".fontcache")
    return os.path.join(here, name)


def agave_svg_icon(cx, cy, r, stroke, sw=1.4):
    """Minimal line agave (rosette of spears) used in the monogram/favicon."""
    leaves = []
    for a in np.linspace(-2.75, -0.39, 9):
        L = r * (1.0 if abs(a + 1.57) < 0.5 else 0.82 if abs(a + 1.57) < 1.0 else 0.62)
        w = r * 0.13
        ex, ey = cx + math.cos(a) * L, cy + math.sin(a) * L
        nx, ny = math.cos(a + math.pi / 2), math.sin(a + math.pi / 2)
        mx, my = cx + math.cos(a) * L * 0.45, cy + math.sin(a) * L * 0.45
        leaves.append(
            f"M{cx:.1f} {cy:.1f} Q{mx + nx * w:.1f} {my + ny * w:.1f} {ex:.1f} {ey:.1f} "
            f"Q{mx - nx * w:.1f} {my - ny * w:.1f} {cx:.1f} {cy:.1f}Z"
        )
    return f'<path d="{" ".join(leaves)}" fill="{stroke}" fill-opacity=".9"/>'


def write_svgs():
    reg = font_for("cormorant-garamond-latin-600-normal.woff")
    ital = font_for("cormorant-garamond-latin-500-italic.woff")
    word, ww = glyph_paths("MANAVÉ", reg, 92, tracking=14)
    W = ww + 40
    logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} 132" role="img" aria-label="MANAVÉ">
  <title>MANAVÉ</title>
  <g fill="#3F564C"><path transform="translate({(W - ww) / 2:.1f} 100)" d="{word}"/></g>
  <path d="M{W / 2 - 22:.0f} 118h44" stroke="#B49A63" stroke-width="1.2"/>
</svg>'''
    open(os.path.join(OUT, "logo.svg"), "w").write(logo)

    m_path, mw = glyph_paths("M", reg, 74)
    mono = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="MANAVÉ monogram">
  <title>MANAVÉ monogram</title>
  <circle cx="60" cy="60" r="57" fill="none" stroke="#B49A63" stroke-width="1.2"/>
  <circle cx="60" cy="60" r="52" fill="none" stroke="#3F564C" stroke-width=".8"/>
  {agave_svg_icon(60, 40, 17, "#879785")}
  <path transform="translate({60 - mw / 2:.1f} 94)" d="{m_path}" fill="#3F564C"/>
</svg>'''
    open(os.path.join(OUT, "monogram.svg"), "w").write(mono)

    m2, mw2 = glyph_paths("M", reg, 46)
    fav = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <title>MANAVÉ</title>
  <rect width="64" height="64" rx="14" fill="#3F564C"/>
  <path transform="translate({32 - mw2 / 2:.1f} 49)" d="{m2}" fill="#F6F0E5"/>
  <path d="M20 54h24" stroke="#B49A63" stroke-width="1.6"/>
</svg>'''
    open(os.path.join(OUT, "favicon.svg"), "w").write(fav)


def social():
    W, H = 1200, 630
    rng = np.random.default_rng(7)
    c = paper(H, W, rng)
    agave(c, W * 0.82, H * 1.04, H * 1.0, rng, 14, 9)
    splatter(c, rng, 30, (W * 0.5, 0, W, H), AGAVE)
    im = to_img(c).convert("RGB")
    d = ImageDraw.Draw(im)
    reg = font_for("cormorant-garamond-latin-600-normal.woff")
    ital = font_for("cormorant-garamond-latin-500-italic.woff")
    try:
        f1 = ImageFont.truetype(reg, 128)
        f2 = ImageFont.truetype(ital, 40)
        f3 = ImageFont.truetype(ital, 32)
    except Exception:
        f1 = f2 = f3 = ImageFont.load_default()
    d.text((80, 190), "MANAVÉ", font=f1, fill=(63, 86, 76))
    d.line([(84, 345), (170, 345)], fill=(180, 154, 99), width=2)
    d.text((84, 365), "Reuniendo a Familiares y Amigos", font=f3, fill=(47, 47, 47))
    im.save(os.path.join(OUT, "social-preview.jpg"), quality=88, optimize=True)


if __name__ == "__main__":
    write_svgs()
    hero(2400, 1500, 11).save(os.path.join(OUT, "hero-agave.webp"), quality=82, method=6)
    hero(900, 1400, 12, mobile=True).save(os.path.join(OUT, "hero-agave-mobile.webp"), quality=82, method=6)
    watermark(1400, 21).save(os.path.join(OUT, "watermark-agave.webp"), quality=80, method=6)
    texture(1024, 5).save(os.path.join(OUT, "texture-paper.webp"), quality=80, method=6)
    social()
    print("brand assets written to", os.path.abspath(OUT))
