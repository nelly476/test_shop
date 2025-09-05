import { useEffect, useState, useMemo, useCallback } from "react"
import { addToCart, getItems, decreaseInCart } from "../redux/slices/cartSlice"
import { ProductGrid, Pagination, FilterPanel, Sort, Cart } from "../components"
import { useSearchParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../redux/slices/cartSlice"
import { selectItems, selectItemsCount, selectCartStatus } from "../redux/selectors/cartSliceSelectors"
import type { Product } from "../redux/slices/cartSlice"
import { SortState } from "@/components/Sort/Sort"


export const HomePage = () => {

    const dispatch = useAppDispatch();
    const [offset, setOffset] = useState<number>(0);
    const [page, setPage] = useState<number>(1)
    const [sort, setSort] = useState<SortState>({ key: "price", order: "asc" })

    const [searchParams, setSearchParams] = useSearchParams();

    const [paginatedData, setPaginatedData] = useState<Product[]>([])
 
    const items = useAppSelector(selectItems)
    const total = useAppSelector(selectItemsCount)
    const status = useAppSelector(selectCartStatus)

    const PAGE_SIZE = 20;
    const totalPages = Math.ceil(total / PAGE_SIZE);

      // читаем массив категорий из URL
  const cats: string []= useMemo(() => {
  return searchParams.get("cats")?.split(",") ?? [];
}, [searchParams]);


useEffect(() => {
  dispatch(getItems({category: cats, sort: sort.key, order: sort.order}))
}, [dispatch, cats, sort])
// [offset]

useEffect(() => {
  if (items) {
    setPaginatedData(items.slice(offset, offset + 20))
  }
}, [items, offset])


  const handlePageChange = (num: number) => {
    setPage(num)
    setOffset((num - 1) * PAGE_SIZE)
  }

  const handleCategoryChange = (val: string[]) => {
    let newCats = [...cats];

    if (val.length === 3) {
      newCats = val;
    } else if (val.length === 0) {
      newCats = [];
    } else if (newCats.includes(val[0])) {
      newCats = newCats.filter((c) => c !== val[0]);
    } else {
      newCats.push(val[0]);
    }

    // обновляем URL
    if (newCats.length > 0) {
      setSearchParams({ cats: newCats.join(",") });
    } else {
      setSearchParams({}); // убираем параметр совсем
    }
  };

  
const changeSortKey = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSort(prev => ({ ...prev, key: e.target.value }));
};

const toggleSortOrder = () => {
  setSort(prev => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }));
};

const [open, setOpen] = useState(false);

  const increment = useCallback((item: Product) => {
    dispatch(addToCart(item))
  }, [dispatch]);

  const decrement = useCallback((id: number) => {
    dispatch(decreaseInCart(id))
  }, [dispatch]);


     return (
    <div className="page">
      <div className="layout">
        <FilterPanel value={cats} toggleKey={handleCategoryChange} />
        <div className="content">
           <Sort sort={sort} changeSortKey={changeSortKey} toggleSortOrder={toggleSortOrder} />
           
               <button onClick={() => setOpen(true)}>Открыть корзину</button>
      <Cart
        isOpen={open}
        onClose={() => setOpen(false)}
        onIncrement={increment}
        onDecrement={decrement}
      />
          <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
           {(status === "loading" || status === "idle") && <p>Загрузка...</p>}
           {status === 'succeeded' && <ProductGrid items={paginatedData} />}
           {status === 'failed' && <p>Ошибка при загрузке</p>}
            <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
        </div>
      </div>
    </div>
  );

}



