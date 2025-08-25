import "./Sort.scss";

export const Sort = ({ sort, changeSortKey, toggleSortOrder }) => {
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
