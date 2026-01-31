const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const categoryService = {
    getAllCategory: async function () {
        try{
            const result = await fetch(`${APP_URL}/api/category`);
            const data = await result.json();
            return {data:data,error:null};
        }
        catch(e){
            return { data: null, error: { message: "Something Went Wrong" }}
        }
    }
}
