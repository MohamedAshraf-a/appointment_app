"use client";

import DoctorDetails from "@/app/(route)/details/_components/DoctorDetails";
import DoctorList from "@/app/_components/DoctorsList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Api from "@/app/_utils/DataCategory"; // API بتجيب الدكاترة
import Doctoruggestions from "../_components/Doctoruggestions";

const Page = () => {
  const params = useParams();
  const [popularDoctors, setPopularDoctors] = useState([]);

useEffect(() => {
  Api.getTopRatedDoctors().then((res) => {
    setPopularDoctors(res.data || []);
  });
}, []);


  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      
      {/* تفاصيل الدكتور (الشمال في الشاشات الكبيرة، فوق في الموبايل) */}
      <div className="flex-1">
        <DoctorDetails id={params?.id} />
      </div>

      {/* الأطباء الشائعين (يمين في الشاشات الكبيرة، تحت في الموبايل) */}
   <Doctoruggestions/>
    </div>
  );
};

export default Page;
