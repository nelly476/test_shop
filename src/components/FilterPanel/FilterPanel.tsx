import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./FilterPanel.module.scss";

interface FilterPanelProps {
  value: string[];
  toggleKey: (val: string[] | []) => void;
}

const OPTIONS = [
  { key: "food", label: "Еда" },
  { key: "clothes", label: "Одежда" },
  { key: "electronics", label: "Электроника" },
];

const PLACEHOLDER = "Выбрать категории";

export const FilterPanel: React.FC<FilterPanelProps> = ({ value, toggleKey }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const selectAll = () => toggleKey(OPTIONS.map((o) => o.key));
  const clearAll = () => toggleKey([]);

  const labelText =
    value.length === 0
      ? PLACEHOLDER
      : value.length === 1
        ? OPTIONS.find((o) => o.key === value[0])?.label || PLACEHOLDER
        : `Выбрано: ${value.length}`;

  return (
    <div className={styles.root} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.triggerText}>{labelText}</span>
        <svg
          className={clsx(styles.chevron, { [styles.isOpen]: open })}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <div className={styles.menu} role="listbox" aria-multiselectable="true">
          <div className={styles.actions}>
            <button type="button" className={clsx(styles.btn, styles.btnGhost)} onClick={selectAll}>
              Все
            </button>
            <button type="button" className={clsx(styles.btn, styles.btnGhost)} onClick={clearAll}>
              Сброс
            </button>
          </div>

          <div className={styles.list}>
            {OPTIONS.map((o) => {
              const checked = value.includes(o.key);
              return (
                <label key={o.key} className={clsx(styles.item, { [styles.isChecked]: checked })}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleKey([o.key])}
                  />
                  <span className={styles.label}>{o.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
