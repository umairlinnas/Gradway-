"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0, // Set to 0 to allow interaction near the center
    proximity = 120, // Increased default proximity for "aggressive interaction"
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 0.3, // "Instant" snap sensitivity as requested
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | PointerEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );

          // ENHANCED DYNAMIC GLOW:
          // Expand spread to 180 (creates 360-degree border coverage) as cursor nears center.
          const maxDim = Math.max(width, height) / 2;
          const normalizedDist = Math.min(distanceFromCenter / maxDim, 1);
          // When normalizedDist is 0 (at center), spread becomes 180.
          const dynamicSpread = spread + (180 - spread) * Math.pow(1 - normalizedDist, 1.5);
          element.style.setProperty("--spread", String(dynamicSpread));

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
            
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.23, 1, 0.32, 1], // High-performance "out" ease
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [proximity, movementDuration, spread]
    );

    useEffect(() => {
      if (disabled) return;

      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      const handleScroll = () => handleMove();

      // Listen to window events
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });

      // HORIZONTAL SCROLL TRACKING:
      // Detect and listen to local scrollable parent (e.g., the destination carousel)
      let scrollParent: HTMLElement | null = containerRef.current?.parentElement || null;
      while (scrollParent && scrollParent !== document.body) {
        const overflowX = window.getComputedStyle(scrollParent).overflowX;
        if (overflowX === 'auto' || overflowX === 'scroll') {
          scrollParent.addEventListener("scroll", handleScroll, { passive: true });
          break;
        }
        scrollParent = scrollParent.parentElement;
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
        if (scrollParent) {
          scrollParent.removeEventListener("scroll", handleScroll);
        }
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #000,
                  #000 calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #fbbf24 10%, #fbbf2400 20%),
                radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                radial-gradient(circle at 60% 60%, #fcd34d 10%, #fcd34d00 20%), 
                radial-gradient(circle at 40% 60%, #fbbf24 10%, #fbbf2400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #fbbf24 0%,
                  #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                  #fcd34d calc(50% / var(--repeating-conic-gradient-times)), 
                  #fbbf24 calc(75% / var(--repeating-conic-gradient-times)),
                  #fbbf24 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity overflow-hidden",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#fff,#fff),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };