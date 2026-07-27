"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  Building2, FileText, Calculator, Users, Globe2 
} from "lucide-react";

type FormType = "inquiry" | "survey" | "quote" | "consultation";

import { submitLead } from "@/app/(marketing)/actions/leads";

export function ContactSection() {
  const [formType, setFormType] = useState<FormType>("inquiry");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitLead(formType, formData);

    if (result.success) {
      setFormStatus("success");
    } else {
      setFormStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  const contactMethods = [
    {
      icon: Building2,
      label: "Headquarters",
      value: "Olympic House, 1st Floor, Room 104",
      desc: "P.O. Box 1968-00200, Nairobi, Kenya",
    },
    {
      icon: Phone,
      label: "Direct Line",
      value: "0790034580",
      desc: "Mon-Sat from 8am to 5pm EAT",
    },
    {
      icon: Mail,
      label: "Email Support",
      value: "info@cherith.co.ke",
      desc: "Contact us anytime",
    },
    {
      icon: Globe2,
      label: "Operational Hours",
      value: "Available 24/7",
      desc: "For rapid remote sensing and GIS analysis",
    },
  ];

  const inquiryOptions = [
    { value: "inquiry", label: "General Inquiry" },
    { value: "survey", label: "Survey Request" },
    { value: "quote", label: "Get a Quote" },
    { value: "consultation", label: "Expert Consultation" },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50 relative border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          
          {/* Left: Contact Info (4 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left mb-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-cherith text-brand-blue leading-tight mb-4">
                Get in <span className="text-brand-red">Touch</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                How can we help you today? Send us a message and our team will get back to you shortly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-red/10 transition-colors shadow-inner">
                    <method.icon className="w-4 h-4 text-brand-blue group-hover:text-brand-red transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 font-cherith text-base">
                    {method.label}
                  </h3>
                  <p className="text-brand-blue font-bold mb-0.5 text-xs">
                    {method.value}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider leading-relaxed">
                    {method.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Dynamic Multi-Form (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-brand-blue/5 border border-gray-100 relative overflow-hidden flex flex-col"
          >
            <div className="mb-6 flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                How can we help you?
              </label>
              <select
                value={formType}
                onChange={(e) => {
                  setFormType(e.target.value as FormType);
                  setFormStatus("idle");
                }}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-red/20 outline-none text-sm font-medium text-brand-blue appearance-none cursor-pointer"
              >
                {inquiryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div 
                   key="success"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue font-cherith mb-2">Message Sent</h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
                    Thanks for reaching out! We've received your request and will contact you soon.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-2.5 bg-gray-100 text-brand-blue rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key={formType}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-5 md:gap-6"
                >
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-bold uppercase tracking-widest">
                      {errorMessage}
                    </div>
                  )}

                  {/* Common Fields: Name, Email, Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormGroup label="Full Name" id="name" name="name" placeholder="John Doe" required />
                    <FormGroup label="Email Address" id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormGroup label="Phone Number" id="phone" name="phone" placeholder="+254 ..." />
                    
                    {/* Conditional Fields based on Form Type */}
                    {formType === "survey" && (
                       <FormGroup label="Survey Location" id="location" name="location" placeholder="e.g. Nairobi, Kiambu" required />
                    )}
                    {formType === "quote" && (
                       <FormGroup label="Target Budget (Optional)" id="budget" name="budget" placeholder="e.g. 50,000 KES" />
                    )}
                    {formType === "consultation" && (
                       <FormGroup label="Preferred Date" id="date" name="date" type="date" required />
                    )}
                    {formType === "inquiry" && (
                       <FormGroup label="Subject" id="subject" name="subject" placeholder="General Inquiry" />
                    )}
                  </div>

                  {/* Specialized Dropdowns */}
                  {formType === "survey" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Survey Type</label>
                      <select name="survey_type" required className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-red/20 outline-none text-sm font-medium text-brand-blue appearance-none">
                        <option value="cadastral">Cadastral / Boundary</option>
                        <option value="topo">Topographical Mapping</option>
                        <option value="engineering">Engineering / Construction</option>
                        <option value="bathymetric">Bathymetric Survey</option>
                      </select>
                    </div>
                  )}

                  {formType === "quote" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Service</label>
                      <select name="service" required className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-red/20 outline-none text-sm font-medium text-brand-blue appearance-none">
                        <option value="gis">GIS Database</option>
                        <option value="remote-sensing">Remote Sensing</option>
                        <option value="drone">Drone Mapping</option>
                        <option value="consultancy">Technical Consultancy</option>
                      </select>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {formType === "inquiry" ? "Your Message" : formType === "survey" ? "Survey Requirements" : formType === "quote" ? "Project Details" : "Consultation Topic"}
                    </label>
                    <textarea 
                      name="message"
                      required 
                      rows={4}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-red/20 outline-none text-sm font-medium text-brand-blue resize-none"
                      placeholder="Tell us more about what you need..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="mt-4 w-full bg-brand-blue hover:bg-brand-red text-white py-3.5 md:py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue/10 active:scale-95 disabled:opacity-70 group"
                  >
                    {formStatus === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function FormGroup({ label, id, name, type = "text", placeholder, required = false }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
      <input 
        type={type} 
        id={id} 
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-red/20 outline-none text-sm font-medium text-brand-blue transition-all placeholder:text-gray-400"
      />
    </div>
  );
}

function MessageSquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
