"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@/providers/SessionProvider";
import { TutorCardSkeleton } from "../Tutor/LoadingSkeleton";

interface Session {
  id: string;
  start_time: string;
  end_time: string;
  duration: number;
  total_price: number;
  availability?:boolean;
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
    
    console.log("User Session in Sessions Table:",session);
    if(!session && pending){
      return <TutorCardSkeleton />;
    }
    // @ts-expect-error: Assume user has a 'role' property
    const role = session?.user?.role;
    console.log("User Role in Sessions Table:",role);
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
                    {role === "TUTOR" ? (
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#1239e8]"
                        onClick={() => console.log("Completed", session.id)}
                      >
                        Complete
                      </Button>
                    </TableCell>
                    ):
                    (
                        <TableCell>
                      <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500"
                            onClick={() => console.log("Cancel", session.id)}
                        >
                            Cancel
                        </Button>
                        </TableCell>
                    )}
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
