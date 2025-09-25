import Input from "../ui/Inout";
import Button from "../ui/Button";

type Props = {
  search?: string; // make optional
  onSearch?: (v: string) => void; // make optional
  onAdd?: () => void;
  addLabel?: string;
  children?: React.ReactNode; // ✅ allow children (filters etc.)
};

export default function ListToolbar({
  search = "",
  onSearch,
  onAdd,
  addLabel = "Add",
  children,
}: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Search (render only if provided) */}
      {onSearch && (
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}

      <div className="flex items-center gap-2">
        {children}
        {onAdd && <Button onClick={onAdd}>{addLabel}</Button>}
      </div>
    </div>
  );
}
