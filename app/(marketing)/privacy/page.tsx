import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Cherith GeoSystems",
  description: "Our commitment to protecting your privacy and managing your spatial and personal data with the highest level of security.",
};

export default function PrivacyPolicy() {
  const lastUpdated = "March 26, 2026";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Header Section */}
      <section className="bg-brand-blue py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cherith text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              At Cherith GeoSystems, we are committed to safeguarding your privacy. This policy outlines how we collect, use, and protect your information when you interact with our geospatial services and digital platforms.
            </p>
            <div className="mt-8 inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm text-sm text-brand-red font-medium">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              
              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  1. Introduction
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Cherith Informatics & Mapping Ltd. ("Cherith GeoSystems," "we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website or use our geospatial services.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We collect several types of information from and about users of our services, including:
                  </p>
                  <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg">
                    <li><strong className="text-brand-blue">Personal Identification:</strong> Name, postal address, e-mail address, and telephone number.</li>
                    <li><strong className="text-brand-blue">Technical Data:</strong> IP address, browser type, and operating system collected through cookies and tracking systems.</li>
                    <li><strong className="text-brand-blue">Geospatial Data:</strong> For specific projects, we may process spatial data, coordinates, and mapping information provided by clients or gathered via field collection.</li>
                    <li><strong className="text-brand-blue">Usage Data:</strong> Details of your visits to our site, including traffic data, location data, and logs of activities.</li>
                  </ul>
                </div>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  3. How We Use Your Information
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We use information that we collect about you or that you provide to us to:
                  </p>
                  <ul className="list-disc pl-8 space-y-4 text-gray-600 text-lg">
                    <li>Deliver the geospatial products, mapping reports, or consultancy services you request.</li>
                    <li>Fulfill the requirements of professional project consultations and agreements.</li>
                    <li>Maintain our customer relationship management and fulfill contractual obligations.</li>
                    <li>Notify you about critical updates to our geospatial portal or new service capabilities.</li>
                    <li>Optimize our web infrastructure and enhance the security of our digital platforms.</li>
                  </ul>
                </div>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  4. Disclosure of Your Information
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We do not sell, trade, or otherwise transfer your personal information to outside parties. This closure does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, provided those parties maintain strict confidentiality standards equivalent to our own.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  5. Data Security
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We have implemented robust physical, electronic, and managerial procedures designed to secure your personal and project information. All geospatial data and sensitive identification information is stored on secure servers protected by industry-standard encryption and firewalls.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  6. Your Rights
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  You have the right to request access to, correction of, or deletion of any personal information that we hold. You may also request a copy of the spatial data processed during your project or object to specific processing channels.
                </p>
              </div>

              <div className="group">
                <h2 className="text-3xl font-bold font-cherith text-brand-blue border-b-2 border-brand-red/10 pb-4 mb-6 group-hover:border-brand-red transition-all duration-300">
                  7. Contact Information
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg text-center md:text-left">
                    To ask questions or provide feedback about this privacy policy and our data protection standards, please contact our administrative head:
                  </p>
                  <div className="bg-zinc-50 rounded-3xl p-10 border border-zinc-100 shadow-inner group-hover:bg-brand-blue/[0.02] transition-colors">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-2">
                        <h4 className="text-brand-blue font-bold text-xl uppercase tracking-wider">Cherith Informatics & Mapping Ltd.</h4>
                        <p className="text-gray-500 font-medium">Headquarters</p>
                      </div>
                      <div className="border-l-4 border-brand-red pl-6 space-y-1">
                        <p className="text-zinc-700 font-bold">Olympic House, 1st Floor, Room 104</p>
                        <p className="text-zinc-600">Nairobi, Kenya</p>
                        <p className="text-brand-blue font-semibold mt-2 underline decoration-brand-red/20 underline-offset-4">info@cherith.co.ke</p>
                      </div>
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
