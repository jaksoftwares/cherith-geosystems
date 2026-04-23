"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, X, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export function VerificationModal({ isOpen, onClose, email }: VerificationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-blue/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[32px] p-10 shadow-2xl z-[101] border border-gray-100 overflow-hidden"
          >
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red opacity-[0.03] -mr-16 -mt-16 rounded-full blur-3xl"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-brand-red/5 text-brand-red rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Mail className="w-10 h-10" />
              </div>
              
              <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-[0.2em] text-[10px] mb-3">
                <ShieldCheck className="w-4 h-4 text-brand-red" />
                Security Verification
              </div>
              
              <h2 className="text-2xl font-extrabold font-cherith text-brand-blue mb-4">Check Your Inbox</h2>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                We've sent a verification link to <span className="font-bold text-brand-blue">{email || "your email"}</span>. 
                Please confirm your email to activate your administrative access.
              </p>

              <div className="space-y-4">
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-blue/20 hover:bg-brand-red hover:shadow-brand-red/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Got it, thanks
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4">
                  Didn't get the email? <button className="text-brand-red hover:underline ml-1">Resend Link</button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
