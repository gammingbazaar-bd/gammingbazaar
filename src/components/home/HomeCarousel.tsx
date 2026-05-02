"use client";
import React, { useState, useEffect } from 'react';

export default function HomeCarousel({ banners }: { banners: string[] }) {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        if (!banners || banners.length === 0) return;
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners]);

    if (!banners || banners.length === 0) return null;

    return (
        <div className="relative w-full overflow-hidden rounded-2xl mt-5 group
shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10">

  {/* SLIDES */}
  <div
    className="flex transition-transform duration-700 ease-out"
    style={{ transform: `translateX(-${slideIndex * 100}%)` }}
  >
    {banners.map((img, i) => (
      <div key={i} className="min-w-full relative">

        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/banner_images/${img}`}
          alt={`Banner ${i}`}
          className="w-full h-[180px] md:h-[360px] object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      </div>
    ))}
  </div>

  {/* LEFT BUTTON */}
  <button
    onClick={() =>
      setSlideIndex((prev) => (prev - 1 + banners.length) % banners.length)
    }
    className="absolute left-3 top-1/2 -translate-y-1/2
    w-10 h-10 flex items-center justify-center
    bg-black/40 hover:bg-pink-500 text-white
    rounded-full opacity-0 group-hover:opacity-100
    transition shadow-lg"
  >
    ◀
  </button>

  {/* RIGHT BUTTON */}
  <button
    onClick={() =>
      setSlideIndex((prev) => (prev + 1) % banners.length)
    }
    className="absolute right-3 top-1/2 -translate-y-1/2
    w-10 h-10 flex items-center justify-center
    bg-black/40 hover:bg-pink-500 text-white
    rounded-full opacity-0 group-hover:opacity-100
    transition shadow-lg"
  >
    ▶
  </button>

  {/* DOTS */}
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">

    {banners.map((_, i) => (
      <button
        key={i}
        onClick={() => setSlideIndex(i)}
        className={`transition-all duration-300 rounded-full
        ${i === slideIndex
          ? "w-6 h-2 bg-pink-500"
          : "w-2 h-2 bg-white/40"
        }`}
      />
    ))}

  </div>

</div>
    );
}
