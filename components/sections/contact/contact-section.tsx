"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2 } from "lucide-react";

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate network delay
    setTimeout(() => setFormStatus("success"), 1500);
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
      value: "0722 300 565 / 0721 448 913",
      desc: "Mon-Sat from 8am to 5pm EAT",
    },
    {
      icon: Mail,
      label: "Email Support",
      value: "info@cherith.co.ke",
      desc: "Backup: gokusimba@gmail.com",
    },
    {
      icon: Clock,
      label: "Operational Hours",
      value: "Available 24/7",
      desc: "For rapid remote sensing and GIS analysis",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-cherith text-brand-blue leading-tight tracking-tight mb-4">
                Get In <span className="text-brand-red">Touch</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-md mx-auto lg:mx-0">
                Our engineers are ready to deploy. Share your project requirements with us through our contact channels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-red/10 transition-colors shadow-inner">
                    <method.icon className="w-5 h-5 text-brand-blue group-hover:text-brand-red transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 font-cherith text-lg">
                    {method.label}
                  </h3>
                  <p className="text-brand-blue font-bold mb-0.5 text-xs md:text-sm">
                    {method.value}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed font-medium">
                    {method.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.6 }}
               className="mt-8 md:mt-10 bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-lg relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl group-hover:bg-brand-red/10 transition-colors"></div>
               <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse shadow-lg shadow-brand-red/20">
                   <MapPin className="w-5 h-5 text-white" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red mb-0.5">Field Ready</p>
                   <p className="text-gray-700 font-bold text-xs md:text-sm">Equipped for rapid-response nationwide deployments.</p>
                 </div>
               </div>
            </motion.div>

          </div>

          {/* Right: Interactive Forms */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-brand-blue/5 border border-gray-100 relative overflow-hidden lg:mt-0 mt-8"
          >
            {/* Soft decorative blur */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>

            {formStatus === "success" ? (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-cherith mb-3">Message Sent</h3>
                <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
                  Thank you. Our team will review your inquiry and respond within 24 hours.
                </p>
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-semibold hover:bg-brand-red transition-colors text-xs uppercase tracking-wider shadow-lg"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5 relative z-10">
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-gray-900 font-cherith mb-1">Send a Message</h3>
                  <p className="text-gray-500 text-xs">Fill out the form below and we'll get back to you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.1em]">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all placeholder-gray-400 text-xs"
                      placeholder="e.g. Samuel"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.1em]">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all placeholder-gray-400 text-xs"
                      placeholder="e.g. Kamau"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.1em]">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all placeholder-gray-400 text-xs"
                    placeholder="engineer@company.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.1em]">Service</label>
                  <div className="relative">
                    <select 
                      id="service" 
                      defaultValue=""
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all text-gray-700 cursor-pointer appearance-none text-xs"
                    >
                      <option value="" disabled>Select a Service...</option>
                      <option value="cadastral">Cadastral / Boundary Survey</option>
                      <option value="topographical">Topographical Mapping</option>
                      <option value="gis">GIS Database Integration</option>
                      <option value="drone">UAV / Drone Orthomapping</option>
                      <option value="structural">Structural Assessment</option>
                      <option value="consulting">General Geospatial Consulting</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.1em]">Message</label>
                  <textarea 
                    id="message" 
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all placeholder-gray-400 resize-none text-xs"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="mt-2 w-full bg-brand-blue hover:bg-brand-red text-white py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-colors shadow-lg active:scale-95 disabled:opacity-70 group"
                >
                  {formStatus === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
