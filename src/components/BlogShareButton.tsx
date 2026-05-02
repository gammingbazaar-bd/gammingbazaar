"use client";

import { useEffect, useState } from "react";

export default function BlogShareButton({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  const [copied, setCopied] = useState(false);

  // ✅ FIX: client side only URL set
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    title + " " + url
  )}`;

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  return (
    <div className="space-y-3">

      {/* Native Share */}
      <button
        onClick={async () => {
          if (navigator.share) {
            await navigator.share({ title, url });
          }
        }}
        className="w-full py-2 rounded-lg bg-pink-500 hover:bg-pink-600"
      >
        Share Now
      </button>

      {/* Social */}
      <div className="grid grid-cols-3 gap-2">

        <a href={whatsappShare} target="_blank"
          className="text-center text-xs py-2 rounded-lg bg-green-500/20">
          WhatsApp
        </a>

        <a href={facebookShare} target="_blank"
          className="text-center text-xs py-2 rounded-lg bg-blue-500/20">
          Facebook
        </a>

        <a href={twitterShare} target="_blank"
          className="text-center text-xs py-2 rounded-lg bg-sky-500/20">
          Twitter
        </a>

      </div>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="w-full py-2 text-sm rounded-lg bg-white/10"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>

    </div>
  );
}