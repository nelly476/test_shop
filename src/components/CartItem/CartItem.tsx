import React from "react";
import type { CartItemType, Product } from "@/redux/slices/cartSlice";
import styles from "./CartItem.module.scss";
import clsx from "clsx";

interface CartItemProps {
  item: CartItemType;
  onIncrement: (item: Product) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void; 
}

const areEqual = (prev: Readonly<CartItemProps>, next: Readonly<CartItemProps>) => {
  const p = prev.item;
  const n = next.item;
  return (
    p.id === n.id &&
    p.name === n.name &&
    p.image === n.image &&
    p.price === n.price &&
    p.qty === n.qty &&
    p.category === n.category &&
    prev.onIncrement === next.onIncrement &&
    prev.onDecrement === next.onDecrement &&
    prev.onRemove === next.onRemove
  );
};

export const CartItem: React.FC<CartItemProps> = React.memo(function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const { id, name, image, price, qty, category } = item;
  const title = category ? `${name} (${category})` : name;

  const dec = () => onDecrement(id);
  const inc = () => onIncrement(item);
  const rem = () => onRemove(id)

  return (
    <li className={styles.item}>
      <img className={styles.thumb} src={image} alt={title} />

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
              onClick={dec}
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
              onClick={inc}
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
          onClick={rem}
          aria-label={`Удалить ${name} из корзины`}
          title="Удалить"
        >
          ✕
        </button>
      
    </li>
  );
}, areEqual);
