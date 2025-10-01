import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export function ProductCardSkeleton() {
  return (
    <Card className="group h-full w-full overflow-hidden rounded-2xl">
      <CardHeader className="p-0">
        <Skeleton className="aspect-w-4 aspect-h-3 w-full h-[180px]" />
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <Skeleton className="h-7 w-1/4" />
        <Skeleton className="h-9 w-1/3" />
      </CardFooter>
    </Card>
  );
}