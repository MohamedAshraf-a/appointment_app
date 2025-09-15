"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function CancelAppointment({ id, cancelBooking }) {
  return (
    <Button
      variant="destructive"
      onClick={() => cancelBooking(id)}
      className="rounded-full"
    >
      Cancel
    </Button>
  );
}

export default CancelAppointment;
