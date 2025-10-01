import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { useCartStore } from '@/hooks/use-cart-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>My Cart ({items.length})</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-6 py-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="px-6 py-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Button
                  className="w-full bg-savor text-savor-foreground hover:bg-savor/90"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some delicious food to get started!</p>
            <SheetClose asChild>
              <Button>Continue Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}