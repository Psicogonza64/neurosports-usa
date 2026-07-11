import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/utils/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  target?: string;
  rel?: string;
  dataCta?: string;
  dataLocation?: string;
};

const variantClasses = {
  primary: "nsu-primary-button",
  secondary: "nsu-secondary-button",
};

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  target,
  rel,
  dataCta,
  dataLocation,
}: ButtonProps) {
  const sharedClassName = cn(
    "inline-flex min-h-11 flex-col items-center justify-center rounded-full border font-medium leading-tight",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_44%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link
          className={sharedClassName}
          href={href}
          target={target}
          rel={rel}
          data-cta={dataCta}
          data-location={dataLocation}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        className={sharedClassName}
        href={href}
        target={target}
        rel={rel}
        data-cta={dataCta}
        data-location={dataLocation}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={sharedClassName} data-cta={dataCta} data-location={dataLocation}>
      {children}
    </button>
  );
}