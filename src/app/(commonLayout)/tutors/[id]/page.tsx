
import ReviewList from '@/components/modules/Tutor/ReviewList';
import TutorProfilePage from '@/components/modules/Tutor/TutorDetails'
import { ReviewService } from '@/services/review.service';
import { tutorService } from '@/services/tutor.service';
import { Tutor } from '@/types/tutor.type';



export default async function page({
    params
}:{
    params: Promise<{ id: string }>;
}) {
    
    const {id} = await params;
    
     const {data: tutors} = await tutorService.getTutorDetails(id);
     const {data: reviews } = await ReviewService.getAllReviewByTutorID(id);
     const tutor:Tutor = tutors?.data[0]
    //  console.log(tutor)
     console.log(reviews?.data);
    
    

  return (
    <div>
        <p className='text-center text-4xl font-bold'>Tutor Deatails </p>
        <TutorProfilePage tutor={tutor}></TutorProfilePage>
        <ReviewList reviews={reviews?.data}></ReviewList>
    </div>
  )
}
