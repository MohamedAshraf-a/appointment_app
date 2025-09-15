// components/Hero.jsx

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

// Animation variants for the overall container and its items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

// Animation variants for the dynamic word-by-word title
const titleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  const title = "Your Health, A Click Away";

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          // Animate when the component scrolls into view
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center lg:gap-20"
        >
          <div className="text-center md:text-left ">
            {/* logo */}

{/* logo */}
<div className="text-5xl">
  <Link href="/" className="flex items-center gap-2">
    <motion.div
      initial={{ scale: 0, y: -20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }}
      className="flex items-center gap-2"
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <HeartPulse className="h-20 w-15 text-lime-600 " />
      </motion.span>

      <h1 className="font-bold text-gray-800">
        Good<span className="text-lime-600">Health</span>
      </h1>
    </motion.div>
  </Link>
</div>

              
            <motion.h1
              className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              variants={titleVariants}
              aria-label={title}
            >


              {title.split(" ").map((word, index) => (
                <span key={index} className="inline-block overflow-hidden pb-2 mr-3 leading-tight">
                  <motion.span
                    className={`inline-block ${index === 2 || index === 3 ? 'text-primary' : ''}`}
                    variants={wordVariants}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg text-muted-foreground mx-auto md:mx-0"
              variants={itemVariants}
            >
              Easily find top-rated doctors in Alexandria. Search, compare, and book appointments with confidence and convenience.
            </motion.p>

            <motion.div variants={itemVariants}>
              {/* BEST PRACTICE: Use `asChild` to make a Button a Link */}
              <Button size="lg" className="mt-8 rounded-full font-bold" asChild>
                <Link href="/explore">
                  Explore Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div variants={itemVariants}>
            <Image
              src="/assets/image/hero.png"
              alt="A friendly doctor in Alexandria smiling and looking at a digital tablet, illustrating modern healthcare."
              width={600}
              height={550}
              priority // Preload the hero image
              className="rounded-2xl shadow-xl dark:shadow-primary/10"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;  