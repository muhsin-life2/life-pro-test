import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
export default NextAuth({

  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'text' },
        phone: { label: 'Phone', type: 'text' },
        code: { label: 'Password', type: 'password' },
        isPhone: { label: 'isPhone', type: 'text' }
      },
      authorize: async (credentials: any) => {
        var payload = {};
        if (credentials.isPhone === "true") {
          payload = {
            phone: credentials.phone,
            code: credentials.code,
          };
        }
        else {
          payload = {
            email: credentials.email,
            code: credentials.code,
          };
        }

        const url = 'https://prodapp.lifepharmacy.com/api/auth/verify-otp'

        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" }
        })

        const user = await res.json()

        if (res.ok && user) {
          return user;
        }

        return null;

      }
    }),
  ],
  theme: {
    colorScheme: "dark",
  },

  callbacks: {

    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },

    async jwt({ user, token }: { user: any, token: any }) {

      // token.userRole = "regusr"
      // token = user
      // console.log(token);
      if (user) {
        token = user.data.user
        token.token = user.data.token
      }
      return token
    },
    async session(params: { session: Session; user: User | AdapterUser; token: JWT; }): Promise<Session> {
      console.log(params.session);
      return params.session;
    },
  },

})