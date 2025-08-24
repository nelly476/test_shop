import { useEffect, useState, useMemo } from "react"
import { getItems, getAllItems } from "../redux/slices/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { ProductGrid, Pagination } from "../components"

export const HomePage = () => {

    const dispatch = useDispatch()
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1)

    const cartItems = useSelector(state => state.cartSlice.items)
    const allCartItems = useSelector(state => state.cartSlice.allItems)
    const status = useSelector(state => state.cartSlice.status)

    const PAGE_SIZE = 20;
    const totalPages = useMemo(() => {
    if (!allCartItems || allCartItems.length === 0) return 1;

    return Math.ceil(allCartItems.length / 20);
  }, [allCartItems]);
    

useEffect(() => {
  dispatch(getItems({offset: offset}))
   dispatch(getAllItems())
}, [offset, dispatch])


  const handlePageChange = (num) => {
    console.log(num)
    setPage(num)
    setOffset((num - 1) * PAGE_SIZE)
  }

     return (
    <div className="page">
      <div className="layout">
        {/* <FilterPanel /> */}
        <div className="content">
          {/* <SortControl />
          <TotalCtx.Provider value={{ totalPages }}> */}
          <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
           {status === 'loading' && <p>Загрузка...</p>}
           {status === 'succeeded' && <ProductGrid items={cartItems} />}
           {status === 'failed' && <p>Ошибка при загрузке</p>}
            <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
          {/* </TotalCtx.Provider> */}
          {/* <div className="muted">Найдено: {total}</div> */}
        </div>
      </div>
    </div>
  );

}



