// app/contact/page.jsx

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // The <Toaster /> component should be in your root layout
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    console.log("Form submitted:", formData);
    toast.success("Thank you! Your message has been sent successfully.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto my-12 p-4 sm:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center mb-12">
        {/* CHANGED: Used theme-aware text colors */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Get in Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We'd love to hear from you. Whether you have a question, feedback, or need assistance, our team is ready to help.
        </p>
      </div>

      {/* CHANGED: Used theme-aware background `bg-card` */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card shadow-xl rounded-2xl p-6 sm:p-8 border">
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          {/* CHANGED: Used theme-aware text colors */}
          <h2 className="text-3xl font-bold text-primary">Contact Information</h2>
          <div className="space-y-6 text-muted-foreground">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Our Office</h3>
                <p>123 Health St, Alexandria, Egypt</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Email Us</h3>
                <p>support@goodhealth.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Call Us</h3>
                <p>+20 123 456 7890</p>
              </div>
            </div>
          </div>
           {/* CHANGED: Used theme-aware background and text for placeholder */}
           <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map Placeholder</p>
          </div>
        </div>

        {/* Right Side: Contact Form (shadcn components are already theme-aware) */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg">Your Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" disabled={isSubmitting}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg">Your Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" disabled={isSubmitting}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-lg">Message</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} placeholder="Write your message here..." disabled={isSubmitting}/>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactUs;