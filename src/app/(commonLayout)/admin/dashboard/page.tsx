import React from 'react';
import AdminOverviewStats from '@/components/modules/Admin/Home';
import { AdminService } from '@/services/admin.service';


export default async function Page() {
  const data = await AdminService.getOverview();
  // console.log(data?.data?.data);
  return (
    <div>
      {data?.data?.data  ? (
        <AdminOverviewStats data={data?.data?.data}></AdminOverviewStats>
      ):<>
        <div className='text-red-400 text-center font-bold text-3xl mt-5'>
          <p className='text-center'>No overview to show</p>
        </div>
      </> }
      
    </div>
  )
}
