"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendNotification } from "../pwa";
import { PrescriptionUploadFormValues } from "@/components/forms/order/PrescriptionUploadCard";
import { Location } from "@/types";

export default async function createPrescription(
  values: PrescriptionUploadFormValues,
  pharmacySlug: string,
  pharmacyOwner: string,
  location: Location
) {
  const session = await auth();

  if (!values) throw new Error("Invalid Values provided!");

  if (!session?.user) throw new Error("Unauthorized");
  if (!session?.user.id) throw new Error("User Id not found!");

  const { label, prescription, district, description, municipality, state, town, ward } = values;

  // Check for the user's address
  let userAddress = await prisma.userAddress.findFirst({
    where: {
      municipality,
      state,
      town,
      ward,
      userId: session.user.id,
    },
  });

  // Create a new address if none is found
  if (!userAddress) {
    userAddress = await prisma.userAddress.create({
      data: {
        userId: session.user.id,
        municipality,
        state,
        town,
        ward,
        location: {
          create: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
        district,
      },
    });
  }

  // Create the prescription order
  const order = await prisma.prescription.create({
    data: {
      userId: session.user.id,
      label,
      description,
      orders: {
        create: {
          description,
          pharmacySlug,
          userId: session.user.id,
          userAddressId: userAddress.id, // Link to the new or existing address
        },
      },
      images: {
        createMany: {
          data: prescription.map((image) => ({ image })),
        },
      },
    },
    select: {
      orders: {
        select: {
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  sendNotification(pharmacyOwner, {
    message: `Hey, a new order has been requested from ${session.user.name}`,
    title: `New Order From Request`,
    icon: "/icons/order.png",
  });

  if (!order) throw new Error("Unexpected Error occurred!");
  return order;
}
