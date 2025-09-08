import { Product, useAppSelector } from "../../redux/slices/cartSlice";
import { CartItem } from "../CartItem/CartItem";
import clsx from "clsx";
import styles from "./Cart.module.scss";
import { selectCartList, selectTotalPrice } from "../../redux/selectors/cartSliceSelectors";
import { useCallback } from "react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onIncrement: (item: Product) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const items = useAppSelector(selectCartList);
  const totalQty = items.length;
  const totalPrice = useAppSelector(selectTotalPrice);

  const increment = useCallback((item: Product) => onIncrement(item), [onIncrement])
  const decrement = useCallback((id: number) => onDecrement(id), [onDecrement])
  const remove = useCallback((id: number) => onRemove(id), [onRemove])
  
  return (
    <>
      <div
        className={clsx(styles.cartBackdrop, { [styles.open]: isOpen })}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={clsx(styles.cartSidebar, { [styles.open]: isOpen })}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.cartHeader}>
          <div className={styles.titleWrap}>
            <h2 id="cart-title" className={styles.title}>
              Корзина
            </h2>
            <span className={styles.badge} aria-label={`Товаров в корзине: ${totalQty}`}>
              {totalQty}
            </span>
          </div>

          <button
            className={clsx(styles.iconBtn, styles.closeBtn)}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </header>

        <div className={styles.cartContent}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p>Ваша корзина пуста</p>
            </div>
          ) : (
            <ul className={styles.cartList}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                 item={{
        ...item,
        onIncrement: () => increment(item),
        onDecrement: () => decrement(item.id),
        onRemove: () => remove(item.id),
      }}
                />
              ))}
            </ul>
          )}
        </div>

        <footer className={styles.cartFooter}>
          <div className={styles.summary}>
            <div className={styles.line}>
              <span>Товары</span>
              <strong>{totalQty}</strong>
            </div>
            <div className={styles.line}>
              <span>Итого</span>
              <strong>{totalPrice.toFixed(2)} $</strong>
            </div>
          </div>

          <button className={styles.checkoutBtn} disabled={items.length === 0}>
            Оформить заказ
          </button>
        </footer>
      </aside>
    </>
  );
};
