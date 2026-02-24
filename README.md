# SkillBridge Frontend 🎓

> Frontend for SkillBridge — a tutoring platform that connects students with tutors for live, scheduled sessions.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. Authentication handled by **better-auth** with session-based auth and Google OAuth support.

---

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8)

---


## 🌐 Live Demo

| | URL |
|--|-----|
| **Frontend** | [https://skill-bridge-eight-cyan.vercel.app](https://skill-bridge-eight-cyan.vercel.app) |
| **Backend API** | [https://skillbridges-ten.vercel.app](https://skillbridges-ten.vercel.app) |


## 🔗 Repositories

| | URL |
|--|-----|
| **Frontend** | [github.com/shakib071/skill-bridge-frontend](https://github.com/shakib071/skill-bridge-frontend) |
| **Backend** | [github.com/shakib071/skill-bridge-backend](https://github.com/shakib071/skill-bridge-backend) |

---


## 🚀 Features

### 🔐 Authentication
- Email & password login / registration
- Google OAuth support
- Cookie-based session management
- Role-based route protection via middleware (`proxy.ts`)
- Banned & suspended user handling

### 👨‍🎓 Student Features
- Browse and filter tutors
- View tutor profiles and reviews
- Book sessions with available tutors (`/students/book-sessions/[id]`)
- View upcoming & completed sessions
- Mark sessions as completed or cancelled
- Leave reviews after completed sessions
- Dashboard with session overview statistics

### 👨‍🏫 Tutor Features
- Create tutor profile (`/create-tutor-profile`)
- Edit tutor profile (`/tutors/dashboard/edit-profile`)
- Create & manage availability slots
- View availability table
- View booked sessions from students
- Dashboard with student & session overview statistics

### 👑 Admin Features
- Platform-wide overview dashboard
- Manage all users — ban / suspend / activate
- Manage bookings
- Manage categories
- Feature / unfeature tutors

### 🎨 UI/UX
- Dark / Light mode support via `next-themes`
- Fully responsive design with Navbar & Footer
- Toast notifications via Sonner
- Form validation via TanStack Form + Zod
- Accessible components via Radix UI
- Loading skeletons & states
- Custom not-found pages per route

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js (App Router) | v16 |
| **Language** | TypeScript | v5 |
| **Runtime** | React | v19 |
| **Styling** | Tailwind CSS | v4 |
| **UI Components** | shadcn/ui + Radix UI | - |
| **Authentication** | better-auth | v1.4 |
| **Form Handling** | TanStack Form | v1 |
| **Validation** | Zod | v4 |
| **Date Handling** | date-fns | v4 |
| **Icons** | Lucide React | v0.563 |
| **Notifications** | Sonner | v2 |
| **Theme** | next-themes | v0.4 |
| **Deployment** | Vercel | - |

---


## 📁 Project Structure

```
src/
├── app/
│   └── (commonLayout)/          # Shared Navbar + Footer layout
│       ├── page.tsx             # Homepage
│       ├── login/
│       ├── register/
│       ├── logout/
│       ├── banned/              # Banned user page
│       ├── profile/
│       │   └── edit/
│       ├── create-tutor-profile/
│       ├── tutors/
│       │   ├── page.tsx         # Browse tutors
│       │   ├── [id]/            # Tutor detail page
│       │   ├── create-availability/
│       │   └── dashboard/
│       │       ├── page.tsx     # Tutor dashboard home
│       │       ├── profile/
│       │       ├── edit-profile/
│       │       ├── availability/
│       │       ├── create-availability/
│       │       └── sessions/
│       ├── students/
│       │   ├── page.tsx
│       │   ├── book-sessions/
│       │   │   └── [id]/        # Book a specific tutor
│       │   └── dashboard/
│       │       ├── page.tsx     # Student dashboard home
│       │       ├── sessions/
│       │       └── reviews/
│       └── admin/
│           ├── page.tsx
│           └── dashboard/
│               ├── page.tsx     # Admin dashboard home
│               ├── users/
│               ├── bookings/
│               └── categories/
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── Footer.tsx
│   │   └── modeToggle.tsx
│   ├── modules/
│   │   ├── Admin/               # BookingsTable, CategoryTable, UserTable, Home
│   │   ├── Authentication/      # login-form, register-form
│   │   ├── Bookings/            # BookSession, BookingTableForReview
│   │   ├── Homepage/            # HeroSection
│   │   ├── Profile/             # ProfileCard
│   │   ├── Session/             # Sessions
│   │   ├── Student/             # Home
│   │   ├── Tutor/               # TutorCard, TutorDetails, TutorProfile, AvailabilityTable, ReviewList, etc.
│   │   └── notfound/            # Notfound
│   └── ui/                      # shadcn/ui components
├── services/                    # Server actions & API calls
│   ├── action.service.ts        # Main server actions
│   ├── admin.service.ts
│   ├── availability.service.ts
│   ├── bookings.service.ts
│   ├── category.service.ts
│   ├── review.service.ts
│   ├── tutor.service.ts
│   └── user.service.ts
├── providers/
│   ├── SessionProvider.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── auth-client.ts           # better-auth client config
│   └── utils.ts
├── types/                       # TypeScript types
│   ├── availability.type.ts
│   ├── booking.type.ts
│   ├── session.type.ts
│   ├── tutor.type.ts
│   └── user.type.ts
└── proxy.ts                     # Middleware — auth & role-based route protection
```

---

## 📄 Pages & Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage |
| `/login` | Static | Login page |
| `/register` | Static | Register page |
| `/logout` | Static | Logout page |
| `/banned` | Static | Banned user page |
| `/profile` | Static | User profile |
| `/profile/edit` | Static | Edit profile |
| `/create-tutor-profile` | Static | Create tutor profile |
| `/tutors` | Static | Browse all tutors |
| `/tutors/[id]` | Dynamic | Tutor detail page |
| `/tutors/create-availability` | Static | Create availability (standalone) |
| `/tutors/dashboard` | Static | Tutor dashboard home |
| `/tutors/dashboard/profile` | Static | Tutor profile view |
| `/tutors/dashboard/edit-profile` | Static | Edit tutor profile |
| `/tutors/dashboard/create-availability` | Static | Create availability |
| `/tutors/dashboard/availability` | Dynamic | Manage availability slots |
| `/tutors/dashboard/sessions` | Dynamic | Tutor booked sessions |
| `/students` | Static | Students home |
| `/students/book-sessions` | Static | Browse sessions to book |
| `/students/book-sessions/[id]` | Dynamic | Book a specific tutor |
| `/students/dashboard` | Static | Student dashboard home |
| `/students/dashboard/sessions` | Dynamic | Student sessions |
| `/students/dashboard/reviews` | Dynamic | Leave reviews |
| `/admin` | Static | Admin home |
| `/admin/dashboard` | Dynamic | Admin dashboard |
| `/admin/dashboard/bookings` | Dynamic | Manage bookings |
| `/admin/dashboard/categories` | Static | Manage categories |
| `/admin/dashboard/users` | Dynamic | Manage users |

> `○ Static` — prerendered at build time  
> `ƒ Dynamic` — server-rendered on demand  
> `ƒ Proxy` — protected by middleware (`proxy.ts`)

---

## 🔐 Route Protection

`proxy.ts` middleware protects these routes:

| Route | Access | Redirect if unauthorized |
|-------|--------|--------------------------|
| `/admin/*` | ADMIN only | `/` |
| `/students/*` | STUDENT only | `/` |
| `/tutors/dashboard/*` | TUTOR only | `/` |
| `/tutors/create-availability/*` | TUTOR only | `/` |
| `/create-tutor-profile/*` | TUTOR only | `/` |
| `/profile/*` | Authenticated | `/login` |
| `/logout/*` | Authenticated | `/login` |
| `/dashboard` | Authenticated | Redirects by role |



### Installation

```bash
# Clone the repo
git clone https://github.com/shakib071/skill-bridge-frontend.git
cd skill-bridge-frontend

# Install dependencies
npm install

# Set up environment variables
.env

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_SERVER_URL= your server url
NEXT_PUBLIC_CLIENT_URL= your client url
SERVER_URL= your server url

```

---
## 👨‍💻 Author

**Shakib Hasan**
[![GitHub](https://img.shields.io/badge/GitHub-shakib--hasan-black?logo=github)](https://github.com/shakib071)
[![Email](https://img.shields.io/badge/Email-shakibhasan071@gmail.com-red?logo=gmail)](mailto:shakibhasan071@gmail.com)

SkillBridge Project
Bangladesh

---


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


