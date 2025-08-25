import React, { useEffect, useRef, useState } from "react";
import "./filterPanel.scss";

export const FilterPanel = ({
  value = [],
  options = [
    { key: "food", label: "Еда" },
    { key: "clothes", label: "Одежда" },
    { key: "electronics", label: "Электроника" },
  ],
  placeholder = "Выбрать категории",
  toggleKey
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const selectAll = () => toggleKey("ALL", options)
  const clearAll = () => toggleKey("CLEAR", options)

  const labelText =
    value.length === 0
      ? placeholder
      : value.length === 1
      ? options.find((o) => o.key === value[0])?.label || placeholder
      : `Выбрано: ${value.length}`;

  return (
    <div className="fp" ref={ref}>
      <button
        type="button"
        className="fp__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="fp__trigger-text">{labelText}</span>
        <svg className={`fp__chevron ${open ? "is-open" : ""}`} width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>

      {open && (
        <div className="fp__menu" role="listbox" aria-multiselectable="true">
          <div className="fp__actions">
            <button type="button" className="fp__btn fp__btn--ghost" onClick={selectAll}>Все</button>
            <button type="button" className="fp__btn fp__btn--ghost" onClick={clearAll}>Сброс</button>
          </div>

          <div className="fp__list">
            {options.map((o) => {
              const checked = value.includes(o.key);
              return (
                <label key={o.key} className={`fp__item ${checked ? "is-checked" : ""}`}>
                  <input
                    className="fp__checkbox"
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleKey(o.key)}
                  />
                  <span className="fp__label">{o.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
