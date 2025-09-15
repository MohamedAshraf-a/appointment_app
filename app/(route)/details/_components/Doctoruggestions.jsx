"use client";
import React, { useState, useEffect } from "react";
import Api from "@/app/_utils/DataCategory";
import Link from "next/link";
import Image from "next/image";

function Doctoruggestions() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorsList();
  }, []);

  const getDoctorsList = () => {
    Api.getDoctors().then((resp) => {
      setDoctorList(resp.data || []);
    });
  };

  return (
    <div className="p-3">
      <h1 className="text-xl font-bold text-lime-600 mb-4">Suggestions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctorList.slice(0, 5).map((doctor) => (
          <Link key={doctor.id} href={`/details/${doctor.id}`}>
            <div className="border rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />

              <div className="flex flex-col">
                <span className="text-lime-600 bg-lime-100 rounded-full px-2 py-1 text-xs font-semibold w-fit">
                  {doctor.category}
                </span>
                <span className="mt-2 font-medium">{doctor.name}</span>
                <span className="text-sm text-gray-600">
                  {doctor.yearOfExperience} years Experience
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Doctoruggestions;
