"use client";
import React, { useState, useEffect } from "react";

export default function NoticeBanner({ notice }: { notice: any }) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const dismissed = localStorage.getItem("notice-dismissed");
        if (dismissed === "true") {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("notice-dismissed", "true");
    };

    if (!notice || notice.status !== "1" || !isVisible) {
        return null;
    }

    return (
        <section className="w-full mb-6">

            <div className="w-full max-w-7xl mx-auto">

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0b1224] shadow-xl">

                    <div className="flex items-start justify-between p-5">

                        <div className="space-y-1">

                            <h2 className="text-white font-semibold text-base">
                                Notice Update
                            </h2>

                            <div className="text-gray-300 text-sm">
                                <div dangerouslySetInnerHTML={{ __html: notice.message }} />
                            </div>

                        </div>

                        <button
                            onClick={handleClose}
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
                        >
                            ✕
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}