"use client";

import { cn } from "@formbricks/lib/cn";

export function ProgressBar({ progress, barColor }: { progress: number; barColor?: string }) {
  return (
    <div className="h-5 w-full rounded-full bg-slate-200 ">
      <div
        className={cn("h-5 rounded-full", barColor)}
        style={{ width: `${Math.floor(progress * 100)}%` }}></div>
    </div>
  );
}

export function HalfCircle({ value }: { value: number }) {
  const normalizedValue = (value + 100) / 200;
  const mappedValue = (normalizedValue * 180 - 180).toString() + "deg";

  return (
    <div className="w-fit">
      <div className="relative flex h-28 w-52 items-end justify-center overflow-hidden">
        <div
          className="bg-brand absolute h-24 w-48 origin-bottom rounded-tl-full rounded-tr-full"
          style={{ rotate: mappedValue }}></div>
        <div className="absolute h-20 w-40 rounded-tl-full rounded-tr-full bg-white "></div>
      </div>
      <div className="flex justify-between text-sm leading-10 text-slate-600">
        <p>-100</p>
        <p className="text-4xl text-black">{value}</p>
        <p>100</p>
      </div>
    </div>
  );
}
