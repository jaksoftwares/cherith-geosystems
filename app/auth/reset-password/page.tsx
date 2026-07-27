"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { updatePassword } from "../actions";
import { Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    // Check if passwords match
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const result = await updatePassword(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'103.923\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath stroke=\\'%23000\\' stroke-width=\\'1\\' fill=\\'none\\' d=\\'M30 103.923L0 86.603V51.962L30 34.641l30 17.32v34.641L30 103.923zM0 17.32L30 0l30 17.32v34.64L30 69.282 0 51.96V17.32z\\'%3E%3C/path%3E%3C/svg%3E')", backgroundSize: "60px 104px" }}></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/5 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-brand-blue/10 border border-gray-100">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block relative w-48 h-12 mb-8">
              <Image 
                src="/logos/1_cherith_master.svg" 
                alt="Cherith Logo" 
                fill 
                className="object-contain"
              />
            </Link>
            <h1 className="text-2xl font-extrabold font-cherith text-brand-blue">Create New Password</h1>
            <p className="text-gray-400 text-sm mt-1">Please enter your new secure password</p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="Minimum 8 characters"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                <input 
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"} 
                  required
                  placeholder="Repeat new password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">!</div>
                {error}
              </motion.div>
            )}

            <button 
              disabled={loading}
              className="w-full py-4 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-blue/20 hover:bg-brand-red hover:shadow-brand-red/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Update Password
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
