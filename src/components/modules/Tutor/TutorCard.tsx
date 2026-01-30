import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tutor } from "@/types/tutor.type";
import Link from "next/link";



export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="max-w-12 max-h-12">
          <AvatarImage src={tutor.image} />
          <AvatarFallback className="bg-green-200 text-black">
            {tutor.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold">{tutor.name}</h3>
          <Badge variant="secondary">{tutor.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < Math.round(tutor.averageRating || 0) ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {tutor.averageRating}/5
        </span>
        </div>
        <div>${tutor.hourlyRate}/hour</div>
        <div>{tutor.experienceYears} years experience</div>
        <div>{tutor.totalSessionsCompleted} sessions completed</div>
      </CardContent>

      <CardFooter>
        <Link className="w-full" href={`/tutors/${tutor.id}`} passHref>
          <Button className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
