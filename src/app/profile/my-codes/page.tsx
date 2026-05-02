"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCopy } from 'react-icons/fa';

export default function MyCodesPage() {
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [copySuccess, setCopySuccess] = useState(false);
    
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
        if (!user?.id) return;

        const fetchCodes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-codes/${user?.id}?page=${currentPage}`);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                
                if (data.data.length === 0) {
                    setError('No codes found for this user.');
                } else {
                    setOrders(data.data);
                    setTotalPages(data.last_page);
                    setError('');
                }
            } catch (err: any) {
                setError(err.message || 'Error fetching codes');
            } finally {
                setLoading(false);
            }
        };

        fetchCodes();
    }, [user, currentPage]);

    const handleCopyCode = (licenseKey: string) => {
        navigator.clipboard.writeText(licenseKey);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1224] via-[#0f172a] to-[#05070d] px-4 py-10">

        {/* Toast */}
        {copySuccess && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-xl border border-white/10 text-white px-6 py-3 rounded-full shadow-xl">
                <span className="text-green-400 font-bold">✓</span> Code Copied Successfully
            </div>
        )}

        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center justify-between mb-6">
                
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold">
                        🎟
                    </div>
                    <h2 className="text-white text-xl font-bold">My Codes</h2>
                </div>

                <a
                    href="https://shop.garena.my/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition"
                >
                    Redeem ↗
                </a>
            </div>

            {/* Main Box */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">

                {loading ? (
                    <div className="text-center py-20 text-gray-400">
                        Loading codes...
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-gray-400">
                        {error}
                    </div>
                ) : Object.keys(orders).length > 0 ? (
                    <div className="space-y-4">

                        {Object.values(orders).map((order: any) => {

                            let dataFields: any = {};
                            try { dataFields = JSON.parse(order.data); } catch { }

                            const isCompleted = order.status === "COMPLETED";
                            const isRejected = order.status === "Rejected";

                            return (
                                <div
                                    key={order.id}
                                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition"
                                >

                                    <div className="flex flex-col md:flex-row justify-between gap-6">

                                        {/* LEFT */}
                                        <div className="w-full md:w-1/2 text-gray-300 space-y-2">

                                            <p className="text-xxl text-white-400">
                                                Order #{order.order_id || order.id}
                                            </p>

                                            <div>
                                                        <p className="text-[10px] text-white-500 uppercase tracking-widest font-medium">Transaction</p>
                                                        <p className="font-mono font-bold text-white-800 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{order.trx_id}</p>
                                                    </div>

                                            <div className="flex justify-between items-center text-sm">
                                                    <span className="text-white-500">Package</span>
                                                    <span className="font-medium text-white-800">{dataFields.selectedRechargeType}</span>
                                                </div>

                                            <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-2">
                                                    <span className="text-white-500 font-medium">Amount Paid</span>
                                                    <span className="font-bold text-pink-600">৳ {order.amount_paid}</span>
                                                </div>

                                            <div className="flex justify-between items-center text-sm">
                                                    <span className="text-white-500 font-medium">Status</span>
                                                    <span className={`font-bold ${isCompleted ? 'text-green-600' : isRejected ? 'text-red-600' : 'text-yellow-600'}`}>{order.status}</span>
                                                </div>

                                            <div className="flex justify-between items-center text-sm">
                                                    <span className="text-white-500">Date</span>
                                                    <span className="font-medium text-white-800">{new Date(order.created_at).toLocaleString()}</span>
                                                </div>

                                        </div>
                                        

                                        {/* RIGHT */}
                                        <div className="w-full md:w-1/2">

                                            {isCompleted ? (
                                                order.license_key ? (
                                                    <div className="bg-black/30 border border-white/10 rounded-xl p-4 text-center">

                                                        <p className="text-xs text-gray-400 mb-2">
                                                            YOUR CODE
                                                        </p>

                                                        <div className="font-mono text-white break-all bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                                                            {order.license_key}
                                                        </div>

                                                        <button
                                                            onClick={() => handleCopyCode(order.license_key)}
                                                            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition"
                                                        >
                                                            <FaCopy className="inline mr-2" />
                                                            Copy Code
                                                        </button>

                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-400">
                                                        Code Not Available
                                                    </div>
                                                )
                                            ) : isRejected ? (
                                                <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4 text-center">
                                                    <p className="font-bold">Order Rejected</p>
                                                    <p className="text-sm">{order.reject_reason || "No reason provided"}</p>
                                                </div>
                                            ) : (
                                                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded-xl p-4 text-center">
                                                    Pending Processing...
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                ) : null}

            </div>
        </div>
    </div>
);
}