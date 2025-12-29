import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS } from './constants';
import { getGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

  const destinationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsTyping(true);
    const botResponse = await getGeminiResponse(userMsg);
    setChatHistory(prev => [...prev, { role: 'bot', text: botResponse || '' }]);
    setIsTyping(false);
  };

  const scrollToDestinations = () => {
    destinationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const logoUrl = "https://i.ibb.co/3ykG4SjV/logo.png";

  const ligatureFClasses = "relative inline-block after:content-[''] after:absolute after:top-[38.5%] after:left-[45%] after:w-[0.54em] after:h-[0.085em] after:bg-[#FBBF24] after:z-[5]";
  const ligatureIClasses = "relative inline-block -ml-[0.12em] [mask-image:linear-gradient(to_bottom,transparent_32%,black_32%)] after:content-[''] after:absolute after:top-[-0.05em] after:left-1/2 after:-translate-x-1/2 after:w-[0.22em] after:h-[0.22em] after:bg-[#1A1F2C] after:rounded-full after:z-[10]";

  const bubbleBaseClass = "hero-bubble shadow-xl";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl py-2 shadow-sm border-b border-black/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
              <div className="h-10 md:h-14 w-auto flex items-center justify-center overflow-hidden">
                <img src={logoUrl} alt="Gradway Logo" className="h-full w-auto object-contain" />
              </div>
            </a>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10 text-xs font-black text-[#1A1F2C]">
            <a href="#" className="hover:text-[#FBBF24] transition-colors uppercase tracking-[0.15em]">Home</a>
            <a href="#destinations" className="hover:text-[#FBBF24] transition-colors uppercase tracking-[0.15em]">Destinations</a>
            <a href="#services" className="hover:text-[#FBBF24] transition-colors uppercase tracking-[0.15em]">Services</a>
            <a href="#about" className="hover:text-[#FBBF24] transition-colors uppercase tracking-[0.15em]">About</a>
            <button className="bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 transition-all font-black uppercase tracking-widest text-[10px]">
              Book Consultation
            </button>
          </div>
          
          <div className="lg:hidden">
            <button className="w-10 h-10 flex items-center justify-center text-[#1A1F2C]">
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#FBBF24]/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 bg-slate-100/80 px-4 py-2 rounded-full mb-8 border border-slate-200">
               <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
               <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#1A1F2C]">Your partner in education.</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-8 md:mb-10">
              <span className="text-[#1A1F2C]">Migration</span> <br />
              <span className="text-[#FBBF24] inline-block">
                Simpl
                <span className={ligatureFClasses}>f</span>
                <span className={ligatureIClasses}>i</span>
                ed!!
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 mb-10 md:mb-12 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
              The Sri Lanka-based partner connecting you to world-class education that fits your profile, budget, and dreams.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
              <button 
                onClick={scrollToDestinations}
                className="bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] text-white px-10 py-5 rounded-full font-black shadow-xl hover:shadow-amber-200 hover:scale-105 transition-all text-xs uppercase tracking-[0.2em] w-full sm:w-auto"
              >
                Start Exploring
              </button>
              
              <a 
                href="https://wa.me/94775009929"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-10 py-5 rounded-full font-black shadow-xl hover:shadow-green-200 hover:scale-105 transition-all text-xs uppercase tracking-[0.2em] w-full sm:w-auto flex items-center justify-center gap-3"
              >
                <i className="fa-brands fa-whatsapp text-lg"></i>
                <span className="font-extrabold">Free Consultation</span>
              </a>
            </div>
          </div>

          {/* Improved Bubble Area: Better Mobile Organization & Premium Colors */}
          <div className="lg:w-1/2 relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-visible lg:-translate-x-12 mt-12 lg:mt-0">
            
            {/* 1. Students First (CENTERED BUBBLE) */}
            <div className={`${bubbleBaseClass} hero-bubble-center absolute top-1/2 left-1/2 w-[200px] h-[200px] md:w-[230px] md:h-[230px] lg:w-[260px] lg:h-[260px] bg-white/60 backdrop-blur-2xl [border-radius:60%_40%_30%_70%/60%_30%_70%_40%] animate-float-1 z-20`}>
               <div className="bubble-inner px-4">
                 <div className="icon-circle w-12 h-12 md:w-14 lg:w-18 bg-amber-100 mb-2 md:mb-3">
                   <i className="fa-solid fa-user-graduate text-2xl md:text-3xl lg:text-4xl text-amber-600"></i>
                 </div>
                 <span className="text-base md:text-xl lg:text-2xl font-black uppercase tracking-tight leading-none text-[#1A1F2C]">Students First <br/>Approach</span>
               </div>
            </div>

            {/* 2. Institutions (Top Left) - Amber */}
            <div className={`${bubbleBaseClass} absolute top-[0%] left-[5%] md:top-[8%] md:left-[8%] lg:top-[10%] lg:left-[5%] w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] bg-[#FBBF24] [border-radius:30%_70%_70%_30%/50%_40%_60%_50%] animate-float-2 z-30`}>
               <div className="bubble-inner">
                 <div className="icon-circle w-9 h-9 md:w-11 lg:w-13 bg-white/20 mb-1 md:mb-2">
                   <i className="fa-solid fa-hotel text-xl md:text-2xl lg:text-3xl text-white"></i>
                 </div>
                 <span className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-none">450+</span>
                 <span className="text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-white/90 mt-0.5">Institutions</span>
               </div>
            </div>
            
            {/* 3. Programs (Top Right - Anchor Outlier) - Soft Blue/White */}
            <div className={`${bubbleBaseClass} absolute top-[5%] right-[0%] md:top-[18%] md:right-[0%] lg:top-[15%] lg:right-[-10%] w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] bg-white/90 backdrop-blur-md [border-radius:50%_50%_20%_80%/25%_80%_20%_75%] animate-float-4 z-10`}>
               <div className="bubble-inner">
                 <div className="icon-circle w-8 h-8 md:w-10 lg:w-12 bg-blue-50 mb-1 md:mb-2">
                   <i className="fa-solid fa-book-open text-lg md:text-xl lg:text-2xl text-blue-500"></i>
                 </div>
                 <span className="text-lg md:text-2xl lg:text-3xl font-black text-[#1A1F2C] leading-none">10k+</span>
                 <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">Programs</span>
               </div>
            </div>

            {/* 4. Countries (Bottom Right) - NEW Sophisticated Indigo */}
            <div className={`${bubbleBaseClass} absolute bottom-[5%] right-[0%] md:bottom-[15%] md:right-[10%] lg:bottom-[18%] lg:right-[5%] w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] bg-[#4338ca] [border-radius:70%_30%_30%_70%/60%_70%_30%_40%] animate-float-3 z-30`}>
               <div className="bubble-inner">
                 <div className="icon-circle w-9 h-9 md:w-11 lg:w-13 bg-white/10 mb-1">
                   <i className="fa-solid fa-earth-americas text-xl md:text-2xl lg:text-3xl text-white"></i>
                 </div>
                 <span className="text-xl md:text-2xl lg:text-4xl font-black text-white leading-none">10+</span>
                 <span className="text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-white/70 mt-0.5">Countries</span>
               </div>
            </div>

            {/* 5. Application Management (Bottom Left) - NEW Royal Purple */}
            <div className={`${bubbleBaseClass} absolute bottom-[0%] left-[5%] md:bottom-[10%] md:left-[10%] lg:bottom-[12%] lg:left-[8%] w-[125px] h-[125px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] bg-[#7c3aed] [border-radius:40%_60%_30%_70%/50%_70%_30%_50%] animate-float-2 z-10`}>
               <div className="bubble-inner px-2">
                 <div className="icon-circle w-9 h-9 md:w-11 lg:w-13 bg-white/20 mb-1 md:mb-2">
                   <i className="fa-solid fa-clipboard-check text-xl md:text-2xl lg:text-3xl text-white"></i>
                 </div>
                 <span className="text-[9px] md:text-[11px] lg:text-[13px] font-black uppercase tracking-tight text-white text-center leading-tight">End-to-end <br/>application <br/>management</span>
               </div>
            </div>
            
            {/* Ambient Background Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-amber-500/5 rounded-full -z-20 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section ref={destinationsRef} id="destinations" className="pt-8 md:pt-12 pb-32 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col mb-12">
            <div className="max-w-2xl text-left">
               <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Global Opportunities</span>
               <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] leading-tight mb-4">Your World-Class <br/>Destination Awaits</h2>
               <p className="text-slate-500 text-base md:text-lg mb-8 leading-relaxed">Select your preferred destination and let us pave the way for your future.</p>
               
               <button className="px-10 py-4 bg-[#1A1F2C] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-500 transition-all flex items-center gap-3 w-fit shadow-xl">
                <span>View All Destinations</span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {DESTINATIONS.map((dest) => (
              <div key={dest.id} className="group relative bg-slate-50 rounded-[2rem] overflow-hidden p-8 hover:bg-white hover:shadow-2xl hover:shadow-amber-100 transition-all duration-500 border border-transparent hover:border-amber-100">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className={`${dest.icon} text-xl md:text-2xl`} style={{ color: dest.color }}></i>
                   </div>
                   <div className="w-10 h-6 md:w-12 md:h-8 rounded shadow-sm overflow-hidden border border-slate-200">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                   </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-3 text-[#1A1F2C]">{dest.name}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-10 min-h-[3rem]">
                  {dest.description}
                </p>
                <div className="flex items-center gap-2 text-[#1A1F2C] font-black text-[10px] uppercase tracking-[0.25em] group-hover:text-amber-500 transition-colors">
                  <span>Explore Unis</span>
                  <i className="fa-solid fa-arrow-right translate-x-0 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talk to a counsellor Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-[#7799FF] via-[#88AAFF] to-[#DDAAFF] overflow-hidden">
         <div className="container mx-auto px-4 text-center text-white relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-sm">Talk to a counsellor</h2>
            <p className="text-lg md:text-xl font-medium opacity-90 mb-16">Tell us your story and we will sketch realistic routes together</p>

            <div className="flex flex-col items-center mb-24">
               <a 
                 href="https://wa.me/94775009929"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-white/20 backdrop-blur-md px-12 py-5 rounded-full flex items-center space-x-4 border border-white/30 hover:bg-white/30 transition-all shadow-2xl group"
               >
                 <i className="fa-brands fa-whatsapp text-2xl text-green-300"></i>
                 <span className="text-xl font-bold text-white">Chat on <span className="text-green-300">WhatsApp</span></span>
                 <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
               </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto text-white">
               <div className="relative">
                  <button 
                    onClick={() => setShowPhoneOptions(!showPhoneOptions)}
                    className="group flex flex-col items-center"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                       <i className="fa-solid fa-phone text-lg"></i>
                       <span className="text-lg font-bold uppercase tracking-wider">Call Us</span>
                    </div>
                    <span className="text-xl font-medium group-hover:text-amber-200 transition-colors">+94 77 500 9929</span>
                  </button>
                  
                  {showPhoneOptions && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-56 bg-white rounded-3xl p-2 shadow-2xl border border-blue-100 z-50">
                       <a href="tel:+94775009929" className="flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                             <i className="fa-solid fa-phone"></i>
                          </div>
                          <span className="text-slate-800 font-bold text-sm">Call Now</span>
                       </a>
                       <a href="https://wa.me/94775009929" className="flex items-center space-x-4 p-4 hover:bg-green-50 rounded-2xl transition-colors">
                          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                             <i className="fa-brands fa-whatsapp"></i>
                          </div>
                          <span className="text-slate-800 font-bold text-sm">WhatsApp</span>
                       </a>
                    </div>
                  )}
               </div>

               <div className="flex flex-col items-center border-l-0 md:border-l border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                     <i className="fa-solid fa-envelope text-lg"></i>
                     <span className="text-lg font-bold uppercase tracking-wider">Email Us</span>
                  </div>
                  <a href="mailto:info@gradwayedu.com" className="text-xl font-medium hover:text-amber-200 transition-colors">info@gradwayedu.com</a>
               </div>
            </div>

            <div className="mt-20 flex flex-col items-center opacity-80">
               <span className="text-xs font-bold uppercase tracking-[0.3em] mb-3">Working hours:</span>
               <p className="text-sm font-semibold tracking-wide uppercase">
                 Mon – Fri: 9.00 AM – 5.00 PM, Sat: 9.00 AM – 2.00 PM
               </p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1F2C] text-white py-24">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 mb-20">
             <div className="sm:col-span-2">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="h-14 w-auto flex items-center justify-center">
                     <img src={logoUrl} alt="Gradway Logo" className="h-full w-auto object-contain invert" />
                  </div>
                </div>
                <p className="text-slate-400 max-w-sm mb-10 leading-relaxed text-lg">
                  Simplifying global migration and education for Sri Lankan students. Honesty is our only policy.
                </p>
                <div className="flex space-x-6">
                   {['facebook-f', 'instagram', 'linkedin-in', 'whatsapp'].map(social => (
                     <a key={social} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-[#1A1F2C] hover:border-amber-400 transition-all">
                       <i className={`fa-brands fa-${social}`}></i>
                     </a>
                   ))}
                </div>
             </div>
             <div>
                <h4 className="font-black uppercase tracking-widest text-amber-400 mb-8 text-xs">Destinations</h4>
                <ul className="space-y-4 text-slate-400 font-medium">
                   <li><a href="#" className="hover:text-white transition-colors text-sm">UK</a></li>
                   <li><a href="#" className="hover:text-white transition-colors text-sm">Australia</a></li>
                   <li><a href="#" className="hover:text-white transition-colors text-sm">Canada</a></li>
                   <li><a href="#" className="hover:text-white transition-colors text-sm">Germany</a></li>
                </ul>
             </div>
             <div>
                <h4 className="font-black uppercase tracking-widest text-amber-400 mb-8 text-xs">Gradway</h4>
                <ul className="space-y-4 text-slate-400 font-medium text-sm">
                   <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
             </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
             <p>© {new Date().getFullYear()} GradWay (Pvt) Ltd. All Rights Reserved.</p>
             <p className="mt-4 md:mt-0">Sri Lanka</p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-full shadow-2xl flex items-center justify-center text-white text-xl md:text-2xl hover:scale-110 transition-transform"
          >
            <i className="fa-solid fa-comment-dots"></i>
          </button>
        ) : (
          <div className="bg-white w-[320px] md:w-[350px] h-[500px] md:h-[550px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 transition-all duration-300">
            <div className="bg-[#1A1F2C] p-6 md:p-8 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-400 rounded-full flex items-center justify-center text-[#1A1F2C]">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base leading-none">GradBot</h4>
                  <span className="text-[8px] md:text-[10px] opacity-60 font-black uppercase tracking-wider">Online Assistant</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:rotate-90 transition-transform text-white/50 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50">
               {chatHistory.length === 0 && (
                 <div className="text-center mt-12 space-y-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600 text-xl md:text-2xl">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 leading-relaxed">How can I help you today?</p>
                 </div>
               )}
               {chatHistory.map((chat, i) => (
                 <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-sm shadow-sm ${chat.role === 'user' ? 'bg-[#1A1F2C] text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                      {chat.text}
                    </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex space-x-1">
                       <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                       <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                       <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                 </div>
               )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 md:p-6 bg-white border-t border-slate-100 flex items-center space-x-2">
               <input 
                 type="text" 
                 value={chatMessage}
                 onChange={(e) => setChatMessage(e.target.value)}
                 placeholder="Type your question..."
                 className="flex-1 bg-slate-100 border-0 rounded-full py-2 md:py-3 px-4 md:px-6 text-xs md:text-sm focus:ring-2 focus:ring-amber-400 outline-none"
               />
               <button type="submit" className="w-10 h-10 md:w-12 md:h-12 bg-amber-400 text-[#1A1F2C] rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 transition-colors">
                 <i className="fa-solid fa-paper-plane text-xs"></i>
               </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;