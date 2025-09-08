import { Product } from "../../redux/slices/cartSlice"
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps {
  items: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};
