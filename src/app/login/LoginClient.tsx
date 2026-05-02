"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    // In App router, useSearchParams replaces useLocation().state
    // Normally we'd use a redirect param, assuming /profile as default.
    const redirectPath = searchParams.get('redirect') || '/profile';

    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user_login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const result = await res.json();
            
            if (result.error) {
                setErrors([result.error]);
            } else {
                localStorage.setItem('user-info', JSON.stringify(result));
                // Reload or trigger context update if needed, but App router will just navigate
                window.location.href = redirectPath;
            }
        } catch (error) {
            setErrors(["Failed to login. Please check your connection."]);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = () => {
        setLoadingGoogle(true);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
    };

    useEffect(() => {
        const handleGoogleCallback = async () => {
             const code = searchParams.get('email');
             if (!code) return;
             
             try {
                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callbacklogin?email=${code}`);
                 const data = await response.json();
                 
                 if (response.ok) {
                     localStorage.setItem('user-info', JSON.stringify(data));
                     window.location.href = '/profile';
                 } else {
                     setErrors([data.error || 'Failed to login with Google.']);
                 }
             } catch (error) {
                 setErrors(['Failed to login with Google. Please try again.']);
             }
        };

        if (searchParams.get('email') && !searchParams.get('name')) { // Only login if name isn't there (differentiates from register callback if they share URL structure)
             handleGoogleCallback();
        }
    }, [searchParams]);

    return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#070b18] relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full -top-40 -right-40" />
    <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -bottom-40 -left-40" />

    {/* Card */}
    <div className="w-full max-w-md relative z-10">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-8 text-center border-b border-white/10 bg-gradient-to-r from-pink-500/10 to-blue-500/10">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to continue your journey
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-5">

          {/* Google Button */}
          <button
            type="button"
            onClick={googleLogin}
            disabled={loadingGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium hover:bg-white/10 transition-all"
          >
            {/* Google icon */}
            <svg width="18" height="18" viewBox="0 0 18 18">
              <g fill="none">
                <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"/>
                <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c-1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/>
                <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"/>
                <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"/>
              </g>
            </svg>

            {loadingGoogle ? "Connecting..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm">
              {errors.map((e, i) => (
                <p key={i}>• {e}</p>
              ))}
            </div>
          )}

          <form onSubmit={signIn} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-pink-500 to-blue-500
              hover:opacity-90 transition-all shadow-lg shadow-pink-500/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* Links */}
          <div className="text-center text-sm text-gray-400 space-y-2 pt-2">
            <p>
              New here?{" "}
              <Link href="/register" className="text-pink-400 font-semibold">
                Create account
              </Link>
            </p>
            <p>
              <Link href="/forgot-password" className="hover:text-white transition">
                Forgot password?
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}

export default function LoginPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginContent />
        </React.Suspense>
    );
}
