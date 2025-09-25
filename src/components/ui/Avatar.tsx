type Props = {
    name: string;
    size?: "sm" | "md" | "lg";
    src?: string; // optional profile image
  };
  
  export default function Avatar({ name, size = "md", src }: Props) {
    const initials = name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
  
    const sizeClasses =
      size === "sm"
        ? "h-7 w-7 text-xs"
        : size === "lg"
        ? "h-12 w-12 text-lg"
        : "h-9 w-9 text-sm";
  
    if (src) {
      return (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses} rounded-full object-cover border border-border`}
        />
      );
    }
  
    return (
      <div
        className={`${sizeClasses} rounded-full bg-muted text-text flex items-center justify-center font-semibold`}
      >
        {initials || "?"}
      </div>
    );
  }
  