"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  title: string;
  percent: number;
}

export function ProgressBar({ title, percent }: ProgressBarProps) {
  const [counted, setCounted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setCounted(true);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="why-choose-one__progress" ref={elementRef}>
      <h4 className="why-choose-one__progress-title">{title}</h4>
      <div className="bar">
        <div
          className="bar-inner count-bar"
          style={{ width: counted ? `${percent}%` : undefined }}
        >
          <div className="count-text">{percent}%</div>
        </div>
      </div>
    </div>
  );
}
