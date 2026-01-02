
"use client";

import React, { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { animate, AnimationPlaybackControls } from "motion/react";

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
    inactiveZone = 0.01,
    proximity = 350,
    spread = 40,
    variant = "default",
    glow = false,
    className,
    movementDuration = 0.8, // Reduced for much better responsiveness
    borderWidth = 2,
    disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const controlsRef = useRef<AnimationPlaybackControls | null>(null);

    const handleMove = useCallback(
      (e?: PointerEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e && 'x' in e ? e.x : lastPosition.current.x;
          const mouseY = e && 'y' in e ? e.y : lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          // Normalize angles to find the shortest path
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          // Stop previous animation to prevent stacking/delay
          if (controlsRef.current) {
            controlsRef.current.stop();
          }

          controlsRef.current = animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.23, 1, 0.32, 1], // snappier curve
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      const handleScroll = () => handleMove();

      // Using capture: true on document allows us to catch scrolls from the horizontal containers
      document.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("scroll", handleScroll, { passive: true, capture: true });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (controlsRef.current) {
          controlsRef.current.stop();
        }
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("scroll", handleScroll, { capture: true } as any);
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
                  : `radial-gradient(circle at 50% 50%, #fbbf24 15%, transparent 40%),
                radial-gradient(circle at 40% 40%, #f59e0b 8%, transparent 20%),
                radial-gradient(circle at 60% 60%, #4f46e5 12%, transparent 25%), 
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #fbbf24 0%,
                  #f59e0b calc(20% / var(--repeating-conic-gradient-times)),
                  #4f46e5 calc(40% / var(--repeating-conic-gradient-times)), 
                  #111827 calc(60% / var(--repeating-conic-gradient-times)),
                  #fbbf24 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
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
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
