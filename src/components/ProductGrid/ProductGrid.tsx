import { Product } from "@/redux/slices/cartSlice";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductGrid.scss"

interface ProductGridProps {
  items: Product[]
}

export const ProductGrid: React.FC<ProductGridProps> = ({ items }) => {
  return (
    <div className="grid">
      {items.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}