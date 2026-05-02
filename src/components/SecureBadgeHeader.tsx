"use client";

export default function SecureBadge() {
  const badges = [
    { text: "Instant Delivery", icon: "⚡" },
    
    { text: "4.9 Trustpilot Rating", icon: "⭐", link: "https://www.trustpilot.com/review/gammingbazaar.com" },

  ];

  return (
    <div className="flex justify-center items-center md:flex-nowrap gap-2 mt-2">

      {badges.map((badge, i) => {
  const content = (
    <div
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
  );

  return badge.link ? (
    <a key={i} href={badge.link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <div key={i}>{content}</div>
  );
})}

    </div>
  );
}