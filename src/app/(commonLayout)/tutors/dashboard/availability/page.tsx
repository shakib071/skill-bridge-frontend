
import AvailabilityTable from '@/components/modules/Tutor/AvailabilityTable';
import { AvailabilityService } from '@/services/availability.service'


import React from 'react'

export default async function page() {
    
    const availabilityData = await AvailabilityService.getAllCategory();
    

    console.log(availabilityData);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Availability</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {availabilityData?.data?.data && availabilityData?.data?.data.length > 0 ? (
          <div className="overflow-x-auto">
            <AvailabilityTable data={availabilityData.data.data} />
          </div>
        ) : (
          <p>No availability data available.</p>
        )}
      </div>
    </div>
  )
}
