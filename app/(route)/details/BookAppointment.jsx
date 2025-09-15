// app/(route)/details/_components/BookAppointment.jsx

"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Toaster, toast } from "sonner";

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    // This is placeholder logic for available times
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 5; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }
    setTimeSlot(timeList);
  };

  const saveBookingToLocalStorage = () => {
    if (!date || !selectedTime) {
      toast.error("Please select a date and time!");
      return;
    }

    const newAppointment = {
      // Generate a unique ID for each appointment for easy deletion
      id: crypto.randomUUID(), 
      doctorName: doctor?.name,
      doctorImage: doctor?.image,
      category: doctor?.category,
      date: date.toDateString(),
      time: selectedTime,
    };

    // Get existing appointments from localStorage, or start with an empty array
    const existingAppointments = JSON.parse(localStorage.getItem("Appointments")) || [];
    
    // Add the new appointment to the list
    existingAppointments.push(newAppointment);
    
    // Save the entire updated list back to localStorage
    localStorage.setItem("Appointments", JSON.stringify(existingAppointments));
    
    toast.success("Appointment booked successfully!");
  };

  const pastDay = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-3 rounded-full w-full">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Calendar */}
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-lg mb-2">Select Date</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={pastDay}
              />
            </div>
            {/* Time Slots */}
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-lg mb-2">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-2 border p-3 rounded-lg max-h-[300px] overflow-y-auto">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    variant={selectedTime === item.time ? "default" : "outline"}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <Button
            onClick={saveBookingToLocalStorage}
            disabled={!date || !selectedTime}
            className="w-full mt-4"
          >
            Confirm Booking
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookAppointment;