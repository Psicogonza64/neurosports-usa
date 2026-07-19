import type { ButtonHTMLAttributes, ReactNode } from "react";

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
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
};

const variantClasses = {
  primary: "nsu-primary-button",
  secondary: "nsu-secondary-button",
};

const sizeClasses = {
  sm: "px-4.5 py-2.5 text-sm",
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
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const sharedClassName = cn(
    "inline-flex min-h-11 flex-col items-center justify-center rounded-full border font-semibold leading-tight tracking-[0.01em]",
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
    <button
      className={sharedClassName}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cta={dataCta}
      data-location={dataLocation}
    >
      {children}
    </button>
  );
}