export const REVEAL_ANIMATIONS = [
  "fade-in-left",
  "fade-in-right",
  "fade-in-up",
] as const;

export type RevealAnimation = (typeof REVEAL_ANIMATIONS)[number];

export function toRevealAnimation(value: string): RevealAnimation {
  return REVEAL_ANIMATIONS.includes(value as RevealAnimation)
    ? (value as RevealAnimation)
    : "fade-in-up";
}

export const SECTION_ALIGNMENTS = ["left", "center"] as const;

export type SectionAlignment = (typeof SECTION_ALIGNMENTS)[number];

export function toSectionAlignment(value: string): SectionAlignment {
  return value === "center" ? "center" : "left";
}

export const TEMPLATE_ICONS = [
  "tg-icon-trophy",
  "tg-icon-user",
  "tg-icon-user-1",
  "tg-icon-chat",
  "tg-icon-laughing",
  "tg-icon-tick-inside-circle",
  "tg-icon-customer-service-headset",
  "tg-icon-phone-call",
  "tg-icon-contact",
  "tg-icon-mail",
  "tg-icon-email",
  "tg-icon-pin",
  "tg-icon-calendar",
  "tg-icon-clock",
  "tg-icon-edit",
  "tg-icon-plus",
  "tg-icon-right-arrow",
  "tg-icon-right-arrow-1",
  "tg-icon-right-up",
  "tg-icon-left",
  "tg-icon-facebook",
  "tg-icon-linkedin",
  "tg-icon-dribble",
] as const;
