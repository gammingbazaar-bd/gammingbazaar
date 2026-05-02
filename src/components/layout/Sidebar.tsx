"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar({ onClose }: { onClose: () => void }) {
    const [isMobile, setIsMobile] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 767);
        const storedUser = localStorage.getItem('user-info');
        if (storedUser) setUser(JSON.parse(storedUser));

        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        localStorage.removeItem('token');
        onClose(); // Close sidebar on logout
        window.location.href = '/login';
    };

    const containerStyle = isMobile ? { paddingTop: '18%' } : { paddingTop: '5%' };

    if (!user) return null;
    console.log(user)

    return (
        <div className="fixed inset-0 z-50">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* SIDEBAR */}
            <aside
                className="
                    absolute right-0 top-0 h-full w-72
                    bg-[#0b1224] border-l border-white/10
                    shadow-[0_0_40px_rgba(0,0,0,0.6)]
                    flex flex-col
                "
                style={containerStyle}
            >

                {/* SCROLL AREA */}
                <div className="flex-1 overflow-y-auto">

                    {/* USER HEADER */}
                    <div className="p-5 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <img
                                src="/src_assets/img/default.png"
                                className="w-12 h-12 rounded-full border border-pink-500/30"
                            />

                            <div>
                                <p className="text-white font-semibold">
                                    Hi, {user?.name?.length > 10
                                        ? `${user.name.substring(0, 10)}...`
                                        : user.name}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <button
                        onClick={handleLogout}
                        className="w-full py-2.5 mt-5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500
                        text-white font-medium shadow-lg hover:scale-[1.02] transition"
                    >
                        Logout
                    </button>
                    </div>

                    {/* MENU */}
                    <div className="px-2 py-3 space-y-1 text-sm">
                        {[
                            { href: "/profile", label: "My Account" },
                            { href: "/profile/order", label: "My Orders" },
                            { href: "/profile/my-codes", label: "My Codes" },
                            { href: "/profile/transactions", label: "My Transactions" },
                            { href: "/profile/add-money", label: "Add Money" },
                            { href: "/contact", label: "Contact Us" },
                            { href: "/faq", label: "FAQ" },
                        ].map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                onClick={onClose}
                                className="block px-4 py-3 rounded-lg text-gray-300
                                hover:bg-white/5 hover:text-white transition"
                            >
                                {item.label}
                            </Link>
                        ))}

                        

                    </div>

                    <div className="p-4 border-t border-white/10">

                    

                    <a
                        href="https://wa.me/+8801317956376"
                        target="_blank"
                        className="block mt-3 text-center py-3 rounded-xl
                        bg-green-500 text-white font-semibold shadow-lg
                        hover:bg-green-600 transition"
                    >
                        💬 Support
                    </a>

                </div>

                </div>

                {/* BOTTOM FIXED AREA */}
                

            </aside>

        </div>
    );
}