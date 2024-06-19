import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

const dummy_user = {
  id: 1,
  name: "test user",
  email: "admin@admin.com",
  password: "admin",
};

async function getUser(email: string, password: string): Promise<any> {
  if (email !== dummy_user.email || password !== dummy_user.password) {
    return null;
  }
  return {
    id: 1,
    name: "test user",
    email: email,
    password: password,
  };
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.email !== dummy_user.email ||
          credentials.password !== dummy_user.password
        ) {
          return null;
        }

        const user = await getUser(
          credentials.email as string,
          credentials.password as string
        );

        return user ?? null;
      },
    }),
  ],
});
