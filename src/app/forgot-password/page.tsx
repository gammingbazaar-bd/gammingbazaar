"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleForgotPassword(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);
        setMessage("");

        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot_password`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await result.json();

            if (data.error) {
                setErrors(Array.isArray(data.error) ? data.error : [data.error]);
            } else {
                setMessage(data.message || "Password reset link sent to your email.");
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            setErrors(["An error occurred. Please try again."]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#070b18] relative overflow-hidden">

    {/* Glow Background */}
    <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full -top-40 -right-40" />
    <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -bottom-40 -left-40" />

    {/* Card */}
    <div className="w-full max-w-md relative z-10">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-8 text-center border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-blue-500/10">
          <h2 className="text-3xl font-bold text-white">
            Forgot Password
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter your email to get reset link
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-5">

          {/* Error */}
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
              ✓ {message}
            </div>
          )}

          <form onSubmit={handleForgotPassword} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20"
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
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400 pt-2">
            Remember your password?{" "}
            <Link href="/login" className="text-pink-400 font-semibold">
              Back to Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  </div>
);
}