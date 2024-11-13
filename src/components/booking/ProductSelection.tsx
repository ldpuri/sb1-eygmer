import { Product } from '@/types/booking';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

interface ProductSelectionProps {
  products: Product[];
  selectedProduct?: Product;
  onProductSelect: (product: Product) => void;
  onNext: () => void;
}

export function ProductSelection({
  products,
  selectedProduct,
  onProductSelect,
  onNext,
}: ProductSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            selected={selectedProduct?.id === product.id}
            onClick={onProductSelect}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          size="lg"
          disabled={!selectedProduct}
          onClick={onNext}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}