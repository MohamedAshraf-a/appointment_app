// app/page.js

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion"; // Import for animations

import Api from "./_utils/DataCategory";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorsList";
import Hero from "./_components/Hero";
// For a better user experience, consider creating and using a Skeleton Loader component.

export default function Home() {
  // State for managing doctor lists, loading status, and errors
  const [doctorList, setDoctorList] = useState([]);
  const [originalDoctorList, setOriginalDoctorList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the initial list of all doctors when the component first loads.
   */
  useEffect(() => {
    const fetchInitialDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await Api.getDoctors();
        setDoctorList(response.data);
        setOriginalDoctorList(response.data); // Keep a copy of the full list
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Could not fetch the list of doctors. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialDoctors();
  }, []); // The empty dependency array ensures this runs only once on mount.

  /**
   * Handles filtering the doctor list when a category is selected.
   * Wrapped in useCallback for performance optimization.
   */
  const handleCategorySelect = useCallback(
    async (categoryName) => {
      setSelectedCategory(categoryName);
      setIsLoading(true);
      setError(null);
      try {
        if (categoryName) {
          // Fetch a new list filtered by the selected category
          const response = await Api.getDoctorsByCategory(categoryName);
          setDoctorList(response.data);
        } else {
          // If "All" or null is selected, revert to the original full list without an API call
          setDoctorList(originalDoctorList);
        }
      } catch (err) {
        console.error(`Failed to fetch doctors for category ${categoryName}:`, err);
        setError("An error occurred while filtering doctors. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [originalDoctorList] // Dependency: this function will update if originalDoctorList changes
  );

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Hero />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CategorySearch
          onCategorySelect={handleCategorySelect}
          activeCategory={selectedCategory}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="px-4 md:px-10 mt-12">
        <h2 className="font-bold text-2xl text-gray-800">
          {selectedCategory ? `Doctors - ${selectedCategory}` : "Popular Doctors"}
        </h2>
        
        {/* Conditional Rendering for Loading, Error, and Content states */}
        {isLoading ? (
          // In a real app, replace this with a Skeleton Loader component
          <p className="mt-4 text-gray-500">Loading doctors...</p>
        ) : error ? (
          <p className="mt-4 text-red-600 font-semibold">{error}</p>
        ) : (
          <DoctorList doctorList={doctorList} />
        )}
      </motion.div>
    </motion.div>
  );
}