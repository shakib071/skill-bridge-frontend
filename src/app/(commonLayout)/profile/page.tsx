import { ProfileCard } from '@/components/modules/Profile/ProfileCard';
import React from 'react'

const dummyUser = {
  name: "Alice Johnson",
  email: "alice@example.com",
  emailVerified: true,
  image: "", 
  createdAt: "2022-06-15T10:30:00Z",
  role: "User",
};

export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <ProfileCard  />

    </div>
  )
}
