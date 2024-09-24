"use server";

import { auth } from "@/auth";
import { ReviewFormValues } from "@/components/forms/ReviewForm";
import { prisma } from "@/lib/db";

export default async function submitReview(values: ReviewFormValues, pharmacyId: number) {
  // Authenticate user
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized!");

  // Use a transaction to ensure all operations (create review and update average rating) are atomic
  return await prisma.$transaction(async (prisma) => {
    // Create the review
    const review = await prisma.review.create({
      data: {
        userId: session.user.id || "",
        pharmacyId,
        comment: values.comment,
        rating: values.rating,
      },
    });

    if (!review) throw new Error("Cannot submit your review, please try again!");

    // Fetch pharmacy's current average rating and review count
    const pharmacy = await prisma.pharmacy.findUnique({
      where: { id: pharmacyId },
      select: {
        averageRating: true,
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!pharmacy) throw new Error("Pharmacy not found!");

    // Calculate new average rating
    const totalReviews = pharmacy._count.reviews;
    const newAverageRating = (pharmacy.averageRating * (pharmacy._count.reviews - 1) + values.rating) / totalReviews;

    // Update the pharmacy with the new average rating
    await prisma.pharmacy.update({
      where: { id: pharmacyId },
      data: { averageRating: newAverageRating },
    });

    return review;
  });
}
