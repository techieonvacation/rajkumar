"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
}

const easeOutExpo = (time: number, duration: number) =>
  ((-Math.pow(2, (-10 * time) / duration) + 1) * 1024) / 1023;

export function CountUp({ end, duration = 2 }: CountUpProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const totalMs = duration * 1000;
    let frame = 0;
    let startedAt: number | null = null;

    const step = (timestamp: number) => {
      startedAt ??= timestamp;
      const elapsed = Math.min(timestamp - startedAt, totalMs);
      setValue(Math.round(end * easeOutExpo(elapsed, totalMs)));
      if (elapsed < totalMs) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return <span ref={elementRef}>{value}</span>;
}
