import { Tutor } from "@/types/tutor.type";
import { TutorCard } from "./TutorCard";

export function FeaturedTutors({ tutors }: { tutors: Tutor[] }) {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">
          Featured Tutors
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
}
