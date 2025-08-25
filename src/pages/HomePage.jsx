import { useEffect, useState, useMemo, useCallback } from "react"
import { addToCart, getItems, decreaseInCart } from "../redux/slices/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { ProductGrid, Pagination, FilterPanel, Sort, Cart } from "../components"
import { useSearchParams } from "react-router-dom"

export const HomePage = () => {

    const dispatch = useDispatch()
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState({ key: "price", order: "asc" })

    const [searchParams, setSearchParams] = useSearchParams();

    const [paginatedData, setPaginatedData] = useState([])

      const { items, total, status } = useSelector((s) => s.cartSlice);


    const PAGE_SIZE = 20;
    const totalPages = total / 20

      // читаем массив категорий из URL
  const cats = useMemo(() => {
  return searchParams.get("cats")?.split(",") ?? [];
}, [searchParams]);


useEffect(() => {
  dispatch(getItems({category: cats, sort: sort.key, order: sort.order}))
}, [dispatch, cats, offset, sort])

useEffect(() => {
  if (items) {
    setPaginatedData(items.slice(offset, offset + 20))
  }
}, [items, offset])


  const handlePageChange = (num) => {
    setPage(num)
    setOffset((num - 1) * PAGE_SIZE)
  }

  const handleCategoryChange = (val, allOptions = []) => {
    let newCats = [...cats];

    if (val === "ALL") {
      newCats = allOptions.map((o) => o.key);
    } else if (val === "CLEAR") {
      newCats = [];
    } else if (newCats.includes(val)) {
      newCats = newCats.filter((c) => c !== val);
    } else {
      newCats.push(val);
    }

    // обновляем URL
    if (newCats.length > 0) {
      setSearchParams({ cats: newCats.join(",") });
    } else {
      setSearchParams({}); // убираем параметр совсем
    }
  };

const changeSortKey = (e) => {
  setSort(prev => ({ ...prev, key: e.target.value }));
};

const toggleSortOrder = () => {
  setSort(prev => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }));
};

const [open, setOpen] = useState(false);
const [cartItems, setCartItems] = useState([]);

  const increment = useCallback((item) => {
    dispatch(addToCart(item))
  }, [dispatch]);

  const decrement = useCallback((id) => {
    dispatch(decreaseInCart(id))
  }, []);

  // const remove = useCallback((id) => {
  //   setCartItems(prev => prev.filter(it => it.id !== id));
  // }, []);

  // const subtotal = useMemo(
  //   () => cartItems.reduce((s, it) => s + it.price * it.qty, 0),
  //   [cartItems]
  // );


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
        onCheckout={() => console.log("checkout")}
      />
          <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
           {status === 'loading' || status === "idle" && <p>Загрузка...</p>}
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



