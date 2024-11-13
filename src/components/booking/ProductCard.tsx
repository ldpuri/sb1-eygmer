import { cn } from '@/lib/utils';
import { Product } from '@/types/booking';
import * as Icons from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from '../ui/card';

interface ProductCardProps {
  product: Product;
  selected?: boolean;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, selected, onClick }: ProductCardProps) {
  const IconComponent = Icons[product.icon as keyof typeof Icons];

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:scale-[1.02]',
        'border-2',
        selected
          ? 'border-primary bg-primary/5'
          : 'hover:border-primary/50'
      )}
      onClick={() => onClick(product)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="h-6 w-6" />}
          <h3 className="font-semibold">{product.name}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
    </Card>
  );
}