"use client";

import { useState, useTransition, useMemo } from "react";
import { 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2,
  Trash2,
  Send,
  MapPin,
  Search,
  Filter,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { deleteLead, updateLeadStatus, replyToLead } from "@/app/admin/messages/actions";

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

export function InboxView({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedLead = useMemo(() => leads.find(l => l.id === selectedLeadId) || null, [leads, selectedLeadId]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesFilter = filterType === "All" || lead.type.includes(filterType);
      const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [leads, filterType, searchQuery]);

  const handleDelete = (id: string, type: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      startTransition(async () => {
        const result = await deleteLead(id, type);
        if (result?.success) {
          setLeads(prev => prev.filter(l => l.id !== id));
          if (selectedLeadId === id) setSelectedLeadId(null);
        } else {
          alert(result?.error || "Failed to delete lead");
        }
      });
    }
  };

  const handleStatusUpdate = (id: string, type: string, newStatus: string) => {
    startTransition(async () => {
      const result = await updateLeadStatus(id, type, newStatus);
      if (result?.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      } else {
        alert(result?.error || "Failed to update status");
      }
    });
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedLead) return;
    
    startTransition(async () => {
      const result = await replyToLead(selectedLead.id, selectedLead.email, replyText, selectedLead.type);
      if (result?.success) {
        alert(`Reply successfully sent to ${selectedLead.email}`);
        setReplyText("");
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, status: "Resolved" } : l));
      } else {
        alert(result?.error || "Failed to send reply");
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-brand-red text-white';
      case 'Processing': return 'bg-brand-blue text-white';
      case 'Resolved': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const tabs = ["All", "Survey", "Quote", "Consultation", "General Inquiry"];

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden flex h-[80vh] min-h-[600px] relative">
      
      {/* Left Pane - Master List */}
      <div className="w-full lg:w-[400px] border-r border-gray-100 flex flex-col bg-gray-50/30 flex-shrink-0">
        
        {/* Header & Filters */}
        <div className="p-5 border-b border-gray-100 space-y-4 bg-white">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  filterType === tab ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" : "bg-white border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-brand-blue"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs font-medium">No messages found.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredLeads.map(lead => {
                const isSelected = selectedLeadId === lead.id;
                const snippet = lead.message || lead.description || lead.details || "No message content.";
                
                return (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`w-full p-5 text-left transition-all border-l-4 ${
                      isSelected 
                        ? "bg-white border-brand-red shadow-sm" 
                        : "border-transparent hover:bg-white/60"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-bold text-sm ${isSelected ? "text-brand-red" : "text-brand-blue"}`}>
                        {lead.name}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {format(new Date(lead.created_at), "MMM d")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500">
                        {lead.type.replace(" Request", "")}
                      </span>
                      {lead.status === 'New' && (
                        <span className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {snippet}
                    </p>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Pane - Detail View */}
      <div className="flex-1 bg-white flex flex-col hidden lg:flex">
        {selectedLead ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLead.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Detail Header Action Bar */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10 sticky top-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 text-brand-blue flex items-center justify-center font-bold text-lg border border-brand-blue/10">
                    {selectedLead.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-cherith text-brand-blue">{selectedLead.name}</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedLead.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Status Toggle */}
                  <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                    {['New', 'Processing', 'Resolved'].map(status => (
                      <button
                        key={status}
                        disabled={isPending}
                        onClick={() => handleStatusUpdate(selectedLead.id, selectedLead.type, status)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                          selectedLead.status === status 
                            ? getStatusColor(status) + " shadow-md" 
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <div className="w-px h-8 bg-gray-200 mx-2"></div>

                  <button 
                    onClick={() => handleDelete(selectedLead.id, selectedLead.type)}
                    disabled={isPending}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                    title="Delete Message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                
                {/* Meta Information Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                    <Mail className="w-4 h-4 text-brand-red" />
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                      <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedLead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                    <Phone className="w-4 h-4 text-brand-red" />
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                      <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedLead.phone || "Not provided"}</p>
                    </div>
                  </div>
                  {selectedLead.location && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                      <MapPin className="w-4 h-4 text-brand-red" />
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedLead.location}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                    <Clock className="w-4 h-4 text-brand-red" />
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Received</p>
                      <p className="text-xs font-semibold text-gray-700 mt-0.5">{format(new Date(selectedLead.created_at), "PPP p")}</p>
                    </div>
                  </div>
                </div>

                {/* The Actual Message */}
                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Message Content</h3>
                  <div className="p-6 rounded-2xl bg-zinc-50 border border-gray-100 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {selectedLead.message || selectedLead.description || selectedLead.details || "No content provided by the user."}
                  </div>
                </div>
              </div>

              {/* Reply Box Anchored to Bottom */}
              <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] relative z-10">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Reply</h3>
                <div className="flex flex-col gap-3">
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Write a response to ${selectedLead.name}...`}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all resize-none min-h-[100px]"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-gray-400 font-medium">Sending this will notify the client and mark inquiry as Resolved.</p>
                    <button 
                      onClick={handleReply}
                      disabled={!replyText.trim() || isPending}
                      className="px-6 py-3 bg-brand-blue hover:bg-brand-red text-white rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-brand-blue/20"
                    >
                      {isPending ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <><Send className="w-3 h-3" /> Send Reply</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gray-50/30">
            <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold font-cherith text-gray-400 mb-2">No Message Selected</h3>
            <p className="text-sm text-gray-400">Select an inquiry from the list to view details and reply.</p>
          </div>
        )}
      </div>

    </div>
  );
}
