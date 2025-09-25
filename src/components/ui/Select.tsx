import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export default function Select({
  label,
  error,
  className,
  children,
  ...props
}: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-text">
          {label}
        </label>
      )}
      <select
        {...props}
        className={clsx(
          "input",
          error ? "border-danger focus:ring-danger" : "border-border",
          className
        )}
      >
        {children}
      </select>
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
