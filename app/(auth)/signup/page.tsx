"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signup } from "../login/actions";
import { VerificationModal } from "@/components/admin/verification-modal";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    setPendingEmail(email);
    setLoading(true);
    setError(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setShowVerifyModal(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 relative overflow-hidden">
      <VerificationModal 
        isOpen={showVerifyModal} 
        onClose={() => setShowVerifyModal(false)} 
        email={pendingEmail}
      />
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'103.923\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath stroke=\\'%23000\\' stroke-width=\\'1\\' fill=\\'none\\' d=\\'M30 103.923L0 86.603V51.962L30 34.641l30 17.32v34.641L30 103.923zM0 17.32L30 0l30 17.32v34.64L30 69.282 0 51.96V17.32z\\'%3E%3C/path%3E%3C/svg%3E')", backgroundSize: "60px 104px" }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-brand-blue/10 border border-gray-100">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block relative w-48 h-12 mb-6">
              <Image 
                src="/logos/1_cherith_master.svg" 
                alt="Cherith Logo" 
                fill 
                className="object-contain"
              />
            </Link>
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
              <UserPlus className="w-4 h-4 text-brand-red" />
              New Admin Onboarding
            </div>
            <h1 className="text-2xl font-extrabold font-cherith text-brand-blue">Create Account</h1>
          </div>

          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                <input 
                  name="full_name"
                  type="text" 
                  required
                  placeholder="George Omusotsi"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Professional Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="admin@cherith.co.ke"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
                <input 
                  name="password"
                  type="password" 
                  required
                  placeholder="Minimum 8 characters"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold">
                {error}
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full py-4 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-blue/20 hover:bg-brand-red hover:shadow-brand-red/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Initialize Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-gray-50">
            <p className="text-gray-400 text-xs">
              Already have an account? 
              <Link href="/login" className="text-brand-blue font-bold hover:text-brand-red ml-1">Log In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
