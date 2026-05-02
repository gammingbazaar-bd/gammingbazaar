import React from 'react';
import ProductGrid from '@/components/home/ProductGrid';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top Up Games & Gift Cards',
    description: 'Buy mobile game top-ups and gift cards instantly at Gaming Bazaar.',
    alternates: {
        canonical: "https://gammingbazaar.com/topup",
    },
};

async function fetchProducts(page: number) {
    try {
        const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/?page=${page}`,
  { next: { revalidate: 60 } }
);
        if (!res.ok) return [];
        return (await res.json()).data || [];
    } catch {
        return [];
    }
}

export default async function TopUpPage({ searchParams }: { searchParams: { page?: string } }) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    
    const products = await fetchProducts(page);

    const mobileGames = products.filter((item: any) => {
        try {
            const parsed = typeof item.input_fields === 'string' ? JSON.parse(item.input_fields) : (item.input_fields || {});
            return parsed.is_quantity_selection_allowed === "NO";
        } catch { return false; }
    });

    const giftCards = products.filter((item: any) => {
        try {
            const parsed = typeof item.input_fields === 'string' ? JSON.parse(item.input_fields) : (item.input_fields || {});
            return parsed.is_quantity_selection_allowed === "YES";
        } catch { return false; }
    });



    return (
        <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

            {/* 🔥 SEO HERO SECTION */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                    Mobile Game Top Up & Gift Cards Bangladesh
                </h1>

                <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                    Buy instant Mobile Game Top-Up including Free Fire Diamonds, PUBG UC, and global Gift Cards in Bangladesh.
                    Enjoy fast delivery, secure payment via bKash, Nagad, and Rocket with 24/7 support.
                </p>
            </div>

            <div className="container mx-auto">

                {/* 🎮 MOBILE GAMES SECTION */}
                <div className="text-center mb-6 mt-10">

                    <div className="flex items-center justify-center px-4 py-4 md:py-8">
                        <hr className="flex-grow border-gray-300" />

                        <h2 className="text-2xl sm:text-3xl font-bold mx-4 text-white font-primary">
                            MOBILE GAMES TOP UP
                        </h2>

                        <hr className="flex-grow border-gray-300" />
                    </div>

                    {/* SEO TEXT (IMPORTANT FOR RANKING) */}
                    <p className="text-gray-400 text-sm max-w-3xl mx-auto">
                        Top up your favorite mobile games like Free Fire, PUBG Mobile, Call of Duty Mobile and more.
                        Get instant delivery of diamonds, UC, and in-game credits at the best price in Bangladesh.
                    </p>
                </div>

                <ProductGrid products={mobileGames} />

                {/* 🎁 GIFT CARDS SECTION */}
                <div className="text-center mb-6 mt-14">

                    <div className="flex items-center justify-center px-4 py-4 md:py-8">
                        <hr className="flex-grow border-gray-300" />

                        <h2 className="text-2xl sm:text-3xl font-bold mx-4 text-white font-primary">
                            GIFT CARDS / VOUCHERS
                        </h2>

                        <hr className="flex-grow border-gray-300" />
                    </div>

                    {/* SEO TEXT */}
                    <p className="text-gray-400 text-sm max-w-3xl mx-auto">
                        Buy Google Play, App Store, Steam, and other international gift cards instantly.
                        Perfect for gaming, apps, subscriptions, and digital purchases worldwide.
                    </p>
                </div>

                <ProductGrid products={giftCards} />

                {/* 📄 PAGINATION */}
                <div className="flex items-center justify-center gap-4 py-8">

                    <Link
                        href={`/topup?page=${page > 1 ? page - 1 : 1}`}
                        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-bold transition-all"
                    >
                        <FaArrowLeft /> Previous
                    </Link>

                    <span className="font-bold text-lg text-white">
                        Page {page}
                    </span>

                    <Link
                        href={`/topup?page=${page + 1}`}
                        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-bold transition-all"
                    >
                        Next <FaArrowRight />
                    </Link>
                </div>

                {/* 🧠 FINAL SEO CONTENT (VERY IMPORTANT) */}
                <div className="mt-12 text-center text-gray-400 text-sm max-w-4xl mx-auto leading-relaxed">
                    We are a trusted platform for Mobile Game Top-Up and Digital Gift Cards in Bangladesh.
                    Our service ensures fast delivery, secure transactions, and reliable customer support.
                    Whether you need Free Fire diamonds, PUBG UC, or global vouchers, we provide everything in one place
                    at competitive prices.
                </div>

            </div>
        </div>
    );

}