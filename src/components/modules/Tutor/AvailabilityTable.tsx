"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Availability } from "@/types/availability.type";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

type AvailabilityTableProps = {
  data: Availability[];
 
};

export default  function AvailabilityTable({ data}: AvailabilityTableProps) {
        const router = useRouter();
        const onDelete = async(id: string) => {
        
        const toastId = toast.loading("Deleting availability...");

        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/availability/${id}`,{
                method: "DELETE",
                credentials: "include",
                headers: {
                    
                    "Content-Type": "application/json",
                }
        });
        const data = await result.json();
        console.log(data);
        if(data?.success === true){
            toast.success("Availability deleted successfully.", { id: toastId });
            router.refresh();
            return;
        }
        toast.error("Failed to delete availability.", { id: toastId });
        
    }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
             <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell className="text-center py-4 text-gray-500">
                No availability added yet.
              </TableCell>
            </TableRow>
          )}
          {data.map((slot, index) => (
            <TableRow key={slot.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{slot.day}</TableCell>
              <TableCell>{format(new Date(slot.startTime), "hh:mm a")}</TableCell>
              <TableCell>{format(new Date(slot.endTime), "hh:mm a")}</TableCell>
              <TableCell>
                <Badge variant={slot.isBooked ? "destructive" : "secondary"}>
                  {slot.isBooked ? "Booked" : "Available"}
                </Badge>
              </TableCell>
             
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => onDelete(slot.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
