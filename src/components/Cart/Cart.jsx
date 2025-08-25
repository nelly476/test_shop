import "./Cart.scss";
import { CartItem } from "./CartItem";
import { useSelector } from "react-redux";

export const Cart = ({
  isOpen,
  onClose,
  onIncrement,
  onDecrement,
}) => {

      const { cart } = useSelector((s) => s.cartSlice);
      const items = Object.values(cart)

  return (
    <>
      <div className={`cart-backdrop ${isOpen ? "open" : ""}`} onClick={onClose} />
      <aside
        className={`cart-sidebar ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="cart-header">
          <h2 id="cart-title">Корзина</h2>
          <button className="icon-btn close" onClick={onClose} aria-label="Закрыть">✕</button>
        </header>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty"><p>Ваша корзина пуста</p></div>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={onIncrement}   // стабильные ссылки из useCallback
                  onDecrement={onDecrement}
                />
              ))}
            </ul>
          )}
        </div>

        <footer className="cart-footer">
          <button
            className="checkout-btn"
            disabled={true}
          >
            Оформить заказ
          </button>
        </footer>
      </aside>
    </>
  );
};
