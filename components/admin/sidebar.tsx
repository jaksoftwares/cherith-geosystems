"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut,
  Users,
  Globe,
  HardHat,
  TrendingUp,
  Mail,
  Zap,
  Quote,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/app/(auth)/login/actions";

const navigation = [
  { 
    title: "Overview", 
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard }
    ] 
  },
  { 
    title: "CMS Management", 
    items: [
      { name: "Services", href: "/admin/services", icon: Map },
      { name: "Projects", href: "/admin/projects", icon: Briefcase },
      { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    ] 
  },
  { 
    title: "CRM / Leads", 
    items: [
      { name: "General Inquiries", href: "/admin/messages/contacts", icon: Mail },
      { name: "Survey Requests", href: "/admin/messages/contacts?type=survey", icon: Zap },
      { name: "Quote Requests", href: "/admin/messages/contacts?type=quote", icon: TrendingUp },
      { name: "Consultations", href: "/admin/messages/contacts?type=consultation", icon: Users },
    ] 
  },
  { 
    title: "System & Content", 
    items: [
      { name: "Site Settings", href: "/admin/settings", icon: Settings },
      { name: "Partners & Teams", href: "/admin/partners", icon: Users },
      { name: "Regional reach", href: "/admin/regional", icon: Globe },
      { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
      { name: "Assets Inventory", href: "/admin/assets", icon: HardHat },
    ] 
  }
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function AdminSidebar({ isOpen, onClose, isMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-blue relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red opacity-[0.03] -mr-16 -mt-16 rounded-full blur-3xl"></div>
      
      {/* Brand Section */}
      <div className="p-8 pb-10 relative z-10 flex items-center justify-between">
        <Link href="/admin" onClick={onClose} className="flex items-center gap-4 group">
          <div className="w-10 h-10 relative flex-shrink-0">
              <Image 
                src="/logos/4_cherith_monochrome_white.svg" 
                alt="Cherith Logo" 
                fill 
                className="object-contain"
              />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold font-cherith tracking-[0.1em] text-lg leading-tight group-hover:text-brand-red transition-colors">CHERITH</span>
            <span className="text-brand-red font-semibold text-[10px] uppercase tracking-[0.2em] opacity-80">Management</span>
          </div>
        </Link>
        {isMobile && (
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {navigation.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-4 text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive 
                        ? "bg-brand-red text-white shadow-lg shadow-brand-red/20 translate-x-1" 
                        : "text-white/90 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "group-hover:text-brand-red transition-colors"}`} />
                      <span className="text-[14px] font-medium">{item.name}</span>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId={isMobile ? "active-indicator-mobile" : "active-indicator"}
                        className="w-1 h-5 bg-white rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Auth */}
      <div className="p-4 mt-auto border-t border-white/5">
        <form action={signOut}>
          <button type="submit" className="flex items-center gap-3.5 w-full px-4 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <LogOut className="w-4 h-4 group-hover:text-brand-red transition-colors" />
            <span className="text-[14px] font-medium">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-brand-blue/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-[70] lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <aside className="hidden lg:flex w-72 bg-brand-blue h-screen flex-col sticky top-0 border-r border-white/5 shadow-2xl z-50 overflow-hidden">
      <SidebarContent />
    </aside>
  );
}
