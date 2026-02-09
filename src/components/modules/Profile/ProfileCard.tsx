"use client";


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@/providers/SessionProvider";
import Link from "next/link";
import { TutorCardSkeleton } from "../Tutor/LoadingSkeleton";
import { useRouter } from "next/navigation";





export  function ProfileCard() {

    
  const context = useSessionContext();
  const session = context?.session;
  const isPending = context?.isPending;
  
 

  const user = session?.user;
  console.log(user);
  
  
  const dateString = "Sat Jan 31 2026 07:42:30 GMT+0600 (Bangladesh Standard Time)";


    const dateObj = new Date(dateString);

    const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",  
    day: "numeric",
    });


    if(isPending){
      return <TutorCardSkeleton />;
    }

   



  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-1">
      
      <Card className="w-full max-w-md shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        <CardHeader className="flex flex-col items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8">
          <Avatar className="w-24 h-24 mb-4">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name} />
            ) : (
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
          
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <Badge variant={user?.role === "TUTOR" ? "secondary" : "default"}>
              {user?.role}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Verified:</span>
            {user?.emailVerified ? (
              <Badge variant="default">Yes</Badge>
            ) : (
              <Badge variant="destructive">No</Badge>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Joined:</span>
            <span>{formattedDate}</span>
          </div>

         
            <div className= "flex justify-center items-center gap-2 mt-4">
               { user?.role == "TUTOR" && (
                <Link href="/tutors/dashboard/profile">
                <Button >View Tutor Profile</Button>
                </Link>
                 )}

                <Link href="/profile/edit">
                    <Button >Edit Profile</Button>
                </Link>
            </div>
       
        </CardContent>
      </Card>
    </div>
  );
}
