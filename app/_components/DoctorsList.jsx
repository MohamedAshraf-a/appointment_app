// app/_components/DoctorsList.jsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- Sub-Component for Loading Skeleton ---
const DoctorCardSkeleton = () => (
  <div className="bg-card border rounded-2xl p-5 space-y-4 animate-pulse">
    <div className="w-28 h-28 rounded-full bg-muted mx-auto"></div>
    <div className="h-6 bg-muted rounded-md w-3/4 mx-auto mt-4"></div>
    <div className="h-5 bg-muted rounded-full w-1/3 mx-auto"></div>
    <div className="h-5 bg-muted rounded-md w-full mt-4"></div>
    <div className="h-5 bg-muted rounded-md w-5/6"></div>
    <div className="h-10 bg-muted rounded-lg w-full mt-6"></div>
  </div>
);

// --- Sub-Component for Star Rating (Theme-Aware) ---
const StarRating = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-1 justify-center">
      
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/30" />
      ))}
      <span className="ml-2 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

// --- Sub-Component for Doctor Card (Theme-Aware) ---
const DoctorCard = ({ doctor }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/details/${doctor.id}`} className="block h-full">
        <div className="group flex flex-col h-full text-center items-center p-5 bg-card rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
          <Image
            src={doctor.image || "/assets/image/default-avatar.webp"}
            alt={`Photo of Dr. ${doctor.name}`}
            width={120}
            height={120}
            className="rounded-full border-4 border-primary/10 group-hover:border-primary/40 transition-colors object-cover"
          />
          <h3 className="text-xl font-bold text-card-foreground mt-4">{doctor.name}</h3>
          
          <Badge variant="secondary" className="mt-2">{doctor.category}</Badge>

          <div className="my-4">
            <StarRating rating={doctor.rating || 0} />
          </div>

          <div className="space-y-2 text-left text-muted-foreground text-sm w-full mt-auto">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{doctor.yearOfExperience} years of experience</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="truncate">{doctor.address}</span>
            </div>
          </div>
          
          <span className="mt-6 w-full inline-block bg-accent text-accent-foreground font-semibold py-2 px-4 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            Book Now
          </span>
        </div>
      </Link>
    </motion.div>
  );
};


// --- Main DoctorList Component ---
function DoctorList({ doctorList = [], isLoading = false, heading = "Our Doctors" }) {
  const [showAll, setShowAll] = useState(false);

  const displayedDoctors = showAll ? doctorList : doctorList.slice(0, 3);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {isLoading ? (
            // Render Skeletons when loading
            [...Array(3)].map((_, index) => <DoctorCardSkeleton key={index} />)
          ) : doctorList.length > 0 ? (
            // Render actual doctor cards
            displayedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            // Render Empty State if not loading and no doctors
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-10"
            >
              <h3 className="text-xl font-semibold text-foreground">No Doctors Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or category filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {doctorList.length > 3 && !isLoading && (
        <div className="text-center mt-10">
          <Button onClick={() => setShowAll(!showAll)} size="lg" className="rounded-full">
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default DoctorList;