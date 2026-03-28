import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Cherith GeoSystems",
  description: "Terms of service for Cherith Informatics & Mapping Ltd. outlining the rules, regulations, and usage of our geospatial services and digital platforms.",
};

export default function TermsAndConditions() {
  const lastUpdated = "March 26, 2026";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Header Section */}
      <section className="bg-brand-blue py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cherith text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              These terms govern your use of the Cherith GeoSystems website and our professional services. By engaging with our spatial data portals or consultancy services, you agree to these conditions in full.
            </p>
            <div className="mt-8 inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm text-sm text-brand-red font-medium">
              Effective Date: {lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 text-zinc-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              
              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  By accessing and using the services of Cherith Informatics & Mapping Ltd. ("Cherith GeoSystems"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  2. Scope of Services
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Cherith GeoSystems provides specialized geospatial engineering, surveying, and GIS services. This includes but is not limited to:
                  </p>
                  <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg">
                    <li>Land, cadastral, and topographical surveying.</li>
                    <li>Digital mapping and GIS web portal access.</li>
                    <li>Drone-based remote sensing and aerial data collection.</li>
                    <li>Underground utility mapping via GPR (Ground Penetrating Radar).</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed text-lg italic">
                    All services are provided according to the technical specifications outlined in individual project contracts or service level agreements.
                  </p>
                </div>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  3. Intellectual Property
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  The website, its original content, features, and functionality are owned by Cherith GeoSystems and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <div className="bg-zinc-50 p-6 rounded-2xl border-l-4 border-brand-red">
                   <p className="text-gray-700 font-medium">
                     Spatial data generated during specific client projects remains the property of the client as outlined in the project contract, while Cherith retains the right to any proprietary methodologies or software used in the data generation.
                   </p>
                </div>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  4. User Conduct
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  As a user of our digital tools and GIS portals, you agree not to:
                </p>
                <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg">
                  <li>Use the services for any illegal or unauthorized purpose.</li>
                  <li>Attempt to decompile, reverse engineer, or extract source code from our web applications.</li>
                  <li>Upload or transmit any malicious code or viruses.</li>
                  <li>Inappropriately access or scrape data from our spatial databases without authorization.</li>
                </ul>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  5. Limitation of Liability
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Cherith Informatics & Mapping Ltd. shall not be held liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  6. Governing Law
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  These terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions. Any legal action or proceeding related to your access to or use of the services shall be instituted in the courts of Kenya.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mt-20 group">
                <div className="bg-brand-blue rounded-[3rem] p-12 relative overflow-hidden shadow-2xl shadow-brand-blue/30">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold font-cherith text-white">Need Clarification?</h2>
                      <p className="text-gray-300 text-lg">
                        Our legal and administrative teams are available to discuss the specifics of our engagement terms for your next geospatial project.
                      </p>
                      <div className="flex flex-col gap-2">
                         <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Official Contact</span>
                         <span className="text-white text-2xl font-bold">legal@cherith.co.ke</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4">
                      <h4 className="text-white font-bold text-lg">Cherith Headquarters</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Olympic House, 1st Floor, Room 104<br/>
                        Nairobi, Kenya<br/>
                        P.O. Box 1968-00200
                      </p>
                      <div className="h-1 w-20 bg-brand-red"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
