import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductGrid.scss"

export const ProductGrid = ({ items }) => {
  return (
    <div className="grid">
      {items.map(p => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}