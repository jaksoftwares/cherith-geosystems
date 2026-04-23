"use client";

import { AdminSectionHeader } from "@/components/admin/ui";
import { 
  Save, 
  RotateCcw, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Hash,
  Info
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <AdminSectionHeader 
        title="Site Settings" 
        description="Configure global business metadata, contact details, and marketing statistics."
        actions={
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95">
              <RotateCcw className="w-4 h-4" />
              Discard
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all active:scale-95">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Core Identity */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold font-cherith text-brand-blue mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-red" />
                Business Identity
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Company Name</label>
                  <input type="text" defaultValue="Cherith GeoSystems" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Legal Full Name</label>
                  <input type="text" defaultValue="Cherith Informatics & Mapping Ltd." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Brand Tagline</label>
                  <input type="text" defaultValue="Mapping Possibilities. Defining Precision." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50">
              <h3 className="text-lg font-bold font-cherith text-brand-blue mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-red" />
                Location & Contact
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Headquarters Address</label>
                  <textarea rows={3} defaultValue="Olympic House, 1st Floor, Room 104, Nairobi, Kenya" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Primary Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" defaultValue="0722 300 565" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Support Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" defaultValue="info@cherith.co.ke" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Stats */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-brand-blue rounded-[32px] p-8 text-white space-y-8">
            <h3 className="text-lg font-bold font-cherith flex items-center gap-2">
              <Hash className="w-5 h-5 text-brand-red" />
              Public Stats
            </h3>
            
            <div className="space-y-6">
              {[
                { label: "Years in Operation", value: "19", icon: Globe },
                { label: "Projects Completed", value: "400", icon: Briefcase },
                { label: "Regional Countries", value: "08", icon: Globe },
                { label: "Leadership Experience", value: "38", icon: Users },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <label className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">{stat.label}</label>
                  <input type="number" defaultValue={stat.value} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all" />
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-medium leading-relaxed text-white/60">
              Note: These numbers are reflected on the Hero section and Statistics cards throughout the website.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal Users icon for stats mapping
function Users({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );
}

function Briefcase({ className }: { className?: string }) {
  return (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  );
}
