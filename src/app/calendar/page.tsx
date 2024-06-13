import Link from "next/link";
import Calendar from "@/src/components/calendar";
import Image from "next/image";
import backgroundImage from "@/src/images/nyhavn.jpg";

export default function CalendarPage() {
  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-full h-screen min-h-screen mr-24 p-8 pb-20 gap-16 sm:p-20">
        <Calendar />
      </div>
    </>
  );
}
