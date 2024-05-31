'use server';
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'bson';


const prisma = new PrismaClient();


export async function addEvent (state: void, formData: FormData) {
    const from = formData.get("event-date-from");
    const to = formData.get("event-date-to");

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    await prisma.event.create({
      data: {
        id: new ObjectId().toString(),
        name: "Event Name", // Add the name property here
        startDate: fromDate,
        endDate: toDate,
      },
    });

    revalidatePath("/");
  };

  
  
