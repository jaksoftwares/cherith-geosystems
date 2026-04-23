"use client";

import { useState } from "react";
import { 
  Bell, 
  Search, 
  ChevronDown, 
  LogOut,
  User,
  Settings,
  Clock,
  CheckCircle2,
  Mail,
  Menu
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { signOut } from "@/app/(auth)/login/actions";
import { motion, AnimatePresence } from "framer-motion";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { profile } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments.map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "));

  const notifications = [
    { id: 1, title: "New Survey Request", time: "2m ago", icon: Clock, color: "text-brand-red bg-brand-red/10" },
    { id: 2, title: "Lead marked as resolved", time: "1h ago", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50" },
    { id: 3, title: "Database backup successful", time: "5h ago", icon: CheckCircle2, color: "text-brand-blue bg-brand-blue/10" },
    { id: 4, title: "New general inquiry", time: "1d ago", icon: Mail, color: "text-brand-red bg-brand-red/10" },
  ];

  return (
    <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      {/* Search / Breadcrumbs / Mobile Menu */}
      <div className="flex items-center gap-4 lg:gap-10">
        <button 
          onClick={onMenuClick}
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-white border border-gray-100 text-brand-blue rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center gap-2 text-sm">
          {breadcrumb.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`font-semibold ${idx === breadcrumb.length - 1 ? "text-brand-blue" : "text-gray-500"}`}>
                {item}
              </span>
              {idx < breadcrumb.length - 1 && (
                <span className="text-gray-300">/</span>
              )}
            </div>
          ))}
        </div>

        <div className="relative group max-w-xs hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-red transition-colors" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-12 pr-4 py-3 bg-zinc-50 border border-gray-100 rounded-2xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all w-72"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative w-12 h-12 flex items-center justify-center transition-all rounded-2xl ${
              showNotifications ? "bg-brand-red text-white shadow-lg shadow-brand-red/20" : "text-gray-400 hover:text-brand-blue hover:bg-zinc-50"
            }`}
          >
            <Bell className="w-5 h-5" />
            {!showNotifications && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-white"></span>}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setShowNotifications(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-10"
                >
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold font-cherith text-brand-blue">Notifications</h3>
                    <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">4 New</span>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-[350px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 hover:bg-zinc-50 transition-colors flex items-start gap-4 cursor-pointer">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                          <notif.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-brand-blue">{notif.title}</p>
                          <p className="text-[10px] font-medium text-gray-400 mt-0.5">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 text-[10px] font-bold text-brand-blue uppercase tracking-widest bg-zinc-50 hover:bg-gray-100 transition-colors">
                    View All Notifications
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-px bg-gray-100 mx-1"></div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`flex items-center gap-3 pl-3 pr-2 py-2 rounded-2xl transition-all group ${
              showUserMenu ? "bg-zinc-100 shadow-inner" : "hover:bg-zinc-50"
            }`}
          >
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-semibold text-brand-blue leading-tight">
                {profile?.full_name || "Admin User"}
              </span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                {profile?.role || "Administrator"}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-brand-blue/20">
              {profile?.full_name ? getInitials(profile.full_name) : "AU"}
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showUserMenu ? "rotate-180 text-brand-blue" : ""}`} />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setShowUserMenu(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-10"
                >
                  <div className="p-6 border-b border-gray-50 bg-zinc-50">
                    <p className="text-xs font-bold text-brand-blue">{profile?.full_name}</p>
                    <p className="text-[10px] font-medium text-gray-400">{profile?.email}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-brand-blue hover:bg-zinc-50 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
                      <User className="w-4 h-4" />
                      My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-brand-blue hover:bg-zinc-50 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-50">
                    <form action={signOut}>
                      <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-brand-red hover:bg-brand-red/5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </form>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
