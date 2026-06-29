# Design System — Manoj Portfolio

Blend of **Material 3**, **Linear**, **Notion**, **Stripe**, and **Vercel**.
The single most important rule: **elevation is expressed through surface color, never through borders or shadows on containers.**

---

## 1. Design Principles

| Principle | Meaning |
|---|---|
| Tonal elevation | Surfaces get lighter (dark mode) or darker (light mode) as they rise — no border needed |
| Typography-first | Hierarchy comes from size, weight, and tracking — not decorative containers |
| Sparse primary | Blue is used for interactive elements only — never as a background on large surfaces |
| Functional decoration | The only decorative element is the 2px underline on section titles |
| Borderless containers | `border border-border` is reserved for interactive inputs only |
| Shadowless panels | `shadow-md/lg/2xl` never appears on static surface panels |

---

## 2. Color System

All colors are in **oklch** color space with a consistent hue of `264.531` (cool blue-gray) for neutrals.

### Token Reference

| Token | Light mode | Dark mode | Use |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` — white | `oklch(0.115 0.007 264.531)` — near-black | Page base, deepest surface |
| `--card` | `oklch(0.965 0.003 264.531)` — light blue-gray | `oklch(0.163 0.009 264.531)` — dark surface | Panels, sidebar (elevated surface) |
| `--muted` | `oklch(0.945 0.005 264.531)` | `oklch(0.21 0.008 264.531)` | Secondary surfaces, chips, image placeholders |
| `--primary` | `oklch(0.546 0.245 262.881)` — blue | `oklch(0.707 0.165 254.624)` — lighter blue | Interactive elements, accents, links |
| `--primary-foreground` | `oklch(0.99 0 0)` — white | `oklch(0.115 0.034 254.624)` — dark blue | Text on primary backgrounds |
| `--foreground` | `oklch(0.09 0.008 264.531)` — near-black | `oklch(0.97 0 0)` — near-white | Body text |
| `--muted-foreground` | `oklch(0.48 0.01 264.531)` | `oklch(0.63 0.009 264.531)` | Secondary text, labels, metadata |
| `--border` | `oklch(0.88 0.004 264.531)` | `oklch(1 0 0 / 7%)` | Input borders, thin dividers only |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Error states |

### Tonal Elevation (the core concept)

```
Light mode (lower L = more elevated):
  background  L=1.000  ████████████████  Page
  card        L=0.965  ███████████████   Panels, sidebar
  muted       L=0.945  ██████████████    Inner tiles, inputs
  secondary   L=0.945  ██████████████    Chips, badges

Dark mode (higher L = more elevated):
  background  L=0.115  ██                Page
  card        L=0.163  ████              Panels, sidebar
  muted       L=0.210  █████             Inner tiles, inputs
```

**The rule:** put `bg-background` inside a `bg-card` panel — in dark mode it appears sunken (darker), in light mode it appears elevated (lighter white paper). No border needed either way.

### Primary Color Usage

```
✅  text-primary          — active nav links, icon colors, section underlines
✅  bg-primary            — CTA buttons (solid fill), progress bars
✅  bg-primary/10         — tonal icon containers, tonal chips
✅  bg-primary/25         — focus rings (ring-primary/25)
✅  bg-primary/40         — subtle scrollbar thumbs
✅  bg-primary/60         — decorative dots (list markers)

❌  bg-primary on panels or section backgrounds
❌  text-primary on plain body text
❌  border-primary on containers (only on focus states)
```

---

## 3. Typography

### Font Stack

| Variable | Font | Use |
|---|---|---|
| `font-heading` | **Plus Jakarta Sans** (via `--font-montserrat`) | All headings: h1–h4, section titles, card titles |
| `font-sans` / `font-vcard` | **Inter** → **Plus Jakarta Sans** | Body text, nav labels, form fields |
| `font-mono` | **JetBrains Mono** (via `--font-geist-mono`) | Code snippets, monospaced data |

### Type Scale

| Role | Mobile | Desktop | Weight | Tracking | Class pattern |
|---|---|---|---|---|---|
| Page title (name) | 17px | 26px | 600 semibold | tight | `font-heading font-semibold tracking-tight` |
| Section title (h2) | 22px | 28px | 600 semibold | tight | `font-heading font-semibold tracking-tight` |
| Sub-section heading (h3) | 16px | 20px | 500 medium | tight | `font-heading font-medium tracking-tight` |
| Card title (h4) | 15px | 16px | 500 medium | tight | `font-heading font-medium tracking-tight` |
| Body | 14px | 15px | 300–400 | normal | `font-light leading-relaxed` |
| Label / metadata | 11–12px | 12–13px | 400–500 | wide (uppercase) | `text-[11px] uppercase tracking-wider` |
| Caption | 12px | 13px | 300 light | normal | `text-[12px] font-light` |

### Typography Rules

```
✅  Always pair font-heading with tracking-tight on headings
✅  Use leading-relaxed (1.625) or leading-snug (1.375) on body and titles
✅  Use tabular-nums on numeric displays (percentages, counts)
✅  Use capitalize on section/card titles
✅  Uppercase + tracking-wider on contact labels and micro-labels only

