"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface SlideInRightProps {
  duration: string;
  delay: string;
  className?: string;
  children: ReactNode;
}

export function SlideInRight({
  duration,
  delay,
  className,
  children,
}: SlideInRightProps) {
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
      className={`${className ?? ""} ${visible ? "tg-slide-in-right" : ""}`.trim()}
      style={{
        visibility: visible ? "visible" : "hidden",
        animationDuration: duration,
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}
