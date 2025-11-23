import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import OfferCard from './components/OfferCard';
import { LAB_PACKAGES, CONTACT_INFO } from './constants';
import { ChevronRight, ChevronLeft, Download, Loader2, Phone, MapPin, MessageCircle, Calendar, CheckCircle2, Video, Image as ImageIcon } from 'lucide-react';

// Dynamic imports for PDF generation libraries
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);

  // Total slides = Number of packages + 1 (for the final CTA slide)
  const totalSlides = LAB_PACKAGES.length + 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);

    try {
      // Initialize PDF: A4 size, portrait, millimeters
      const pdf = new jsPDF('p', 'mm', 'a4');
      const elements = printRef.current.children;
      const totalPages = elements.length;

      for (let i = 0; i < totalPages; i++) {
        const element = elements[i] as HTMLElement;
        
        // Capture the element as a canvas
        const canvas = await html2canvas(element, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Add image to PDF
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Add new page if not the last one
        if (i < totalPages - 1) {
          pdf.addPage();
        }
      }

      // Save the PDF
      pdf.save('CareLab-Offers-2025.pdf');

    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadVideo = async () => {
    if (!reelsRef.current) return;
    setIsGenerating(true);

    try {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        if(!ctx) throw new Error("Context not found");

        // Fill background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1080, 1920);

        // Set up MediaRecorder
        const stream = canvas.captureStream(30); // 30 FPS
        const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9') 
            ? 'video/webm; codecs=vp9' 
            : 'video/webm';
        
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType,
            videoBitsPerSecond: 10000000 // 10 Mbps for higher clarity
        });

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.start();

        const slides = Array.from(reelsRef.current.children) as HTMLElement[];

        // Iterate through slides
        for (const slide of slides) {
            // Render slide to image
            const slideCanvas = await html2canvas(slide, {
                scale: 1, // Already 1080x1920
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            // Draw to main canvas
            ctx.drawImage(slideCanvas, 0, 0);

            // "Hold" the frame for 3 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        mediaRecorder.stop();

        await new Promise(resolve => {
            mediaRecorder.onstop = resolve;
        });

        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CareLab-Offers-Reels-2025.webm';
        a.click();
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Video generation failed:", error);
        alert("حدث خطأ أثناء إنشاء الفيديو. المتصفح قد لا يدعم هذه الخاصية.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleDownloadImages = async () => {
    if (!reelsRef.current) return;
    setIsGenerating(true);

    try {
        const zip = new JSZip();
        const slides = Array.from(reelsRef.current.children) as HTMLElement[];

        // Iterate through slides
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            
            // Render slide to image (HD 1080x1920)
            const canvas = await html2canvas(slide, {
                scale: 1, // Native resolution of the container
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            // Convert to blob
            const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
            
            if (blob) {
                const fileName = i === slides.length - 1 
                    ? `CareLab-Contact-2025.jpg`
                    : `CareLab-Offer-${i + 1}.jpg`;
                
                zip.file(fileName, blob);
            }
        }

        // Generate Zip file
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CareLab-Offers-2025-HD-Images.zip';
        a.click();
        
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Image generation failed:", error);
        alert("حدث خطأ أثناء إنشاء الصور.");
    } finally {
        setIsGenerating(false);
    }
  };

  // Helper component for the CTA content (used in both Slide and Print view)
  const CTAContent = ({ isPrint = false, isReels = false }) => (
    <div className={`flex flex-col items-center justify-center text-center h-full relative overflow-hidden ${isPrint || isReels ? 'p-0' : 'p-8 bg-white rounded-3xl shadow-lg border-4 border-brand-500'}`}>
      
      {!isPrint && !isReels && (
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')] pointer-events-none"></div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-14">
        <div className="bg-brand-50 p-8 rounded-full mb-6 animate-bounce shadow-xl">
           <Calendar className={`${isPrint || isReels ? 'w-48 h-48' : 'w-24 h-24'} text-brand-600`} />
        </div>

        <h2 className={`${isPrint || isReels ? 'text-8xl' : 'text-5xl md:text-6xl'} font-black text-brand-900 leading-tight drop-shadow-sm`}>
          العرض ساري حتى <br/>
          <span className="text-accent-red">31 يناير 2025</span>
        </h2>

        <div className="w-48 h-3 bg-gradient-to-r from-brand-300 to-brand-600 rounded-full my-4"></div>

        <div className="flex flex-col items-center gap-6">
            <p className={`${isPrint || isReels ? 'text-6xl' : 'text-3xl'} font-extrabold text-gray-600`}>احجز دلوقتي</p>
            <div className={`flex items-center gap-6 dir-ltr ${isPrint || isReels ? 'text-8xl' : 'text-5xl md:text-6xl'} font-black text-brand-800 tracking-wider`}>
               <Phone className={`${isPrint || isReels ? 'w-24 h-24' : 'w-12 h-12'}`} />
               {CONTACT_INFO.phone}
            </div>
        </div>

        <a 
          href={`https://wa.me/20${CONTACT_INFO.phone}`} 
          target="_blank" 
          rel="noreferrer"
          className={`
            flex items-center gap-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95
            ${isPrint || isReels ? 'text-6xl py-12 px-20 mt-16 border-4 border-white' : 'text-xl md:text-3xl py-6 px-12 mt-8'}
          `}
        >
          <MessageCircle className={`${isPrint || isReels ? 'w-20 h-20' : 'w-10 h-10'}`} />
          <span>تواصل معنا عبر واتساب</span>
        </a>

        <div className={`mt-16 ${isPrint || isReels ? 'text-5xl' : 'text-2xl'} font-bold text-gray-500 flex items-center gap-4`}>
           <CheckCircle2 className={`text-brand-500 ${isPrint || isReels ? 'w-12 h-12' : 'w-8 h-8'}`} />
           <span>معمل كير لاب – صحتك تهمنا</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Container */}
      <main className="flex-grow w-full max-w-7xl mx-auto flex flex-col items-center">
        <Header />

        {/* Introduction & Actions */}
        <div className="px-4 mb-8 text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
            <p className="text-2xl text-gray-600 leading-relaxed font-bold">
                احتفل بصحتك في العام الجديد مع أقوى الخصومات من معمل كير لاب. 
                تصفح الباقات واختر ما يناسبك.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
                <button 
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-brand-700 text-white px-6 py-4 rounded-full shadow-lg hover:bg-brand-800 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg font-bold"
                >
                {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                <span>PDF</span>
                </button>

                <button 
                onClick={handleDownloadVideo}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-pink-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-pink-700 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg font-bold"
                >
                {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Video className="w-6 h-6" />}
                <span>فيديو ريلز</span>
                </button>

                 <button 
                onClick={handleDownloadImages}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-purple-700 hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg font-bold"
                >
                {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImageIcon className="w-6 h-6" />}
                <span>صور (JPG)</span>
                </button>
            </div>
        </div>

        {/* Carousel / Slider Area */}
        <div className="w-full max-w-5xl px-2 md:px-4 flex flex-col items-center justify-center pb-12">
          
          <div className="flex items-center justify-between w-full gap-2 md:gap-8">
            <button 
              onClick={prevSlide}
              className="p-4 rounded-full bg-white shadow-lg text-brand-700 hover:bg-brand-50 hover:text-brand-900 transition-all border border-brand-100 z-10"
              aria-label="Previous Slide"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Active Card Container */}
            <div className="flex-grow w-full max-w-lg mx-auto relative min-h-[700px] flex items-stretch">
              <div key={currentIndex} className="animate-fade-in w-full flex flex-col">
                {currentIndex < LAB_PACKAGES.length ? (
                   <OfferCard data={LAB_PACKAGES[currentIndex]} />
                ) : (
                   /* Render CTA Slide if it's the last index */
                   <CTAContent />
                )}
              </div>
            </div>

            <button 
              onClick={nextSlide}
              className="p-4 rounded-full bg-white shadow-lg text-brand-700 hover:bg-brand-50 hover:text-brand-900 transition-all border border-brand-100 z-10"
              aria-label="Next Slide"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>

          {/* Indicators / Pagination */}
          <div className="flex flex-col items-center mt-10 gap-4">
             <span className="text-xl font-bold text-gray-500">
               {currentIndex < LAB_PACKAGES.length 
                 ? `باقة ${currentIndex + 1} من ${LAB_PACKAGES.length}` 
                 : 'تواصل معنا'
               }
             </span>

             <div className="flex flex-wrap justify-center gap-2">
              {/* Dots for Packages */}
              {LAB_PACKAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-4 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-12 bg-brand-600 shadow-md scale-110' 
                      : 'w-4 bg-gray-300 hover:bg-brand-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              
              {/* Dot for CTA Slide */}
              <button
                  onClick={() => goToSlide(LAB_PACKAGES.length)}
                  className={`h-4 rounded-full transition-all duration-300 ${
                    currentIndex === LAB_PACKAGES.length
                      ? 'w-12 bg-green-500 shadow-md scale-110' 
                      : 'w-4 bg-gray-300 hover:bg-green-300'
                  }`}
                  aria-label="Go to contact slide"
                />
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Hidden Print Layout Container (PDF) */}
      <div 
        ref={printRef} 
        className="fixed top-0 left-[-10000px] pointer-events-none"
        aria-hidden="true"
      >
        {LAB_PACKAGES.map((pkg) => (
          <div 
            key={pkg.id} 
            className="w-[794px] h-[1123px] bg-white flex flex-col relative overflow-hidden" // A4 Dimensions
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            {/* Print Header */}
            <div className="bg-brand-900 text-white p-8 pb-16 rounded-b-[3rem] text-center relative">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white rounded-full blur-3xl"></div>
               </div>
               <h1 className="text-5xl font-black mb-4">معمل كير لاب</h1>
               <h2 className="text-3xl text-accent-gold">خصومات رأس السنة 2025</h2>
            </div>

            {/* Print Content (Centered Card) */}
            <div className="flex-grow flex items-center justify-center p-12 -mt-8">
              <div className="w-full max-w-[700px] transform scale-100">
                 <OfferCard data={pkg} />
              </div>
            </div>

            {/* Print Footer */}
            <div className="bg-gray-100 p-8 flex justify-between items-center text-brand-900 border-t border-gray-200">
                <div className="flex items-center gap-4">
                   <div className="bg-brand-200 p-3 rounded-full">
                     <Phone className="w-8 h-8 text-brand-700" />
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold text-xl">اتصل بنا</span>
                     <span className="text-2xl font-mono dir-ltr">{CONTACT_INFO.phone}</span>
                   </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="flex flex-col text-left">
                     <span className="font-bold text-xl text-right">العنوان</span>
                     <span className="text-xl">{CONTACT_INFO.address}</span>
                   </div>
                   <div className="bg-brand-200 p-3 rounded-full">
                     <MapPin className="w-8 h-8 text-brand-700" />
                   </div>
                </div>
            </div>
          </div>
        ))}

        {/* PDF CTA Page */}
        <div 
            className="w-[794px] h-[1123px] bg-white flex flex-col relative overflow-hidden" 
            style={{ fontFamily: 'Cairo, sans-serif' }}
        >
             {/* Print Header */}
            <div className="bg-brand-900 text-white p-8 pb-16 rounded-b-[3rem] text-center relative">
               <h1 className="text-5xl font-black mb-4">معمل كير لاب</h1>
               <h2 className="text-3xl text-accent-gold">صحتك تهمنا</h2>
            </div>

            {/* Print Content */}
            <div className="flex-grow flex items-center justify-center p-12">
               <div className="w-full max-w-[700px]">
                 <CTAContent isPrint={true} />
               </div>
            </div>

             {/* Print Footer */}
             <div className="bg-gray-100 p-8 text-center text-brand-900 border-t border-gray-200">
                <p className="text-2xl font-bold">معمل كير لاب - {new Date().getFullYear()}</p>
            </div>
        </div>
      </div>

      {/* Hidden Video Layout Container (Reels 1080x1920) */}
      <div 
        ref={reelsRef}
        id="reels-hidden-container"
        className="fixed top-0 left-[-20000px] pointer-events-none"
        aria-hidden="true"
      >
         {LAB_PACKAGES.map((pkg) => (
             <div 
                key={`reel-${pkg.id}`}
                className="w-[1080px] h-[1920px] bg-white flex flex-col relative overflow-hidden"
                style={{ fontFamily: 'Cairo, sans-serif' }}
             >
                {/* Reels Header */}
                <div className="bg-gradient-to-b from-brand-900 to-brand-700 text-white p-12 pb-24 rounded-b-[4rem] text-center relative shadow-2xl z-20">
                    <h1 className="text-8xl font-black mb-8 drop-shadow-lg">معمل كير لاب</h1>
                    <h2 className="text-6xl text-accent-gold font-bold">عروض 2025</h2>
                </div>

                {/* Reels Body - Adjusted for bigger card */}
                <div className="flex-grow flex items-center justify-center p-8 z-10 -mt-10 mb-10">
                   {/* Card is naturally responsive, we just constrain width slightly so it doesn't touch edges */}
                   <div className="w-full max-w-[950px]">
                       <OfferCard data={pkg} />
                   </div>
                </div>

                {/* Reels Footer */}
                <div className="bg-gray-100 p-12 flex flex-col items-center gap-8 text-brand-900 border-t-2 border-gray-200 z-20">
                    <div className="flex items-center gap-6 bg-white px-12 py-6 rounded-full shadow-lg border border-gray-200">
                        <Phone className="w-16 h-16 text-brand-600" />
                        <span className="text-7xl font-mono font-black dir-ltr">{CONTACT_INFO.phone}</span>
                    </div>
                    <div className="text-4xl font-bold text-gray-500">
                        {CONTACT_INFO.address}
                    </div>
                </div>
             </div>
         ))}

         {/* Reels CTA Page */}
         <div 
            className="w-[1080px] h-[1920px] bg-white flex flex-col relative overflow-hidden"
            style={{ fontFamily: 'Cairo, sans-serif' }}
         >
            <div className="bg-gradient-to-b from-brand-900 to-brand-700 text-white p-12 pb-24 rounded-b-[4rem] text-center relative shadow-2xl">
                <h1 className="text-8xl font-black mb-6">معمل كير لاب</h1>
            </div>

            <div className="flex-grow flex items-center justify-center p-12">
               <div className="w-full max-w-[950px]">
                 <CTAContent isReels={true} />
               </div>
            </div>

            <div className="bg-gray-100 p-16 text-center text-brand-900 border-t-2 border-gray-200">
                <p className="text-5xl font-bold">صحتك تهمنا</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default App;