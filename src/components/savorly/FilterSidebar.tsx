import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CATEGORIES } from '@shared/mock-data';
import type { DietaryTag } from '@shared/types';
import { useFilterStore } from '@/hooks/use-filter-store';
const DIETARY_TAGS: DietaryTag[] = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Spicy'];
export function FilterSidebar() {
  const {
    category,
    priceRange,
    tags,
    setCategory,
    setPriceRange,
    toggleTag,
    clearFilters,
  } = useFilterStore();
  const handleCategoryChange = (slug: string) => {
    setCategory(category === slug ? 'all' : slug);
  };
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center">
              <Checkbox
                id={cat.slug}
                checked={category === cat.slug}
                onCheckedChange={() => handleCategoryChange(cat.slug)}
                className="data-[state=checked]:bg-savor data-[state=checked]:border-savor"
              />
              <Label htmlFor={cat.slug} className="ml-3 text-sm font-medium cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          max={50}
          step={1}
          onValueCommit={(value) => setPriceRange(value as [number, number])}
          className="[&>span:first-child>span]:bg-savor"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Dietary</h3>
        <div className="space-y-3">
          {DIETARY_TAGS.map((tag) => (
            <div key={tag} className="flex items-center">
              <Checkbox
                id={tag}
                checked={tags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
                className="data-[state=checked]:bg-savor data-[state=checked]:border-savor"
              />
              <Label htmlFor={tag} className="ml-3 text-sm font-medium cursor-pointer">
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </aside>
  );
}