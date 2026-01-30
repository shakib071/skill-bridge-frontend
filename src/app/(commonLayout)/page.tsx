/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useSessionContext } from "@/providers/SessionProvider";
import { FeaturedTutors } from "@/components/modules/Tutor/FeaturedTutor";
import { Tutor } from "@/types/tutor.type";
import { HeroSection } from "@/components/modules/Homepage/HeroSection";


const demoTutors: Tutor[] = [
  {
    id: "1",
    name: "Alice Johnson",
    category: "Mathematics",
    rating: 4.5,
    hourlyRate: 25,
    image: "/tutors/alice.jpg",
    bio: "Passionate math tutor with 5 years experience.",
    subjects: ["Algebra", "Calculus", "Statistics"],
    languages: ["English", "Spanish"],
    experienceYears: 5,
    totalSessionsCompleted: 120,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    category: "Physics",
    rating: 4.2,
    hourlyRate: 30,
    image: "/tutors/bob.jpg",
    bio: "Physics enthusiast and experienced tutor.",
    subjects: ["Mechanics", "Thermodynamics"],
    languages: ["English"],
    experienceYears: 7,
    totalSessionsCompleted: 200,
    isFeatured: false,
  },
  {
    id: "3",
    name: "Catherine Lee",
    category: "Chemistry",
    rating: 5,
    hourlyRate: 28,
    image: "", // will fallback to AvatarFallback
    bio: "Chemistry expert, teaching with real-world examples.",
    subjects: ["Organic", "Inorganic", "Analytical"],
    languages: ["English", "French"],
    experienceYears: 6,
    totalSessionsCompleted: 150,
    isFeatured: true,
  },
  {
    id: "4",
    name: "David Kim",
    category: "English",
    rating: 3.8,
    hourlyRate: 20,
    bio: "Native English tutor, friendly and engaging.",
    subjects: ["Grammar", "Writing", "Speaking"],
    languages: ["English", "Korean"],
    experienceYears: 4,
    totalSessionsCompleted: 80,
    isFeatured: false,
  },
];



export default function Home() {

  
  const { session, isPending }:any= useSessionContext();
  console.log({session,isPending});




  return (
    <div>
      
      <div className="w-[90%] mx-auto">
        <HeroSection></HeroSection>
        <FeaturedTutors tutors={demoTutors}></FeaturedTutors>
        
      </div>
    </div>
  )
}