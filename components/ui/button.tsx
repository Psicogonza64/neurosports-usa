import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/utils/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
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
}: ButtonProps) {
  const sharedClassName = cn(
    "inline-flex flex-col items-center justify-center rounded-full border font-medium leading-tight",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link className={sharedClassName} href={href}>
          {children}
        </Link>
      );
    }

    return (
      <a className={sharedClassName} href={href}>
        {children}
      </a>
    );
  }

  return <button className={sharedClassName}>{children}</button>;
}