// A good location for this could be app/explore/_components/CategoryList.jsx

"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Api from '../../../_utils/DataCategory'; // Assuming this path is correct
import { AlertTriangle } from 'lucide-react';

// A theme-aware skeleton loader
const CategorySkeleton = () => (
  <div className="flex items-center gap-4 p-3 animate-pulse">
    <div className="w-9 h-9 bg-muted rounded-md"></div>
    <div className="h-5 bg-muted rounded-md w-3/4"></div>
  </div>
);

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getCategoryList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await Api.getCategory();
        setCategoryList(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Could not load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getCategoryList();
  }, []);

  return (
    <motion.div
      className="p-4 sm:p-0" // Adjusted padding for better integration
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* This component is often used as a sidebar, so the title might be on the parent page.
          If this is a standalone page, the title is perfect here. */}
      <div className="text-center mb-8 md:text-left">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Find Care by Category
        </h1>
        <p className="mt-2 text-muted-foreground">
          Search for a medical specialty.
        </p>
      </div>

      <Command className="h-auto md:h-[70vh] w-full rounded-xl border shadow-lg bg-card">
        <CommandInput placeholder="Search for a specialty..." />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Categories">
            {isLoading ? (
              // Show skeleton loaders while fetching data
              [...Array(5)].map((_, i) => <CategorySkeleton key={i} />)
            ) : error ? (
              // Show a theme-aware error message
              <div className="p-4 text-center text-sm text-destructive flex flex-col items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            ) : (
              // Map over the categories and render CommandItem
              categoryList?.map((cat) => (
                <CommandItem
                  key={cat.id}
                  onSelect={() => router.push(`/search/${cat.name}`)}
                  className="flex items-center gap-4 p-3 cursor-pointer"
                >
                  <Image
                    src={cat.icon} // Assuming the field is iconURL
                    width={40}
                    height={40}
                    alt={cat.name}
                    className="rounded-md object-contain bg-accent p-1 border"
                  />
                  <span className="text-base font-medium text-card-foreground">{cat.name}</span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </motion.div>
  );
}

export default CategoryList;