import { cookies } from "next/headers";

const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const AvailabilityService = {
    getAllAvailability: async function () {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/availability`,{
                method: "GET",
                credentials: "include",
                headers: {
                    Cookie: cookieStore.toString(),
                }
            });
            const data = await result.json();
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
    },

    getAvailabilityByIdWithoutBooked: async function (id:string) {
        try{
            
            const result = await fetch(`${APP_URL}/api/availability/without-booked/${id}`);
            const data = await result.json();
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
    }
        
    
}