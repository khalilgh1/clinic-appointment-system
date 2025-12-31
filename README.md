# Clinic Appointment System

A responsive Next.js application for managing medical clinic appointments. This repository contains a public-facing website for patients and an admin dashboard for clinic staff to manage services, doctors, and appointments.

## Features

- Booking flow: select service → choose doctor → pick schedule → provide patient info.
- Admin dashboard: manage doctors, services, schedules, and appointments.
- Authentication and role-based access control for admin routes.
- Email notifications for booking confirmations.
- Profile image upload for doctors.
- Real-time availability checks for doctors and services.
- Responsive UI with modular components and modal dialogs.
- REST-like API routes (server-side endpoints) for appointments, services, doctors, and uploads.

## Deployed Site

Paste your deployed website URL here:

https://clinic-appointment-system-two.vercel.app/

## Technologies

- Next.js (App Router)
- React
- Supabase (auth, database, storage)
- Node.js serverless API routes
- CSS modules / Tailwind (project styling configured in `src/app`)


## API Routes (examples)

- `src/app/api/appointments/route.js` — appointment CRUD and booking
- `src/app/api/doctors/route.js` — doctor listings and management
- `src/app/api/services/route.js` — service listings
- `src/app/api/send-email/route.js` — booking confirmation emails

