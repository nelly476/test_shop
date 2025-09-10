import { selectCartProductQty } from  "../../redux/features/cart";
import {
  useAppDispatch,
  useAppSelector,
  addToCart,
  decreaseInCart,
  type Product
} from  "../../redux/features/cart";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const qty = useAppSelector(selectCartProductQty(product.id));

  return (
    <div className={styles.card}>
      <div className={styles.thumbWrap}>
        <img className={styles.thumb} src={product.image} alt={product.name} />
        {qty > 0 && <span className={styles.badge}>{qty}</span>}
      </div>

      <div className={styles.meta}>
        {product.category && <div className={styles.category}>{product.category}</div>}
        <div className={styles.name} title={product.name}>
          {product.name}
        </div>

        <div className={styles.row}>
          <div className={styles.price}>${product.price.toFixed(2)}</div>

          <div className={styles.qtyControl} aria-label="Количество">
            <button
              className={styles.qtyBtn}
              onClick={() => dispatch(decreaseInCart(product.id))}
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
              onClick={() => dispatch(addToCart(product))}
              aria-label="Добавить"
              title="Добавить"
            >
              +
            </button>
          </div>
        </div>

        {qty === 0 && (
          <button className={styles.primaryBtn} onClick={() => dispatch(addToCart(product))}>
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};
