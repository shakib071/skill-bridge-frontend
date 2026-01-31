


const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const tutorService = {
    getTutorById: async function (id:string) {
        try{
            
            const result = await fetch(`${APP_URL}/api/tutor/profile/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
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
