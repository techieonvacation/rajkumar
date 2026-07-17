"use client";

import * as React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const SLIDE_EASE =
  "duration-1000 ease-[cubic-bezier(0.510,0.026,0.368,1.016)]";

type FancyButtonVariant = "explore" | "slide" | "gradient";
type FancyButtonSize = "sm" | "default" | "lg";

type FancyButtonBaseProps = {
  variant: FancyButtonVariant;
  size?: FancyButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  asChild?: boolean;
};

type FancyButtonProps = FancyButtonBaseProps &
  Omit<React.ComponentProps<"button">, keyof FancyButtonBaseProps>;

type FancyLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "className" | "children"
>;

function pickLinkProps(
  props: Omit<FancyButtonProps, keyof FancyButtonBaseProps | "type" | "disabled">,
  disabled?: boolean
): FancyLinkProps {
  const { onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, id, title, "aria-label": ariaLabel } = props;
  return {
    onClick: onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined,
    onMouseEnter: onMouseEnter as React.MouseEventHandler<HTMLAnchorElement> | undefined,
    onMouseLeave: onMouseLeave as React.MouseEventHandler<HTMLAnchorElement> | undefined,
    onFocus: onFocus as React.FocusEventHandler<HTMLAnchorElement> | undefined,
    onBlur: onBlur as React.FocusEventHandler<HTMLAnchorElement> | undefined,
    id,
    title,
    "aria-label": ariaLabel,
    ...(disabled ? { "aria-disabled": true, tabIndex: -1 } : {}),
  };
}

const exploreSizeClasses: Record<FancyButtonSize, string> = {
  sm: "gap-1.5 px-3 py-1.5 text-sm [&_svg]:size-6 [&_svg]:p-1.5",
  default: "gap-2 px-4 py-2 text-base lg:text-lg",
  lg: "gap-2.5 px-5 py-2.5 text-lg lg:text-xl [&_svg]:size-9 [&_svg]:p-2.5",
};

const slideSizeClasses: Record<FancyButtonSize, string> = {
  sm: "min-h-[2.25rem] min-w-[7rem] text-xs",
  default: "min-h-[2.92rem] min-w-[8.5rem] text-sm",
  lg: "min-h-[3.25rem] min-w-[10rem] text-base",
};

const slideTextPad: Record<FancyButtonSize, string> = {
  sm: "pl-[2.75rem] pr-[0.85rem] group-hover:pl-[0.85rem] group-hover:pr-[2.75rem]",
  default:
    "pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem]",
  lg: "pl-[3.85rem] pr-[1.25rem] group-hover:pl-[1.25rem] group-hover:pr-[3.85rem]",
};

const exploreClasses = (size: FancyButtonSize, className?: string) =>
  cn(
    "group relative isolate z-10 inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-border/80",
    "bg-card/80 text-foreground shadow-xl backdrop-blur-md",
    "font-medium lg:font-semibold",
    "transition-colors duration-700 hover:text-primary-foreground",
    "before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-primary",
    "before:transition-all before:duration-700 hover:before:left-0 hover:before:scale-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    exploreSizeClasses[size],
    className
  );

const slideClasses = (size: FancyButtonSize, className?: string) =>
  cn(
    "group relative inline-flex max-w-full cursor-pointer items-center justify-start rounded-full",
    "bg-foreground/10 py-2 text-foreground shadow-[inset_1px_2px_5px_oklch(0%_0_0/0.35)]",
    "transition-all hover:bg-primary",
    SLIDE_EASE,
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    slideSizeClasses[size],
    className
  );

const gradientVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full border-0 font-medium text-primary-foreground shadow-lg",
    "bg-linear-to-l from-primary via-[oklch(72%_0.16_165)] to-secondary",
    "transition-all duration-500 hover:from-secondary hover:via-primary hover:to-[oklch(72%_0.16_165)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-4 text-xs",
        default: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function ExploreArrowIcon() {
  return (
    <svg
      className="size-8 rotate-45 rounded-full border border-foreground/30 p-2 text-primary-foreground transition-all duration-300 ease-linear group-hover:rotate-90 group-hover:border-transparent group-hover:bg-foreground"
      viewBox="0 0 16 19"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
        className="fill-foreground transition-colors group-hover:fill-primary"
      />
    </svg>
  );
}

function SlideArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      height="100%"
      width="100%"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
      />
    </svg>
  );
}

function ExploreContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ExploreArrowIcon />
    </>
  );
}

function SlideContent({
  children,
  size,
}: {
  children: React.ReactNode;
  size: FancyButtonSize;
}) {
  return (
    <>
      <span className="absolute inset-0 flex items-center justify-start px-1 py-0.5">
        <span
          className={cn("w-0 transition-all group-hover:w-full", SLIDE_EASE)}
        />
        <span
          className={cn(
            "flex aspect-square h-full shrink-0 items-center justify-center rounded-full bg-primary",
            "shadow-[inset_1px_-1px_3px_0_oklch(0%_0_0/0.55)] transition-all group-hover:bg-primary-foreground",
            SLIDE_EASE
          )}
        >
          <span
            className={cn(
              "size-[0.8rem] text-primary-foreground transition-all group-hover:-rotate-45 group-hover:text-primary",
              SLIDE_EASE
            )}
          >
            <SlideArrowIcon />
          </span>
        </span>
      </span>
      <span
        className={cn(
          "relative z-10 transition-all group-hover:text-primary-foreground",
          slideTextPad[size],
          SLIDE_EASE
        )}
      >
        {children}
      </span>
    </>
  );
}

function FancyButton({
  variant,
  size = "default",
  className,
  children,
  href,
  asChild = false,
  type = "button",
  disabled,
  ...props
}: FancyButtonProps) {
  const linkProps = pickLinkProps(props, disabled);

  if (variant === "gradient") {
    if (asChild) {
      return (
        <Slot.Root
          className={cn(gradientVariants({ size }), className)}
          {...linkProps}
        >
          {children}
        </Slot.Root>
      );
    }

    if (href) {
      return (
        <Link
          href={href}
          className={cn(gradientVariants({ size }), className)}
          {...linkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled}
        className={cn(gradientVariants({ size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === "explore") {
    if (href) {
      return (
        <Link
          href={href}
          className={exploreClasses(size, className)}
          {...linkProps}
        >
          <ExploreContent>{children}</ExploreContent>
        </Link>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled}
        className={exploreClasses(size, className)}
        {...props}
      >
        <ExploreContent>{children}</ExploreContent>
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={slideClasses(size, className)}
        {...linkProps}
      >
        <SlideContent size={size}>{children}</SlideContent>
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={slideClasses(size, className)}
      {...props}
    >
      <SlideContent size={size}>{children}</SlideContent>
    </button>
  );
}

export {
  FancyButton,
  gradientVariants,
  type FancyButtonProps,
  type FancyButtonVariant,
  type FancyButtonSize,
};
