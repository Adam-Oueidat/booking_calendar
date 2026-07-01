"use client";

import Image from "next/image";
import Link from "next/link";
import type { Card } from "@/src/app/api/server_actions/actions";
import { useState } from "react";

type CardProps = {
  cardInfo: Card;
};

// The facade palette, reused so a broken image still reads as a Nyhavn house.
const facadeColors = ["#E6A23C", "#C25342", "#2F6E69", "#4A6FA5", "#E8C766"];

function accentFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return facadeColors[Math.abs(hash) % facadeColors.length];
}

// On-brand stand-in when a card's image is missing or fails to load: a single
// gabled canal house with lit windows, echoing the hero skyline.
function FallbackArt({ seed }: { seed: string }) {
  const color = accentFor(seed);
  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-cph-navy to-cph-navy2 transition-transform duration-500 group-hover:scale-110">
      <svg
        width="96"
        height="120"
        viewBox="0 0 96 120"
        fill="none"
        aria-hidden="true"
      >
        <polygon points="6,46 48,12 90,46" fill={color} />
        <rect x="14" y="46" width="68" height="62" fill={color} />
        <rect x="26" y="60" width="14" height="18" fill="#F6E4A8" opacity="0.9" />
        <rect x="56" y="60" width="14" height="18" fill="#F6E4A8" opacity="0.9" />
        <rect x="26" y="86" width="14" height="18" fill="#F6E4A8" opacity="0.55" />
        <rect x="56" y="86" width="14" height="18" fill="#F6E4A8" opacity="0.55" />
      </svg>
    </div>
  );
}

export default function Card({ cardInfo }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showFallback = imgError || !cardInfo?.imageUrl;

  return (
    <div
      className="flex items-center justify-center group h-80 w-60 perspective-[1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 transform-3d ${isFlipped ? "transform-[rotateY(180deg)]" : ""}`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="relative h-full">
            {showFallback ? (
              <FallbackArt seed={cardInfo?.title ?? cardInfo?.id ?? ""} />
            ) : (
              <Image
                src={cardInfo?.imageUrl}
                width={400}
                height={600}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                alt={cardInfo?.title}
                onError={() => setImgError(true)}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-display text-xl font-bold text-cph-paper mb-2">
                {cardInfo?.title}
              </h3>
              <div className="h-1 w-12 bg-cph-ochre rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-linear-to-br from-cph-navy to-cph-navy2 p-6 transform-[rotateY(180deg)] backface-hidden">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-cph-paper mb-4">
                {cardInfo?.title}
              </h3>
              <p className="text-cph-sky text-sm leading-relaxed">
                {cardInfo?.shortDescription}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Link href={cardInfo?.imageUrls} passHref>
                <button className="w-full rounded-lg bg-cph-ochre py-2 px-4 text-sm font-medium text-cph-navy hover:bg-amber-300 transition-colors duration-200 flex items-center justify-center gap-2">
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
              <Link href="/calendar" passHref>
                <button className="w-full rounded-lg bg-white/5 py-2 px-4 text-sm font-medium text-cph-paper hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2 border border-cph-sky/25">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
