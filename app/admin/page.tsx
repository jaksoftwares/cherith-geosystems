"use client";

import { StatsCard } from "@/components/admin/stats-card";
import { 
  Users, 
  Briefcase, 
  Zap, 
  MessageSquare, 
  TrendingUp, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  MoreVertical,
  FileText,
  Settings
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";

export default function AdminDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-cherith text-brand-blue mb-2">
            Control <span className="text-brand-red">Center</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Welcome back, {profile?.full_name || "Administrator"}. Here's what's happening with Cherith today.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-brand-red/10 text-brand-red px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            System Status: Optimal
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Leads" 
          value="124" 
          icon={Users} 
          trend={{ value: "12%", isUp: true }}
          color="blue"
        />
        <StatsCard 
          label="Projects" 
          value="400+" 
          icon={Briefcase} 
          color="green"
        />
        <StatsCard 
          label="Survey Requests" 
          value="18" 
          icon={Zap} 
          trend={{ value: "4", isUp: true }}
          color="red"
        />
        <StatsCard 
          label="Consultations" 
          value="09" 
          icon={MessageSquare} 
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity / Leads */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold font-cherith text-brand-blue">Recent Lead Activity</h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Inbound inquiries across all channels</p>
              </div>
              <Link href="/admin/messages/contacts" className="text-xs font-bold text-brand-red hover:underline flex items-center gap-2 group">
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
                      <h4 className="text-base font-bold text-brand-blue">{lead.name}</h4>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{lead.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
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
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-gray-50/50 mt-auto border-t border-gray-50 text-center">
               <button className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-brand-blue transition-colors">
                 Load More Activity
               </button>
            </div>
          </div>
        </div>

        {/* CMS / Content Health */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-blue rounded-[32px] p-8 text-white relative overflow-hidden group">
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red opacity-10 -mr-16 -mt-16 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
             
             <h3 className="text-2xl font-bold font-cherith mb-6 relative z-10">Content Health</h3>
             
             <div className="space-y-6 relative z-10">
               {[
                 { label: "Active Services", count: 7, total: 7, color: "bg-emerald-500" },
                 { label: "Featured Projects", count: 5, total: 12, color: "bg-brand-red" },
                 { label: "Blog Posts", count: 14, total: 14, color: "bg-blue-400" },
               ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em]">
                      <span>{item.label}</span>
                      <span>{Math.round((item.count / item.total) * 100)}%</span>
                    </div>
                   <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / item.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                        className={`h-full ${item.color}`}
                      />
                   </div>
                 </div>
               ))}
             </div>

             <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
                <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-brand-blue rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  View Analytics Report
                </button>
             </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
             <h3 className="text-xl font-bold font-cherith text-brand-blue mb-6">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-3">
               <Link href="/admin/projects" className="p-4 bg-zinc-50 hover:bg-brand-red hover:text-white rounded-2xl border border-gray-100 transition-all flex flex-col items-center gap-2 group">
                 <Briefcase className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">New Project</span>
               </Link>
               <Link href="/admin/blog" className="p-4 bg-zinc-50 hover:bg-brand-blue hover:text-white rounded-2xl border border-gray-100 transition-all flex flex-col items-center gap-2 group">
                 <FileText className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Post Blog</span>
               </Link>
               <button className="p-4 bg-zinc-50 hover:bg-brand-blue hover:text-white rounded-2xl border border-gray-100 transition-all flex flex-col items-center gap-2 group">
                 <Users className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Team Member</span>
               </button>
               <button className="p-4 bg-zinc-50 hover:bg-brand-red hover:text-white rounded-2xl border border-gray-100 transition-all flex flex-col items-center gap-2 group">
                 <Settings className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Config</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
