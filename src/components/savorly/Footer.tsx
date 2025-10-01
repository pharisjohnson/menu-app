import React from 'react';
import { UtensilsCrossed, Twitter, Instagram, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <a href="/" className="flex items-center gap-2">
              <UtensilsCrossed className="h-8 w-8 text-savor" />
              <span className="font-display text-2xl font-bold">Savorly</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ at Cloudflare
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Savorly Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}