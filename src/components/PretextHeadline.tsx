import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

/**
 * Kinetic headline rendered on a <canvas>, with line-breaking handled by
 * @chenglou/pretext (fast, DOM-free, i18n-aware text layout). Each grapheme
 * animates in with a staggered fade + rise.
 *
 * Accessibility / SEO: the real text is kept in a normal heading element. If
 * anything fails the heading stays fully visible, so the headline is never
 * missing. Once the canvas is ready the heading text is made transparent (still
 * present in the DOM and accessibility tree) and the canvas takes over.
 *
 * animateOn:
 *  - "mount" (default): plays immediately, and replays whenever `text` changes
 *    (used for the hero, which flips between two headlines).
 *  - "view": plays once, the first time the headline scrolls into view.
 */

// Minimal local typing for Intl.Segmenter (not in this project's ES2020 lib).
type GraphemeSegmenter = { segment(input: string): Iterable<{ segment: string }> };
const SegmenterCtor = (
  Intl as unknown as {
    Segmenter?: new (
      locale?: string,
      options?: { granularity: "grapheme" }
    ) => GraphemeSegmenter;
  }
).Segmenter;

const segmenter: GraphemeSegmenter | null =
  typeof SegmenterCtor === "function"
    ? new SegmenterCtor(undefined, { granularity: "grapheme" })
    : null;

const toGraphemes = (s: string): string[] =>
  segmenter ? Array.from(segmenter.segment(s), (x) => x.segment) : Array.from(s);

type Glyph = { ch: string; x: number; y: number; order: number };
type Staged = { font: string; color: string; total: number };

type Props = {
  /** Plain text for the headline (line breaks are computed responsively). */
  text: string;
  /** Tailwind/utility classes that define the font (size, weight, family). */
  className?: string;
  /** Heading level for semantics/SEO. */
  as?: "h1" | "h2";
  /** When to play the entrance animation. */
  animateOn?: "mount" | "view";
};

const DURATION = 420; // ms per glyph
const STAGGER = 28; // ms between glyphs
const RISE = 18; // px each glyph rises into place

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const PretextHeadline = ({ text, className, as = "h1", animateOn = "mount" }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [fallback, setFallback] = useState(false);
  const Heading = as;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const heading = headingRef.current;
    if (!wrap || !canvas || !heading) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFallback(true);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let glyphs: Glyph[] = [];
    let lastWidth = 0;
    let hasAnimated = false;
    let staged: Staged | null = null;
    let io: IntersectionObserver | null = null;
    let safety: ReturnType<typeof setTimeout> | null = null;

    const draw = (elapsed: number | null, font: string, color: string) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = "top";
      for (const g of glyphs) {
        let p = 1;
        if (elapsed !== null) {
          const local = (elapsed - g.order * STAGGER) / DURATION;
          p = local <= 0 ? 0 : local >= 1 ? 1 : easeOutCubic(local);
        }
        if (p <= 0) continue;
        ctx.globalAlpha = p;
        ctx.fillText(g.ch, g.x, g.y + (1 - p) * RISE);
      }
      ctx.globalAlpha = 1;
    };

    // Measure + lay out the text and hand the visual over to the canvas.
    const stage = (): Staged | null => {
      if (cancelled) return null;
      const cs = getComputedStyle(heading);
      const fontSize = parseFloat(cs.fontSize) || 40;
      const lineHeight =
        cs.lineHeight === "normal"
          ? fontSize * 1.2
          : parseFloat(cs.lineHeight) || fontSize * 1.25;
      const letterSpacing =
        cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing) || 0;
      const font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
      // Guard against transparent/unset color (e.g. gradient-clipped text).
      const color =
        cs.color && cs.color !== "rgba(0, 0, 0, 0)" ? cs.color : "#1a1a1a";

      const width = wrap.clientWidth;
      if (!width) return null;
      lastWidth = width;

      const prepared = prepareWithSegments(text, font, { letterSpacing });
      const { lines, height } = layoutWithLines(prepared, width, lineHeight);

      // Position every grapheme; pretext owns the line breaks, canvas owns x.
      ctx.font = font;
      const topPad = Math.max(0, (lineHeight - fontSize) / 2);
      glyphs = [];
      let order = 0;
      for (let li = 0; li < lines.length; li++) {
        let x = 0;
        const y = li * lineHeight + topPad;
        for (const g of toGraphemes(lines[li].text)) {
          const w = ctx.measureText(g).width + letterSpacing;
          if (g.trim() !== "") glyphs.push({ ch: g, x, y, order: order++ });
          x += w;
        }
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      heading.style.color = "transparent";
      canvas.style.opacity = "1";
      wrap.style.minHeight = `${height}px`;
      return { font, color, total: order };
    };

    const animate = () => {
      if (!staged || cancelled) return;
      hasAnimated = true;
      const startTime = performance.now();
      const total = staged.total * STAGGER + DURATION;
      const loop = (now: number) => {
        if (cancelled || !staged) return;
        const elapsed = now - startTime;
        draw(elapsed, staged.font, staged.color);
        if (elapsed < total) raf = requestAnimationFrame(loop);
        else draw(null, staged.font, staged.color);
      };
      raf = requestAnimationFrame(loop);
    };

    const begin = async () => {
      try {
        const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
        if (fonts?.ready) await fonts.ready;
        if (cancelled) return;
        staged = stage();
        if (!staged) return;

        if (animateOn === "mount") {
          animate();
          return;
        }
        // "view": wait until the headline scrolls into view, then play once.
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io?.disconnect();
              animate();
            }
          },
          { threshold: 0.2 }
        );
        io.observe(wrap);
        // Safety net: if the observer never fires, still reveal the text.
        safety = setTimeout(() => {
          if (!hasAnimated && staged) draw(null, staged.font, staged.color);
        }, 4000);
      } catch {
        setFallback(true);
      }
    };
    begin();

    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      if (!w || w === lastWidth || cancelled) return;
      try {
        staged = stage();
        if (staged && hasAnimated) draw(null, staged.font, staged.color);
      } catch {
        setFallback(true);
      }
    });
    ro.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      if (safety) clearTimeout(safety);
    };
  }, [text, animateOn]);

  return (
    <div ref={wrapRef} className="relative">
      <Heading
        ref={headingRef}
        className={className}
        // When the canvas isn't driving, keep the heading fully visible.
        style={fallback ? { color: "" } : undefined}
      >
        {text}
      </Heading>
      {!fallback && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-0 transition-opacity duration-300"
          )}
          style={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export default PretextHeadline;
