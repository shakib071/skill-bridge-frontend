/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import { useSessionContext } from "@/providers/SessionProvider";


export default function Home() {

  
  const { session, isPending }:any= useSessionContext();
  console.log({session,isPending});

  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}