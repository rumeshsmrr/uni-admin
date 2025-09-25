import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-text">
          {label}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "input", // base styles from index.css
          error ? "border-danger focus:ring-danger" : "border-border",
          className
        )}
      />
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
