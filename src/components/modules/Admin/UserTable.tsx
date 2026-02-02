"use client";

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
import { User } from "@/types/user.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { userService } from "@/services/user.service";


export function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();
  const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;
  const handleBanUnban = async(user: User) => {
    let status = "ACTIVE";
    if (user?.status == "ACTIVE") {
      status = "BANNED";
    }
  

    try{
      const toastId = toast.loading("Updating status");
      const result = await fetch(`${APP_URL}/api/user/update-user-status/${user?.id}`,
        {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({status:status})
        }
      );

      const data = await result.json();

      if(!data?.success){
        toast.error("Updating failed",{id:toastId});
        return;
      }

      toast.success("Update Successfull",{id:toastId});

      router.refresh();
      



    }
    catch(e) {
      
    }

    // const result = await userService.updateUserStatus(user?.id,status);


    console.log(status);

  };

  return (
    <div className="rounded-xl border shadow-sm bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">SL</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={user?.id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell className="font-medium">
                {user?.name}
              </TableCell>

              <TableCell>{user?.email}</TableCell>

              <TableCell>
                <Badge variant="outline">{user?.role}</Badge>
              </TableCell>

              <TableCell>
                {user?.status == "ACTIVE" ? (
                  <Badge className="bg-green-100 text-green-700">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="destructive">Banned</Badge>
                )}
              </TableCell>

              <TableCell className="text-right">
                {user?.status == "ACTIVE" ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBanUnban(user)}
                  >
                    Ban
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleBanUnban(user)}
                  >
                    Unban
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
