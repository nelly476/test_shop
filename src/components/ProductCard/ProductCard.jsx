import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import "./ProductCard.scss"

export const ProductCard = ({ p }) => {
  const dispatch = useDispatch()

  return (
    <div className="card">
      <img src={p.image} alt={p.name} />
      <div className="meta">
        <div className="cat">{p.category}</div>
        <div className="name">{p.name}</div>
        <div className="row">
          <div className="price">${p.price}</div>
          <button  onClick={() => dispatch(addToCart(p))}
          >В корзину</button>
        </div>
      </div>
    </div>
  );
}
