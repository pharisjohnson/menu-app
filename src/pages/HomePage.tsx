import React, { useMemo, useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Header } from '@/components/savorly/Header';
import { Footer } from '@/components/savorly/Footer';
import { ProductCard } from '@/components/savorly/ProductCard';
import { FilterSidebar } from '@/components/savorly/FilterSidebar';
import { useFilterStore } from '@/hooks/use-filter-store';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from '@/components/ui/sonner';
import { api } from '@/lib/api-client';
import type { Product } from '@shared/types';
import { ProductCardSkeleton } from '@/components/savorly/ProductCardSkeleton';
export function HomePage() {
  const isMobile = useIsMobile();
  const { category, priceRange, tags } = useFilterStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const fetchedProducts = await api<Product[]>('/api/products');
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Optionally, set an error state and display a message to the user
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === 'all' || product.category === category;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const tagsMatch = tags.length === 0 || tags.every((tag) => product.tags.includes(tag));
      return categoryMatch && priceMatch && tagsMatch;
    });
  }, [products, category, priceRange, tags]);
  const HeroSection = () => (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-black/50 text-white">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740"
        alt="Delicious food spread"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="container mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl font-bold md:text-7xl"
        >
          Discover Your Next Favorite Meal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-lg text-white/90"
        >
          From gourmet dishes to comfort food classics, Savorly brings the finest flavors right to your fingertips.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Button
            size="lg"
            className="bg-savor text-savor-foreground hover:bg-savor/90 h-12 px-8 text-lg transition-transform duration-200 hover:-translate-y-1"
            onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <section id="menu-section" className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {isMobile ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden mb-6 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-8">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <div className="hidden lg:block">
                  <FilterSidebar />
                </div>
              )}
              <div className="lg:col-span-3">
                <AnimatePresence>
                  <motion.div
                    layout
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {isLoading ? (
                      Array.from({ length: 6 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                      ))
                    ) : filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                      ))
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                        <h3 className="text-2xl font-semibold">No Dishes Found</h3>
                        <p className="mt-2 text-muted-foreground">
                          Try adjusting your filters to find what you're looking for.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}