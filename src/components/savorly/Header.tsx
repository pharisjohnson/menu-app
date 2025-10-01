import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, ShoppingCart, User as UserIcon, LogOut, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCartStore } from '@/hooks/use-cart-store';
import { useAuthStore } from '@/hooks/use-auth-store';
import { CartSheet } from './CartSheet';
import { AuthDialog } from './AuthDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-8 w-8 text-savor" />
            <span className="font-display text-2xl font-bold">Savorly</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle className="relative top-0 right-0" />
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-savor text-xs font-bold text-savor-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.id}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    <History className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthDialog />
            )}
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}