"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color?: "blue" | "red" | "green" | "orange";
}

export function StatsCard({ label, value, icon: Icon, trend, color = "blue" }: StatsCardProps) {
  const colorMap = {
    blue: "bg-brand-blue/5 text-brand-blue border-brand-blue/10",
    red: "bg-brand-red/5 text-brand-red border-brand-red/10",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    orange: "bg-amber-50 text-amber-600 border-amber-100",
  };

  const iconColorMap = {
    blue: "bg-brand-blue text-white shadow-brand-blue/20",
    red: "bg-brand-red text-white shadow-brand-red/20",
    green: "bg-emerald-500 text-white shadow-emerald-500/20",
    orange: "bg-amber-500 text-white shadow-amber-500/20",
  };

  return (
    <div className={`p-6 rounded-[24px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between h-full`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 ${iconColorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {trend.isUp ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </div>
      
      <div>
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
          {label}
        </h4>
        <p className="text-3xl font-extrabold font-cherith text-brand-blue group-hover:text-brand-red transition-colors">
          {value}
        </p>
      </div>
    </div>
  );
}
