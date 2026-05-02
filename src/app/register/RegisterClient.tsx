"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterContent() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setErrors(["Password and Confirm Password must match."]);
            setLoading(false);
            return;
        }

        const item = {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
            is_active: true,
            phone
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData.error ? [errorData.error] : ["Failed to register. Please try again later."]);
                return;
            }

            // ✅ SUCCESS
            setSuccessMessage("Registration successful! Redirecting to login...");

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhone("");

            setTimeout(() => {
                router.push('/login');
            }, 1500);

        } catch (error) {
            setErrors(["Failed to register. Please try again later."]);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = () => {
        setLoadingGoogle(true);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
    };

    useEffect(() => {
        const handleGoogleCallbackRegister = async () => {
            const email = searchParams.get('email');
            const name = searchParams.get('name');
            const password = searchParams.get('password');
            const google_id = searchParams.get('google_id');

            if (!email || !name || !password || !google_id) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callbackregister?email=${email}&name=${name}&password=${password}&google_id=${google_id}`
                );

                const data = await response.json();

                if (response.ok) {
                    setSuccessMessage('Registration successful! Redirecting to login...');

                    setTimeout(() => {
                        router.push('/login');
                    }, 1500);
                } else {
                    setErrors([data.error || 'Failed to register with Google. Please try again.']);
                }
            } catch (error) {
                setErrors(['Failed to register with Google. Please try again.']);
            }
        };

        if (searchParams.get('email') && searchParams.get('name')) {
            handleGoogleCallbackRegister();
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0b1224] via-[#0f172a] to-[#020617]">

            {/* background glow */}
            <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>
            <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

            <div className="relative w-full max-w-md">

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

                    <h1 className="text-2xl font-bold text-white text-center">
                        Create Account
                    </h1>
                    <p className="text-gray-400 text-sm text-center mt-1">
                        Join us and start your journey
                    </p>

                    {/* Google */}
                    <button
                        type="button"
                        onClick={googleLogin}
                        disabled={loadingGoogle}
                        className="w-full mt-6 flex items-center justify-center gap-3 bg-white text-black rounded-xl px-4 py-3 font-medium hover:bg-gray-200 transition"
                    >
                        Continue with Google
                    </button>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="mx-3 text-gray-500 text-xs">or email</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    {/* Errors */}
                    {errors.length > 0 && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            {errors.map((e, i) => (
                                <p key={i} className="text-red-400 text-xs text-center">{e}</p>
                            ))}
                        </div>
                    )}

                    {/* Success */}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <p className="text-green-400 text-xs text-center">{successMessage}</p>
                        </div>
                    )}

                    <form onSubmit={signup} className="space-y-3">

                        <input className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl outline-none focus:border-pink-500"
                            value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />

                        <input className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl outline-none focus:border-pink-500"
                            value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />

                        <input className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl outline-none focus:border-pink-500"
                            value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

                        <input type="password" className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl outline-none focus:border-pink-500"
                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                        <input type="password" className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl outline-none focus:border-pink-500"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 active:scale-[0.98] transition"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 text-xs mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-pink-400 font-semibold">
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <RegisterContent />
        </React.Suspense>
    );
}
