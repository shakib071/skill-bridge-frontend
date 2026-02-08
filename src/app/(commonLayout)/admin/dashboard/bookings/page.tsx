import { bookingsService } from '@/services/bookings.service';
import { BookingsTable } from '@/components/modules/Admin/BookingsTable';

export default async function Page() {

  const result = await bookingsService.getAllBookings();
  // console.log(result?.data?.data);

  return (
     <div>
        
        {
          result?.data?.data && result?.data?.data?.length > 0 ? (
             <BookingsTable bookings={result?.data?.data}/>
          ):(
            <div className='text-center font-bold text-4xl'>
                <p>No Bookings available</p>
            </div>
          )
        }
       
     </div>
  )
}
