"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2,
  Trash2,
  Eye,
  X,
  Send,
  User,
  MapPin,
  Tag
} from "lucide-react";
import { AdminBadge } from "@/components/admin/ui";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  subject: string;
  status: string;
  created_at: string;
  message?: string;
  location?: string;
  survey_type?: string;
  service?: string;
  topic?: string;
  details?: string;
  description?: string;
}

export function LeadsTable({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter(l => l.id !== id));
      // In a real app, call a server action here
    }
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    
    // Simulate sending email
    alert(`Reply sent to ${selectedLead?.email}:\n\n${replyText}`);
    setReplyText("");
    handleStatusUpdate(selectedLead!.id, "Completed");
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-50">Lead Source</th>
            <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-50">Contact Info</th>
            <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-50">Type</th>
            <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-50">Status</th>
            <th className="px-8 py-5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-[13px]">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50/30 transition-colors group">
              <td className="px-8 py-6">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-brand-blue text-[15px]">{lead.name}</span>
                  <span className="text-[11px] font-semibold text-gray-500 line-clamp-1 uppercase tracking-wider">{lead.subject || lead.type}</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-brand-red" />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-brand-red" />
                    {lead.phone}
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className="text-[10px] font-semibold text-brand-blue bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 uppercase tracking-widest">
                  {lead.type}
                </span>
              </td>
              <td className="px-8 py-6">
                <AdminBadge variant={
                  lead.status === 'New' ? 'red' : 
                  lead.status === 'Processing' ? 'blue' : 
                  'green'
                } className="font-bold">
                  {lead.status}
                </AdminBadge>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => setSelectedLead(lead)}
                    className="p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-brand-blue"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(lead.id, "Completed")}
                    className="p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-emerald-600"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(lead.id)}
                    className="p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-brand-blue/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-zinc-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                    {selectedLead.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-cherith text-brand-blue">{selectedLead.name}</h2>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">{selectedLead.type}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2">Lead Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <Mail className="w-4 h-4 text-brand-red" />
                        {selectedLead.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <Phone className="w-4 h-4 text-brand-red" />
                        {selectedLead.phone}
                      </div>
                      {selectedLead.location && (
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                          <MapPin className="w-4 h-4 text-brand-red" />
                          {selectedLead.location}
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4 text-brand-red" />
                        Received on {format(new Date(selectedLead.created_at), "PPP p")}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Message / Details</h3>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-sm leading-relaxed text-gray-600">
                      {selectedLead.message || selectedLead.description || selectedLead.details || "No message provided."}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Management</h3>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleStatusUpdate(selectedLead.id, "Processing")}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          selectedLead.status === 'Processing' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        In Progress
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(selectedLead.id, "Completed")}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          selectedLead.status === 'Completed' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        Resolved
                      </button>
                    </div>
                  </section>
                </div>

                <div className="bg-zinc-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col h-fit sticky top-0">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6">Reply to Client</h3>
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    className="flex-1 min-h-[200px] w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all resize-none mb-4"
                  />
                  <button 
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    className="w-full py-4 bg-brand-blue hover:bg-brand-red text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-blue/10"
                  >
                    <Send className="w-4 h-4" />
                    Send Response
                  </button>
                  <p className="mt-4 text-[9px] text-gray-400 text-center font-medium">
                    Replying will automatically mark this lead as "Resolved"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
