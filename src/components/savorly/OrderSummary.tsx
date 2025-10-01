import React from 'react';
import { useCartStore } from '@/hooks/use-cart-store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
export function OrderSummary() {
  const { items } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 5.00 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingFee + tax;
  return (
    <Card className="border-2 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <div className="space-y-2 text-muted-foreground">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatPrice(shippingFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between text-xl font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}