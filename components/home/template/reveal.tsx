"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealAnimation = "fade-in-left" | "fade-in-right" | "fade-in-up";

interface RevealProps {
  animation: RevealAnimation;
  delay?: string;
  className?: string;
  children: ReactNode;
}

export function Reveal({ animation, delay, className, children }: RevealProps) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setVisible(true);
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className ?? ""} ${visible ? `tg-${animation}` : ""}`.trim()}
      style={{ visibility: visible ? "visible" : "hidden", animationDelay: delay }}
    >
      {children}
    </div>
  );
}
