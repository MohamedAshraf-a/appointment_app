// app/search/[cname]/page.jsx

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, SearchX, AlertTriangle } from "lucide-react";
import Api from "@/app/_utils/DataCategory";
import DoctorList from "@/app/_components/DoctorsList";

const Page = () => {
  const params = useParams();
  const [doctorList, setDoctorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (params?.cname) {
      const decodedCname = decodeURIComponent(params.cname);
      setCategoryName(decodedCname);

      const fetchDoctors = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await Api.getDoctorsByCategory(decodedCname);
          setDoctorList(response.data || []);
        } catch (err) {
          console.error("Failed to fetch doctors:", err);
          setError("An error occurred while fetching doctors. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchDoctors();
    }
  }, [params?.cname]);

  const renderContent = () => {
    if (isLoading) {
      // Pass isLoading=true to DoctorList to show skeletons
      return <DoctorList isLoading={true} />;
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center text-center h-64">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-red-700">Something Went Wrong</h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      );
    }

    if (doctorList.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center text-center h-64">
          <SearchX className="h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">No Doctors Found</h2>
          <p className="text-gray-600 mt-2">There are currently no doctors available in the "{categoryName}" category.</p>
        </div>
      );
    }
    
    // Pass the actual list and isLoading=false
    return <DoctorList doctorList={doctorList} isLoading={false} />;
  };

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- Breadcrumb Navigation --- */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-lime-600">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/explore" className="hover:text-lime-600">Explore</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-semibold text-gray-700">{categoryName}</span>
      </div>

      {/* --- Page Header --- */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-8">
        Doctors in <span className="text-lime-600">{categoryName}</span>
      </h1>

      {/* --- Main Content --- */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default Page;