import {
  useAppDispatch,
  useAppSelector,
  addToCart,
  decreaseInCart,
} from "../../redux/slices/cartSlice";
import type { Product } from "../../redux/slices/cartSlice";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  // если в rootReducer ключ слайса другой, поменяй s.cartSlice → s.cart
  const qty = useAppSelector((s) => s.cartSlice.cart[product.id]?.qty ?? 0);

  const inc = () => dispatch(addToCart(product));
  const dec = () => dispatch(decreaseInCart(product.id));

  return (
    <div className={styles.card}>
      <div className={styles.thumbWrap}>
        <img className={styles.thumb} src={product.image} alt={product.name} />
        {qty > 0 && <span className={styles.badge}>{qty}</span>}
      </div>

      <div className={styles.meta}>
        {product.category && <div className={styles.cat}>{product.category}</div>}
        <div className={styles.name} title={product.name}>
          {product.name}
        </div>

        <div className={styles.row}>
          <div className={styles.price}>${product.price.toFixed(2)}</div>

          <div className={styles.qtyControl} aria-label="Количество">
            <button
              className={styles.qtyBtn}
              onClick={dec}
              disabled={qty === 0}
              aria-label="Убавить"
              title="Убавить"
            >
              −
            </button>
            <span className={styles.qtyValue} aria-live="polite">
              {qty}
            </span>
            <button
              className={styles.qtyBtnPrimary}
              onClick={inc}
              aria-label="Добавить"
              title="Добавить"
            >
              +
            </button>
          </div>
        </div>

        {qty === 0 && (
          <button className={styles.primaryBtn} onClick={inc}>
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};
