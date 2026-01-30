"use client"
import { Tutors } from '@/components/modules/Tutor/FeaturedTutor';
import { TutorCardSkeleton } from '@/components/modules/Tutor/LoadingSkeleton';
import { Tutor } from '@/types/tutor.type';
import { useEffect, useState } from "react";

export default function tutorPage() {

    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

    

    useEffect(() => {
    
    fetch(`${APP_URL}/api/tutor?isFeatured=true`,{
        cache:"no-store",
    })
        .then(res => res.json())
        .then(data => {
        setTutors(data.data);
        setLoading(false);
        });
    }, [APP_URL]);

  return (
        <div>
          
          <div className="w-[90%] mx-auto">
            
            {
              loading ? (
                <div className="py-20 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TutorCardSkeleton key={i} />
                  ))}
                </div>
              ):
              (
                <Tutors title="All Tutors" tutors={tutors} ></Tutors>
              )
            }
            
            
          </div>
        </div>
  )
}
