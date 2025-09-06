import { Product, useAppSelector } from "../../redux/slices/cartSlice";
import { CartItem } from "../CartItem/CartItem";
import clsx from "clsx";
import styles from "./Cart.module.scss";
import {
  selectCartList,
  selectTotalPrice
} from "../../redux/selectors/cartSliceSelectors";

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
  onRemove
}) => {
  const items = useAppSelector(selectCartList);
  const totalQty = useAppSelector(selectCartList).length
  const totalPrice = useAppSelector(selectTotalPrice)

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
                  item={item}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
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
