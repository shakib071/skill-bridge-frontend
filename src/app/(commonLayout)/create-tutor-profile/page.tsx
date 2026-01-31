/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { TutorCardSkeleton } from "@/components/modules/Tutor/LoadingSkeleton";




const formSchema = z.object({
   bio: z.string().min(10).max(250),

  hourly_rate: z
    .string()
    .refine((v) => Number(v) > 0, "Hourly rate must be greater than 0"),

  experienceYears: z
    .string()
    .refine((v) => Number(v) >= 0, "Experience must be 0 or more"),

  education: z.string(),
  subjects: z.string(),
  languages: z.string(),

  categoryId: z.string().min(1, "Category is required"),
  
});

export default  function TutorCreateForm() {

    
    const [categories, setCategories] = useState<Array<{ id: string; name: string;description:string;created_at:string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAllCategory();
        setCategories(res.data?.data);
        console.log(res.data?.data);
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

//   const categories = ["Mathematics", "Physics", "Chemistry", "Biology"];
  const router = useRouter();
  const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

  const form = useForm({
    defaultValues: {
      bio: "",
      hourly_rate: "",
      experienceYears: "",
      education: "",
      subjects: "",
      languages: "",
      categoryId: "",
      
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating profile...");
      try {
        const res = await fetch(`${APP_URL}/api/tutor`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials:"include",
          body: JSON.stringify({
            ...value,
            hourly_rate: Number(value.hourly_rate),
            experienceYears: Number(value.experienceYears),
            subjects: value.subjects ? value.subjects.split(",").map((s) => s.trim()) : [],
            languages: value.languages ? value.languages.split(",").map((l) => l.trim()) : [],
            
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed");

        toast.success("Tutor profile created!", { id: toastId });
        router.push("/");
      } catch (err:any) {
        toast.error(err.message || "Something went wrong", { id: toastId });
      }
    },
  });

  if(loading){
    return <TutorCardSkeleton/>
  }

  return (
    <div className="max-w-3xl mx-auto my-12 px-4">
      <Card className="max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden">
  {/* Header with gradient */}
  <CardHeader className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8">
    <div className="text-center space-y-2">
      <CardTitle className="text-3xl font-bold tracking-tight">
        Become a Tutor
      </CardTitle>
      <CardDescription className="text-indigo-100 text-base">
        Share your expertise and connect with students worldwide
      </CardDescription>
    </div>
  </CardHeader>

  <CardContent className="p-8 bg-gradient-to-b from-gray-50 to-white">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      {/* About You Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b-2 border-indigo-200">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-bold">1</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">About You</h3>
        </div>

        {/* Bio */}
        <form.Field name="bio">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="text-gray-700 font-medium">
                  Bio *
                </FieldLabel>
                <Textarea
                  id={field.name}
                  placeholder="Tell us about yourself, your teaching style, and what makes you unique..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="min-h-30 resize-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <FieldDescription className="text-xs text-gray-500">
                  {field.state.value?.length || 0}/250 characters
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Education */}
        <form.Field name="education">
          {(field) => (
            <Field>
              <FieldLabel className="text-gray-700 font-medium">Education</FieldLabel>
              <Input
                placeholder="e.g., Master's in Mathematics from MIT"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </Field>
          )}
        </form.Field>
      </div>

      {/* Teaching Details Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b-2 border-purple-200">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-bold">2</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Teaching Details</h3>
        </div>

        {/* Category and Featured Toggle */}
        <div className="grid grid-cols-1  gap-6">
          <form.Field name="categoryId">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel className="text-gray-700 font-medium">Category *</FieldLabel>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select your teaching category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c?.id}>
                          {c?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* <form.Field name="isFeatured">
            {(field) => (
              <Field>
                <FieldLabel className="text-gray-700 font-medium">Featured Tutor</FieldLabel>
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Feature your profile?" />
                  </SelectTrigger>
                  <SelectContent>
                    {yesNo.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription className="text-xs text-gray-500">
                  Featured profiles get 3x more visibility
                </FieldDescription>
              </Field>
            )}
          </form.Field> */}
        </div>

        {/* Subjects */}
        <form.Field name="subjects">
          {(field) => (
            <Field>
              <FieldLabel className="text-gray-700 font-medium">Subjects</FieldLabel>
              <Input
                placeholder="e.g., Calculus, Linear Algebra, Physics"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
              <FieldDescription className="text-xs text-gray-500">
                Separate multiple subjects with commas
              </FieldDescription>
            </Field>
          )}
        </form.Field>

        {/* Languages */}
        <form.Field name="languages">
          {(field) => (
            <Field>
              <FieldLabel className="text-gray-700 font-medium">Languages</FieldLabel>
              <Input
                placeholder="e.g., English, Bengali, Hindi"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
              <FieldDescription className="text-xs text-gray-500">
                Languages you can teach in
              </FieldDescription>
            </Field>
          )}
        </form.Field>
      </div>

      {/* Pricing & Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b-2 border-pink-200">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
            <span className="text-pink-600 font-bold">3</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Pricing & Experience</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hourly Rate */}
            <form.Field name="hourly_rate">
            {(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                <Field data-invalid={isInvalid}>
                    <FieldLabel className="text-gray-700 font-medium">Hourly Rate ($) *</FieldLabel>
                    <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        $
                    </span>
                    <Input
                        type="number"
                        placeholder="25"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)} // Keep as string
                        onBlur={field.handleBlur}
                        className="pl-7 border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                    </div>
                    <FieldDescription className="text-xs text-gray-500">
                    Average rate: $20-50/hour
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
                );
            }}
            </form.Field>

            {/* Experience Years */}
            <form.Field name="experienceYears">
            {(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                <Field data-invalid={isInvalid}>
                    <FieldLabel className="text-gray-700 font-medium">
                    Years of Experience *
                    </FieldLabel>
                    <Input
                    type="number"
                    placeholder="3"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)} // Keep as string
                    onBlur={field.handleBlur}
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                    <FieldDescription className="text-xs text-gray-500">
                    Total years teaching experience
                    </FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
                );
            }}
            </form.Field>


        </div>


      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Create Tutor Profile
        </Button>
        <p className="text-center text-sm text-gray-500 mt-3">
          By creating a profile, you agree to our Terms & Conditions
        </p>
      </div>
    </form>
  </CardContent>
</Card>
    </div>
  );
}