❌  Do not use font-bold on headings — font-semibold is the ceiling
❌  Do not use default leading (tight) on body paragraphs
❌  Do not use tracking-tight on body text — only headings
```

---

## 4. Surface & Elevation System

### Surface Hierarchy

```
Level 0 — bg-background    Page background
Level 1 — bg-card          Primary panels (sidebar, section articles)
Level 2 — bg-background    Inner tiles inside panels (sunken in dark, elevated in light)
Level 3 — bg-muted         Secondary surfaces: input fields, chips, image placeholders
```

### Building Panels (Level 1)

```tsx
// ✅ Correct — no border, no shadow
<div className="bg-card rounded-2xl p-5 min-[580px]:p-8">

// ❌ Wrong — old template pattern
<div className="border border-border bg-card rounded-[20px] shadow-md p-[15px]">
```

### Building Inner Tiles (Level 2 — inside a panel)

```tsx
// ✅ Correct — sunken in dark mode, slightly elevated in light mode
<li className="bg-background rounded-2xl p-5">

// ❌ Wrong — double-border, template card feel
<li className="border border-border bg-card rounded-[14px] shadow-lg p-5">
```

### Floating / Overlay Surfaces

Modals, dropdowns, tooltips float above everything — they **may** use shadow:

```tsx
// ✅ Correct — only floating elements use shadow
<div className="bg-card rounded-2xl shadow-2xl p-8">        // modal
<ul className="bg-popover rounded-xl shadow-xl p-1.5">      // dropdown
```

---

## 5. Spacing System

Based on a 4px grid. Use Tailwind's scale — no arbitrary pixel values unless the specific value doesn't exist.

| Scale | px | Use |
|---|---|---|
| `1` | 4px | Icon gap, tight row spacing |
| `1.5` | 6px | Dropdown item padding |
| `2` | 8px | Label gap, badge padding |
| `2.5` | 10px | Small button padding |
| `3` | 12px | Chip padding x |
| `3.5` | 14px | Icon container gap |
| `4` | 16px | List item gap, form field padding x |
| `5` | 20px | Panel padding (mobile) |
| `6` | 24px | Panel padding (580px) |
| `8` | 32px | Panel padding (desktop) |
| `10` | 40px | Section vertical gap |
| `12` | 48px | Large avatar clearance |

### Section Spacing Pattern

```tsx
// Every section inside a panel gets mb-8 bottom margin
<section className="mb-8">

// Last section in a panel gets mb-2 (nearly flush)
<section className="mb-2">
```

---

## 6. Border Radius

| Token | Value | Use |
|---|---|---|
| `rounded-lg` | 8px | Small chips, inline badges |
| `rounded-xl` | 12px | Input fields, small icon boxes, list items |
| `rounded-2xl` | 16px | Panels, inner tiles, image containers, modals |
| `rounded-[28px]` | 28px | Avatar images, large figures |
| `rounded-full` | pill | Tags, progress bars, decorative dots |

```tsx
// ✅ Panels and main cards
<div className="rounded-2xl">

// ✅ Inputs and small tiles
<input className="rounded-xl">

// ✅ Avatar / figure
<figure className="rounded-2xl min-[580px]:rounded-[28px]">

// ✅ Progress bar track and thumb
<div className="rounded-full">
```

---

## 7. Component Patterns

### Icon Box (Material 3 Tonal Container)

```tsx
// ✅ Correct — tonal primary, no shadow
<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-[16px] text-primary
                min-[580px]:h-11 min-[580px]:w-11 min-[580px]:rounded-2xl min-[580px]:text-[18px]">
  <SomeIcon />
</div>

// ❌ Wrong — muted bg with shadow
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-primary shadow-md">
```

### Section Title (h2 with accent underline)

```tsx
// ✅ Correct — thin pill underline via pseudo-element
<h2 className="relative w-max font-heading font-semibold tracking-tight capitalize text-foreground
               text-[22px] min-[580px]:text-[28px]
               pb-2.5 min-[580px]:pb-3.5
               after:content-[''] after:absolute after:bottom-0 after:left-0
               after:h-[2px] after:w-7 after:rounded-full after:bg-primary">
  {title}
</h2>
```

### Sub-section Heading (h3)

```tsx
// ✅ Correct
<h3 className="font-heading font-medium tracking-tight text-foreground text-[16px] min-[580px]:text-[20px] mb-5">
```

### Primary Button (CTA)

```tsx
// ✅ Correct — solid fill, no border
<button className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3
                   text-[14px] font-medium text-primary-foreground
                   transition-opacity hover:opacity-90
                   disabled:cursor-not-allowed disabled:opacity-50">
