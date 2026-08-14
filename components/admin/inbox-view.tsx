"use client";

import { useState, useTransition, useMemo, useEffect, useCallback } from "react";
import {
  Mail,
  Phone,
  CheckCircle2,
  Trash2,
  Send,
  MapPin,
  Search,
  Clock,
  Briefcase,
  Info,
  X,
  ChevronRight,
  MessageSquare,
  ArrowLeft,
  RefreshCw,
  Filter,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteLead,
  updateLeadStatus,
  replyToLead,
  getMessageReplies,
  MessageType,
  MessageReply,
} from "@/app/admin/inbox/actions";
import { NormalizedMessage } from "@/app/admin/inbox/types";

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl text-sm font-semibold ${
        type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
      {message}
    </motion.div>
  );
}

// ─── Type Badge ───────────────────────────────────────────────────────────────
const TYPE_STYLES: Record<string, string> = {
  "General Inquiry":  "bg-indigo-50 text-indigo-600 border-indigo-100",
  "Survey Request":   "bg-blue-50 text-blue-600 border-blue-100",
  "Quote Request":    "bg-amber-50 text-amber-600 border-amber-100",
  "Consultation":     "bg-purple-50 text-purple-600 border-purple-100",
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${TYPE_STYLES[type] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>
      {type.replace(" Request", "")}
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  New:        "bg-red-500 text-white",
  Processing: "bg-brand-blue text-white",
  Resolved:   "bg-emerald-500 text-white",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status === "New" && <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />}
      {status}
    </span>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function getSnippet(lead: NormalizedMessage): string {
  return (
    lead.message ??
    lead.description ??
    lead.details ??
    (
      (lead.topic ? `Topic: ${lead.topic}` : "") ||
      (lead.service ? `Service: ${lead.service}` : "") ||
      (lead.survey_type ? `Survey type: ${lead.survey_type}` : "") ||
      "No message content provided."
    )
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function InboxView({ leads: initialLeads }: { leads: NormalizedMessage[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<NormalizedMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [filterType, setFilterType] = useState<MessageType | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [replies, setReplies] = useState<MessageReply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const showToast = useCallback((type: "success" | "error", text: string) => {
    setToast({ type, text });
  }, []);

  // Open a lead and auto-mark as 'Processing' if it was 'New'
  const openLead = useCallback((lead: NormalizedMessage) => {
    setSelectedLead(lead);
    setReplyText("");
    if (lead.status === "New") {
      // Optimistically update state first for instant visual feedback
      setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status: "Processing" } : l));
      setSelectedLead({ ...lead, status: "Processing" });
      // Then persist to DB in background (no need to await)
      updateLeadStatus(lead.id, lead.type, "Processing").catch(console.error);
    }
  }, []);

  // Load reply history whenever a message is opened
  useEffect(() => {
    if (!selectedLead) { setReplies([]); return; }
    setLoadingReplies(true);
    getMessageReplies(selectedLead.id).then(({ replies: r }) => {
      setReplies(r ?? []);
    }).finally(() => setLoadingReplies(false));
  }, [selectedLead?.id]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesFilter = filterType === "All" || lead.type === filterType;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        getSnippet(lead).toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [leads, filterType, searchQuery]);

  const handleDelete = (id: string, type: MessageType) => {
    if (!confirm("Permanently delete this inquiry?")) return;
    startTransition(async () => {
      const result = await deleteLead(id, type);
      if (result?.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        showToast("success", "Inquiry deleted.");
      } else {
        showToast("error", result?.error ?? "Failed to delete.");
      }
    });
  };

  const handleStatusUpdate = (id: string, type: MessageType, newStatus: string) => {
    startTransition(async () => {
      const result = await updateLeadStatus(id, type, newStatus);
      if (result?.success) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
        if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, status: newStatus } : null);
        showToast("success", `Marked as ${newStatus}`);
      } else {
        showToast("error", result?.error ?? "Failed to update status.");
      }
    });
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedLead) return;
    startTransition(async () => {
      const result = await replyToLead(selectedLead.id, selectedLead.email, replyText, selectedLead.type);
      if (result?.success) {
        showToast("success", `Reply sent to ${selectedLead.email}`);
        setReplyText("");
        // Optimistic update: mark as Resolved
        setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, status: "Resolved" } : l)));
        setSelectedLead((prev) => prev ? { ...prev, status: "Resolved" } : null);
        // Refresh reply history from DB
        const { replies: r } = await getMessageReplies(selectedLead.id);
        setReplies(r ?? []);
      } else {
        showToast("error", result?.error ?? "Failed to send reply.");
      }
    });
  };

  const tabs: (MessageType | "All")[] = [
    "All",
    "General Inquiry",
    "Survey Request",
    "Quote Request",
    "Consultation",
  ];

  const newCount = leads.filter((l) => l.status === "New").length;

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.text}
            message={toast.text}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Slide-Over Overlay */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-brand-blue/30 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 35 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-brand-blue/5 text-brand-blue flex items-center justify-center font-bold text-lg border border-brand-blue/10 flex-shrink-0">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-brand-blue font-cherith">{selectedLead.name}</h2>
                    <TypeBadge type={selectedLead.type} />
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-brand-red hover:bg-red-50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto">

                {/* ── Status + Actions Bar ── */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50/80 border-b border-gray-100">
                  <div className="flex bg-white p-1 rounded-xl border border-gray-100 gap-1">
                    {(["New", "Processing", "Resolved"] as const).map((s) => (
                      <button
                        key={s}
                        disabled={isPending}
                        onClick={() => handleStatusUpdate(selectedLead.id, selectedLead.type, s)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                          selectedLead.status === s
                            ? STATUS_STYLES[s] + " shadow-sm"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(selectedLead.id, selectedLead.type)}
                    disabled={isPending}
                    title="Delete inquiry"
                    className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all text-xs font-semibold disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>

                {/* ── Contact Meta ── */}
                <div className="px-6 py-6 space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Details</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                      <Mail className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5 break-all">{selectedLead.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                      <Phone className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">{selectedLead.phone ?? "Not provided"}</p>
                      </div>
                    </div>

                    {selectedLead.type === "Survey Request" && (
                      <>
                        {selectedLead.survey_type && (
                          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50 border border-blue-100">
                            <Briefcase className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Survey Type</p>
                              <p className="text-xs font-semibold text-blue-700 mt-0.5">{selectedLead.survey_type}</p>
                            </div>
                          </div>
                        )}
                        {selectedLead.location && (
                          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50 border border-blue-100">
                            <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Location</p>
                              <p className="text-xs font-semibold text-blue-700 mt-0.5">{selectedLead.location}</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {selectedLead.type === "Quote Request" && selectedLead.service && (
                      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
                        <Briefcase className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Service Requested</p>
                          <p className="text-xs font-semibold text-amber-700 mt-0.5">{selectedLead.service}</p>
                        </div>
                      </div>
                    )}

                    {selectedLead.type === "Consultation" && selectedLead.topic && (
                      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50 border border-purple-100 col-span-2">
                        <Info className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">Topic</p>
                          <p className="text-xs font-semibold text-purple-700 mt-0.5">{selectedLead.topic}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Received</p>
                        <p className="text-xs font-semibold text-gray-600 mt-0.5">{format(new Date(selectedLead.created_at), "PPP · p")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Original Message ── */}
                <div className="px-6 pb-6">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Message</h3>
                  <div className="p-5 rounded-2xl bg-zinc-50 border border-gray-100 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {getSnippet(selectedLead)}
                  </div>
                </div>

                {/* ── Reply History ── */}
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reply History</h3>
                    {loadingReplies && <RefreshCw className="w-3 h-3 text-gray-300 animate-spin" />}
                  </div>

                  {replies.length === 0 && !loadingReplies ? (
                    <div className="flex flex-col items-center py-6 rounded-2xl border border-dashed border-gray-200 text-gray-400">
                      <MessageSquare className="w-6 h-6 mb-2 opacity-30" />
                      <p className="text-xs font-medium">No replies sent yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {replies.map((r) => (
                        <div key={r.id} className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/10">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest">You replied</span>
                            <span className="text-[9px] text-gray-400">·</span>
                            <span className="text-[9px] text-gray-400">{formatDistanceToNow(new Date(r.sent_at), { addSuffix: true })}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{r.reply_text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Reply Box (pinned to bottom) ── */}
              <div className="border-t border-gray-100 bg-white px-6 py-5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Write a Reply</h3>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Type your reply to ${selectedLead.name}…`}
                  rows={4}
                  disabled={isPending}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all resize-none text-gray-800 placeholder-gray-400"
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-[10px] text-gray-400">
                    Sends to <span className="font-semibold">{selectedLead.email}</span> and saves to history.
                  </p>
                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim() || isPending}
                    className="px-5 py-2.5 bg-brand-blue hover:bg-brand-red disabled:opacity-40 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-brand-blue/20"
                  >
                    {isPending ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    Send Reply
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Full Width Inbox Table ── */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col">

        {/* Table Toolbar */}
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or content…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-wrap">
            {tabs.map((tab) => {
              const count = leads.filter((l) => tab === "All" || l.type === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setFilterType(tab)}
                  className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    filterType === tab
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                      : "bg-white border border-gray-100 text-gray-400 hover:text-brand-blue hover:border-brand-blue/20"
                  }`}
                >
                  {tab.replace(" Request", "")}
                  <span className={`text-[9px] font-black ${filterType === tab ? "opacity-70" : "opacity-50"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_60px] gap-4 px-6 py-3 bg-gray-50/80 border-b border-gray-100">
          {["Sender", "Subject / Content", "Type", "Status", "Date", ""].map((h) => (
            <p key={h} className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center px-6">
              <Mail className="w-12 h-12 text-gray-200 mb-4" />
              <h3 className="text-lg font-bold text-gray-400 font-cherith">No Inquiries Found</h3>
              <p className="text-sm text-gray-400 mt-1">
                {searchQuery ? `No results for "${searchQuery}"` : "Your inbox is empty."}
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const snippet = getSnippet(lead);
              return (
                <motion.button
                  key={lead.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => openLead(lead)}
                  className={`w-full text-left hover:bg-gray-50/80 transition-all group ${
                    lead.status === "New" ? "bg-white" : "bg-white/60"
                  }`}
                >
                  {/* Mobile layout */}
                  <div className="lg:hidden px-5 py-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm font-bold ${lead.status === "New" ? "text-brand-blue" : "text-gray-600"}`}>
                          {lead.name}
                          {lead.status === "New" && <span className="ml-2 w-1.5 h-1.5 inline-block rounded-full bg-brand-red" />}
                        </p>
                        <p className="text-[10px] text-gray-400">{lead.email}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <StatusBadge status={lead.status} />
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-blue transition-colors" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TypeBadge type={lead.type} />
                      <span className="text-[10px] text-gray-400">{format(new Date(lead.created_at), "MMM d, yyyy")}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{snippet}</p>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden lg:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_60px] gap-4 items-center px-6 py-4">
                    {/* Sender */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        lead.status === "New" ? "bg-brand-red/10 text-brand-red" : "bg-gray-100 text-gray-500"
                      }`}>
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${lead.status === "New" ? "text-brand-blue" : "text-gray-700"}`}>
                          {lead.name}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">{lead.email}</p>
                      </div>
                    </div>

                    {/* Snippet */}
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed pr-4">{snippet}</p>

                    {/* Type */}
                    <div><TypeBadge type={lead.type} /></div>

                    {/* Status */}
                    <div><StatusBadge status={lead.status} /></div>

                    {/* Date */}
                    <p className="text-xs text-gray-400 font-medium">
                      {format(new Date(lead.created_at), "MMM d")}
                    </p>

                    {/* Arrow */}
                    <div className="flex justify-end">
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-blue transition-colors" />
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Footer */}
        {filteredLeads.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {filteredLeads.length} of {leads.length} inquiries
            </p>
            {newCount > 0 && (
              <span className="text-[10px] font-bold text-brand-red">{newCount} unread</span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
