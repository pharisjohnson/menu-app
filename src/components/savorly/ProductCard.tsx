import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import type { Product } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/hooks/use-cart-store';
import { cn } from '@/lib/utils';
interface ProductCardProps {
  product: Product;
  index: number;
}
export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="group h-full w-full overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:border-savor hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="overflow-hidden aspect-w-4 aspect-h-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-2">
          <CardTitle className="text-xl font-bold tracking-tight">{product.name}</CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6 pt-0">
          <p className="text-lg font-semibold text-savor">{formatPrice(product.price)}</p>
          <Button
            size="sm"
            className="bg-savor text-savor-foreground hover:bg-savor/90 transition-transform duration-200 hover:-translate-y-1"
            onClick={() => addItem(product)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}