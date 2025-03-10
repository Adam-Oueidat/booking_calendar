import Card from "@/src/components/Card";
import { getCardInformation } from "../components/actions";

export default async function HomePage() {
  const cardInformation = await getCardInformation();
  return (
    <>
      <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="grid min-[320]:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center grid-space gap-4">
          {Object.entries(cardInformation).map((cardInfo, index) => (
            <Card key={index} cardInfo={cardInfo[1]} />
          ))}
        </div>
      </div>
    </>
  );
}
