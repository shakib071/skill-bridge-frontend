'use server';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export async function postCategory(name:string,description:string) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/category`,{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name, description }),
            });
            const data = await result.json();
            revalidatePath('/admin/dashboard/categories');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function handleBan(id:string,status:string) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/user/update-user-status/${id}`,{
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({status:status})
            });
            const data = await result.json();
            revalidatePath('/admin/dashboard/users');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function changeFeatureStatus(tutorId:string,feature:boolean) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/tutor/update-isfeatured/${tutorId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                
                
                body: JSON.stringify({ isFeatured : feature }), 
            });
            const data = await result.json();
            console.log(data);
            revalidatePath('/admin/dashboard/users');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function createTutorProfile(value:Record<string,string>) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/tutor`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" ,
                    Cookie: cookieStore.toString(),

                },
                credentials:"include",
                body: JSON.stringify({
                    ...value,
                    hourly_rate: Number(value.hourly_rate),
                    experienceYears: Number(value.experienceYears),
                    subjects: value.subjects ? value.subjects.split(",").map((s) => s.trim()) : [],
                    languages: value.languages ? value.languages.split(",").map((l) => l.trim()) : [],
                    
                }),
                });
            const data = await result.json();
            console.log(data);
            revalidatePath('/tutors');
            revalidatePath('/');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function updateUserData(value:{name:string,role: "STUDENT" | "TUTOR" | "ADMIN"|undefined}) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/user`, {
                method: "PUT",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                 },
                body: JSON.stringify(value),
                });
            const data = await result.json();
            console.log(data);
            revalidatePath('/profile');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function createAvailability(value:Record<string,string>) {
        try{
            const cookieStore = await cookies();
            const today = new Date().toISOString().split('T')[0];
            const result = await fetch(`${APP_URL}/api/availability`, {
                method: "POST",
                credentials:"include",
                headers: { 
                    "Content-Type": "application/json" ,
                    Cookie: cookieStore.toString(),
                },
            
                        
                body: JSON.stringify({
                    day: value.day,
                    startTime: new Date(`${today}T${value.startTime}:00`),
                    endTime: new Date(`${today}T${value.endTime}:00`),
                }),
            });

            const data = await result.json();
            // console.log(data);
            revalidatePath('/tutors/dashboard/availability');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function getTutorById(id:string) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/tutor/profile/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString(),
                        
                    }
                }
            );
           

            const data = await result.json();
            // console.log(data);
            // revalidatePath('/tutors/dashboard/availability');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}
export async function getTutorReviewsById(id:string) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/review/get-reviews/${id}`,{
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString(),
                    }
                });
           

            const data = await result.json();
            // console.log(data);
            
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}


export async function createTutorReview(id:string,rating:number,comment:string) {
        try{
            const cookieStore = await cookies();
           const result = await fetch(`${APP_URL}/api/review/create`, {
                method: "POST",
                credentials:"include",
                headers: { 
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),

                 },
                body: JSON.stringify({
                    bookingId: id,
                    rating,
                    comment,
                }),
      });
           

            const data = await result.json();
            // console.log(data);
            
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}


export async function createBooking(slot:Record<string,any>,sessionId:string,tutor:Record<string,any>) {
        try{
            const cookieStore = await cookies();
            const start = new Date(slot.startTime).getTime();
            const end = new Date(slot.endTime).getTime();
            const hours = (end - start) / (1000 * 60 * 60);

            const result = await fetch(`${APP_URL}/api/booking`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" ,
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
            body: JSON.stringify({
                userId: sessionId,
                availabilityId: slot.id,
                tutorId : tutor.id,
                start_time: slot.startTime,
                end_time: slot.endTime,
                duration: Number(hours),
                total_price: Number(hours) * Number(tutor.hourlyRate),
            }),
            });
                

            const data = await result.json();
            // console.log(data);
            revalidatePath('/students/dashboard/sessions');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function updateBookingStatus(id:string) {
        try{
            const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/booking/update-booking-status/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                 },
                body: JSON.stringify({status: "COMPLETED"})
            });
                

            const data = await result.json();
            // console.log(data);
            revalidatePath('/students/dashboard/sessions');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function cancelUpdateBookingStatus(id:string) {
        try{
            const cookieStore = await cookies();
            

            const result = await fetch(`${APP_URL}/api/booking/update-booking-status/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({status: "CANCELLED"})
            });
                

            const data = await result.json();
            // console.log(data);
            revalidatePath('/students/dashboard/sessions');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function getUserOverView() {
        try{
            const cookieStore = await cookies();
            

            const result = await fetch(`${APP_URL}/api/user/overview`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString(),
                       
                    }
                    }
                );
                

            const data = await result.json();
            // console.log(data);
            revalidatePath('/students/dashboard');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function updateTutorProfile(tutor:Record<string,any>,value:Record<string,string>) {
        try{
            const cookieStore = await cookies();
            




            const result = await fetch(`${APP_URL}/api/tutor/update-profile/${tutor?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" ,
                    Cookie: cookieStore.toString(),
                },
                credentials:"include",
                body: JSON.stringify({
                    ...value,
                    hourly_rate: Number(value.hourly_rate),
                    experienceYears: Number(value.experienceYears),
                    subjects: value.subjects ? value.subjects.split(",").map((s) => s.trim()) : [],
                    languages: value.languages ? value.languages.split(",").map((l) => l.trim()) : [],
                    
                }),
            });
                

            const data = await result.json();
            // console.log(data);
            revalidatePath('/tutors/dashboard/profile');
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
}

export async function getTutorOverview () {

        try{
             const cookieStore = await cookies();
            const result = await fetch(`${APP_URL}/api/tutor/overview`,{
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString(),
                        
                    }
                });
            const data = await result.json();
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
    
   
}



