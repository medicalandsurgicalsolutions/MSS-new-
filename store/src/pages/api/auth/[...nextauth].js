// Create file: pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
//import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    //GoogleProvider({
      //clientId: process.env.GOOGLE_CLIENT_ID,
      //clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //}),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  //pages: {
    //signIn: '/auth/signin',
    //error: '/auth/error',
  //},
});

