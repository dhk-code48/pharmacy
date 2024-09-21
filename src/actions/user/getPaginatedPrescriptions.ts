import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedPrescriptionSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  label: z.string().optional(),
});

type GetPaginatedPrescriptionProps = z.infer<typeof paginatedPrescriptionSchema>;

export async function getPaginatedPrescriptions({ page, per_page, sort, description, label }: GetPaginatedPrescriptionProps) {
  const session = await auth();

  if (!session?.user) throw new Error("Unauthorized!!");
  if (!session?.user.id) throw new Error("Unauthorized!!");

  const offset = (page - 1) * per_page;

  const [column, order] = (sort?.split(".") as [keyof Prisma.PrescriptionOrderByWithRelationInput | undefined, "asc" | "desc" | undefined]) ?? [
    "createdAt",
    "desc",
  ];

  // Fetch orders of the specific user
  const prescriptions = await prisma.prescription.findMany({
    skip: offset,
    take: per_page,
    where: {
      userId: session.user.id,
      description: description ? { contains: description } : undefined,
      label: label ? { contains: label } : undefined,
    },
    orderBy: column && order ? { [column]: order } : { createdAt: "desc" },
    include: {
      images: true,
    },
  });

  const totalPrescriptions = await prisma.prescription.count({
    where: {
      userId: session.user.id,
      description: description ? { contains: description } : undefined,
      label: label ? { contains: label } : undefined,
    },
  });

  const pageCount = Math.ceil(totalPrescriptions / per_page);

  return {
    data: prescriptions,
    pageCount,
    total: totalPrescriptions,
  };
}
