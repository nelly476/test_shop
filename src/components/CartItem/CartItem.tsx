import React from "react";
import {
  addToCart,
  decreaseInCart,
  removeFromCart,
  useAppDispatch,
  type CartItemType,
  type Product,
} from  "../../redux/features/cart";
import styles from "./CartItem.module.scss";
import clsx from "clsx";

export const CartItem: React.FC<CartItemType> = React.memo(function CartItem(item) {
  const dispatch = useAppDispatch();

  const { id, name, image, price, qty, category } = item;

  const increment = (item: Product) => {
    dispatch(addToCart(item));
  };

  const decrement = (id: number) => {
    dispatch(decreaseInCart(id));
  };

  const remove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <li className={styles.item}>
      <img className={styles.thumb} src={image} alt={category ? `${name} (${category})` : name} />

      <div className={styles.info}>
        {category && <div className={styles.cat}>{category}</div>}
        <div className={styles.name} title={name}>
          {name}
        </div>

        <div className={styles.row}>
          <div className={styles.price}>${price.toFixed(2)}</div>

          <div className={styles.qty} aria-label={`Количество для ${name}`}>
            <button
              className={clsx(styles.iconBtn, styles.iconBtnNeutral)}
              onClick={() => decrement(id)}
              disabled={qty <= 1}
              aria-label={`Уменьшить количество у ${name}`}
              title="Уменьшить"
            >
              −
            </button>
            <span className={styles.qtyValue} aria-live="polite">
              {qty}
            </span>
            <button
              className={clsx(styles.iconBtn, styles.iconBtnPrimary)}
              onClick={() => increment(item)}
              aria-label={`Увеличить количество у ${name}`}
              title="Добавить"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        className={clsx(styles.iconBtn, styles.removeBtn)}
        onClick={() => remove(id)}
        aria-label={`Удалить ${name} из корзины`}
        title="Удалить"
      >
        ✕
      </button>
    </li>
  );
});
