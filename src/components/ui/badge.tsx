type BadgeProps = {
  variant?: "primary" | "secondary" | "outline" | "accent";
  children: React.ReactNode;
};

const variantStyles = {
  primary: "bg-primary text-primary-text",
  secondary: "bg-secondary text-secondary-text",
  outline:
    "border border-white/10 bg-black/30 backdrop-blur-sm text-primary-text",
  accent: "bg-primary/30 text-primary",
};

export default function Badge({ variant = "primary", children }: BadgeProps) {
  const variantClass = variantStyles[variant];
  return (
    <span
      className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold ${variantClass}`}
    >
      {children}
    </span>
  );
}
