"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TransactionsPage() {
    const [user, setUser] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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

        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-transactions/${user?.id}?page=${currentPage}`);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                
                if (data.data.length === 0) {
                    setError('No transactions found for this user.');
                } else {
                    setTransactions(data.data);
                    setTotalPages(data.last_page);
                    setError('');
                }
            } catch (err: any) {
                setError(err.message || "Error fetching transactions");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [user, currentPage]);

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0b1224] text-white px-4 py-10">

            <div className="max-w-5xl mx-auto">

                {/* CARD */}
                <div className="bg-[#111a2e] border border-white/10 rounded-3xl overflow-hidden shadow-xl">

                    {/* HEADER */}
                    <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                            💸
                        </div>
                        <h2 className="text-lg font-bold text-white">All Transactions</h2>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                        {loading ? (
                            <div className="text-center py-20 text-gray-400">
                                Loading transactions...
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 text-gray-400">
                                <div className="text-3xl mb-2">💸</div>
                                {error}
                            </div>
                        ) : (
                            <div className="space-y-3">

                                {transactions.map((t, i) => {

                                    const isSuccess = t.status === 'success' || t.status === 'completed';
                                    const isFailed = t.status === 'failed' || t.status === 'rejected';

                                    return (
                                        <div
                                            key={i}
                                            className="bg-[#0f172a] border border-white/10 rounded-2xl p-5
                                            hover:border-pink-500/30 transition"
                                        >

                                            <div className="flex flex-col md:flex-row justify-between gap-4">

                                                {/* LEFT */}
                                                <div>
                                                    <p className="text-xs text-gray-400">TRX ID</p>
                                                    <p className="font-mono text-white font-bold">
                                                        {t.trx_id}
                                                    </p>
                                                </div>

                                                {/* MIDDLE */}
                                                <div className="text-sm text-gray-400">
                                                    <p>
                                                        Due: <span className="text-white">৳ {t.amount_due}</span>
                                                    </p>
                                                    <p>
                                                        Paid: <span className="text-pink-400 font-bold">৳ {t.amount_paid}</span>
                                                    </p>
                                                </div>

                                                {/* RIGHT */}
                                                <div className="flex flex-col md:items-end gap-2">

                                                    <span className="text-xs text-gray-500">Status</span>

                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border
                                                        ${isSuccess
                                                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                                            : isFailed
                                                                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}
                                                    `}>
                                                        {t.status}
                                                    </span>

                                                    <span className="text-xs text-gray-500 capitalize">
                                                        {t.payment_type}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && !loading && !error && (
                        <div className="px-6 py-4 border-t border-white/10 flex justify-center items-center gap-4">

                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                                text-white hover:bg-pink-500/20 transition disabled:opacity-40"
                            >
                                ←
                            </button>

                            <span className="text-sm text-gray-400">
                                Page <span className="text-pink-400 font-bold">{currentPage}</span> of {totalPages}
                            </span>

                            <button
                                onClick={() => setCurrentPage(p => p < totalPages ? p + 1 : p)}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                                text-white hover:bg-pink-500/20 transition disabled:opacity-40"
                            >
                                →
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}