
import React from 'react';
import { PackageData } from '../types';
import { 
  Activity, 
  Baby, 
  Droplet, 
  Stethoscope, 
  User, 
  Scale, 
  Heart, 
  Scissors, 
  FlaskConical, 
  Dna,
  CheckCircle2
} from 'lucide-react';

interface OfferCardProps {
  data: PackageData;
}

const OfferCard: React.FC<OfferCardProps> = ({ data }) => {
  const discount = Math.round(((data.oldPrice - data.price) / data.oldPrice) * 100);

  const getIcon = () => {
    switch (data.iconType) {
      case 'general': return <Activity className="w-14 h-14" />;
      case 'child': return <Baby className="w-14 h-14" />;
      case 'diabetes': return <Droplet className="w-14 h-14" />;
      case 'thyroid': return <Stethoscope className="w-14 h-14" />;
      case 'thin': return <User className="w-14 h-14" />;
      case 'obesity': return <Scale className="w-14 h-14" />;
      case 'pregnancy': return <Heart className="w-14 h-14" />;
      case 'hair': return <Scissors className="w-14 h-14" />;
      case 'minerals': return <FlaskConical className="w-14 h-14" />;
      case 'fertility': return <Dna className="w-14 h-14" />;
      default: return <Activity className="w-14 h-14" />;
    }
  };

  const getGradient = () => {
    switch (data.iconType) {
        case 'general': return 'from-blue-500 to-cyan-500';
        case 'child': return 'from-green-500 to-emerald-500';
        case 'diabetes': return 'from-red-500 to-rose-500';
        case 'thyroid': return 'from-purple-500 to-violet-500';
        case 'thin': return 'from-orange-400 to-amber-500';
        case 'obesity': return 'from-yellow-500 to-orange-500';
        case 'pregnancy': return 'from-pink-500 to-rose-400';
        case 'hair': return 'from-indigo-500 to-blue-600';
        case 'minerals': return 'from-teal-500 to-emerald-600';
        case 'fertility': return 'from-fuchsia-600 to-pink-600';
        default: return 'from-blue-500 to-cyan-500';
    }
  }

  const gradientClass = getGradient();

  return (
    <div className="group relative flex flex-col bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 h-full">
      
      {/* Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
         <span className="text-8xl md:text-9xl font-black text-gray-100/60 -rotate-45 whitespace-nowrap select-none">
            معمل كير لاب
         </span>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-0 left-0 z-20">
        <div className={`bg-gradient-to-br ${gradientClass} text-white text-2xl font-bold py-3 px-6 rounded-br-3xl shadow-lg`}>
          خصم {discount}%
        </div>
      </div>

      {/* Card Header */}
      <div className={`relative z-10 p-10 bg-gradient-to-br ${gradientClass} text-white overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="p-5 bg-white/20 backdrop-blur-sm rounded-3xl mb-5 shadow-inner">
            {getIcon()}
          </div>
          <h3 className="text-5xl font-black leading-tight drop-shadow-md">{data.title}</h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="relative z-10 flex-1 p-10">
        <ul className="space-y-4">
          {data.items.map((item, idx) => (
            <li key={idx} className="flex items-start text-2xl md:text-3xl text-gray-800 font-bold leading-relaxed">
              <CheckCircle2 className={`w-8 h-8 min-w-[2rem] ml-4 text-gray-400 group-hover:text-gray-600 mt-1`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer (Price) */}
      <div className="relative z-10 p-8 bg-gray-50/95 border-t border-gray-100 flex items-center justify-between">
         <div className="flex flex-col items-start gap-1">
            <span className="text-2xl text-gray-500 line-through decoration-red-400 decoration-4">
                {data.oldPrice} ج.م
            </span>
            <span className="text-xl text-gray-400 font-bold">بدلاً من</span>
         </div>
         <div className="flex items-end gap-3">
            <span className={`text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r ${gradientClass} leading-none`}>
                {data.price}
            </span>
            <span className="text-3xl font-extrabold text-gray-600 mb-3">جنية</span>
         </div>
      </div>
    </div>
  );
};

export default OfferCard;
