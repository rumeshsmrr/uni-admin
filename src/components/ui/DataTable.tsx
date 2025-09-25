import { useMemo, useState } from "react";

export type Column<T> = {
  id: string;
  header: string;
  selector: (row: T) => unknown;            // value for sort
  cell?: (row: T) => React.ReactNode;   // custom render
  sortable?: boolean;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
  initialPageSize?: number;
  emptyMessage?: string;
};

export default function DataTable<T>({
  data,
  columns,
  rowKey,
  initialPageSize = 5,
  emptyMessage = "No data found",
}: Props<T>) {
  const [sort, setSort] = useState<{ id: string; dir: "asc" | "desc" } | null>(null);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageIndex, setPageIndex] = useState(0);

  // sorting
  const sorted = useMemo(() => {
    if (!sort) return data;
    const col = columns.find(c => c.id === sort.id);
    if (!col) return data;

    const arr = [...data];
    arr.sort((a, b) => {
      const av = col.selector(a);
      const bv = col.selector(b);
      if (av == null && bv == null) return 0;
      if (av == null) return sort.dir === "asc" ? -1 : 1;
      if (bv == null) return sort.dir === "asc" ? 1 : -1;
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [data, sort, columns]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = sorted.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);

  // handle sort
  const requestSort = (id: string, sortable?: boolean) => {
    if (!sortable) return;
    setPageIndex(0);
    setSort(prev => {
      if (!prev || prev.id !== id) return { id, dir: "asc" };
      return { id, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  // empty state
  if (total === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto mb-4 h-24 w-40 rounded-2xl bg-muted" />
        <p className="text-subtext">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="card p-0 overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-muted/60">
          <tr className="text-left text-sm">
            {columns.map(col => (
              <th
                key={col.id}
                className={`px-4 py-3 font-semibold ${col.className ?? ""} ${col.sortable ? "cursor-pointer select-none" : ""}`}
                onClick={() => requestSort(col.id, col.sortable)}
              >
                <div className="inline-flex items-center gap-1">
                  {col.header}
                  {sort?.id === col.id && (
                    <span className="text-subtext">
                      {sort.dir === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {pageData.map(row => (
            <tr key={rowKey(row)} className="hover:bg-muted/40">
              {columns.map(col => (
                <td key={col.id} className={`px-4 py-3 ${col.className ?? ""}`}>
                  {col.cell ? col.cell(row) : String(col.selector(row))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="text-sm text-subtext">
          Showing{" "}
          <span className="font-medium">{pageIndex * pageSize + 1}</span>–
          <span className="font-medium">
            {Math.min((pageIndex + 1) * pageSize, total)}
          </span>{" "}
          of <span className="font-medium">{total}</span>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="input w-24"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setPageIndex(0);
            }}
          >
            {[5, 10, 20, 50].map(opt => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1">
            <button
              className="btn btn-soft"
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
            >
              ⏮
            </button>
            <button
              className="btn btn-soft"
              onClick={() => setPageIndex(p => Math.max(0, p - 1))}
              disabled={pageIndex === 0}
            >
              ←
            </button>
            <span className="px-2 text-sm">
              Page {pageIndex + 1} / {totalPages}
            </span>
            <button
              className="btn btn-soft"
              onClick={() => setPageIndex(p => Math.min(totalPages - 1, p + 1))}
              disabled={pageIndex >= totalPages - 1}
            >
              →
            </button>
            <button
              className="btn btn-soft"
              onClick={() => setPageIndex(totalPages - 1)}
              disabled={pageIndex >= totalPages - 1}
            >
              ⏭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
