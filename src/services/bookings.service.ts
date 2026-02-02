import { cookies } from "next/headers";

const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const bookingsService = {
    
    getAllSession: async function () {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/booking/sessions`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Cookie: cookieStore.toString(),
                    }
                }
            );
            const data = await result.json();
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
    },

    getAllBookings: async function () {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/booking/get-all-bookings`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Cookie: cookieStore.toString(),
                    }
                }
            );
            const data = await result.json();
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
    }

    
}
