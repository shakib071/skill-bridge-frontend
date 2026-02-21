import { Tutor } from "@/types/tutor.type";
import { TutorCard } from "./TutorCard";

interface TutorsProps {
  title: string;
  tutors: Tutor[];
}

export function Tutors({title, tutors }: TutorsProps) {
  console.log(tutors);
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">
          {title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tutors?.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
          
        </div>

        <div>
          {
            !tutors || tutors?.length==0 && (
              <p className="text-center font-bold text-3xl mt-5">No tutor Available</p>
            )
          }
        </div>
      </div>
    </section>
  );
}
