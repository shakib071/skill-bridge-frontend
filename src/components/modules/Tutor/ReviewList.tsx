"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  created_at: string;
  booking: {
    student: {
      name: string;
      image?: string | null;
    };
  };
};

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-center text-muted-foreground pb-10">
        No reviews yet
      </p>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-10">
      {reviews.map((review) => {
        const name = review.booking.student.name;
        const image = review.booking.student.image;

        return (
          <Card key={review.id} className=" shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              
              <Avatar>
                <AvatarImage src={image ?? undefined} />
                <AvatarFallback>
                  {name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              
              <div className="flex-1">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>

              
              <Badge variant="outline" className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {review.rating}
              </Badge>
            </CardHeader>

            {review.comment && (
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700">
                  {review.comment}
                </p>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
