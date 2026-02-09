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


