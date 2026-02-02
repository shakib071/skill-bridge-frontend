"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import { useState } from "react";
import { useSessionContext } from "@/providers/SessionProvider";
import * as z from "zod";
import  { useRouter } from "next/navigation";
import { TutorCardSkeleton } from "@/components/modules/Tutor/LoadingSkeleton";


const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.enum(["STUDENT", "TUTOR"]),
})





export default function UpdateUserForm() {
  const context = useSessionContext();
  const session = context?.session;
  const [loading, setLoading] = useState(false);
   const roles = ["STUDENT", "TUTOR"];
   const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL;

   const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: session?.user?.name || "",
      role: session?.user?.role || "STUDENT",
    },
    validators:{
        onSubmit:formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!session) return;

      setLoading(true);
      try {
        const res = await fetch(`${APP_URL}/api/user`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        const data = await res.json();
        if(!res?.ok){
            toast.error(data?.message || "Failed to update user");
            return;
        }

        toast.success("User updated successfully!");

        await context?.refetch?.();
        router.push("/profile");

      } catch (err) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  if(context?.isPending){
    return <TutorCardSkeleton></TutorCardSkeleton>;
  }

  return (
    <Card className="max-w-md mx-auto mt-12">
      <CardHeader>
        <CardTitle>Update User</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
       
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

       
          <form.Field name="role">
            {(field) => (
              <Field>
                <FieldLabel>Role</FieldLabel>
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
