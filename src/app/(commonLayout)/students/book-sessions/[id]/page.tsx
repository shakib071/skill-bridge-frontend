
import BookSessionForm from '@/components/modules/Bookings/BookSession';
import { AvailabilityService } from '@/services/availability.service';
import { tutorService } from '@/services/tutor.service';
import React from 'react';


export default async function Page({
    params
}:{
    params: Promise<{ id: string }>;
})  {
    const {id} = await params;
    console.log(id);

    const {data:tutor } = await tutorService.getTutorDetails(id);
    const {data:availability } = await AvailabilityService.getAvailabilityByIdWithoutBooked(id);
    // console.log({tutor,availability});
    // console.log(tutor.data[0]?.category)


  return (
    
    <div>
        {tutor?.data[0] && availability?.data.length > 0 && <BookSessionForm tutor={tutor?.data[0]} availability={availability?.data} />}
        {!tutor?.data[0] && <p>No tutor details available</p>}
        {!availability?.data || availability?.data.length === 0 && <p>No available slots</p>}
        
    </div>
  )
}
