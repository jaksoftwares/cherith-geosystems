"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { resetPassword } from "../actions";
import { Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    const result = await resetPassword(formData);
    
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
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
            <h1 className="text-2xl font-extrabold font-cherith text-brand-blue">Reset Password</h1>
            <p className="text-gray-400 text-sm mt-1">Enter your email to receive a reset link</p>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-green-50 border border-green-100 rounded-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-green-800 font-bold mb-2">Check your email</h3>
              <p className="text-green-600 text-sm mb-6">
                We've sent password reset instructions to your email address.
              </p>
              <Link 
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-red transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </motion.div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                  />
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
                    Send Reset Link
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer */}
          {!success && (
            <div className="mt-8 text-center pt-8 border-t border-gray-50">
              <p className="text-gray-400 text-xs">
                Remember your password? <Link href="/auth/login" className="text-brand-blue font-bold hover:text-brand-red ml-1">Sign In</Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
