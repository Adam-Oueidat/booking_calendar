import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import type { Card } from "@/src/app/api/server_actions/actions";

type CardProps = {
  cardInfo: Card;
};

export default async function Card({ cardInfo }: CardProps) {
  const session = await auth();
  return (
    <div className="flex items-center justify-center group h-80 w-60 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front of card */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="relative h-full">
            <Image
              src={cardInfo?.imageUrl}
              width={400}
              height={600}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              alt={cardInfo?.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-blue-100 mb-2">
                {cardInfo?.title}
              </h3>
              <div className="h-1 w-12 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-100 mb-4">
                {cardInfo?.title}
              </h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                {cardInfo?.shortDescription}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Link href={cardInfo?.imageUrls} passHref>
                <button className="w-full rounded-lg bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-400 transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Läs mer
                </button>
              </Link>
              {session ? (
                <Link href="/calendar" passHref>
                  <button className="w-full rounded-lg bg-blue-600/30 py-2 px-4 text-sm font-medium text-blue-100 hover:bg-blue-600/40 transition-colors duration-200 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Gå till bokning
                  </button>
                </Link>
              ) : (
                <Link href="/login" passHref>
                  <button className="w-full rounded-lg bg-blue-600/30 py-2 px-4 text-sm font-medium text-blue-100 hover:bg-blue-600/40 transition-colors duration-200 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Logga in för att boka
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
