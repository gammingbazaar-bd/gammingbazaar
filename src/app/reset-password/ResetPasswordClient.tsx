"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setEmail(searchParams.get('email') || '');
        setToken(searchParams.get('token') || '');
    }, [searchParams]);

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();
        setErrors([]);
        setMessage("");

        if (password !== passwordConfirmation) {
            setErrors(["Passwords do not match"]);
            return;
        }

        setIsLoading(true);

        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reset_password`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ email, token, password, password_confirmation: passwordConfirmation })
            });

            const data = await result.json();

            if (data.error) {
                setErrors(Array.isArray(data.error) ? data.error : [data.error]);
            } else {
                setMessage(data.message || "Password reset successfully!");
                setTimeout(() => router.push('/login'), 2000);
            }
        } catch (error) {
            console.error("Reset password error:", error);
            setErrors(["An error occurred. Please try again."]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#070b18] relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full -top-32 -right-32" />
    <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -bottom-40 -left-40" />

    {/* Card */}
    <div className="w-full max-w-md relative z-10">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-7 text-center border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-blue-500/10">
          <h2 className="text-2xl font-bold text-white">
            Reset Password
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Create a new secure password
          </p>
        </div>

        {/* Body */}
        <div className="p-7 space-y-5">

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm">
              {errors.map((e, i) => (
                <p key={i}>• {e}</p>
              ))}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-300 p-3 rounded-xl text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4">

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-pink-500 to-blue-500
              hover:opacity-90 transition-all shadow-lg shadow-pink-500/20"
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>

          </form>
        </div>

      </div>
    </div>
  </div>
);
}

export default function ResetPasswordPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetPasswordContent />
        </React.Suspense>
    );
}
