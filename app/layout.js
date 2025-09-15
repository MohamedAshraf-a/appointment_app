// app/layout.jsx

import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ThemeProvider } from "./_components/ThemeProvider"; // Import the new ThemeProvider
import { Toaster } from "sonner"; // Import the Toaster for notifications

const outfit = Outfit({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'] // Specify weights for better performance
});

// --- SEO Metadata ---
export const metadata = {
  title: {
    default: "Good Health - Your Trusted Partner in Healthcare",
    template: "%s | Good Health",
  },
  description: "Easily find and book appointments with the best doctors near you. Your health, a click away.",
  openGraph: {
    title: "Good Health - Find & Book Doctor Appointments",
    description: "Your trusted partner for finding specialized doctors and managing your health appointments seamlessly.",
    url: "https://your-app-url.com", // Replace with your actual domain
    siteName: "Good Health",
    images: [
      {
        url: "/og-image.png", // Create an image for social sharing at public/og-image.png
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Good Health - Find & Book Doctor Appointments",
    description: "Easily find and book appointments with the best doctors near you.",
    images: ["/og-image.png"], // Same image as openGraph
  },
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in your public folder
  },
};




export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="top-center" />
          
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 py-8">
              {children}
            </main>

            <Footer />
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}




