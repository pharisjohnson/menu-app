import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/hooks/use-cart-store';
import { useAuthStore } from '@/hooks/use-auth-store';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  zip: z.string().regex(/^\d{5}$/, { message: 'Please enter a valid 5-digit ZIP code.' }),
  card: z.string().regex(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/, { message: 'Please enter a valid credit card number.' }),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, { message: 'Please enter a valid expiry date (MM/YY).' }),
  cvc: z.string().regex(/^[0-9]{3,4}$/, { message: 'Please enter a valid CVC.' }),
});
export function CheckoutForm() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 5.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingFee + tax;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.id || '',
      address: '',
      city: '',
      zip: '',
      card: '',
      expiry: '',
      cvc: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted:', values);
    const orderDetails = {
      items,
      total,
      ...values, // Include form values for a complete order object if needed, though API only uses items and total
    };
    if (token) {
      try {
        await api('/api/orders', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ items, total }),
        });
        toast.success('Order placed and saved to your account!');
      } catch (error) {
        toast.error('Failed to save order. Please try again.');
        return; // Stop execution if saving fails
      }
    } else {
      toast.success('Order placed successfully!');
    }
    clearCart();
    navigate('/order-success', { state: { order: orderDetails } });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} readOnly={!!user} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Shipping Address</h2>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Anytown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <FormField
            control={form.control}
            name="card"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="•••• •••• •••• ••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full bg-savor text-savor-foreground hover:bg-savor/90 h-12 text-lg">
          Place Order
        </Button>
      </form>
    </Form>
  );
}