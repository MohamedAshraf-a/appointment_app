// app/my-booking/_components/MyBookingList.jsx

"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X } from "lucide-react";
import { motion } from "framer-motion";

const BookingSkeleton = () => (
  <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg shadow-sm animate-pulse">
    <div className="w-full sm:w-36 h-36 bg-gray-200 rounded-lg"></div>
    <div className="flex-1 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

function MyBookingList({ bookings = [], isLoading, onCancelClick }) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => <BookingSkeleton key={index} />)}
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
    >
      {bookings.map((booking) => (
        <motion.div
          key={booking.id}
          className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg shadow-sm bg-white"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          layout
        >
          <Image
            src={booking.doctorImage || "/assets/image/default-avatar.webp"}
            alt={`Dr. ${booking.doctorName}`}
            width={150}
            height={150}
            className="w-full sm:w-36 h-36 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{booking.doctorName}</h2>
            <p className="text-md text-lime-700 font-medium">{booking.category}</p>
            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <Calendar className="h-5 w-5 text-lime-600" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <Clock className="h-5 w-5 text-lime-600" />
              <span>{booking.time}</span>
            </div>
          </div>
          <div className="self-start sm:self-center">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => onCancelClick(booking.id)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default MyBookingList;