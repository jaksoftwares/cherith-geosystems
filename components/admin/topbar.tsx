"use client";

import { Bell, Search, User, ChevronDown, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";

export function AdminTopbar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  
  // Simple breadcrumb logic
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "));

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search / Breadcrumbs */}
      <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-2 text-sm">
          {breadcrumb.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`font-bold ${idx === breadcrumb.length - 1 ? "text-brand-blue" : "text-gray-400"}`}>
                {item}
              </span>
              {idx < breadcrumb.length - 1 && (
                <span className="text-gray-300">/</span>
              )}
            </div>
          ))}
        </div>

        <div className="relative group max-w-xs hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all w-64"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-brand-blue transition-colors rounded-xl hover:bg-gray-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-100 mx-1"></div>

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-gray-50 transition-all group">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-brand-blue leading-tight group-hover:text-brand-red">
              {profile?.full_name || "Admin User"}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {profile?.role || "Administrator"}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-brand-blue/20">
            {profile?.full_name ? getInitials(profile.full_name) : "AU"}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-brand-blue transition-colors" />
        </button>
      </div>
    </header>
  );
}
