import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  cardInfo?: any;
};

export default function Card({ title, cardInfo }: CardProps) {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="group h-80 w-60 [perspective:1000px]">
          <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="grid grid-cols-1 absolute inset-0 rounded-xl bg-black/40 ">
              <div className="flex items-center justify-center">
                <Image
                  src={cardInfo[1].imageUrl}
                  width={400}
                  height={600}
                  className="flex items-center justify-center w-full h-full rounded-xl"
                  alt={cardInfo[1].title}
                />
              </div>
              <div className="flex items-center justify-center text-center">
                <p> {cardInfo[1].title}</p>
              </div>
            </div>
            <div className="absolute inset-0 h-full w-full rounded-xl bg-black/100 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center">
                <p className="text-base">{cardInfo[1].shortDescription}</p>
                <button className="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900">
                  <Link href={cardInfo[1].imageUrls}>Read more</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
