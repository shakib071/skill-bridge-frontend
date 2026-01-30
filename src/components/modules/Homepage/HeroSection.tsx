"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="rounded-lg relative bg-linear-to-r  from-indigo-50 via-purple-100 to-pink-50 overflow-hidden">
     
      <div className="absolute -top-32 -left-32 max-w-125 max-h-125 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 max-w-150 max-h-150 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-6 text-center relative z-10 py-32">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Connect with Top Tutors <br className="hidden md:block" /> Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Learn from verified experts across subjects. Browse tutors, check ratings, and book your first session today.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
            Browse Tutors
          </Button>
        </div>

     
      </div>
    </section>
  );
}
