export interface Booking {
  id: string;
  booking_date: string;  
  start_time: string;     
  end_time: string;       
  duration: number;      
  total_price: string;    
  status: "CONFIRMED" | "CANCELLED" | "PENDING"; 
  studentId: string;
  tutorId: string;
  created_at?: string;
  updated_at?: string;
}
