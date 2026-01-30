"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
 
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
  
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {useForm} from '@tanstack/react-form';
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const fromSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8,"Minimum length is 8"),
  email: z.email(),
  role: z.enum(["STUDENT", "TUTOR"]),
});



export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {

  const handleGoogleLogin = async() => {
    const data = authClient.signIn.social({
      provider:"google",
      callbackURL: process.env.NEXT_PUBLIC_CLIENT_URL as string
    });
    console.log(data);
  };

  

  const router = useRouter();

  const form = useForm({
    defaultValues:{
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
    validators:{
      onSubmit: fromSchema,
    },
    onSubmit: async ({value}) => {
      const toastId = toast.loading("Creating User");

      try{
        const {data, error} = await authClient.signUp.email(value);

        if(error) {
          toast.error(error.message, {id:toastId});
          return;
        }
        toast.success("User Created Successfully", {id : toastId});
        router.push("/login");
      }
      catch(err) {
        toast.error("Something went wrong, please try again.", {id:toastId})
      }
    },
  });
  
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={(e)=> {
            e.preventDefault();
            form.handleSubmit();
          }}
        
        >
          <FieldGroup>

    
            <form.Field
                name="name"
                
              >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your Name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
                name="email"
                
              >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      placeholder="Enter Your Email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
                name="password"
                
              >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>


            <form.Field name="role">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && field.state.meta.errors.length > 0;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Role</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      onOpenChange={(open) => {
                        if (!open) field.handleBlur();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="TUTOR">Tutor</SelectItem>
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            
            <FieldGroup>
              <Field>
                <Button type="submit">Register</Button>
                <Button onClick={()=> handleGoogleLogin()} variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Log in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
