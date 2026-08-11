import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CLIENT" | "PROFESSIONAL" | "ADMIN";
      accountType: "INDIVIDUAL" | "EMPLOYER";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "CLIENT" | "PROFESSIONAL" | "ADMIN";
    accountType?: "INDIVIDUAL" | "EMPLOYER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "CLIENT" | "PROFESSIONAL" | "ADMIN";
    accountType?: "INDIVIDUAL" | "EMPLOYER";
  }
}
