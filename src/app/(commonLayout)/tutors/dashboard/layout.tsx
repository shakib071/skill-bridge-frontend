"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TutorDashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Home", href: "/tutors/dashboard" },
  { name: "Sessions", href: "/tutors/dashboard/sessions" },
  { name: "Availability", href: "/tutors/dashboard/availability" },
  { name: "create-availability", href: "/tutors/dashboard/create-availability" },
  { name: "Bookings", href: "/tutors/dashboard/bookings" },
  { name: "Profile", href: "/tutors/dashboard/profile" },
  
];

export default function TutorDashboardLayout({ children }: TutorDashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-green-200 shadow-md ">
        <p className="text-center text-4xl font-bold py-2">Dashboard</p>
        <div className="max-w-7xl mx-auto px-3 sm:px-3 lg:px-4 flex justify-center items-center h-13">
      

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "outline"}
                  size="sm"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden bg-white shadow-md space-y-1 px-4 py-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Example: Stats overview card */}
        {pathname === "/tutor/dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent>
                <h3 className="text-sm font-medium text-gray-500">Total Sessions</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">24</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="text-sm font-medium text-gray-500">Upcoming Sessions</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">5</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="text-sm font-medium text-gray-500">Earnings</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">$1,240</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">4.8 ⭐</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Render children (other pages like sessions, availability, etc.) */}
        {children}
      </main>
    </div>
  );
}
