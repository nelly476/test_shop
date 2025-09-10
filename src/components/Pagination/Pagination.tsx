import styles from "./Pagination.module.scss";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (num: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.root}>
      <button
        className={styles.nav}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {pages.map((num) => (
        <button
          key={num}
          className={clsx(styles.page, { [styles.active]: num === currentPage })}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button
        className={styles.nav}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперёд
      </button>
    </div>
  );
};