```

### Ghost / Secondary Button

```tsx
// ✅ Correct — muted surface, no border
<button className="inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-2
                   text-[14px] text-muted-foreground
                   transition-colors hover:bg-card hover:text-foreground">
```

### Form Input (Material 3 Filled)

```tsx
// ✅ Correct — filled, no border, focus ring
<input className="block w-full rounded-xl bg-background px-4 py-3.5
                  text-[14px] text-foreground
                  outline-none placeholder:text-muted-foreground/70
                  transition-all focus:ring-2 focus:ring-primary/25
                  min-[580px]:py-4 min-[580px]:text-[15px]" />

// ❌ Wrong — transparent with border
<input className="bg-transparent border border-border rounded-[14px] px-5 py-[13px]" />
```

### Tonal Badge / Chip

```tsx
// ✅ Correct — primary tonal chip (job title, tags)
<span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1
                 text-[11px] font-medium text-primary">
  Full Stack Developer
</span>

// ❌ Wrong — secondary background chip
<span className="rounded-lg bg-secondary px-3 py-[3px] text-[11px] font-light text-secondary-foreground">
```

### Thin Divider

```tsx
// ✅ Correct — subtle, lower opacity
<div className="h-px w-full bg-border/60 my-5 min-[580px]:my-7" />

// ❌ Wrong — full-opacity hard border
<div className="h-px w-full bg-border my-4" />
```

### Scrollable List Scrollbar

```tsx
// ✅ Correct — thin 4px thumb, tonal primary color
className="[&::-webkit-scrollbar]:h-1
           [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted
           [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40"
```

### Image / Figure Container

```tsx
// ✅ Always use overflow-hidden with rounded-2xl — no border
<figure className="overflow-hidden rounded-2xl bg-muted">
  <Image ... />
</figure>

// ✅ For absolutely-positioned avatars — parent MUST be relative
<div className="relative ...">
  <figure className="absolute ...">
```

### Floating Card (absolute-positioned inside a container)

```tsx
// ✅ Parent must have relative, child uses absolute + translate
<div className="relative bg-background rounded-2xl p-5 pt-14 ...">
  <figure className="absolute left-0 top-0 translate-x-5 -translate-y-6 ...">
```

### Modal / Overlay

```tsx
// ✅ Backdrop: blurred background, not solid black
<div className="bg-background/80 backdrop-blur-sm" />

// ✅ Modal panel: bg-card with shadow (floating surface)
<section className="bg-card rounded-2xl shadow-2xl p-5 min-[580px]:p-8" />
```

### Dropdown Menu

```tsx
// ✅ Trigger: bg-background (no border)
<button className="rounded-xl bg-background px-4 py-3 font-medium text-foreground">

// ✅ Panel: bg-popover with shadow (it floats)
<ul className="absolute bg-popover rounded-xl shadow-xl p-1.5 z-[2]">
  <li>
    <button className="w-full rounded-lg px-3 py-2 text-muted-foreground
                       hover:bg-muted hover:text-foreground">
  </li>
</ul>
```

### Nav Bar

```tsx
// ✅ Correct — tonal surface + backdrop blur
<nav className="bg-card/90 backdrop-blur-xl rounded-t-2xl">
  <button className={cn(
    "rounded-xl px-3 py-5 text-[11px] font-medium transition-colors hover:text-foreground",
    active ? "text-foreground" : "text-muted-foreground"
  )}>
```

---

## 8. Shadow Rules

| Element type | Shadow | Reason |
|---|---|---|
| Page panels (sidebar, sections) | **none** | Tonal color provides elevation |
| Inner tiles (service cards, blog cards) | **none** | bg-background inside bg-card is enough |
| Floating elements (modals, dropdowns) | `shadow-xl` or `shadow-2xl` | They genuinely float above layout |
| Interactive hover states | `shadow-sm` at most | Subtle depth on hover |
| Navbar (mobile bottom) | **none** | bg-card/90 + backdrop-blur is enough |

```
✅  shadow-sm     — subtle hover elevation only
✅  shadow-xl     — dropdowns
✅  shadow-2xl    — modals

❌  shadow-md     — never on panels
❌  shadow-lg     — never on panels  
❌  shadow-2xl    — never on panels (only modals)
```

---

## 9. Border Rules

| Situation | Use border? | What to use instead |
|---|---|---|
| Panel / section container | ❌ No | bg-card tonal surface |
| Inner content tile | ❌ No | bg-background inside bg-card |
| Image container | ❌ No | overflow-hidden + rounded |
| Form input (rest state) | ❌ No | bg-background filled field |
| Form input (focus state) | ✅ `focus:ring-2 focus:ring-primary/25` | Ring, not border |
| Thin horizontal divider | ✅ `h-px bg-border/60` | Only at 60% opacity |
| Interactive toggle/checkbox | ✅ as needed | UI component standards |

---

## 10. Animation

| Animation | Class | When |
|---|---|---|
| Section enter | `animate-[fade_0.5s_ease_backwards]` | Active section panel |
| Project appear | `animate-[scale-up_0.25s_ease_forwards]` | Filtered project tiles |
| Image hover zoom | `transition-transform duration-300 group-hover:scale-[1.04]` | All image cards |
| Hover opacity | `transition-opacity hover:opacity-90` | Buttons, client logos |
| Color/bg transition | `transition-colors` | Nav items, links, icon states |
| Sidebar expand | `transition-[max-height] duration-500 ease-in-out` | Show contacts |

Keyframes defined in `globals.css`:

```css
@keyframes fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scale-up {
  0%   { transform: scale(0.5); }
  100% { transform: scale(1); }
}
```

---

## 11. Responsive Breakpoints

| Breakpoint | px | Context |
|---|---|---|
| `min-[450px]` | 450px | Wide phones |
| `min-[580px]` | 580px | Large phones — main mobile→desktop shift point |
| `md` | 768px | Tablet — 2-column grids |
| `lg` | 1024px | Desktop — 3-col projects, sticky sidebar activates |
| `min-[1250px]` | 1250px | Wide desktop — full sidebar layout |

### Panel Width Progression

```
Mobile:     fluid (full container width)
580px+:     520px (centered)
md (768):   700px (centered)
lg (1024):  950px (centered)
1250px+:    auto (fills 72% of the flex container)
```

### Mobile-First Pattern

```tsx
// ✅ Always mobile-first
<div className="p-5 min-[580px]:p-8">
<h2 className="text-[22px] min-[580px]:text-[28px]">
<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

---

## 12. Accessibility Checklist

- All interactive non-`<button>` elements get `role="button"` + `tabIndex={0}` + `onKeyDown` for Enter/Space
- All icon-only buttons get `aria-label`
- All `<Image>` components get meaningful `alt` text
- Expand/collapse buttons get `aria-expanded`
- `<time>` elements get `dateTime` attribute
- `<address>` elements use `not-italic` to reset browser default
- External links get `target="_blank"` + `rel="noopener noreferrer"`
- Theme toggle uses `suppressHydrationWarning` on `<html>` + `mounted` guard

---

## 13. What to Avoid

```
❌  border border-border on any container, panel, or card
❌  shadow-md / shadow-lg / shadow-2xl on static surface panels
❌  bg-secondary or bg-muted as the main card background (use bg-card or bg-background)
❌  font-bold on headings — font-semibold is the ceiling
❌  Arbitrary pixel values when a Tailwind scale unit exists
❌  Nesting bg-card inside bg-card (creates no visual difference)
❌  absolute positioned children without relative on the parent
❌  px-[18px] style arbitrary spacing — use px-4 (16px) or px-5 (20px)
❌  Large decorative radius mismatches (e.g., rounded-[20px] inside rounded-2xl)
❌  text-primary on body copy paragraphs
❌  Inline style="" for anything except data-driven widths (progress bars)
```

---

## 14. Quick Reference Cheatsheet

```tsx
// Panel (sidebar, section article)
"bg-card rounded-2xl p-5 min-[580px]:p-8"

// Inner tile (inside a panel)
"bg-background rounded-2xl p-5 min-[580px]:p-6"

// Icon box (Material 3 tonal)
"flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary
 min-[580px]:h-11 min-[580px]:w-11 min-[580px]:rounded-2xl"

// Section h2 with underline
"relative w-max font-heading font-semibold tracking-tight capitalize text-foreground
 text-[22px] min-[580px]:text-[28px] pb-2.5
 after:content-[''] after:absolute after:bottom-0 after:left-0
 after:h-[2px] after:w-7 after:rounded-full after:bg-primary"

// Sub-section h3
"font-heading font-medium tracking-tight text-foreground text-[16px] min-[580px]:text-[20px] mb-5"

// Filled input
"rounded-xl bg-background px-4 py-3.5 text-foreground outline-none
 placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/25"

// Primary button
"inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3
 font-medium text-primary-foreground transition-opacity hover:opacity-90"

// Tonal chip / badge
"inline-flex items-center rounded-full bg-primary/10 px-3 py-1
 text-[11px] font-medium text-primary"

// Divider
"h-px w-full bg-border/60 my-5 min-[580px]:my-7"

// Body text
"text-[14px] font-light leading-relaxed text-muted-foreground min-[580px]:text-[15px]"

// Metadata / label row
"text-[11px] uppercase tracking-wider text-muted-foreground"
```
