import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/savorly/Header';
import { Footer } from '@/components/savorly/Footer';
import { useAuthStore } from '@/hooks/use-auth-store';
import { api } from '@/lib/api-client';
import type { Order } from '@shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/sonner';
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
export function AccountPage() {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      const fetchOrders = async () => {
        try {
          setIsLoading(true);
          const userOrders = await api<Order[]>('/api/orders', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrders();
    }
  }, [token, navigate]);
  if (!user) {
    return null; // Or a loading spinner while redirecting
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-12 text-center font-display text-4xl font-bold md:text-5xl">
            My Account
          </h1>
          <Card className="border-2 shadow-lg rounded-2xl p-6 md:p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Welcome, {user.name}!</CardTitle>
              <p className="text-muted-foreground">Here is your order history.</p>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : orders.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {orders.map((order) => (
                    <AccordionItem value={order.id} key={order.id}>
                      <AccordionTrigger className="text-lg">
                        <div className="flex justify-between w-full pr-4">
                          <span>Order #{order.id.substring(0, 8)}</span>
                          <span className="text-muted-foreground">{formatDate(order.createdAt)}</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-4 bg-muted/50 rounded-md">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="py-16 text-center">
                  <h3 className="text-xl font-semibold">No orders yet!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Looks like you haven't placed any orders. Let's change that!
                  </p>
                  <Button asChild className="mt-6 bg-savor text-savor-foreground hover:bg-savor/90">
                    <Link to="/">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}