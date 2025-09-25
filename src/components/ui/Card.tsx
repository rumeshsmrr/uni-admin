import type { HTMLAttributes } from "react";
import clsx from "clsx";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: Props) {
  return (
    <div
      {...props}
      className={clsx(
        "card", // our Tailwind utility from index.css
        "bg-card rounded-2xl border border-border shadow-card dark:shadow-card-dark",
        className
      )}
    />
  );
}
