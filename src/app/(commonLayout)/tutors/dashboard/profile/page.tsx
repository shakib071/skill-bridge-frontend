"use client";
import { useSessionContext } from '@/providers/SessionProvider';
import { tutorService } from '@/services/tutor2.service';
import React, { useEffect, useState } from 'react';
import { TutorCardSkeleton } from '@/components/modules/Tutor/LoadingSkeleton';
import TutorProfilePage2 from '@/components/modules/Tutor/TutorProfilePage2';
import ReviewList from '@/components/modules/Tutor/ReviewList';

export default function Page() {
    const context = useSessionContext();
    const session = context?.session;
    const id = session?.user?.id;
    const [tutor, setTutor] = useState(null);
    const [reviews, setReview] = useState([]);
   
    
    const [loading, setLoading] = useState(true);
    const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

    useEffect(() => {
        async function fetchTutor() {
            if (!id) return;
            const tutor = await tutorService.getTutorById(id);
            
            setTutor(tutor?.data?.data);
            console.log(tutor?.data?.data);
            if(tutor?.data?.data?.id){
                const result = await fetch(`${APP_URL}/api/review/get-reviews/${tutor?.data?.data?.id}`,{
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const reviews = await result.json();
                // console.log(reviews?.data);
                setReview(reviews?.data);
            }
            
            setLoading(false);
        }
        fetchTutor();
    }, [id,APP_URL])
    
    if(loading){
        return <TutorCardSkeleton />;
    }
    return (
        <div>
            {
                tutor ? <TutorProfilePage2 tutor={tutor} /> : 
                <div className='text-center'>
                    <h1 className="text-2xl font-bold mb-4">No Tutor Profile Found</h1>
                    <p>Please create your tutor profile to get started.</p>
                </div>

                     

               
            }

            {
                tutor && <ReviewList reviews={reviews}></ReviewList>
            }

            


        </div>
    )
}
