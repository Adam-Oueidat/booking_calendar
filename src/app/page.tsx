import Link from "next/link";
import Card from "@/src/components/card";
import { getCardInformation } from "../components/actions";
import Image from "next/image";

export default async function HomePage() {
  const cardInformation = await getCardInformation();
  return (
    <>
      <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="grid grid-cols-3 items-center justify-center grid-space gap-4">
          {Object.entries(cardInformation).map((cardInfo, index) => (
            <Card
              key={index}
              title="This is a title for card 1"
              cardInfo={cardInfo}
            />
          ))}
        </div>
        <button className="bg-gray-500/80 border-black hover:bg-gray-800 rounded-md  font-bold py-2 px-4">
          <Link href="/calendar">Book a date now!</Link>
        </button>
      </div>
    </>
  );
}
