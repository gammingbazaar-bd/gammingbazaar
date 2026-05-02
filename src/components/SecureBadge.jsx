"use client";
import { useState } from "react";

export default function SecureBadge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 text-center">
      
        <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-xl">
  <h2 className="text-xl font-semibold mb-4">
    Instant Top-Up <span className="text-green-400">• No Account Risk</span>
  </h2>

  <div className="grid grid-cols-3 gap-3 text-center mb-4">
    <div className="bg-white/5 p-3 rounded-xl">⚡<p>Fast</p></div>
    <div className="bg-white/5 p-3 rounded-xl">🔒<p>No Access</p></div>
    <div className="bg-white/5 p-3 rounded-xl">🎯<p>Accurate</p></div>
  </div>

  <p className="text-gray-300 text-sm">
    We never ask for your password. Top-ups are processed securely using your Player ID only.
  </p>

  <div className="mt-4 text-yellow-400 text-sm">
    Double-check your Player ID before confirming.
  </div>
</div>
      
    </div>
  );
}