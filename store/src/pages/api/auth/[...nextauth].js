import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const staticOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req, res) {
  // Temporary: Static options use karo
  return NextAuth(req, res, staticOptions);
}
