import { cookies } from "next/headers";

const APP_URL = process.env.SERVER_URL as string;


export const userService = {
    getAllUser: async function () {
        try{
            const cookieStore = await cookies();
            
            const result = await fetch(`${APP_URL}/api/user/get-all-users`,
                {
                    method: "GET",
                    // credentials: "include",
                    headers: {
                        // "Content-Type": "application/json",
                        Cookie: cookieStore.toString(),
                    }
                }
            );
            const data = await result.json();
            return {data:data,error:null};
        }  
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }};
        }
    },


    
   
}