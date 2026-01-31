"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tutor } from "@/types/tutor.type";


export default  function TutorProfilePage({ tutor }: { tutor: Tutor }) {

    
   


  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card className="p-6">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="w-24 h-24">
            {tutor.image ? (
              <AvatarImage src={tutor.image} />
            ) : (
              <AvatarFallback className="bg-blue-100 text-blue-700 text-3xl">
                {tutor.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <CardTitle className="text-2xl font-bold">{tutor.name}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{tutor.category}</Badge>
              {tutor.isFeatured && <Badge variant="destructive">Featured</Badge>}
            </div>

            <div className="flex items-center gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(tutor.averageRating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {tutor.averageRating}/5 ({tutor.totalReviews} reviews)
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-6 space-y-4">
          {tutor.bio && (
            <div>
              <h3 className="font-semibold text-lg mb-1">Bio</h3>
              <p>{tutor.bio}</p>
            </div>
          )}

          {tutor.subjects && tutor.subjects.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-1">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject) => (
                  <Badge key={subject}>{subject}</Badge>
                ))}
              </div>
            </div>
          )}

          {tutor.languages && tutor.languages.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-1">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.languages.map((lang) => (
                  <Badge key={lang}>{lang}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div>
              <h4 className="font-semibold">Hourly Rate</h4>
              <p>${tutor.hourlyRate}/hr</p>
            </div>
            <div>
              <h4 className="font-semibold">Experience</h4>
              <p>{tutor.experienceYears} years</p>
            </div>
            <div>
              <h4 className="font-semibold">Total Sessions</h4>
              <p>{tutor.totalSessionsCompleted}</p>
            </div>
            <div>
              <h4 className="font-semibold">Reviews</h4>
              <p>{tutor.totalReviews}</p>
            </div>
          </div>

          <Button className="mt-6 w-full" size="lg">
            Book Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
