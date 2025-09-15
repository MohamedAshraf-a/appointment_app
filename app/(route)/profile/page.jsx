// app/profile/page.jsx

"use client";
import React from 'react';
import { useKindeBrowserClient, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggler } from '@/app/_components/ThemeToggler'; // Assuming ThemeToggler is in _components
import { Calendar, LogOut, User, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

// A skeleton loader for the profile page
const ProfileSkeleton = () => (
  <div className="max-w-2xl mx-auto animate-pulse">
    <Card>
      <CardHeader className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-muted"></div>
        <div className="space-y-2">
          <div className="h-7 bg-muted rounded-md w-48"></div>
          <div className="h-5 bg-muted rounded-md w-64"></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />
        <div className="h-10 bg-muted rounded-md w-full"></div>
        <Separator />
        <div className="h-10 bg-muted rounded-md w-full"></div>
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-muted rounded-md w-full"></div>
      </CardFooter>
    </Card>
  </div>
);

// Component to show when user is not logged in
const UnauthenticatedView = () => (
  <div className="text-center flex flex-col items-center justify-center h-[60vh]">
    <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
    <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
    <p className="text-muted-foreground mt-2 mb-6">Please log in to view your profile page.</p>
    <LoginLink>
      <Button>Login</Button>
    </LoginLink>
  </div>
);


function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  // Show a skeleton while Kinde is checking the authentication state
  if (isLoading) {
    return (
      <div className="p-4 sm:p-8">
        <ProfileSkeleton />
      </div>
    );
  }

  // Show a login prompt if the user is not authenticated
  if (!isAuthenticated) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <UnauthenticatedView />
      </motion.div>
    );
  }

  // The main view for an authenticated user
  return (
    <motion.div
      className="p-4 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-col items-center text-center space-y-4 p-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={user?.picture} alt={user?.given_name} />
              <AvatarFallback className="text-3xl bg-muted">
                {user?.given_name?.[0]}
                {user?.family_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{`${user?.given_name} ${user?.family_name}`}</CardTitle>
              <CardDescription className="text-lg">{user?.email}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Dashboard</h3>
              <Button asChild variant="outline" className="w-full justify-start text-base py-6">
                <Link href="/my-booking">
                  <Calendar className="mr-3 h-5 w-5 text-primary" /> My Bookings
                </Link>
              </Button>
            </div>
            
            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Settings</h3>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Interface Theme</span>
                </div>
                <ThemeToggler />
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6">
            <LogoutLink className="w-full">
              <Button variant="destructive" className="w-full text-base py-6">
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </Button>
            </LogoutLink>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}

export default ProfilePage;