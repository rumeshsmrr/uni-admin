import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "btn", // base styles from index.css
        {
          "btn-primary": variant === "primary",
          "btn-soft": variant === "soft",
          "bg-danger text-white hover:opacity-90 focus:ring-2 focus:ring-danger":
            variant === "danger",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-5 py-3 text-lg": size === "lg",
        },
        className
      )}
    />
  );
}
