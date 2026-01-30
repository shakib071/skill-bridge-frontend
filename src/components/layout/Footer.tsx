"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo / Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="SkillBridge Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-bold text-lg">SkillBridge</span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Connecting students with the best tutors. Learn, grow, and achieve your goals with SkillBridge.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/" className="hover:text-indigo-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/tutors" className="hover:text-indigo-600">
                    Tutors
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-indigo-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-indigo-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Account</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/login" className="hover:text-indigo-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-indigo-600">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-gray-900 mb-2">Follow us</h4>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                    
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
