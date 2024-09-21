"use server";

import { auth } from "@/auth";
import { FeedBackFormValues } from "@/components/forms/FeedBackForm";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function createFeedBack(values: FeedBackFormValues) {
  const session = await auth();
  if (!session?.user.id) throw new Error("UnAuthorized!, You are not authenticated");
  const feedBack = await prisma.feedBack.create({
    data: {
      userId: session.user.id,
      from: session.user.pharmacyId ? "PHARMACY" : "USER",
      message: values.message,
      title: values.title,
      topic: values.type,
    },
  });
  if (!feedBack) throw new Error("Feedback Not Submitted, Try Again!!");
  if (session.user.pharmacyId) {
    revalidatePath(`/pharmacy/${session.user.pharmacyId}`);
  } else {
    revalidatePath(`/user/${session.user.id}`);
  }
  return feedBack;
}
