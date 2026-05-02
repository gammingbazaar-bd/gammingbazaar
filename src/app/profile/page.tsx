"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user-info');
        if (!storedUser) {
            router.push('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [router]);

   useEffect(() => {
    const fetchUserProfile = async () => {
        if (!user?.id) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user-profile/${user?.id}`
            );

            if (!response.ok) {
                console.error("Server error:", response.status);
                return;
            }

            const data = await response.json();
            setUserData(data);

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    fetchUserProfile();
}, [user]);

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    console.log("userData", user );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b1228] to-[#050816] text-white">
            <div className="container mx-auto px-4 py-10 max-w-5xl">

                {/* HEADER */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>

                    <img
                        src="/src_assets/img/default.png"
                        className="w-24 h-24 mx-auto rounded-full border-4 border-white/20 shadow-lg"
                    />

                    <h1 className="mt-4 text-2xl font-bold text-white">
                        Hi, <span className="text-pink-400 capitalize">{user.name}</span>
                    </h1>

                    <div className="mt-5 inline-flex items-center gap-3 bg-white/10 border border-white/10 px-6 py-3 rounded-full">
                        <span className="text-gray-300">Balance:</span>
                        <span className="text-xl font-bold text-pink-400">
                            ৳ {userData ? userData.available_balance : '...'}
                        </span>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                        ["Support Pin", "102302"],
                        ["Weekly Spent", userData?.weekly_spent],
                        ["Total Spent", userData?.total_spent],
                        ["Orders", userData?.total_orders]
                    ].map((item, i) => (
                        <div key={i}
                            className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xl hover:scale-[1.02] transition">
                            <h2 className="text-xl md:text-2xl font-bold text-pink-400">
                                {item[1] || "..."}
                            </h2>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                                {item[0]}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CONTENT CARDS */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    {/* ACCOUNT */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                        <div className="p-5 border-b border-white/10 flex items-center gap-3">
                            <h2 className="font-bold text-white">Account Info</h2>
                        </div>

                        <div className="p-6 grid gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                <div className="text-green-400 font-bold">✓ Verified Account</div>
                            </div>

                            <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-4 text-center">
                                <div className="text-pink-400 text-xl font-bold">
                                    ৳ {userData?.available_balance}
                                </div>
                                <p className="text-xs text-gray-400">Available Balance</p>
                            </div>
                        </div>
                    </div>

                    {/* USER INFO */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                        <div className="p-5 border-b border-white/10">
                            <h2 className="font-bold text-white">User Details</h2>
                        </div>

                        <div className="p-6 space-y-4 text-sm">
                            <div>
                                <p className="text-gray-400 text-xs">Email</p>
                                <p className="text-white font-medium">
                                    {userData?.user?.email || user.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400 text-xs">Phone</p>
                                <p className="text-white font-medium">
                                    {userData?.user?.phone || user.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
