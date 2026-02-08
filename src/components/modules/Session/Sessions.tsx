"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@/providers/SessionProvider";
import { TutorCardSkeleton } from "../Tutor/LoadingSkeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { useRouter } from "next/router";

interface Session {
  id: string;
  start_time: string;
  end_time: string;
  duration: number;
  total_price: number;
  availability?:boolean;
  status?:string,
  tutor?: {
    user: { name: string };
    category?: string;
  };
  student?: {
    user: { name: string };
  };
}

interface SessionsTableProps {
  sessions: Session[];
  
}

export default function SessionsTable({ sessions }: SessionsTableProps) {
    const context = useSessionContext();
    const session = context?.session;
    const pending = context?.isPending;
    // console.log({sessions});
    const router = useRouter();
    const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL;

    const handleCompletedORAttend = async(id:string) => {
        const toastId = toast.loading("Updating Status");
        try{
          const res = await fetch(`${APP_URL}/api/booking/update-booking-status/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({status: "COMPLETED"})
          });

          const data = await res.json();

          if(!data.success){
            toast.error("Status Updation Failed",{ id: toastId});
            return;
          }
          toast.success("Status Updated Successfully",{id:toastId});
          // console.log(data);
          router.refresh();

          


        }
        catch(e){
          toast.error("Status Updation Failed",{ id: toastId});
        }
    }

      const cancelBookingStatus = async(id:string) => {
      const toastId = toast.loading("Canceling Status");
      try{
        const res = await fetch(`${APP_URL}/api/booking/update-booking-status/${id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({status: "CANCELLED"})
        });

        const data = await res.json();

        if(!data.success){
          toast.error("Status Cancelation Failed",{ id: toastId});
          return;
        }
        toast.success("Status Cancelled Successfully",{id:toastId});
        // console.log(data);
        router.refresh();

        


      }
      catch(e){
        const errorMessage = e instanceof Error ? e.message : "Status Updation Failed";
        toast.error(errorMessage,{ id: toastId});
      }
  }
    
    // console.log("User Session in Sessions Table:",session);
    if(!session && pending){
      return <TutorCardSkeleton />;
    }
    
    const role = session?.user?.role;
    // console.log("User Role in Sessions Table:",role);
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
                <TableHead>SL</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              {role === "STUDENT" && <TableHead>Tutor</TableHead>}
              {role === "TUTOR" && <TableHead>Student</TableHead>}
              <TableHead>Duration (hrs)</TableHead>
              <TableHead>Total ($)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No upcoming sessions
                </TableCell>
              </TableRow>
            ) : (
              sessions?.map((session,i) => {
                const start = new Date(session.start_time);
                const end = new Date(session.end_time);
                return (
                  <TableRow key={session.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{start.toLocaleDateString()}</TableCell>
                    <TableCell>
                      {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                      {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </TableCell>
                    {role === "STUDENT" && <TableCell>{session.tutor?.user.name}</TableCell>}
                    {role === "TUTOR" && <TableCell>{session.student?.user.name}</TableCell>}
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>${session.total_price.toFixed(2)}</TableCell>
                    <TableCell>{session.status}</TableCell>
                    {role === "TUTOR" && session?.status=="CONFIRMED" && (
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#1239e8]"
                        onClick={() => handleCompletedORAttend(session?.id)}
                      >
                        Complete
                      </Button>
                    </TableCell>
                    )
                    }
                    {
                      role === "STUDENT" && session?.status=="CONFIRMED" &&
                      (
                        <TableCell className="flex justify-center items-center">
                          <Button
                                size="sm"
                                variant="outline"
                                className="text-green-500"
                                onClick={() => handleCompletedORAttend(session?.id)}
                            >
                                Attend
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500"
                                onClick={() => cancelBookingStatus(session?.id)}
                            >
                                Cancel
                            </Button>
                        </TableCell>
                    )
                    }
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
