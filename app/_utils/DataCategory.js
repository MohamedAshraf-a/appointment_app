// app/_utils/DataCategory.js
const categories = [
  { id: 1, name: "Ophthalmology", icon: "/assets/image/categories/ophthalmology.png" },
  { id: 2, name: "Pediatrics", icon: "/assets/image/categories/pediatrics.png" },
  { id: 3, name: "Neurology", icon: "/assets/image/categories/neurology.png" },
  { id: 4, name: "Dermatology", icon: "/assets/image/categories/dermatology.png" },
  { id: 5, name: "Gastroenterology", icon: "/assets/image/categories/gastroenterology.png" },
  { id: 6, name: "Pulmonology", icon: "/assets/image/categories/pulmonology.png" },
  { id: 7, name: "Hematology", icon: "/assets/image/categories/hematology.png" },
];

const doctors = [
  // Ophthalmology
  {
    id: 1,
    name: "Dr. Ahmed",
    category: "Ophthalmology",
    address: "123 Main St, Alexandria",
    about: "Expert in eye surgeries and treatments.",
    phone: 201234567890,
    email: "ahmed.ophthalmology@example.com",
    yearOfExperience: 10,
    consultationFee: 400,
    rating: 4.7,
    hospital: "Alexandria Eye Hospital",
    availability: ["Saturday 10am-4pm", "Monday 2pm-8pm", "Wednesday 10am-2pm"],
    specializations: ["LASIK Surgery", "Cataract", "Retina Diseases"],
    image: "/assets/image/doctors/doctor1.png",
  },
  {
    id: 2,
    name: "Dr. Naser",
    category: "Ophthalmology",
    address: "22 Vision St, Cairo",
    about: "Specialist in cornea and retina diseases.",
    phone: 201234567897,
    email: "naser.eye@example.com",
    yearOfExperience: 8,
    consultationFee: 350,
    rating: 4.5,
    hospital: "Cairo Vision Clinic",
    availability: ["Sunday 12pm-6pm", "Tuesday 3pm-9pm"],
    specializations: ["Cornea", "Retina", "Glaucoma"],
    image: "/assets/image/doctors/doctor8.png",
  },

  // Dermatology
  {
    id: 3,
    name: "Dr. Ali",
    category: "Dermatology",
    address: "45 Nile St, Alexandria",
    about: "Specialist in skin care and cosmetic treatments.",
    phone: 201234567891,
    email: "ali.derma@example.com",
    yearOfExperience: 3,
    consultationFee: 250,
    rating: 4.2,
    hospital: "Alexandria Skin Center",
    availability: ["Monday 10am-4pm", "Thursday 1pm-7pm"],
    specializations: ["Acne", "Eczema", "Laser Therapy"],
    image: "/assets/image/doctors/doctor2.png",
  },
  {
    id: 4,
    name: "Dr. Amr",
    category: "Dermatology",
    address: "9 Lotus St, Cairo",
    about: "Expert in acne, eczema, and laser treatments.",
    phone: 201234567898,
    email: "amr.skin@example.com",
    yearOfExperience: 6,
    consultationFee: 300,
    rating: 4.4,
    hospital: "Lotus Dermatology Clinic",
    availability: ["Saturday 11am-5pm", "Wednesday 2pm-8pm"],
    specializations: ["Psoriasis", "Eczema", "Cosmetic Dermatology"],
    image: "/assets/image/doctors/d9.png",
  },

  // Neurology
  {
    id: 5,
    name: "Dr. Sara",
    category: "Neurology",
    address: "78 Tahrir Sq, Alexandria",
    about: "Experienced neurologist for adult and pediatric patients.",
    phone: 201234567892,
    email: "sara.neuro@example.com",
    yearOfExperience: 5,
    consultationFee: 500,
    rating: 4.6,
    hospital: "Tahrir Neuro Center",
    availability: ["Sunday 9am-1pm", "Tuesday 4pm-9pm"],
    specializations: ["Epilepsy", "Migraines", "Stroke"],
    image: "/assets/image/doctors/doctor3.png",
  },
  {
    id: 6,
    name: "Dr. Gigi",
    category: "Neurology",
    address: "101 Brain St, Cairo",
    about: "Specialist in epilepsy and neurodegenerative diseases.",
    phone: 201234567899,
    email: "youssef.brain@example.com",
    yearOfExperience: 14,
    consultationFee: 600,
    rating: 4.8,
    hospital: "Cairo Brain Institute",
    availability: ["Monday 1pm-6pm", "Thursday 10am-3pm"],
    specializations: ["Parkinson’s", "Alzheimer’s", "Epilepsy"],
    image: "/assets/image/doctors/doctor10.png",
  },

  // Pediatrics
  {
    id: 7,
    name: "Dr. Hisham",
    category: "Pediatrics",
    address: "12 Garden St, Alexandria",
    about: "Passionate about children's health and well-being.",
    phone: 201234567893,
    email: "hisham.pediatrics@example.com",
    yearOfExperience: 6,
    consultationFee: 300,
    rating: 4.5,
    hospital: "Alexandria Children's Hospital",
    availability: ["Sunday 10am-5pm", "Tuesday 1pm-7pm"],
    specializations: ["Vaccinations", "Child Nutrition", "General Pediatrics"],
    image: "/assets/image/doctors/doctor4.png",
  },
  {
    id: 8,
    name: "Dr. Mona",
    category: "Pediatrics",
    address: "44 Kids St, Cairo",
    about: "Specialist in child nutrition and general pediatrics.",
    phone: 201234567888,
    email: "mona.pediatrics@example.com",
    yearOfExperience: 9,
    consultationFee: 320,
    rating: 4.6,
    hospital: "Cairo Kids Clinic",
    availability: ["Monday 11am-6pm", "Thursday 2pm-8pm"],
    specializations: ["Child Nutrition", "Growth Disorders", "General Pediatrics"],
    image: "/assets/image/doctors/doctor14.png",
  },

  // Gastroenterology
  {
    id: 9,
    name: "Dr. Hossam",
    category: "Gastroenterology",
    address: "34 Nile Corniche, Alexandria",
    about: "Expert in digestive system disorders.",
    phone: 201234567894,
    email: "hossam.gastro@example.com",
    yearOfExperience: 7,
    consultationFee: 450,
    rating: 4.6,
    hospital: "Alexandria Gastro Clinic",
    availability: ["Saturday 9am-3pm", "Wednesday 4pm-8pm"],
    specializations: ["IBS", "Colonoscopy", "Liver Diseases"],
    image: "/assets/image/doctors/doctor5.png",
  },
  {
    id: 10,
    name: "Dr. Salma",
    category: "Gastroenterology",
    address: "88 Stomach St, Cairo",
    about: "Specialist in liver and pancreatic diseases.",
    phone: 201234567901,
    email: "salma.gastro@example.com",
    yearOfExperience: 3,
    consultationFee: 350,
    rating: 4.3,
    hospital: "Cairo Digestive Health Center",
    availability: ["Monday 11am-4pm", "Thursday 2pm-7pm"],
    specializations: ["Hepatitis", "Pancreatitis", "Ulcer"],
    image: "/assets/image/doctors/doctor12.png",
  },

  // Pulmonology
  {
    id: 11,
    name: "Dr. Mohamed",
    category: "Pulmonology",
    address: "56 Palm St, Alexandria",
    about: "Specialist in lung and respiratory diseases.",
    phone: 201234567895,
    email: "mohamed.pulmo@example.com",
    yearOfExperience: 7,
    consultationFee: 400,
    rating: 4.5,
    hospital: "Alexandria Pulmo Care",
    availability: ["Sunday 9am-1pm", "Wednesday 3pm-8pm"],
    specializations: ["Asthma", "Bronchitis", "Respiratory Infections"],
    image: "/assets/image/doctors/doctor6.png",
  },
  {
    id: 12,
    name: "Dr. Nour",
    category: "Pulmonology",
    address: "70 Fresh Air St, Cairo",
    about: "Expert in asthma and chronic lung diseases.",
    phone: 201234567902,
    email: "nour.lungs@example.com",
    yearOfExperience: 10,
    consultationFee: 500,
    rating: 4.7,
    hospital: "Cairo Respiratory Center",
    availability: ["Saturday 12pm-6pm", "Tuesday 2pm-7pm"],
    specializations: ["COPD", "Asthma", "Sleep Apnea"],
    image: "/assets/image/doctors/doctor13.png",
  },

  // Hematology
  {
    id: 13,
    name: "Dr. Karim",
    category: "Hematology",
    address: "89 Rose St, Alexandria",
    about: "Focused on blood disorders and treatments.",
    phone: 201234567896,
    email: "karim.hematology@example.com",
    yearOfExperience: 10,
    consultationFee: 550,
    rating: 4.6,
    hospital: "Alexandria Hematology Clinic",
    availability: ["Monday 9am-3pm", "Thursday 1pm-6pm"],
    specializations: ["Anemia", "Leukemia", "Clotting Disorders"],
    image: "/assets/image/doctors/doctor7.png",
  },
  {
    id: 14,
    name: "Dr. Dalia",
    category: "Hematology",
    address: "33 Red Cross St, Cairo",
    about: "Specialist in anemia and clotting disorders.",
    phone: 201234567903,
    email: "dalia.hematology@example.com",
    yearOfExperience: 9,
    consultationFee: 520,
    rating: 4.5,
    hospital: "Cairo Blood Disorders Center",
    availability: ["Sunday 11am-5pm", "Wednesday 2pm-8pm"],
    specializations: ["Thalassemia", "Blood Clots", "Hemophilia"],
    image: "/assets/image/doctors/doctor14.png",
  },
];

// ✅ API Mock Functions
export default {
  getCategory: () => Promise.resolve({ data: categories }),

  getDoctors: () => Promise.resolve({ data: doctors }),
  getDoctorsByCategory: (category) =>
    Promise.resolve({
      data: doctors.filter(
        (d) => d?.category?.toLowerCase() === category?.toLowerCase()
      ),
    }),

  getDoctorById: (id) =>
    Promise.resolve({ data: doctors.find((d) => d.id === id) || null }),

  searchDoctorsByName: (name) =>
    Promise.resolve({
      data: doctors.filter((d) =>
        d?.name?.toLowerCase().includes(name.toLowerCase())
      ),
    }),

  getDoctorsByCity: (city) =>
    Promise.resolve({
      data: doctors.filter((d) =>
        d?.address?.toLowerCase().includes(city.toLowerCase())
      ),
    }),

  getTopRatedDoctors: (limit = 5) =>
    Promise.resolve({
      data: doctors.sort((a, b) => b.rating - a.rating).slice(0, limit),
    }),
};

export const addDoctor = async (newDoctor) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = doctors.length + 1;
      const doctorWithId = { ...newDoctor, id: newId };
      doctors.push(doctorWithId);
      resolve(doctorWithId);
    }, 300);
  });
};