import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Header } from '@/components/savorly/Header';
import { Footer } from '@/components/savorly/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@shared/types';
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
interface OrderDetails {
  items: CartItem[];
  total: number;
}
export function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as OrderDetails | undefined;
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);
  if (!order) {
    return null; // or a loading spinner while redirecting
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-2 shadow-lg rounded-2xl p-8">
            <CardHeader className="items-center space-y-4">
              <CheckCircle className="h-20 w-20 text-green-500" />
              <CardTitle className="font-display text-4xl font-bold">
                Thank You For Your Order!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Your order has been placed successfully. A confirmation has been sent to your email.
              </p>
              <Separator />
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
              <Button asChild size="lg" className="mt-6 bg-savor text-savor-foreground hover:bg-savor/90">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}