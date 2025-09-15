"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PixelTransition from "@/components/ui/PixelTransition";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Grid3X3 } from "lucide-react";

const categories = [
  { id: 1, name: "Ophthalmology", icon: "/assets/image/categories/ophthalmology.png" },
  { id: 2, name: "Pediatrics", icon: "/assets/image/categories/pediatrics.png" },
  { id: 3, name: "Neurology", icon: "/assets/image/categories/neurology.png" },
  { id: 4, name: "Dermatology", icon: "/assets/image/categories/dermatology.png" },
  { id: 5, name: "Gastroenterology", icon: "/assets/image/categories/gastroenterology.png" },
  { id: 6, name: "Pulmonology", icon: "/assets/image/categories/pulmonology.png" },
  { id: 7, name: "Hematology", icon: "/assets/image/categories/hematology.png" },
  { id: 8, name: "Cardiology", icon: "/assets/image/categories/cardiology.png" },
];

// --- Animation Variants ---

// Parent container variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Child item variants for fading/sliding in
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

// Variants for the word-by-word title animation
const titleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  const pageTitle = "Explore Our Medical Specialties";

  return (
    // DARK MODE: Changed background color
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      <motion.div
        className="container mx-auto py-16 sm:py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* --- Page Header with Word-by-Word Animation --- */}
        <div className="text-center mb-16">
          <motion.h1
            // DARK MODE: Changed main title text color
            className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight"
            variants={titleVariants}
            aria-label={pageTitle}
          >
            {pageTitle.split(" ").map((word, index) => (
              <span key={index} className="inline-block overflow-hidden pb-2 mr-3">
                <motion.span className="inline-block" variants={wordVariants}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            // DARK MODE: Changed subtitle text color
            className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400"
            variants={itemVariants}
          >
            Find specialized care from our team of expert doctors across a wide range of medical fields.
          </motion.p>
        </div>

        {/* --- Categories Grid with Hover Lift Effect --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Link href={`/search/${encodeURIComponent(cat.name)}`} className="block h-full">
                <PixelTransition
                  className="rounded-xl shadow-lg dark:shadow-gray-800/50 overflow-hidden h-full"
                  gridSize={10}
                  pixelColor="#84cc16" // lime-500
                  animationStepDuration={0.03}
                  firstContent={
                    // DARK MODE: Changed card background
                    <div className="group flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-gray-800 h-full w-full">
                      <Image
                        src={cat.icon}
                        alt={`${cat.name} icon`}
                        width={64}
                        height={64}
                        className="mb-4 transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* DARK MODE: Changed card title text color */}
                      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">{cat.name}</h2>
                    </div>
                  }
                  secondContent={
                    // This part is already dark, so it works well in both modes
                    <div className="flex flex-col items-center justify-center text-center gap-4 bg-gray-900 h-full w-full p-6">
                      <h2 className="font-bold text-xl text-white">{cat.name}</h2>
                      <p className="text-gray-300 text-sm">
                        Find top-rated specialists in {cat.name.toLowerCase()}.
                      </p>
                      <Button size="sm" className="bg-lime-500 hover:bg-lime-600 text-gray-900 rounded-full mt-2">
                        Explore Specialty
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  }
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Animated "View All" Button --- */}
        <motion.div className="text-center mt-16" variants={itemVariants}>
          <Button size="lg" asChild className="rounded-full font-bold">
            <Link href="/search">
              <Grid3X3 className="mr-2 h-5 w-5" />
              View All Specialties
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}