
import {UsersTable} from '@/components/modules/Admin/UserTable';
import { userService } from '@/services/user.service';



export default async  function Page() {
    const result  = await userService.getAllUser();


    
    const users =result?.data;
    

  return (
    <div>
        {
            users?.data && users?.data?.length > 0 ?
            (
                <UsersTable users={users?.data}></UsersTable>
            ) :
            (
                <div className='text-center font-bold text-4xl'>
                    <p>No user available</p>
                </div>
            )
        }
        
        
    </div>
  )
}
