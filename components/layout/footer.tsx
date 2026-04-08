import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Bio */}
          <div className="flex flex-col gap-6  ">
                      <Link
              href="/"
              className="inline-block relative w-56 h-16 sm:w-64 sm:h-20 md:w-[350px] md:h-32 rounded-2xl overflow-hidden"
            >
              <Image
                src="/logos/cherith_bg_white.jpeg"
                alt="Cherith GeoSystems Master Logo"
                fill
                className="object-cover object-left"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Transforming land and spatial data into accurate, actionable insights that power smarter decisions across Kenya and beyond.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors">
                 <span className="sr-only">LinkedIn</span>
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors">
                 <span className="sr-only">Twitter</span>
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 lg:pl-8">
            <h3 className="text-xl font-bold font-cherith">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'About Us', 'Services', 'Projects', 'Experience Beyond the Horizon', 'Insights', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    href={
                      link === 'Home' ? '/' : 
                      link === 'About Us' ? '/about' :
                      link === 'Experience Beyond the Horizon' ? '/experience' : 
                      link === 'Insights' ? '/blogs' :
                      `/${link.toLowerCase().replace(' ', '-')}`
                    } 
                    className="text-gray-300 hover:text-brand-red transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 text-brand-red opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold font-cherith">Our Services</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Land & Cadastral Surveys', slug: 'land-cadastral-surveys' }, 
                { name: 'Engineering & Topographical', slug: 'engineering-topographical-surveys' }, 
                { name: 'GIS & Spatial Analysis', slug: 'gis-data-integration' }, 
                { name: 'Remote Sensing & Drones', slug: 'remote-sensing' }, 
                { name: 'Underground Utility (GPR)', slug: 'underground-utility-mapping' },
                { name: 'Web GIS Development', slug: 'geoportal-development' }
              ].map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-gray-300 hover:text-brand-red transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold font-cherith">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-white/10 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Office Location</h4>
                  <p className="text-gray-300 text-sm mt-1">Olympic House, 1st Floor, Room 104<br/>P.O. Box 1968-00200<br/>Nairobi, Kenya</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-gray-300 text-sm mt-1">0722 300 565 / 0721 448 913</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-300 text-sm mt-1 break-all">info@cherith.co.ke<br/>gokusimba@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Cherith Informatics &amp; Mapping Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
