"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, Users } from "lucide-react"

import { useEffect, useState } from "react";

import { TutorCardSkeleton } from "../Tutor/LoadingSkeleton";
import { getUserOverView } from "@/services/action.service";

// const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;
interface StudentOverview {
   
    upcomingSessions:string|number,
    completedSessions:string|number,
    tutors:string|number,
}

export default function StudentOverviewStats() {
 
        const [data, setData] = useState<StudentOverview | null>(null);
        const [loading, setLoading] = useState(true);
        
    
        useEffect(() => {
            async function fetchOverview() {
                
                // const result = await fetch(`${APP_URL}/api/user/overview`,
                // {
                //     method: "GET",
                //     credentials: "include",
                //     headers: {
                //         "Content-Type": "application/json",
                       
                //     }
                //     }
                // );
                // const data = await result.json();
                const result = await getUserOverView();
                const data = result?.data;
                setData(data?.data?.data);
                setLoading(false);
            }
            fetchOverview();
        }, [data])
        


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
    title: "Total Tutors",
    value: data?.tutors || 0,
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
