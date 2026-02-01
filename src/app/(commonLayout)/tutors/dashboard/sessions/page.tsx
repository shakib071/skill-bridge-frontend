import SessionsTable from '@/components/modules/Session/Sessions';
import { bookingsService } from '@/services/bookings.service';
import React from 'react'

export default async function Page() {
   const {data} = await bookingsService.getAllSession();
   // console.log("Sessions Data:",data?.data);
   return (
     <div>
 
       {data?.data && data?.data.length > 0 ? (
         <SessionsTable sessions={data.data} />
       ) : (
         <p className="text-center text-gray-500 mt-4">No sessions available.</p>
       )}
     </div>
   )
}
