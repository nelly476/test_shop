import { useRef, useState } from "react";
import clsx from "clsx";
import styles from "./FilterPanel.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick"

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

  useOutsideClick(ref, () => setOpen(false));
  
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
        onClick={() => setOpen((open) => !open)}
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
            {OPTIONS.map((option) => {
              const checked = value.includes(option.key);
              return (
                <label key={option.key} className={clsx(styles.item, { [styles.isChecked]: checked })}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleKey([option.key])}
                  />
                  <span className={styles.label}>{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
