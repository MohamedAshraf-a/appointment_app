// components/Footer.jsx

"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Toaster component should be in RootLayout
import { motion } from "framer-motion";
import { HeartPulse, Facebook, Linkedin, Github, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // In a real app, you would submit this email to your backend.
    console.log("Subscribing with email:", email);
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  const footerLinks = {
    services: [
      { name: "Find a Doctor", href: "/explore" },
      { name: "Book Appointment", href: "/explore" },
      { name: "My Bookings", href: "/my-booking" },
      { name: "Health Packages", href: "#" },
    ],
    about: [
      { name: "About Us", href: "#" },
      { name: "Our Mission", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    support: [
      { name: "FAQs", href: "#" },
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/mohamed.ashref.803451" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-ashraf-99b754317/" },
    { name: "GitHub", icon: Github, href: "https://github.com/MohamedAshraf-a" },
  ];

  return (
    <motion.footer
      className="bg-background border-t" // Use theme-aware background and add a border
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Good Health</span>
          </div>
          <strong className="block text-xl font-bold text-foreground sm:text-3xl">
            Get Health Tips & Updates in Your Inbox
          </strong>

          <form onSubmit={handleSubscribe} className="mt-6">
            <div className="relative max-w-lg mx-auto">
              <label className="sr-only" htmlFor="email">Email</label>
              <Input
                className="w-full rounded-full border-input bg-card p-4 pe-32 text-sm font-medium h-14"
                id="email"
                type="email"
                placeholder="your.email@provider.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full px-6 py-3 text-sm font-medium transition h-10"
                type="submit"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">
          {/* Dynamically render link sections */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <strong className="font-medium text-foreground capitalize">{key}</strong>
              <ul className="mt-6 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground transition hover:text-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* NEW: Location Information */}
          <div>
            <strong className="font-medium text-foreground">Our Location</strong>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center justify-center lg:justify-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">123 Health St, Alexandria, Egypt</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+20 123 456 7890</span>
              </li>
            </ul>
          <strong className="font-medium text-foreground mt-8 block">Follow Us</strong>
<div className="mt-4 flex justify-center lg:justify-start gap-4">
  {socialLinks.map((social) => (
    <a
      key={social.name}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      className="group relative flex items-center justify-center h-12 w-12 rounded-full bg-card text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
    >
      <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
      <span className="absolute -bottom-6 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {social.name}
      </span>
    </a>
  ))}
</div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Good Health. All rights reserved.
            <br />
            Designed with care by{''}
            <a
              href="https://github.com/MohamedAshraf-a"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Mohamed Ashraf
            </a>.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;