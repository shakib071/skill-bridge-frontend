"use client";


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Edit } from "lucide-react";
import { Tutor } from "@/types/tutor.type";

interface TutorProfileCardProps {
  tutor: Tutor|null;
  onEdit?: () => void;
}

export default  function TutorProfileCard({
  tutor,
  onEdit,
}: TutorProfileCardProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-6">
        <div className="relative h-24 w-24 rounded-full overflow-hidden border">
          <Image
            src={tutor?.image || "/avatar-placeholder.png"}
            alt={tutor?.name || "Tutor"}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{tutor?.name}</h2>
          <p className="text-sm text-muted-foreground">{tutor?.category}</p>

          <div className="flex gap-2 mt-2">
            {tutor?.isFeatured && (
              <Badge variant="default">Featured</Badge>
            )}
            <Badge variant="secondary">
              {tutor?.experienceYears}+ yrs experience
            </Badge>
          </div>
        </div>

        {onEdit && (
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{tutor?.bio}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Hourly Rate:</span> ${tutor?.hourlyRate}
          </div>
          <div>
            <span className="font-medium">Sessions Completed:</span>{" "}
            {tutor?.totalSessionsCompleted}
          </div>
          <div>
            <span className="font-medium">Rating:</span>{" "}
            {tutor?.averageRating} ({tutor?.totalReviews} reviews)
          </div>
        </div>

        <div>
          <p className="font-medium mb-1">Subjects</p>
          <div className="flex flex-wrap gap-2">
            {tutor?.subjects?.map((subject) => (
              <Badge key={subject} variant="outline">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-1">Languages</p>
          <div className="flex flex-wrap gap-2">
            {tutor?.languages?.map((lang) => (
              <Badge key={lang} variant="outline">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
