"use client"
import { Tutors } from '@/components/modules/Tutor/FeaturedTutor';
import { TutorCardSkeleton } from '@/components/modules/Tutor/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tutor } from '@/types/tutor.type';
import { useEffect, useState } from "react";

export default function TutorPage() {

    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [tutors1, setTutors1] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const APP_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

    const [search, setSearch] = useState("");
    const [ratingSort, setRatingSort] = useState("desc");
    const [priceSort, setPriceSort] = useState("desc");

    const handleSearch =() => {
      // console.log(search,ratingSort,priceSort);

      if(search==""){
          setTutors(tutors1);
          return;
      }
      const tutorData = tutors1;
      const filteredTutors = tutorData.filter((tutor) => {
          
          const searchLower = search.toLowerCase();
          
          const nameMatch = tutor?.name?.toLowerCase().includes(searchLower);
          const subjectMatch = tutor?.subjects?.some((s) =>
            s.toLowerCase().includes(searchLower)
          );
          return nameMatch || subjectMatch;
        })
        .sort((a, b) => {
          
          if (ratingSort === "asc") return (a.averageRating || 0) - (b.averageRating || 0);
          if (ratingSort === "desc") return (b.averageRating || 0) - (a.averageRating || 0);
          
          
          if (priceSort === "asc") return Number(a.hourlyRate) - Number(b.hourlyRate);
          if (priceSort === "desc") return Number(b.hourlyRate) - Number(a.hourlyRate);
          
          return 0; 
        });

        setTutors(filteredTutors);

    }

    useEffect(() => {
    
      fetch(`${APP_URL}/api/tutor`,{
          cache:"no-store",
      })
          .then(res => res.json())
          .then(data => {
          setTutors(data.data);
          setTutors1(data.data);
          // console.log(data?.data);
          setLoading(false);
          });
    }, [APP_URL]);

  return (
        <div>
          
          <div className="w-[90%] mx-auto">
            <div>

              <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-white rounded-lg shadow">
              
              <Input
                placeholder="Search by name or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                
                className="flex-1"
              />

            <Select value={ratingSort} onValueChange={(value) => setRatingSort(value)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Rating: Low → High</SelectItem>
                <SelectItem value="desc">Rating: High → Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceSort} onValueChange={(value) => setPriceSort(value)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Price: Low → High</SelectItem>
                <SelectItem value="desc">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>


              <Button onClick={()=> handleSearch()} variant="secondary">
                Apply
              </Button>
            </div>
            
            {
              loading ? (
                <div className="py-20 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TutorCardSkeleton key={i} />
                  ))}
                </div>
              ):
              (
                <Tutors title="All Tutors" tutors={tutors} ></Tutors>
              )
            }
            </div>
            
          </div>
        </div>
  )
}
