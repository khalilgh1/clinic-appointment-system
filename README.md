This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Last Sprint Contribution - Medical Booking System

## Contributor

BELAMRI Chakib

## Files Worked On

### UI Components

- **Booking Flow Steps**: `Step1Service.js`, `Step2Doctor.js`, `Step3Schedule.js`, `Step4Info.js`, `Finalization.js`
- **UI Cards**: `ServiceCard.js`, `DoctorCard.js`, `doctor_card.js`
- **Layout**: `Sidebar.js`, `page.js`

### State Management

- **Context**: `BookingContext.js` - Global state for booking flow

### Backend Integration

- **Data Hooks**: `useServices.js`, `useDoctors.js`, `useDoctorsAvailability.js`

## Key Contributions

### UI Layer

- Responsive and User-friendly pages

### State Management

- Implemented booking context with reducer pattern
- Managed step navigation and form state persistence
- Handled form validation with XSS protection

### Backend Integration

- Created reusable hooks for data fetching
- Implemented proper error handling for API failures
- Prepared components for server-side rendering compatibility

## Production Ready

- All components pass TypeScript compilation
- No development code in production build
- Comprehensive testing scenarios provided
- Ready for `npm run build` and deployment
