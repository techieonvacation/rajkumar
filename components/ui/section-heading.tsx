"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_ASSETS } from "@/lib/hero-assets";
import {
  bodyTextClass,
  eyebrowClass,
  sectionTitleClass,
} from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "center" | "left";
  tone?: "default" | "invert";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
  tone = "default",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  const invert = tone === "invert";

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE }}
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
        className
      )}
    >
      <div
        className={cn(
          "mb-5 inline-flex items-center gap-2",
          centered && "justify-center"
        )}
      >
        <Image
          src={HERO_ASSETS.sparkleSm}
          alt=""
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className={eyebrowClass}>{eyebrow}</span>
      </div>

      <h2 id={id} className={cn(sectionTitleClass, invert && "text-white")}>
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="text-primary">{titleAccent}</span>
          </>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            bodyTextClass,
            "mt-5 max-w-2xl",
            centered && "mx-auto",
            invert && "text-white/60"
          )}
        >
          {description}
        </p>
      )}
    </motion.header>
  );
}
