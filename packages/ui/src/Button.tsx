import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "destructive" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

// Shared base for every button: layout, shape, motion, and a pointer cursor
// (Tailwind v4's Preflight no longer sets cursor: pointer on <button>).
const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-cph-ochre text-cph-navy hover:bg-amber-300",
  destructive: "bg-cph-rust text-cph-paper hover:bg-cph-rust/80",
  outline:
    "border border-cph-sky/30 text-cph-paper hover:border-cph-sky/60 hover:bg-white/5",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  // twMerge lets callers override any base/variant class by passing their own.
  return (
    <button
      className={twMerge(base, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
