import { UserRole } from "@prisma/client";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User as PrismaUser } from "@prisma/client";

export type ExtendedUser = User & {
  role: UserRole;
  pharmacyId: PrismaUser["slug"];
  phoneNumber: string | null;
};

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    pharmacyId: PrismaUser["slug"];
    phoneNumber: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
