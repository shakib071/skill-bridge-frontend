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
import { changeFeatureStatus, handleBan } from "@/services/action.service";
// import { useEffect } from "react";
// import { userService } from "@/services/user.service";


export function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();
  
  console.log(users);

  const handleBanUnban = async(user: User) => {
    let status = "ACTIVE";
    if (user?.status == "ACTIVE") {
      status = "BANNED";
    }
  

    try{
      const toastId = toast.loading("Updating status");
      // const result = await fetch(`${APP_URL}/api/user/update-user-status/${user?.id}`,
      //   {
      //       method: "PATCH",
      //       credentials: "include",
      //       headers: {
      //           "Content-Type": "application/json",
      //           // Cookie: cookieStore.toString(),
      //       },
      //       body: JSON.stringify({status:status})
      //   }
      // );

      // const data = await result.json();

      const result = await handleBan(user?.id,status);

      if(!result?.data?.success){
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

  const handleFeatureTutor = async(tutorId:string,feature:boolean) => {
    const toastId = toast.loading("updating feature tutor")
      // const result = await fetch(`${APP_URL}/api/tutor/update-isfeatured/${tutorId}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   cache:"no-cache",
      //   credentials: "include",
      //   body: JSON.stringify({ isFeatured: feature }), 
      // });

      // const data = await result.json();
      // console.log(result);
      console.log({tutorId,feature});
      const result = await changeFeatureStatus(tutorId,feature);
      console.log(result);

      if(!result?.data?.success){
        toast.error("Updating failed",{id:toastId});
        return;
      }

      toast.success("Update Successfull",{id:toastId});
      router.refresh();
  }

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
                <div>
   


                {user?.status == "ACTIVE" && user?.role=="TUTOR" && user?.tutorProfile?.isFeatured!=null && user?.tutorProfile?.isFeatured  
                  && (
                    <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleFeatureTutor(user?.tutorProfile?.id as string,false)}
                  >
                    Remove from Feature Tutor
                  </Button>
                  )
                }

                {user?.status == "ACTIVE" && user?.role=="TUTOR" && user?.tutorProfile?.isFeatured!=null &&  !user?.tutorProfile?.isFeatured 
                  && (
                    <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleFeatureTutor(user?.tutorProfile?.id as string,true)}
                  >
                    add to Feature Tutor
                  </Button>
                  )
                }

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

                </div>


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
