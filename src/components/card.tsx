import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  cardInfo?: any;
};

export default function Card({ title, cardInfo }: CardProps) {
  return (
    <>
      <div className="flex items-center justify-center group h-80 w-60 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <Image
            src={cardInfo[1].imageUrl}
            width={400}
            height={600}
            className="flex object-cover items-center justify-center w-full rounded-t-xl h-2/3"
            alt={cardInfo[1].title}
          />
          <div className="flex items-center justify-center text-center rounded-b-lg h-1/3 bg-black/40">
            <p> {cardInfo[1].title}</p>
          </div>
          <div className="flex min-h-full flex-col items-center justify-center absolute inset-0 h-full w-full rounded-xl bg-black/100 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <p className="text-base">{cardInfo[1].shortDescription}</p>
            <button className="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900">
              <Link href={cardInfo[1].imageUrls}>Read more</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
