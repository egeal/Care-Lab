import React from 'react';
import { Microscope, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="relative w-full text-center py-12 px-4 overflow-hidden bg-gradient-to-r from-brand-900 to-brand-700 text-white rounded-b-[3rem] shadow-xl mb-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-2 border border-white/20">
          <Microscope className="w-8 h-8 text-cyan-300 ml-2" />
          <h2 className="text-xl font-bold tracking-wide">{CONTACT_INFO.address}</h2>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-2 leading-tight drop-shadow-lg">
          <span className="text-white">خصومات</span> <br className="md:hidden"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-accent-gold to-yellow-200">
             رأس السنة {CONTACT_INFO.year}
          </span>
        </h1>
        
        <div className="flex items-center gap-2 text-lg md:text-xl font-medium text-brand-100 bg-brand-800/50 px-6 py-2 rounded-full border border-brand-500/30">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span>عروض حصرية لفترة محدودة</span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;