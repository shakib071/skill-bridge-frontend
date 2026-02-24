"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FieldLabel, FieldError } from "@/components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tutor } from "@/types/tutor.type";
import { Availability } from "@/types/availability.type";
import { useSessionContext } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { createBooking } from "@/services/action.service";







interface BookingFormProps {
  tutor: Tutor;
  availability: Availability[];
}

const formSchema = z.object({
  slotId: z.string().min(1, "Please select a time slot"),
  subject: z.string().min(1, "Please select a subject"),
  language: z.string().min(1, "Please select a language"),
});

export default function BookSessionForm({ tutor, availability }: BookingFormProps) {
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const sessionContext = useSessionContext();
  const router = useRouter();
  
  const session = sessionContext?.session;
  // const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    // console.log({tutor,availability});
  const form = useForm({
    defaultValues: {
      slotId: "",
      subject: "",
      language: "",
    },
    validators:{
        onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Booking session...");
      // console.log(value);
      try {
        const slot = availability.find((s) => s.id === value.slotId);
        if (!slot) throw new Error("Slot not found");

        // const start = new Date(slot.startTime).getTime();
        // const end = new Date(slot.endTime).getTime();
        // const hours = (end - start) / (1000 * 60 * 60);

        // const res = await fetch(`${APP_URL}/api/booking`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   credentials: "include",
        //   body: JSON.stringify({
        //     userId: session?.user?.id,
        //     availabilityId: slot.id,
        //     tutorId : tutor.id,
        //     start_time: slot.startTime,
        //     end_time: slot.endTime,
        //     duration: Number(hours),
        //     total_price: Number(hours) * Number(tutor.hourlyRate),
        //   }),
        // });

        // const data = await res.json();
        const result = await createBooking(slot,session?.user?.id as string,tutor);
        const data = result?.data;
        if (!data?.success) throw new Error(data.message || "Booking failed");

        toast.success("Session booked successfully!", { id: toastId });
        router.push("/students/dashboard/sessions");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });




useEffect(() => {
  const calculatePrice = () => {
    if (!selectedSlot) {
      setDuration(0);
      setTotalPrice(0);
      return;
    }

    // console.log(selectedSlot);
    
    const slot = availability.find((s) => s.id === selectedSlot);
    
    if (!slot) {
      setDuration(0);
      setTotalPrice(0);
      return;
    }

    const start = new Date(slot.startTime).getTime();
    const end = new Date(slot.endTime).getTime();
    const hours = (end - start) / (1000 * 60 * 60);

    setDuration(hours);
    setTotalPrice(hours * tutor.hourlyRate);
    
    
  };

  calculatePrice(); 
}, [selectedSlot, tutor.hourlyRate, availability]);

// console.log({duration,totalPrice});

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-semibold mb-3">Book a Session</CardTitle>
        <CardTitle>{tutor?.name}</CardTitle>
        <CardDescription>
          {tutor?.category} | {tutor?.experienceYears ?? 0} years exp | ${tutor?.hourlyRate}/hr
        </CardDescription>
        {tutor.bio && <p className="text-sm text-gray-600 mt-1">{tutor?.bio}</p>}
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >

          {/* Slot */}
          <form.Field name="slotId">

            {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0;
            
            
            return (
              <>
                <FieldLabel>Time Slot</FieldLabel>
                <Select value={field.state.value}  onValueChange={(val:any) =>{
                    field.setValue(val);
                    setSelectedSlot(val);
                } }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {availability?.map((slot) => (
                      <SelectItem key={slot.id}  value={slot.id} disabled={slot.isBooked}>
                        {slot.day} |{" "}
                        {new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                        {new Date(slot.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        {slot.isBooked ? " (Booked)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                )}
              </>
            )}}
          </form.Field>

          {/* Subject */}
          <form.Field name="subject">
            {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0;
            return (
              <>
                <FieldLabel>Subject</FieldLabel>
                <Select value={field.state.value} onValueChange={(val) => field.setValue(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {tutor.subjects?.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                )}
              </>
            )}}
          </form.Field>

          {/* Language */}
          <form.Field name="language">
            {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
              <>
                <FieldLabel>Language</FieldLabel>
                <Select value={field.state.value} onValueChange={(val) => field.setValue(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {tutor.languages?.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                )}
              </>
            )}}
          </form.Field>

          <div className="text-gray-700 text-sm">
            Duration: {duration} {duration === 1 ? "hour" : "hours"} | Total: ${totalPrice.toFixed(2)}
          </div>

          <Button type="submit" className="w-full mt-2">
            Book Session
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
