import NextAuth from "next-auth";
import { providers } from "@/lib/auth/providers";

const handler = NextAuth({
  providers,
  pages: {
    signIn: "/login", // custom login page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.provider = account.provider;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          provider: token.provider as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
