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
          className="mx-6 flex shrink-0 items-center gap-4 whitespace-nowrap"
        >
          <Image
            src={HERO_ASSETS.sparkleSm}
            alt=""
            width={30}
            height={30}
            className="size-7.5 shrink-0 brightness-0 invert opacity-90"
          />
          <span className="font-heading text-base font-semibold uppercase tracking-wide text-white md:text-lg lg:text-xl">
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
      className="overflow-hidden bg-primary py-6"
      aria-label="Featured highlights"
    >
      <div className="inline-flex w-max animate-marquee motion-reduce:animate-none">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} ariaHidden />
      </div>
    </section>
  );
}
