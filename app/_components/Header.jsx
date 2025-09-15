// components/Header.jsx

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For Mobile Menu
import { LoginLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { HeartPulse, Menu as MenuIcon } from "lucide-react"; // Hamburger Menu Icon
import { motion } from "framer-motion";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/explore" },
    { id: 3, name: "Contact Us", path: "/contact" },
  ];

  const userMenuItems = [
    { id: 1, name: "My Profile", path: "/profile" },
    { id: 2, name: "My Bookings", path: "/my-booking" },
  ];

  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className="relative cursor-pointer text-lg transition-colors hover:text-lime-600"
    >
      {children}
    </Link>
  );

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mx-auto max-w-screen-xl px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
            <HeartPulse className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">
            Good<span className="text-lime-600">Health</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="relative group pb-1"
            >
              <span>{item.name}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lime-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Auth Section & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
            </div>
          ) : isAuthenticated && user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity rounded-full p-1 pr-3">
                  <Image
                    src={user.picture ?? "/assets/image/default-avatar.webp"}
                    width={40}
                    height={40}
                    alt={user.given_name ?? "User"}
                    className="rounded-full border-2 border-lime-500"
                  />
                  <span className="font-medium text-gray-800 hidden sm:block">
                    {user.given_name}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48 p-2">
                <ul className="space-y-1">
                  {userMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className="block px-4 py-2 rounded-md text-sm text-gray-700 transition-colors hover:bg-lime-100 hover:text-lime-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <LogoutLink className="block w-full text-left px-4 py-2 rounded-md text-sm text-red-600 transition-colors hover:bg-red-100">
                      Logout
                    </LogoutLink>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <LoginLink>
              <Button className="rounded-full hidden md:flex">Get Started</Button>
            </LoginLink>
          )}

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden rounded-full">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-6 text-lg font-medium mt-10">
                {navLinks.map((item) => (
                  <NavLink key={item.id} href={item.path}>{item.name}</NavLink>
                ))}
                 {!isAuthenticated && (
                  <LoginLink>
                    <Button className="w-full mt-4">Get Started</Button>
                  </LoginLink>
                )}
              </nav>
            </SheetContent>
          </Sheet>
                  <ThemeToggler/> 

        </div>
      </div>
      
    </motion.header>
  );
};

export default Header;