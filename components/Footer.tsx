import React from 'react';
import { Phone, MapPin, HeartPulse } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-white pt-16 pb-8 px-4 mt-16 rounded-t-[3rem] shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-5"></div>
        
        <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-center md:text-right">
                
                {/* Contact Item */}
                <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-brand-700 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:bg-brand-600 border-2 border-brand-500">
                        <Phone className="w-8 h-8 text-cyan-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">اتصل بنا</h3>
                    <p className="text-2xl font-mono dir-ltr">{CONTACT_INFO.phone}</p>
                </div>

                {/* Location Item */}
                <div className="flex flex-col items-center group">
                    <div className="w-16 h-16 bg-brand-700 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-brand-500">
                        <MapPin className="w-8 h-8 text-accent-red" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">العنوان</h3>
                    <p className="text-lg text-brand-100">{CONTACT_INFO.address}</p>
                </div>

                {/* Slogan Item */}
                <div className="flex flex-col items-center group">
                    <div className="w-16 h-16 bg-brand-700 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-brand-500">
                        <HeartPulse className="w-8 h-8 text-pink-400 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">رؤيتنا</h3>
                    <p className="text-lg text-brand-100">{CONTACT_INFO.slogan}</p>
                </div>
            </div>

            <div className="mt-12 border-t border-brand-800 pt-8 text-center text-brand-400 text-sm">
                <p>&copy; {new Date().getFullYear()} {CONTACT_INFO.address}. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;