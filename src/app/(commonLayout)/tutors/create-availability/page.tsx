"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] ;

const formSchema = z.object({
  day: z.enum(DAYS),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
}).refine(
  (data) => data.startTime < data.endTime,
  {
    message: "End time must be after start time",
    path: ["endTime"],
  }
);

export default function AvailabilityCreateForm() {
    const router = useRouter();
  const form = useForm({
    defaultValues: {
      day: "MONDAY",
      startTime: "",
      endTime: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating slot...");
      try {
        const res = await fetch("http://localhost:5000/api/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            day: value.day,
            startTime: new Date(`1970-01-01T${value.startTime}:00`),
            endTime: new Date(`1970-01-01T${value.endTime}:00`),
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        toast.success("Availability slot created", { id: toastId });
        form.reset();
        router.push("/tutors/dashboard");
        
      } catch (err: any) {
        toast.error(err.message || "Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create Availability Slot</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Day */}
          <form.Field name="day">
            {(field) => (
              <Field>
                <FieldLabel>Day</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          {/* Start Time */}
          <form.Field name="startTime">
            {(field) => (
              <Field>
                <FieldLabel>Start Time</FieldLabel>
                <Input
                  type="time"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          {/* End Time */}
          <form.Field name="endTime">
            {(field) => (
              <Field>
                <FieldLabel>End Time</FieldLabel>
                <Input
                  type="time"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <Button type="submit" className="w-full">
            Create Slot
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
