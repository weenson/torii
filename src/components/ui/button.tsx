import React from "react";
import Link from "next/link";

type ButtonProps = {
  link?: string;
  variant?: "primary" | "secondary" | "outline" | "signup";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

const variantStyles = {
  primary:
    "bg-primary text-primary-text hover:bg-primary/90 inline-flex items-center",
  secondary:
    "bg-secondary text-primary-text hover:bg-secondary/90 inline-flex items-center",
  outline:
    "border border-primary text-primary hover:bg-primary/10 inline-flex items-center",
  signup:
    "bg-primary text-primary-text hover:bg-primary/90 inline-flex items-center",
};

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-6 py-2 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  link,
  children,
  variant = "primary",
  size = "md",
}: ButtonProps) {
  const className = `gap-2 rounded-md font-medium transition-colors cursor-pointer
    ${variantStyles[variant]} ${sizeStyles[size]}`;
  if (link) {
    return (
      <Link href={link} className={className}>
        {children}
      </Link>
    );
  }
  return <button className={className}>{children}</button>;
}
