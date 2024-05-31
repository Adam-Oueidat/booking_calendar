import Link from "next/link";
import Calendar from "../components/calendar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default function Home() {
  const events = prisma.event.findMany();

  return (
    <>
      <div className="font-sans justify-end">
        <Link href="/">Tillbaka</Link>
      </div>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Calendar events={events} />
      </div>
    </>
  );
}
