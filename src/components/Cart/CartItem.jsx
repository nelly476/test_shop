import React, { useMemo } from "react";

// Кастомное сравнение: перерисовывать только если реально поменялись значимые поля
const areEqual = (prev, next) => {
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


export const CartItem = React.memo(function CartItem({ item, onIncrement, onDecrement,
}) {
    const {id, name, image, price, qty, category} = item
   
  // Лог для демонстрации перерисовок
  console.log("render:", id, name, "qty:", qty);

  // Для accessibility: уникальный label
  const title = useMemo(() => `${name} (${category ?? "item"})`, [name, category]);

  return (
    <li className="cart-item">
      <img src={image} alt={title} />
      <div className="info">
        {category && <div className="cat">{category}</div>}
        <div className="name" title={name}>{name}</div>
        <div className="row">
          <div className="price">${price.toFixed(2)}</div>
          <div className="qty">
            <button
              className="icon-btn"
              onClick={() => onDecrement(id)}
              aria-label={`Уменьшить количество у ${name}`}
            //   disabled={qty <= 1}
            >
              −
            </button>
            <span aria-live="polite">{qty}</span>
            <button
              className="icon-btn"
              onClick={() => onIncrement(item)}
              aria-label={`Увеличить количество у ${name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}, areEqual);
