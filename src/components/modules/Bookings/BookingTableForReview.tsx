"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TutorCardSkeleton } from "../Tutor/LoadingSkeleton";
import { createTutorReview } from "@/services/action.service";

export type Booking = {
  id: string;
  tutor: {
    user: {
      name: string;
      email: string;
    };
  };
  total_price: number;
  duration: number;
  review: {
    id: string;
    rating: number;
    comment?: string;
  } | null;
};

type BookingsTableProps = {
  bookings: Booking[];

};

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleSubmitReview = async () => {
    if (!selectedBooking) return;

    const toastId = toast.loading("Creating Review");

    if(rating>5){
        toast.warning("rating must be between 0 to 5",{id:toastId});
        return;
    }


    setLoading(true);
    try {
      // const res = await fetch(`${APP_URL}/api/review/create`, {
      //   method: "POST",
      //   credentials:"include",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     bookingId: selectedBooking.id,
      //     rating,
      //     comment,
      //   }),
      // });

      // const data = await res.json();
      const result = await createTutorReview(selectedBooking.id,rating,comment);
      const data = result?.data;
      if (!data?.success) {
        toast.error(data?.message || "Failed to create review",{id:toastId});
        return;
      }

      toast.success("Review submitted!",{id:toastId});
      router.refresh();
      setSelectedBooking(null);
      setComment("");
      setRating(5);
      
    } catch (err: any) {
      toast.error(err.message || "Something went wrong",{id:toastId});
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return <TutorCardSkeleton/>
  }

  return (
    <div className="rounded-xl border shadow-sm bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Tutor Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Duration (hour)</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b, index) => (
            <TableRow key={b.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{b.tutor.user.name}</TableCell>
              <TableCell>{b.tutor.user.email}</TableCell>
              <TableCell>${b.total_price}</TableCell>
              <TableCell>{b.duration}</TableCell>
              <TableCell className="text-right">
                {b.review ? (
                  <Badge variant="outline">Reviewed</Badge>
                ) : (
                  <Dialog open={selectedBooking?.id === b.id} onOpenChange={(open) => !open && setSelectedBooking(null)}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => setSelectedBooking(b)}
                      >
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px]">
                      <DialogHeader>
                        <DialogTitle>Submit Review</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-2">
                        <label className="block">
                          Rating:
                          <Input
                            type="number"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          />
                        </label>
                        <label className="block">
                          Comment:
                          <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </label>
                        <Button
                          className="w-full"
                          onClick={handleSubmitReview}
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit Review"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
