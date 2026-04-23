"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "red" | "green" | "gray" | "orange";
  className?: string;
}

export function AdminBadge({ children, variant = "gray", className = "" }: BadgeProps) {
  const styles = {
    blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    red: "bg-brand-red/10 text-brand-red border-brand-red/20",
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
    orange: "bg-amber-50 text-amber-600 border-amber-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function AdminSectionHeader({ title, description, actions }: { title: string, description?: string, actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold font-cherith text-brand-blue mb-2 uppercase tracking-tight">{title}</h2>
        {description && <p className="text-gray-500 font-medium text-sm">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
