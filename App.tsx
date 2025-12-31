import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS, SERVICES, SUCCESS_STORIES, MAIN_FAQ, FULL_FAQ } from './constants';
import { getGeminiResponse } from './services/geminiService';
import { ScrollNavigation } from './components/ui/scroll-navigation-menu';
import { motion, AnimatePresence } from 'motion/react';
import { Destination } from './types';
import { GlowingEffect } from './components/ui/glowing-effect';
import { Telescope, Linkedin, Instagram, Facebook, Mail, Phone, MessageSquare, GraduationCap, Globe, Layers, CheckCircle2 } from 'lucide-react';
import { cn } from './lib/utils';

const LOGO_URL = "https://i.ibb.co/3ykG4SjV/logo.png";

type ViewState = 'main' | 'careers' | 'faq-full' | 'services-full';

const SectionBadge: React.FC<{ text: string; lightVariant?: boolean; amberOutline?: boolean }> = ({ text, lightVariant, amberOutline }) => (
  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border ${
    lightVariant 
      ? 'bg-white/10 border-white/10' 
      : amberOutline 
        ? 'bg-amber-100 border-amber-200' 
        : 'bg-slate-100 border-slate-200'
  }`}>
    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
    <span className={`text-[10px] font-black uppercase tracking-widest ${
      lightVariant 
        ? 'text-white' 
        : amberOutline 
          ? 'text-amber-600' 
          : 'text-[#1A1F2C]'
    }`}>{text}</span>
  </div>
);

const FAQAccordion: React.FC<{ items: typeof MAIN_FAQ }> = ({ items }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((faq) => (
        <div key={faq.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm transition-all hover:shadow-md">
          <button 
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full px-8 py-6 flex items-center justify-between text-left group"
          >
            <span className="font-black text-slate-800 text-sm md:text-base leading-tight pr-4">{faq.question}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openId === faq.id ? 'bg-amber-500 text-white rotate-45' : 'bg-slate-100 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600'}`}>
              <i className="fa-solid fa-plus text-xs"></i>
            </div>
          </button>
          <AnimatePresence>
            {openId === faq.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="px-8 pb-8 text-slate-500 text-sm font-medium leading-relaxed border-t border-slate-50 pt-6">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('main');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToId = (id: string) => {
    if (id === 'careers') {
      setView('careers');
      return;
    }
    if (id === 'faq-full') {
      setView('faq-full');
      return;
    }
    if (id === 'services-full') {
      setView('services-full');
      return;
    }

    if (view !== 'main') {
      setView('main');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: id === 'top' ? 0 : element.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
        }
      }, 150);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: id === 'top' ? 0 : element.getBoundingClientRect().top + window.scrollY - 60,
        behavior: 'smooth'
      });
    }
  };

  const scrollContainer = (region: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[region];
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const Footer = () => (
    <footer className="bg-[#111520] text-white pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
              <img src={LOGO_URL} alt="Gradway Logo" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-2xl font-black tracking-tighter leading-none uppercase">Gradway (Pvt) Ltd.</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">Empowering the next generation of Sri Lankan leaders through world-class global education pathways and ethical migration consultancy.</p>
          <div className="flex gap-6 text-2xl">
             <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all"><i className="fa-brands fa-facebook"></i></a>
             <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all"><i className="fa-brands fa-instagram"></i></a>
             <a href="mailto:info@gradwayedu.com" className="text-[#EA4335] hover:scale-125 transition-all"><i className="fa-solid fa-at"></i></a>
             <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Services</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
            <li onClick={() => setView('services-full')} className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer hover:translate-x-1 duration-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Course & University Mapping</li>
            <li onClick={() => setView('services-full')} className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer hover:translate-x-1 duration-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Visa Application & Support</li>
            <li onClick={() => setView('services-full')} className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer hover:translate-x-1 duration-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Departure & After Arrival Support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => scrollToId('home')}>Company</li>
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => scrollToId('aboutus')}>About Us</li>
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => scrollToId('destinations')}>Destinations</li>
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => setView('faq-full')}>FAQ</li>
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => setView('careers')}>Careers</li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Stay Updated</h4>
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10 overflow-hidden">
              <input type="email" placeholder="Email address" className="bg-transparent border-0 px-4 py-2 text-xs outline-none flex-1 text-white placeholder:text-slate-600" />
              <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors shrink-0"><i className="fa-solid fa-arrow-right text-[10px]"></i></button>
            </div>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-tight">Service updates & Announcements</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2025 Gradway (Private) Limited. All rights reserved.</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
           <button className="hover:text-white transition-colors">Privacy Policy</button>
           <button className="hover:text-white transition-colors">Terms of Service</button>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white/10 transition-all flex items-center gap-3">
           Scroll Up <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </footer>
  );

  const ChatWidget = () => (
    <div className="fixed bottom-6 right-6 z-[250]">
      {!chatOpen ? (
        <button onClick={() => setChatOpen(true)} className="w-14 h-14 bg-amber-500 rounded-full shadow-lg flex items-center justify-center text-[#1A1F2C] text-2xl hover:scale-110 transition-all">
          <i className="fa-solid fa-headset"></i>
        </button>
      ) : (
        <div className="bg-white w-[320px] h-[480px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#1A1F2C] p-6 text-white flex justify-between items-center">
            <span className="font-black text-xs uppercase tracking-widest">GradBot AI</span>
            <button onClick={() => setChatOpen(false)}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-slate-50">
             {chatHistory.length === 0 && (
               <p className="text-slate-500 text-center mt-8 italic text-xs">"Hi! I'm your Gradway AI assistant. How can I help you today?"</p>
             )}
             {chatHistory.map((c, i) => (
               <div key={i} className={`p-4 rounded-2xl ${c.role === 'user' ? 'bg-[#1A1F2C] text-white ml-8 rounded-br-none' : 'bg-white border border-slate-200 mr-8 rounded-bl-none shadow-sm'}`}>
                 {c.text}
               </div>
             ))}
             {isTyping && <div className="text-amber-500 font-black text-[10px] animate-pulse">GradBot is thinking...</div>}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t flex gap-2">
             <input type="text" value={chatMessage} onChange={e => setChatMessage(e.target.value)} placeholder="Type your question..." className="flex-1 bg-slate-100 border-0 rounded-full px-4 text-xs py-3 outline-none font-medium" />
             <button type="submit" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-paper-plane text-sm"></i></button>
          </form>
        </div>
      )}
    </div>
  );

  if (view === 'careers') {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
        <main className="pt-40 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-20 animate-pulse rounded-full"></div>
            <Telescope size={120} strokeWidth={1} className="text-amber-500 relative z-10" />
          </div>
          <SectionBadge text="Careers" amberOutline />
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-tight tracking-tighter mb-12 uppercase">Exploring New Talent.</h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-16">We are always looking for visionary consultants and creative thinkers to join our mission in Colombo.</p>
          <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-lg w-full mb-20">
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-slate-400">Current Opportunities</h3>
            <p className="text-slate-800 font-bold text-xl mb-8 leading-tight">Currently, there are no open positions.</p>
            <p className="text-slate-500 mb-8 font-medium">All future openings will be announced first on our LinkedIn page.</p>
            <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" className="inline-block bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all">Visit LinkedIn Page</a>
          </div>

          <div className="w-full max-w-4xl pt-20 border-t border-slate-200">
            <h2 className="text-3xl font-black mb-12 text-[#1A1F2C] uppercase tracking-tighter">Join the Community</h2>
            <div className="flex justify-center gap-10">
              <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all"><Linkedin /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/gradway_education" target="_blank" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all"><Instagram /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram</span>
              </a>
              <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><Facebook /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facebook</span>
              </a>
            </div>
          </div>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'services-full') {
    return (
      <div className="min-h-screen bg-slate-50">
        <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
        <main className="pt-32 pb-24 animate-[fadeIn_0.5s_ease-out]">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="max-w-4xl mx-auto mb-20 text-center">
              <SectionBadge text="Full Expertise" amberOutline />
              <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-tight tracking-tighter mb-8 uppercase">Our Full Support.</h1>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">A comprehensive guide to the professional services we provide for Sri Lankan students.</p>
            </div>
            <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
              {SERVICES.map((s) => (
                <div key={s.id} className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col md:row gap-10 items-start hover:shadow-2xl transition-all">
                  <div className={`w-20 h-20 ${s.iconBg} ${s.iconColor} rounded-[2.5rem] flex items-center justify-center text-4xl shrink-0 shadow-lg border border-white`}>
                    <i className={`fa-solid ${s.icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-black text-[#1A1F2C] mb-6 uppercase tracking-tight">{s.title}</h2>
                    <div className="space-y-4 text-slate-600 text-lg leading-relaxed font-medium mb-10">
                      <p>Our {s.title.toLowerCase()} service at Gradway (Private) Limited is tailored specifically to your unique academic and professional needs.</p>
                      <p><strong>What it is:</strong> We provide structured guidance that covers every minute detail of your journey.</p>
                      <p><strong>How we help:</strong> By leveraging our deep network of global university partners and migration expertise, we remove the guesswork from your application.</p>
                      <p><strong>Benefits:</strong> You gain peace of mind, professional paperwork, and significantly higher success rates for both admissions and visas.</p>
                    </div>
                    <button onClick={() => scrollToId('contact')} className="bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-amber-500 active:scale-95 transition-all">Start Your Process</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'faq-full') {
    return (
      <div className="min-h-screen bg-slate-50">
        <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
        <main className="py-32 animate-[fadeIn_0.5s_ease-out]">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <SectionBadge text="Knowledge Base" amberOutline />
              <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] mb-16 leading-tight uppercase tracking-tighter">Authoritative Guidance Hub.</h1>
              <FAQAccordion items={FULL_FAQ} />
            </div>
          </div>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]" id="top">
      <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100svh] flex flex-col items-center pt-32 lg:pt-0 lg:flex-row overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10 flex-1 lg:flex-none">
          <div className="lg:w-1/2 text-center lg:text-left mt-8 md:mt-0">
            <SectionBadge text="your partner in Education" />
            <h1 className="text-5xl md:text-8xl font-black leading-[1.05] mb-6">
              <span className="text-[#1A1F2C] block">Migration</span>
              <span className="text-amber-500 block">Simplified!!</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-12 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Empowering students to achieve global academic success with tailored strategies and dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={() => scrollToId('destinations')} className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-12 py-5 rounded-full font-black shadow-2xl shadow-amber-200/50 hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest">Explore Destinations</button>
              <a href="https://wa.me/94775009929" target="_blank" className="w-full sm:w-auto bg-[#25D366] text-white px-12 py-5 rounded-full font-black shadow-xl hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp text-xl"></i> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[500px] md:h-[650px] w-full flex items-center justify-center">
             <div className="relative w-full h-full max-w-[600px]">
               <div className="hero-bubble absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] md:w-[260px] md:h-[260px] bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center shadow-2xl animate-float-center hero-bubble-center p-8">
                  <span className="text-3xl md:text-5xl mb-2">❤️</span>
                  <span className="text-[10px] md:text-xl font-black uppercase tracking-tight text-[#1A1F2C]">Students <br/> First</span>
               </div>
               
               {/* Bubble 1: 450+ Universities */}
               <div className="hero-bubble absolute top-[15%] left-[5%] lg:top-[8%] lg:left-[2%] w-[100px] h-[100px] md:w-[170px] md:h-[170px] bg-amber-400 z-30 animate-float-tl p-4">
                  <GraduationCap size={40} className="mb-2 hidden md:block" />
                  <GraduationCap size={20} className="mb-1 md:hidden" />
                  <span className="text-xl md:text-4xl font-black">450+</span>
                  <span className="text-[7px] md:text-[11px] font-bold uppercase tracking-widest">Universities</span>
               </div>
               
               {/* Bubble 2: 10+ Countries */}
               <div className="hero-bubble absolute top-[10%] right-[5%] lg:top-[5%] lg:right-[2%] w-[110px] h-[110px] md:w-[180px] md:h-[180px] bg-white z-10 border border-slate-100 shadow-lg animate-float-tr p-4">
                  <Globe size={40} className="mb-2 hidden md:block text-amber-500" />
                  <Globe size={20} className="mb-1 md:hidden text-amber-500" />
                  <span className="text-xl md:text-4xl font-black text-[#1A1F2C]">10+</span>
                  <span className="text-[7px] md:text-[11px] font-bold uppercase text-slate-400">Countries</span>
               </div>
               
               {/* Bubble 3: 10k+ Programs - MOVED LEFT & SPREAD OUT */}
               <div className="hero-bubble absolute bottom-[15%] left-[2%] lg:bottom-[15%] lg:left-[-10%] w-[110px] h-[110px] md:w-[180px] md:h-[180px] bg-indigo-600 z-30 animate-float-bl p-4 text-white">
                  <Layers size={40} className="mb-2 hidden md:block" />
                  <Layers size={20} className="mb-1 md:hidden" />
                  <span className="text-xl md:text-4xl font-black">10k+</span>
                  <span className="text-[7px] md:text-[11px] font-bold uppercase tracking-widest">Programs</span>
               </div>
               
               {/* Bubble 4: End to End Management - MOVED UP & SPREAD OUT */}
               <div className="hero-bubble absolute bottom-[5%] right-[2%] lg:bottom-[15%] lg:right-[-10%] w-[110px] h-[110px] md:w-[190px] md:h-[190px] bg-black z-20 animate-float-br p-4 text-white border-white/20">
                  <CheckCircle2 size={40} className="mb-2 hidden md:block" />
                  <CheckCircle2 size={20} className="mb-1 md:hidden" />
                  <span className="text-[6px] md:text-[10px] font-black uppercase tracking-widest leading-tight">End to End <br/> Application <br/> Management</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* About Section - Restoration of what was there before Help Centre */}
      <section id="aboutus" className="py-24 bg-white relative overflow-hidden scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full"></div>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" className="rounded-[3rem] shadow-2xl border-8 border-white relative z-10 object-cover aspect-video" alt="Gradway Community" />
            </div>
          </div>
          <div className="lg:w-1/2">
            <SectionBadge text="About us" />
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-8 leading-tight">Guiding Ambitions Beyond Borders</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium">Gradway (Private) Limited is a premier education consultancy based in Colombo. We bridge the gap between ambitious Sri Lankan talent and world-class international institutions through transparent and expert partnership.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"><i className="fa-solid fa-bullseye"></i></div>
                <h4 className="font-black text-[#1A1F2C] mb-2 uppercase text-xs tracking-widest">Our Mission</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"To provide ethical, transparent, and personalized guidance that turns global education dreams into reality."</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"><i className="fa-solid fa-eye"></i></div>
                <h4 className="font-black text-[#1A1F2C] mb-2 uppercase text-xs tracking-widest">Our Vision</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium italic">"To become the premier bridge between Sri Lankan talent and world-class academic institutions."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise (Formerly Services) */}
      <section id="services" className="py-24 bg-slate-50 scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionBadge text="Our Expertise" />
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C] uppercase tracking-tighter">Our Services</h2>
            <p className="mt-4 text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              We take you from Confusion to clarity, with our comprehensive support tailored to your academic goals, ensuring smooth transition from application to arrival and your dream destination
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => {
              const isLast = i === SERVICES.length - 1;
              return (
                <div 
                  key={i} 
                  onClick={() => setView('services-full')} 
                  className={cn(
                    "bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col cursor-pointer relative overflow-hidden",
                    isLast && "md:col-span-2 lg:col-span-2"
                  )}
                >
                  <div className={cn(
                    s.iconBg, 
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10"
                  )}>
                    <i className={`${s.icon} text-xl ${s.iconColor}`}></i>
                  </div>
                  <h3 className="text-lg font-black text-[#1A1F2C] mb-4 leading-tight relative z-10 uppercase">{s.title}</h3>
                  <p className={cn(
                    "text-slate-500 text-xs leading-relaxed mb-6 flex-1 font-medium relative z-10",
                    isLast ? "line-clamp-2 md:line-clamp-none max-w-lg" : "line-clamp-1"
                  )}>
                    {s.description}
                  </p>
                  <div className="text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 group-hover:translate-x-1 transition-transform relative z-10">
                    Learn More <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-24 bg-white scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="mb-6 text-center lg:text-left">
             <SectionBadge text="World Map" />
             <h2 className="text-3xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter uppercase">Our Global Destinations</h2>
          </div>
          {['Europe', 'Americas & Pacific', 'Asia & Other'].map((region) => (
            <div key={region} className="mb-10">
              <div className="flex justify-between items-center mb-4 border-l-4 border-amber-500 pl-6">
                <h3 className="text-2xl font-black text-[#1A1F2C] uppercase tracking-widest text-sm">{region}</h3>
                <div className="flex gap-2">
                  <button onClick={() => scrollContainer(region, 'left')} className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                  <button onClick={() => scrollContainer(region, 'right')} className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                </div>
              </div>
              <div ref={(el) => { scrollRefs.current[region] = el; }} className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6 px-2 snap-x snap-mandatory">
                {DESTINATIONS.filter(d => d.region === region).map((dest) => (
                  <div key={dest.id} className="min-w-[75vw] md:min-w-[340px] snap-center">
                    <div className="relative h-full rounded-[3.5rem] border-[0.75px] border-transparent p-2">
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={3}
                      />
                      <div className="relative flex h-[300px] flex-col justify-between overflow-hidden rounded-[3.25rem] border bg-slate-50 p-10 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-2xl group cursor-pointer">
                        <div className="flex justify-between items-start mb-6 relative z-10">
                           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><i className={`${dest.icon} text-2xl`} style={{ color: dest.color }}></i></div>
                           <img src={dest.image} alt={dest.name} className="w-12 h-7 object-cover rounded shadow-sm border border-white" />
                        </div>
                        <h3 className="text-2xl font-black text-[#1A1F2C] mb-4 relative z-10 uppercase">{dest.name}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed mb-8 flex-1 font-medium relative z-10">{dest.description}</p>
                        <button onClick={() => scrollToId('contact')} className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 group-hover:translate-x-2 transition-transform relative z-10">Learn More <i className="fa-solid fa-arrow-right"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="py-24 bg-[#0a0d14] text-white scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 text-center mb-16">
          <SectionBadge text="Real Stories" lightVariant />
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Student Success Stories</h2>
        </div>
        <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUCCESS_STORIES.map((story, i) => (
            <div key={i} className="bg-[#111827] p-8 rounded-[2.5rem] border border-white/5 group flex flex-col relative overflow-hidden">
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, idx) => <i key={idx} className="fa-solid fa-star text-amber-500 text-[10px]"></i>)}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-10 flex-1 font-medium italic">"{story.quote}"</p>
              <div className="mt-auto pt-8 border-t border-white/5">
                <h4 className="font-black text-lg mb-1">{story.name}</h4>
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{story.tag} • {story.university}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 text-center flex flex-col items-center">
          <SectionBadge text="Get Started" amberOutline />
          <h2 className="text-4xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter mb-12 leading-tight uppercase max-w-4xl">Start Your Journey.</h2>
          
          <div className="w-full max-w-3xl bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl text-left border border-slate-100 mb-16">
            {!formSubmitted ? (
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                    <input required placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm border-transparent focus:bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                    <input required placeholder="+9477 500 9929" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm border-transparent focus:bg-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                  <input required type="email" placeholder="info@gradwayedu.com" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm border-transparent focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                  <textarea rows={3} placeholder="Tell us about your study abroad dreams..." className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm resize-none border-transparent focus:bg-white"></textarea>
                </div>
                <button type="submit" className="btn-submit w-full bg-[#1A1F2C] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 mt-4">Submit Inquiry</button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-4xl mb-6 shadow-xl"><i className="fa-solid fa-check"></i></div>
                <h3 className="text-3xl font-black mb-4">Message Sent!</h3>
                <p className="text-slate-500 font-medium">Thank you for reaching out. A Gradway consultant will call you shortly.</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
            <a href="https://wa.me/94775009929" target="_blank" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-[#25D366] transition-all min-w-[240px]">
              <div className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform"><MessageSquare /></div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">WhatsApp</span>
                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight">+94 77 500 9929</span>
              </div>
            </a>
            <a href="tel:+94775009929" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-amber-500 transition-all min-w-[240px]">
              <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform"><Phone /></div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Call Us</span>
                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight">+94 77 500 9929</span>
              </div>
            </a>
            <a href="mailto:info@gradwayedu.com" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-indigo-600 transition-all min-w-[240px]">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform"><Mail /></div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Email</span>
                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight text-wrap break-all leading-tight">info@gradwayedu.com</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <SectionBadge text="Help Center" amberOutline />
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-tight">Knowledge Base & Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium mb-10">Clear, student-focused answers for your migration concerns.</p>
            <button onClick={() => setView('faq-full')} className="bg-[#1A1F2C] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">View Full FAQ</button>
          </div>
          <div className="lg:w-2/3">
            <FAQAccordion items={MAIN_FAQ} />
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;