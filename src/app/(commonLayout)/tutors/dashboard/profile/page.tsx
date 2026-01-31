"use client";
import { useSessionContext } from '@/providers/SessionProvider';
import { tutorService } from '@/services/tutor2.service';
import React, { useEffect, useState } from 'react';
import TutorProfilePage from '@/components/modules/Tutor/TutorDetails';
import { TutorCardSkeleton } from '@/components/modules/Tutor/LoadingSkeleton';

export default function Page() {
    const context = useSessionContext();
    const session = context?.session;
    const id = session?.user?.id;
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTutor() {
            if (!id) return;
            const tutor = await tutorService.getTutorById(id);
            setTutor(tutor?.data?.data);
            setLoading(false);
        }
        fetchTutor();
    }, [id])
    
    if(loading){
        return <TutorCardSkeleton />;
    }
    return (
        <div>
            {
                tutor ? <TutorProfilePage tutor={tutor} /> : 
                <div className='text-center'>
                    <h1 className="text-2xl font-bold mb-4">No Tutor Profile Found</h1>
                    <p>Please create your tutor profile to get started.</p>
                </div>
            }
        </div>
    )
}
