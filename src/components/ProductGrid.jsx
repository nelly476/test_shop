import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ items }) => {
  return (
    <div className="grid">
      {items.map(p => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}