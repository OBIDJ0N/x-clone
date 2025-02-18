X-Clone

X-Clone is a Twitter-inspired social media platform built using Next.js, TypeScript, and Tailwind CSS. It provides authentication, theming, post creation, and real-time updates using modern web technologies.

# Live view
https://x-clone-snowy.vercel.app/

# Features

🔐 Authentication - Secure login with NextAuth.js

📝 Post Creation - Users can create and interact with posts

📌 State Management - Zustand for global state handling

🚀 Fast & Optimized - Built with Next.js and optimized for performance

# Tech Stack

 - Frontend: Next.js, React, TypeScript, Tailwind CSS

 - State Management: Zustand

 - UI Components: ShadCn, Radix UI, Lucide Icons, React Icons

 - Form Handling: React Hook Form & Zod validation

 - Data Fetching: SWR & Axios

 - Backend: MongoDB with Mongoose

 - Authentication: NextAuth.js

# Installation

To run the project locally, follow these steps:

# Clone the repository
git clone https://github.com/OBIDJ0N/x-clone.git

# Navigate to the project folder
cd x-clone

# Install dependencies
yarn install  # or npm install

# Start the development server
yarn dev  # or npm run dev

# Environment Variables

Create a .env.local file and add the necessary environment variables:

NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=mongodb+srv://your-mongodb-uri
NEXTAUTH_SECRET=your-secret-key

# Scripts

npm run dev - Run the development server

npm build - Build the application for production

npm start - Start the production server

npm lint - Run ESLint for code quality

Contribution

Feel free to fork the project and submit a pull request! Any contributions, issues, and feature requests are welcome.
