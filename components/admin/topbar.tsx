"use client";

import { useState, useEffect } from "react";
import { getUnreadNotifications, Notification } from "@/lib/api/notifications";
import { formatDistanceToNow } from "date-fns";
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
import { signOut } from "@/app/auth/actions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { profile } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getUnreadNotifications().then(setNotifications).catch(console.error);
  }, [pathname]); // Refresh notifications when route changes
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { href, label };
  });

  // Dynamic styling based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "General Inquiry": return { icon: Mail, color: "text-brand-red bg-brand-red/10" };
      case "Survey Request": return { icon: Search, color: "text-brand-blue bg-brand-blue/10" };
      case "Quote Request": return { icon: Clock, color: "text-emerald-500 bg-emerald-50" };
      case "Consultation": return { icon: User, color: "text-purple-500 bg-purple-50" };
      default: return { icon: Bell, color: "text-gray-500 bg-gray-100" };
    }
  };

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
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div key={idx} className="flex items-center gap-2">
                {isLast ? (
                  <span className="font-semibold text-brand-blue">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="font-semibold text-gray-500 hover:text-brand-red transition-colors">
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span className="text-gray-300">/</span>
                )}
              </div>
            );
          })}
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
            {notifications.length > 0 && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-white"></span>}
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
                    {notifications.length > 0 && (
                      <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">{notifications.length} New</span>
                    )}
                  </div>
                  <div className="divide-y divide-gray-50 max-h-[350px] overflow-y-auto">
                    {notifications.length === 0 ? (
                       <div className="p-8 text-center text-xs font-bold text-gray-400">You're all caught up!</div>
                    ) : (
                      notifications.map((notif) => {
                        const style = getNotificationIcon(notif.type);
                        const Icon = style.icon;
                        return (
                          <Link href="/admin/inbox" key={notif.id} onClick={() => setShowNotifications(false)} className="p-4 hover:bg-zinc-50 transition-colors flex items-start gap-4 cursor-pointer">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${style.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-brand-blue">{notif.title}</p>
                              <p className="text-[10px] text-gray-400 font-medium mt-1">{formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}</p>
                            </div>
                          </Link>
                        );
                      })
                    )}
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
