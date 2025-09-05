import "./ProductCard.scss"
import { useAppDispatch, addToCart } from "../../redux/slices/cartSlice";
import type { Product } from "../../redux/slices/cartSlice";

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div className="meta">
        <div className="cat">{product.category}</div>
        <div className="name">{product.name}</div>
        <div className="row">
          <div className="price">${product.price}</div>
          <button  onClick={() => dispatch(addToCart(product))}
          >В корзину</button>
        </div>
      </div>
    </div>
  );
}
