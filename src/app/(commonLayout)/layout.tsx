import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/Footer"

export default function commonLayout({children}: {children:React.ReactNode}) {
  return (
    <div>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
    </div>
  )
}
