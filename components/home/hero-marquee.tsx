"use client";

import Image from "next/image";
import { HERO_ASSETS } from "@/lib/hero-assets";

const DEFAULT_ITEMS = [
  "THE BEST SOLUTION",
  "THE BEST SOLUTION",
  "THE BEST SOLUTION",
  "THE BEST SOLUTION",
  "THE BEST SOLUTION",
] as const;

interface HeroMarqueeProps {
  items?: readonly string[];
}

function MarqueeTrack({
  items,
  ariaHidden = false,
}: {
  items: readonly string[];
  ariaHidden?: boolean;
}) {
  return (
    <div className="flex shrink-0" aria-hidden={ariaHidden}>
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          className="mx-[30px] flex shrink-0 items-center gap-4 whitespace-nowrap"
        >
          <Image
            src={HERO_ASSETS.sparkleSm}
            alt=""
            width={20}
            height={20}
            className="shrink-0"
          />
          <span className="font-heading text-base font-semibold uppercase tracking-wide text-white md:text-lg">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroMarquee({ items = DEFAULT_ITEMS }: HeroMarqueeProps) {
  return (
    <section
      className="overflow-hidden bg-background py-10"
      aria-label="Featured highlights"
    >
      <div className="flex w-max animate-marquee [animation-duration:25s] motion-reduce:animate-none">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} ariaHidden />
      </div>
    </section>
  );
}
