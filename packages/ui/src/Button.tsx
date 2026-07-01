import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant =
  | "primary"
  | "destructive"
  | "success"
  | "outline"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "icon" | "none";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

// Shared base for every button: layout, shape, motion, and a pointer cursor
// (Tailwind v4's Preflight no longer sets cursor: pointer on <button>).
const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-cph-ochre text-cph-navy hover:bg-amber-300",
  destructive: "bg-cph-rust text-cph-paper hover:bg-cph-rust/85",
  success: "bg-cph-teal text-cph-paper hover:bg-cph-teal/85",
  outline: "border border-cph-sky/30 text-cph-paper hover:bg-white/5",
  ghost: "text-cph-paper hover:bg-white/10",
  link: "text-cph-sky hover:text-cph-paper",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-4 py-2",
  sm: "px-4 py-2 text-sm",
  icon: "p-2",
  none: "",
};

export default function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  // twMerge lets callers override any base/variant/size class by passing their
  // own (e.g. `className="w-full"` or a one-off color).
  return (
    <button
      className={twMerge(
        base,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
