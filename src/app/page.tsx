import Link from "next/link";
import Card from "@/src/components/card";

export default async function HomePage() {
  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Link href="/calendar">Book a date now!</Link>
        <div className="grid grid-cols-3 items-center justify-center flex">
          <Card title="This is a title for card 1" />
          <Card title="This is a title for card 2" />
          <Card title="This is a title for card 3" />
        </div>
      </div>
    </>
  );
}
