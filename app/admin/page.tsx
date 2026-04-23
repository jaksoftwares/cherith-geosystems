"use client";

import { StatsCard } from "@/components/admin/stats-card";
import { 
  Users, 
  Briefcase, 
  Zap, 
  MessageSquare, 
  ArrowRight,
  Calendar,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";

export default function AdminDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-cherith text-brand-blue mb-2 uppercase tracking-tighter">
            Welcome, <span className="text-brand-red">{profile?.full_name?.split(' ')[0] || "Administrator"}</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            Here is what's happening with Cherith GeoSystems today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Leads" 
          value="124" 
          color="blue"
        />
        <StatsCard 
          label="Active Projects" 
          value="42" 
          color="green"
        />
        <StatsCard 
          label="Survey Requests" 
          value="18" 
          color="red"
        />
        <StatsCard 
          label="Consultations" 
          value="09" 
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity / Leads */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold font-cherith text-brand-blue">Recent Leads</h3>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-1">Latest inbound inquiries</p>
              </div>
              <Link href="/admin/messages/contacts" className="text-xs font-semibold text-brand-red hover:underline flex items-center gap-2 group">
                View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="divide-y divide-gray-50">
              {[
                { name: "John Kamau", type: "Survey Request", time: "2 hours ago", status: "New", color: "red" },
                { name: "Global Infra Ltd", type: "Quote Request", time: "5 hours ago", status: "Processing", color: "blue" },
                { name: "Sarah Wanjiku", type: "Consultation", time: "1 day ago", status: "Completed", color: "green" },
                { name: "Urban Dev Group", type: "Survey Request", time: "1 day ago", status: "New", color: "red" },
                { name: "Private Client", type: "General Inquiry", time: "2 days ago", status: "New", color: "gray" },
              ].map((lead, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50/50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                      lead.color === 'red' ? 'bg-red-50 text-red-600' : 
                      lead.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      lead.color === 'green' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-brand-blue">{lead.name}</h4>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{lead.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {lead.time}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      lead.status === 'New' ? 'bg-brand-red text-white' : 
                      lead.status === 'Processing' ? 'bg-brand-blue text-white' : 
                      'bg-emerald-500 text-white'
                    }`}>
                      {lead.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-gray-50/50 mt-auto border-t border-gray-50 text-center text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
               End of recent activity
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Actions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
             <h3 className="text-xl font-bold font-cherith text-brand-blue mb-6">Quick Actions</h3>
             <div className="flex flex-col gap-3">
               <Link href="/admin/blog/new" className="p-5 bg-zinc-50 hover:bg-brand-blue hover:text-white rounded-2xl border border-gray-100 transition-all flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-blue group-hover:bg-white/10 group-hover:text-white transition-all">
                    <FileText className="w-5 h-5" />
                 </div>
                 <span className="text-[12px] font-semibold uppercase tracking-widest">New Blog Post</span>
               </Link>
               <Link href="/admin/messages/contacts" className="p-5 bg-zinc-50 hover:bg-brand-red hover:text-white rounded-2xl border border-gray-100 transition-all flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-red group-hover:bg-white/10 group-hover:text-white transition-all">
                    <MessageSquare className="w-5 h-5" />
                 </div>
                 <span className="text-[12px] font-semibold uppercase tracking-widest">Manage Leads</span>
               </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
