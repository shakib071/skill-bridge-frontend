"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


import { Booking } from "@/types/booking.type";

export  function BookingsTable({bookings}: {bookings:Booking[]}) {


  return (
    <div className="rounded-xl border shadow-sm bg-white overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">SL</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Duration (min)</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Tutor ID</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((b, index) => (
            <TableRow key={b.id} className="text-center">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{new Date(b.booking_date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(b.start_time).toLocaleTimeString()}</TableCell>
              <TableCell>{new Date(b.end_time).toLocaleTimeString()}</TableCell>
              <TableCell>{b.duration}</TableCell>
              <TableCell>${b.total_price}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    b.status === "CONFIRMED"
                      ? "default"
                      : b.status === "CANCELLED"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {b.status}
                </Badge>
              </TableCell>
              <TableCell>{b.studentId}</TableCell>
              <TableCell>{b.tutorId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
