"use client";
import { useState } from "react";

type CardProps = {
  title: string;
};

export default function Card({ title }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    setIsFlipped(!isFlipped);
  }
  return (
    <>
      <div
        className={`max-w-sm rounded overflow-hidden shadow-2xl ${
          isFlipped ? "animate-open-close" : ""
        }`}
        onClick={flipCard}
      >
        {!isFlipped && (
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-white-700 text-base py-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        )}
        {isFlipped && (
          <div className="max-w-sm rounded overflow-hidden shadow 2-xl">
            <div className="font-bold text-xl mb-2">You flipped the card!</div>
            <p className="text-white text-base py-2">Cool huh?</p>
          </div>
        )}
      </div>
    </>
  );
}
