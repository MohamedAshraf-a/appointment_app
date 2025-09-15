// A good location for this file is app/search/layout.jsx

import React from 'react';
import CategoryList from './_components/CategoryList';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { AlignJustify } from 'lucide-react';

const layout = ({ children }) => {
  return (
    <div className='container mx-auto p-4 sm:p-6 md:p-8'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>

        {/* --- Desktop Sidebar (Sticky) --- */}
        {/* This is hidden on mobile and becomes a sticky sidebar on medium screens and up */}
        <div className='hidden md:block col-span-1'>
          <div className="sticky top-20 h-fit">
            <CategoryList />
          </div>
        </div>

        {/* --- Main Content Area --- */}
        <div className='col-span-1 md:col-span-3'>
          
          {/* --- Mobile Filter Drawer --- */}
          {/* This button is only visible on mobile to trigger the category list drawer */}
          <div className="md:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <AlignJustify className="h-5 w-5" />
                  Browse Categories
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[300px]">
                {/* We reuse the same CategoryList component inside the drawer */}
                <CategoryList />
              </SheetContent>
            </Sheet>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;