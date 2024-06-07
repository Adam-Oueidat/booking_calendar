import { useState } from "react";

type CardProps = {
  title: string;
};

export default function Card({ title }: CardProps) {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="group h-40 w-80 [perspective:1000px]">
          <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center">
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="absolute inset-0 h-full w-full rounded-xl bg-black/100 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center">
                <p className="text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
                <button className="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
