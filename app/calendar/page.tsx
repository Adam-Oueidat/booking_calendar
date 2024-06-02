import Link from "next/link";
import Calendar from "../components/calendar";
import prisma from "@/app/lib/db";

export default function Home() {
  const events = prisma.event.findMany();

  return (
    <>
      <div className="font-sans flex left-8 top-8 relative float-left p-2">
        <button className="bg-blue-500 border-blue-500 hover:bg-blue-800 rounded font-bold py-2 px-4">
          <Link href="/">Tillbaka</Link>
        </button>
      </div>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Calendar events={events} />
      </div>
    </>
  );
}
