import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`bg-cph-ochre text-cph-navy px-4 py-2 rounded-lg hover:bg-amber-300 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
