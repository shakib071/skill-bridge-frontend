
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, GraduationCap, Calendar } from "lucide-react"

interface adminOverview {
    totalBookings:string | number
    totalStudents:string | number
    totalTutors :string | number
    totalUsers: string | number

}


export default function AdminOverviewStats({data}:{data:adminOverview}) {
    // console.log(data);
    const stats = [
    {
        title: "Total Users",
        value: data?.totalUsers || 0,
        icon: Users,
    },
    {
        title: "Total Tutors",
        value: data?.totalTutors || 0,
        icon: UserCheck,
    },
    {
        title: "Total Students",
        value: data?.totalStudents || 0,
        icon: GraduationCap,
    },
    {
        title: "Total Bookings",
        value: data?.totalBookings || 0,
        icon: Calendar,
    },
    ]
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats?.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
