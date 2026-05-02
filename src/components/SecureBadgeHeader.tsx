"use client";

export default function SecureBadge() {
  const badges = [
    { text: "Instant Delivery", icon: "⚡" },
    
    { text: "4.9 Rating", icon: "⭐" },
  ];

  return (
    <div className="flex justify-center items-center md:flex-nowrap gap-2 mt-2">

      {badges.map((badge, i) => (
        <div
          key={i}
          className="
          flex items-center gap-1.5
          px-2.5 py-2
          text-[11px] md:text-xs
          text-slate-300
          bg-slate-800/60
          border border-slate-700
          rounded-full
          backdrop-blur
          transition-all duration-200
          hover:border-orange-400 hover:text-white
          "
        >
          <span className="text-orange-400 text-xs">
            {badge.icon}
          </span>
          {badge.text}
        </div>
      ))}

    </div>
  );
}