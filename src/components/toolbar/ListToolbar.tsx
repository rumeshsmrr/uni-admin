import Input from "../ui/Inout";
import Button from "../ui/Button";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  onAdd?: () => void;
  addLabel?: string;
};

export default function ListToolbar({ search, onSearch, onAdd, addLabel="Add" }: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Search departments..."
        value={search}
        onChange={(e)=>onSearch(e.target.value)}
      />
      {onAdd && <Button onClick={onAdd}>{addLabel}</Button>}
    </div>
  );
}
