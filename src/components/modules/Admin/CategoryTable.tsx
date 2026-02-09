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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TutorCardSkeleton } from "../Tutor/LoadingSkeleton";
import { postCategory } from "@/services/action.service";



export interface Category {
  id: string;
  name: string;
  description: string;
}



export  function CategoriesTable({ categories }: {categories: Category[]}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleCreate = async () => {
    
    if (!name || !description) {
      toast.error("Please fill all fields");
      return;
    }
    
    setLoading(true);
    try {
      // const res = await fetch(`${APP_URL}/api/category`, {
      //   method: "POST",
      //   credentials:'include',
      //   headers: { 
      //     "Content-Type": "application/json" 
          
      //   },
      //   body: JSON.stringify({ name, description }),
      // });
      // const data = await res.json();
      console.log(name,description);
      const data = await postCategory(name,description);
      console.log(data);
      if (!data?.data?.success) throw new Error(data?.data?.message || "Failed to create category");
      toast.success("Category created!");
      setOpen(false);
      setName("");
      setDescription("");
      router.refresh();
      
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  if(loading){
    return <TutorCardSkeleton/>
  }

  return (
    <div className="space-y-4">
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">+ Create Category</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Textarea
                placeholder="Category Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Categories Table */}
      <div className="rounded-xl border shadow-sm bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">SL</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
             
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category?.description?.slice(0,100)}</TableCell>
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
