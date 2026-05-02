"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderPage() {
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
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

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-orders/${user?.id}?page=${currentPage}`);
                if (!response.ok) throw new Error("No orders found");
                const data = await response.json();
                setOrders(data.data);
                setTotalPages(data.last_page);
            } catch (err: any) {
                setError(err.message || "Error fetching orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, currentPage]);

    if (!user) return <div className="min-h-screen flex items-center justify-center text-white bg-[#070b1a]">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b1228] to-[#050816] text-white">
            <div className="container mx-auto px-4 py-10 max-w-5xl">

                {/* HEADER */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>

                    <div className="flex items-center gap-3 relative z-10">
                        <h2 className="text-xl font-bold text-white">My Orders</h2>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

                    <div className="p-6">

                        {loading ? (
                            <div className="text-center py-20 text-gray-300">Loading orders...</div>
                        ) : error ? (
                            <div className="text-center py-10 text-red-400">{error}</div>
                        ) : Object.keys(orders).length > 0 ? (

                            <div className="space-y-4">

                                {Object.values(orders).map((order: any) => {

                                    let dataFields: any = {};
                                    try { dataFields = JSON.parse(order.data); } catch { }

                                    const isCompleted = order.status === "COMPLETED";
                                    const isRejected = order.status === "Rejected";

                                    return (
                                        <div key={order.id}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-all">

                                            {/* TOP */}
                                            <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-white/10 pb-4 mb-4">

                                                <div>
                                                    <p className="text-xs text-gray-400">Order ID</p>
                                                    <p className="font-bold text-white">
                                                        #{order.id}
                                                    </p>

                                                    <p className="text-xs text-gray-400 mt-2">Transaction</p>
                                                    <p className="font-mono text-sm text-gray-200">
                                                        {order.trx_id}
                                                    </p>
                                                </div>

                                                <div className="text-left md:text-right">
                                                    <p className="text-xs text-gray-400">Amount</p>
                                                    <p className="text-xl font-bold text-pink-400">
                                                        ৳ {order.amount_paid}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* BODY */}
                                            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">

                                                <div className="space-y-2">
                                                    <p><span className="text-gray-400">Date:</span> {new Date(order.created_at).toLocaleString()}</p>
                                                    <p><span className="text-gray-400">Package:</span> {dataFields?.selectedRechargeType || "N/A"}</p>
                                                </div>

                                                <div className="md:text-right space-y-2">

                                                    <div>
                                                        <span className="text-gray-400 mr-3 text-xs">Status</span>
                                                        <div className={`inline-block mt-1 px-4 py-1 rounded-full text-xs font-bold
                                                            ${isCompleted ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                                isRejected ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}
                                                        `}>
                                                            {order.status}
                                                        </div>
                                                    </div>

                                                    {isRejected && order.reject_reason && (
                                                        <p className="text-xs text-red-300 mt-2">
                                                            {order.reject_reason}
                                                        </p>
                                                    )}

                                                    {isCompleted && (
                                                        <p className="text-xs text-green-300 mt-2">
                                                            Completed: {new Date(order.updated_at).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}

                            </div>

                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                No orders found
                            </div>
                        )}

                    </div>

                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6 text-white">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20"
                        >
                            Prev
                        </button>

                        <span className="text-sm text-gray-300">
                            Page {currentPage} / {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}