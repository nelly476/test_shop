import React from "react";
import type { CartItemType, Product } from "../../redux/slices/cartSlice"
import styles from "./CartItem.module.scss";
import clsx from "clsx";


type CartItemWithHandlers = CartItemType & {
  onIncrement: (item: Product) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
};

interface CartItemProps {
  item: CartItemWithHandlers;
}


export const CartItem: React.FC<CartItemProps> = React.memo(function CartItem({item}) {

  const { id, name, image, price, qty, category, onIncrement,
  onDecrement,
  onRemove } = item;

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
              onClick={() => onDecrement(id)}
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
              onClick={() => onIncrement(item)}
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
        onClick={() => onRemove(id)}
        aria-label={`Удалить ${name} из корзины`}
        title="Удалить"
      >
        ✕
      </button>
    </li>
  );
});
