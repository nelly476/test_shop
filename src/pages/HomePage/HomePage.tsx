import { useEffect, useState, useMemo, useCallback } from "react";
import { addToCart, getItems, decreaseInCart, removeFromCart } from "../../redux/slices/cartSlice"
import { ProductGrid, Pagination, FilterPanel, Sort, Cart } from "../../components/index"
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/slices/cartSlice";
import {
  selectItems,
  selectItemsCount,
  selectCartStatus,
} from "../../redux/selectors/cartSliceSelectors";
import type { Product } from "../../redux/slices/cartSlice";
import { SortState } from "@/components/Sort/Sort";
import clsx from "clsx";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<SortState>({ key: "price", order: "asc" });
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [paginatedData, setPaginatedData] = useState<Product[]>([]);

  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectItemsCount);
  const status = useAppSelector(selectCartStatus);

  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // читаем массив категорий из URL
  const cats: string[] = useMemo(() => {
    return searchParams.get("cats")?.split(",") ?? [];
  }, [searchParams]);

  useEffect(() => {
    dispatch(getItems({ category: cats, sort: sort.key, order: sort.order }));
  }, [dispatch, cats, sort]);

  useEffect(() => {
    setPaginatedData(items.slice(offset, offset + PAGE_SIZE));
  }, [items, offset]);

  const handlePageChange = (num: number) => {
    setPage(num);
    setOffset((num - 1) * PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (val: string[]) => {
    let next = [...cats];
    if (val.length === 3) next = val;
    else if (val.length === 0) next = [];
    else if (next.includes(val[0])) next = next.filter((c) => c !== val[0]);
    else next.push(val[0]);

    if (next.length > 0) setSearchParams({ cats: next.join(",") });
    else setSearchParams({});
  };

  const changeSortKey = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort((prev) => ({ ...prev, key: e.target.value }));
  };

  const toggleSortOrder = () => {
    setSort((prev) => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }));
  };

  const increment = useCallback(
    (item: Product) => {
      dispatch(addToCart(item));
    },
    [dispatch],
  );

  const decrement = useCallback(
    (id: number) => {
      dispatch(decreaseInCart(id));
    },
    [dispatch],
  );

   const remove = useCallback(
    (id: number) => {
      console.log
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Каталог</h1>
          <p className={styles.subtitle}>Подберите то, что нужно — фильтры и сортировка помогут</p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.toolsLeft}>
            <FilterPanel value={cats} toggleKey={handleCategoryChange} />
            <div className={styles.divider} />
            <Sort sort={sort} changeSortKey={changeSortKey} toggleSortOrder={toggleSortOrder} />
          </div>

          <button className={styles.cartBtn} onClick={() => setOpen(true)} aria-label="Открыть корзину">
            <span className={styles.cartIcon} aria-hidden>🛒</span>
            <span>Корзина</span>
          </button>
        </div>

        <section className={styles.content}>
          {(status === "loading" || status === "idle") && (
            <div className={styles.skeletonArea}>
              <div className={clsx(styles.skeleton, styles.skelCard)} />
              <div className={clsx(styles.skeleton, styles.skelCard)} />
              <div className={clsx(styles.skeleton, styles.skelCard)} />
              <div className={clsx(styles.skeleton, styles.skelCard)} />
            </div>
          )}

          {status === "succeeded" && <ProductGrid items={paginatedData} />}

          {status === "failed" && (
            <div className={styles.errorBox}>
              <span>Ошибка при загрузке. Попробуйте обновить страницу.</span>
            </div>
          )}

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </div>

      <Cart
        isOpen={open}
        onClose={() => setOpen(false)}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={remove}
      />
    </div>
  );
};
