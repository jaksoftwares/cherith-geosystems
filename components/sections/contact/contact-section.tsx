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
      value: "Cherith GeoSystems Limited",
      desc: "Nairobi Commercial Hub, Kenya",
    },
    {
      icon: Phone,
      label: "Direct Line",
      value: "+254 (0) 700 000 000",
      desc: "Mon-Sat from 8am to 5pm EAT",
    },
    {
      icon: Mail,
      label: "Email Support",
      value: "info@cherith.co.ke",
      desc: "Online support & RFP submissions",
    },
    {
      icon: Clock,
      label: "Operational Hours",
      value: "Available 24/7",
      desc: "For rapid remote sensing and GIS analysis",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold font-cherith text-brand-blue leading-tight tracking-tight mb-6">
                Get In <span className="text-brand-red">Touch</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md">
                Our engineers are ready to deploy. Share your project requirements with us.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-red/10 transition-colors">
                    <method.icon className="w-6 h-6 text-brand-blue group-hover:text-brand-red transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 font-cherith text-xl">
                    {method.label}
                  </h3>
                  <p className="text-brand-blue font-semibold mb-1">
                    {method.value}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">
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
               className="mt-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl"></div>
               <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                   <MapPin className="w-5 h-5 text-white" />
                 </div>
                 <div>
                   <p className="text-sm font-bold uppercase tracking-widest text-brand-red mb-1">Field Ready</p>
                   <p className="text-gray-700 font-medium">Equipped for rapid-response nationwide deployments.</p>
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
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-blue/5 border border-gray-100 relative overflow-hidden"
          >
            {/* Soft decorative blur */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>

            {formStatus === "success" ? (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 font-cherith mb-4">Message Sent</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  Thank you. Our team will review your inquiry and respond within 24 hours.
                </p>
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-brand-red transition-colors text-sm uppercase tracking-wider shadow-lg"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 font-cherith mb-2">Send a Message</h3>
                  <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all transition-shadow placeholder-gray-400"
                      placeholder="e.g. Samuel"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all transition-shadow placeholder-gray-400"
                      placeholder="e.g. Kamau"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all transition-shadow placeholder-gray-400"
                    placeholder="engineer@company.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Service</label>
                  <select 
                    id="service" 
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all text-gray-700 cursor-pointer appearance-none"
                  >
                    <option value="" disabled selected>Select a Service...</option>
                    <option value="cadastral">Cadastral / Boundary Survey</option>
                    <option value="topographical">Topographical Mapping</option>
                    <option value="gis">GIS Database Integration</option>
                    <option value="drone">UAV / Drone Orthomapping</option>
                    <option value="structural">Structural Assessment</option>
                    <option value="consulting">General Geospatial Consulting</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all transition-shadow placeholder-gray-400 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="mt-4 w-full bg-brand-blue hover:bg-brand-red text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-lg shadow-brand-blue/20 disabled:opacity-70 disabled:cursor-not-allowed group"
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
                <p className="text-xs text-center text-gray-400 mt-2 font-medium">Your information is secure with us.</p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
