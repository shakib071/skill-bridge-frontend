import BookingsTable from '@/components/modules/Bookings/BookingTableForReview';
import { bookingsService } from '@/services/bookings.service'
import React from 'react'

export  default async function page() {

  const bookings = await bookingsService.getAllCompletedBookings();
  console.log(bookings?.data?.data);

  return (
        <div>
    
          {bookings?.data?.data && bookings?.data?.data?.length > 0 ? (
            <BookingsTable bookings={bookings?.data?.data} />
          ) : ( 
             <p className="text-center text-gray-500 mt-4">No booking available. to reviews</p> 
         )} 
        </div>
  )
}
