"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Api from "../../../_utils/DataCategory";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  CreditCard,
  Stethoscope,
  Hospital,
} from "lucide-react";
import BookAppointment from "../BookAppointment";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (id) {
      Api.getDoctors().then((res) => {
        const foundDoctor = res.data.find(
          (doc) => doc.id.toString() === id.toString()
        );
        setDoctor(foundDoctor);
      });
    }
  }, [id]);

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lime-600 text-lg font-semibold animate-pulse">
          Loading doctor details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200"
      >
        {/* صورة واسم الدكتور */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.img
            src={doctor.image || "/placeholder.png"}
            alt={doctor.name}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-44 h-44 rounded-full border-4 border-lime-200 object-cover shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-lime-700">{doctor.name}</h1>
            <p className="text-lime-600 font-medium text-lg">
              {doctor.category}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <Hospital size={16} /> {doctor.hospital}
            </p>

            {/* تقييم */}
            <div className="flex items-center justify-center md:justify-start mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.round(doctor.rating)
                      ? "text-yellow-500 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-gray-500 text-sm">
                {doctor.rating} / 5
              </span>
            </div>
          </div>
        </div>

        {/* عن الدكتور */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h2 className="text-xl font-bold text-lime-700 mb-2">About</h2>
          <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
        </motion.div>

        {/* تفاصيل إضافية */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700"
        >
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-lime-600" /> {doctor.address}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="text-lime-600" /> {doctor.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} className="text-lime-600" /> {doctor.email}
          </p>
          <p className="flex items-center gap-2">
            <CreditCard size={16} className="text-lime-600" />{" "}
            {doctor.consultationFee} EGP
          </p>
          <p className="flex items-center gap-2">
            <GraduationCap size={16} className="text-lime-600" />{" "}
            {doctor.yearOfExperience} Years
          </p>
        </motion.div>

        {/* التخصصات */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h2 className="text-xl font-bold text-lime-700 mb-3 flex items-center gap-2">
            <Stethoscope size={18} /> Specializations
          </h2>
          <div className="flex flex-wrap gap-3">
            {doctor.specializations?.map((spec, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-lime-50 border border-lime-200 rounded-full text-sm font-medium text-lime-700 cursor-pointer shadow-sm"
              >
                {spec}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* زر الحجز */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <BookAppointment doctor={doctor} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DoctorDetails;
