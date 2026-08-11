"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

interface AnimatedTitleProps {
  children: ReactNode;
}

export function AnimatedTitle({ children }: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = new SplitText(container, {
      type: "lines,words,chars",
      linesClass: "split-line",
    });

    gsap.set(container, { perspective: 400 });
    gsap.set(split.chars, { opacity: 0, x: 50 });

    const animation = gsap.to(split.chars, {
      scrollTrigger: { trigger: container, start: "top 90%" },
      x: 0,
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.02,
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
      split.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
