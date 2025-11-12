import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import { User } from "../../../../models/users";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("Invalid password");

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    // 🔹 1️⃣ When user signs in
    async signIn({ user }) {
      await connectDB();

      // Check if user already exists
      let existingUser = await User.findOne({ email: user.email });

      // If new user (Google sign in), create in DB
      if (!existingUser) {
        existingUser = await User.create({
          name: user.name || "No Name",
          email: user.email,
          role: user.email === "arunprojecthub@gmail.com" ? "admin" : "user",
        });
      } else {
        // If already exists, ensure correct role
        if (
          user.email === "arunprojecthub@gmail.com" &&
          existingUser.role !== "admin"
        ) {
          existingUser.role = "admin";
          await existingUser.save();
        }
      }

      return true;
    },

    // 🔹 2️⃣ Add user role to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user";
      }
      return token;
    },

    // 🔹 3️⃣ Add role to session (client side)
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
