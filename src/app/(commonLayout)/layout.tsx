import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/Footer"

export default function commonLayout({children}: {children:React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar></Navbar>
        <main className="flex-1">
          {children}
        </main>
        <Footer></Footer>
    </div>
  )
}
