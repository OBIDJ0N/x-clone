import { AuthOptions } from "next-auth";
import { connectToDatabase } from "./mongoose";
import User from "@/database/user.model";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
    name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({
          email: credentials?.email,
        });

        return user
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOGGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      await connectToDatabase();
      const isExistingUser = await User.findOne({ email: session.user?.email });

      if (!isExistingUser) {
        const newUser = await User.create({
          email: session.user?.email,
          name: session.user?.name,
          profileImage: session.user?.image,
        });

        session.currentUser = newUser;
      }

      session.currentUser = isExistingUser;

      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET!,
};
