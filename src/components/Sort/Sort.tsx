import "./Sort.scss";

export type SortOrder = "asc" | "desc";
export type SortState = {key: string, order: SortOrder}

interface SortProps {
  sort: SortState;
  changeSortKey: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleSortOrder: () => void;
}

export const Sort: React.FC<SortProps> = ({ sort, changeSortKey, toggleSortOrder }) => {
  const options = [{ key: "price", label: "Цена" }]

  return (
    <div className="sort-select">
      <label>Сортировать по:</label>
      <select value={sort.key} onChange={changeSortKey}>
        {options.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        className={`order ${sort.order}`}
        onClick={toggleSortOrder}
      >
        {sort.order === "asc" ? "▲" : "▼"}
      </button>
    </div>
  );
};
