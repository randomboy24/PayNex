import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone number",
      credentials: {
        phone: {
          label: "Phone number: ",
          type: "text",
          placeholder: "1234567890",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
          required: true,
        },
      },
      async authorize(credentials: any) {
        if (!credentials.password || !credentials.phone) {
          return null;
        }

        try {
          const existingUser = await db.user.findFirst({
            where: {
              phone_number: credentials.phone,
            },
          });
          if (!existingUser) return null;
          const isValid = await bcrypt.compare(
            credentials.password,
            existingUser?.password as string
          );
          if (existingUser && isValid) {
            return {
              id: existingUser.user_id,
              phone: existingUser.phone_number,
            };
          }
        } catch (err) {
          console.log("something went wrong while existing user db call" + err);
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        try {
          const user = await db.user.create({
            data: {
              phone_number: credentials.phone,
              password: hashedPassword,
            },
          });
          if (user) {
            return {
              id: user.user_id,
              phone: user.phone_number,
            };
          } else {
            return null;
          }
        } catch (err) {
          console.log("something went wrong");
          console.log("Error: " + err);
        }
        return null;
      },
    }),
  ],
  secret: "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.user_id = token.sub;
      return session;
    },
  },
};
