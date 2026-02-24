"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, Users } from "lucide-react"
import { TutorCardSkeleton } from "./LoadingSkeleton";
import { useEffect, useState } from "react";
// import { getTutorOverview } from "@/services/action.service";
import { useSessionContext } from "@/providers/SessionProvider";
// import { da } from "zod/v4/locales";



interface tutorOverview {
    upcomingSessions:string|number,
    completedSessions:string| number,
    students:string | number,
}

export default function TutorOverviewStats() {
 
        const [data, setData] = useState<tutorOverview | null>(null);
        const [loading, setLoading] = useState(true);
        const context =  useSessionContext();
          const session = context?.session;
          const id = session?.user?.id;
          // console.log(id);
          const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;
    
        useEffect(() => {
            async function fetchOverview() {
                const result = await fetch(`${APP_URL}/api/tutor/overview/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        
                       
                    }
                    }
                );
                

            const data = await result.json();
            // console.log(data);
                
                setData(data?.data);
                setLoading(false);
            }
            fetchOverview();
        }, [id,APP_URL])
        


    const stats = [
  {
    title: "Upcoming Sessions",
    value: data?.upcomingSessions || 0,
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Completed Sessions",
    value: data?.completedSessions || 0,
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    title: "Total Students",
    value: data?.students || 0,
    icon: Users,
    color: "text-purple-500",
  },
]

    if(loading){
        return <TutorCardSkeleton />;
    }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        
      {stats?.map((stat) => (
        <Card key={stat?.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat?.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat?.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat?.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
