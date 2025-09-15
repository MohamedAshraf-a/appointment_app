// app/my-booking/page.jsx

"use client";
import React, { useEffect, useState } from "react";
import MyBookingList from "./_components/MyBookingList";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function MyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    // Simulate loading for a better UX, even with fast localStorage
    setTimeout(() => {
      const storedBookings = JSON.parse(localStorage.getItem("Appointments")) || [];
      setBookings(storedBookings);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCancelClick = (bookingId) => {
    setBookingToCancel(bookingId);
    setIsAlertOpen(true);
  };

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return;
    
    // Filter out the canceled appointment
    const updatedBookings = bookings.filter(app => app.id !== bookingToCancel);
    
    // Update the state to re-render the UI
    setBookings(updatedBookings);
    
    // Save the new, smaller list back to localStorage
    localStorage.setItem("Appointments", JSON.stringify(updatedBookings));
    
    toast.success("Appointment has been canceled successfully.");
    setIsAlertOpen(false);
    setBookingToCancel(null);
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <motion.div
        className="p-4 sm:p-6 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-8">My Bookings</h1>
        
        <MyBookingList
          bookings={bookings}
          isLoading={isLoading}
          onCancelClick={handleCancelClick}
        />
        
        {!isLoading && bookings.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed rounded-lg mt-8">
                <h2 className="text-2xl font-semibold text-gray-700">No Appointments Found</h2>
                <p className="text-gray-500 mt-2">You haven't booked any appointments yet.</p>
                <Button asChild className="mt-6 rounded-full">
                    <Link href="/explore">Explore Doctors</Link>
                </Button>
            </div>
        )}
      </motion.div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cancel your appointment from this browser.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBookingToCancel(null)}>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelBooking} className="bg-destructive hover:bg-destructive/90">
              Yes, Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MyBookingPage;