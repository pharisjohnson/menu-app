import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/savorly/Header';
import { Footer } from '@/components/savorly/Footer';
import { CheckoutForm } from '@/components/savorly/CheckoutForm';
import { OrderSummary } from '@/components/savorly/OrderSummary';
import { useCartStore } from '@/hooks/use-cart-store';
import { Toaster } from '@/components/ui/sonner';
export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();
  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);
  if (items.length === 0) {
    return null; // or a loading spinner
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center font-display text-4xl font-bold md:text-5xl mb-12">
            Checkout
          </h1>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
            <div className="lg:col-span-1">
              <CheckoutForm />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}