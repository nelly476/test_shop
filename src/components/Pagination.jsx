
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // если всего одна страница, ничего не рисуем

  // генерируем массив номеров страниц [1,2,3,...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          style={{
            fontWeight: num === currentPage ? "bold" : "normal",
            textDecoration: num === currentPage ? "underline" : "none",
          }}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперёд
      </button>
    </div>
  );
};

