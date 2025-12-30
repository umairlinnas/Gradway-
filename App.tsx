
import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS, SERVICES, SUCCESS_STORIES, MAIN_FAQ, FULL_FAQ } from './constants';
import { getGeminiResponse } from './services/geminiService';
import { GlowingEffect } from './components/ui/glowing-effect';
import { ScrollNavigation } from './components/ui/scroll-navigation-menu';
import { motion, AnimatePresence } from 'motion/react';

const LOGO_URL = "https://i.ibb.co/3ykG4SjV/logo.png";

type ViewState = 'main' | 'careers' | 'faq-full';

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

const LegalModal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; content: React.ReactNode }> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white w-full max-w-2xl max-h-[80vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 border-b flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-black text-[#1A1F2C] uppercase tracking-tight">{title}</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="p-8 overflow-y-auto text-slate-600 text-sm leading-relaxed space-y-4 font-medium">
          {content}
        </div>
        <div className="p-6 border-t bg-slate-50 text-center">
          <button onClick={onClose} className="bg-[#1A1F2C] text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px]">Close Document</button>
        </div>
      </div>
    </div>
  );
};

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
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

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
    if (view !== 'main') {
      setView('main');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 60;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: id === 'top' ? 0 : offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 60;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: id === 'top' ? 0 : offsetPosition,
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

  // Fix: Define the missing 'regions' variable for the destinations mapping.
  const regions: ("Europe" | "Americas & Pacific" | "Asia & Other")[] = ['Europe', 'Americas & Pacific', 'Asia & Other'];

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
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">Leading the way for Sri Lankan students to achieve global academic excellence and seamless migration with personalized expert mentorship.</p>
          <div className="flex gap-6 text-2xl">
             <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all"><i className="fa-brands fa-facebook"></i></a>
             <a href="https://www.instagram.com/gradway_education?igsh=MXdmMXl5aXUzcW5zNA==" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all"><i className="fa-brands fa-instagram"></i></a>
             <a href="mailto:info@gradwayedu.com" className="text-[#EA4335] hover:scale-125 transition-all"><i className="fa-solid fa-at"></i></a>
             <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Services</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Counselling</li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Course Selection</li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Visa Application</li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Pre Departure</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Company</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
            <li className="hover:text-white transition-colors cursor-pointer"><a href="#aboutus" onClick={(e) => { e.preventDefault(); scrollToId('aboutus'); }}>About Us</a></li>
            <li className="hover:text-white transition-colors cursor-pointer"><a href="#destinations" onClick={(e) => { e.preventDefault(); scrollToId('destinations'); }}>Destinations</a></li>
            <li className="hover:text-white transition-colors cursor-pointer"><a href="#stories" onClick={(e) => { e.preventDefault(); scrollToId('stories'); }}>Stories</a></li>
            <li className="hover:text-white transition-colors cursor-pointer"><button onClick={() => setView('careers')}>Careers</button></li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-white">Stay Updated</h4>
            <p className="text-[11px] text-slate-400 font-medium">Get the latest scholarship alerts and visa news delivered to your inbox.</p>
            <div className="relative">
              <input type="email" placeholder="Enter your email" className="w-full bg-[#0a0d14] border-0 rounded-2xl px-6 py-4 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2025 Gradway (Pvt) Ltd. All rights reserved.</p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
           <button onClick={() => setPolicyModalOpen(true)} className="hover:text-white transition-colors underline-offset-4 hover:underline">Privacy Policy</button>
           <button onClick={() => setTermsModalOpen(true)} className="hover:text-white transition-colors underline-offset-4 hover:underline">Terms of Service</button>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white/10 transition-all flex items-center gap-3 group">
           Back to Top <i className="fa-solid fa-arrow-up group-hover:-translate-y-1 transition-transform"></i>
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
               <p className="text-slate-500 text-center mt-8 italic text-xs">"Hi! Ask me anything about studying abroad!"</p>
             )}
             {chatHistory.map((c, i) => (
               <div key={i} className={`p-4 rounded-2xl ${c.role === 'user' ? 'bg-[#1A1F2C] text-white ml-8 rounded-br-none' : 'bg-white border border-slate-200 mr-8 rounded-bl-none shadow-sm'}`}>
                 {c.text}
               </div>
             ))}
             {isTyping && <div className="text-amber-500 font-black text-[10px] animate-pulse">GradBot is thinking...</div>}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t flex gap-2">
             <input type="text" value={chatMessage} onChange={e => setChatMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-slate-100 border-0 rounded-full px-4 text-xs py-3 outline-none font-medium" />
             <button type="submit" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-paper-plane text-sm"></i></button>
          </form>
        </div>
      )}
    </div>
  );

  if (view === 'careers') {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <ScrollNavigation logoUrl={LOGO_URL} />
        <main className="pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center animate-[fadeIn_0.5s_ease-out]">
          <div className="max-w-4xl space-y-12">
            <SectionBadge text="Careers @ Gradway" amberOutline />
            <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-tight tracking-tighter">
              We're searching for <span className="text-amber-500">tomorrow's</span> stars.
            </h1>
            
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              We don't have any new openings currently, but the best journeys aren't planned in a day! We're always looking for academic visionaries to join our growing team.
            </p>
            
            <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-8">
              <div className="inline-flex w-20 h-20 bg-amber-50 rounded-3xl items-center justify-center text-4xl mb-2">🔭</div>
              <h3 className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">Stay Proactive</h3>
              <p className="text-slate-600 font-semibold text-lg">New opening notifications are exclusively posted on our LinkedIn first.</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#0077B5] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200 hover:scale-105 transition-all"
                >
                  Follow on LinkedIn <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">Join our community</p>
              <div className="flex justify-center gap-12">
                <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" className="text-[#1877F2] hover:scale-125 transition-all text-4xl"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com/gradway_education" target="_blank" className="text-[#E4405F] hover:scale-125 transition-all text-4xl"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://wa.me/94775009929" target="_blank" className="text-[#25D366] hover:scale-125 transition-all text-4xl"><i className="fa-brands fa-whatsapp"></i></a>
              </div>
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
        <ScrollNavigation logoUrl={LOGO_URL} />
        <main className="py-32 animate-[fadeIn_0.5s_ease-out]">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <button onClick={() => setView('main')} className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:translate-x-[-5px] transition-all">
                <i className="fa-solid fa-arrow-left"></i> Home
              </button>
              <SectionBadge text="Knowledge Base" amberOutline />
              <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] mb-8 leading-tight">Expert Answers for Global Aspirations.</h1>
              <p className="text-slate-500 text-lg font-medium mb-16 max-w-2xl">From document preparation to settling in your new home, find detailed answers to all your migration queries here, including general and niche topics.</p>
              
              <div className="space-y-12">
                <div className="space-y-6">
                   <h3 className="text-xl font-black text-[#1A1F2C] border-l-4 border-amber-500 pl-4">General & Application</h3>
                   <FAQAccordion items={FULL_FAQ.filter(f => f.category === 'General')} />
                </div>
                <div className="space-y-6">
                   <h3 className="text-xl font-black text-[#1A1F2C] border-l-4 border-blue-500 pl-4">Visa & Documentation</h3>
                   <FAQAccordion items={FULL_FAQ.filter(f => f.category === 'Visa')} />
                </div>
                <div className="space-y-6">
                   <h3 className="text-xl font-black text-[#1A1F2C] border-l-4 border-indigo-500 pl-4">Niche & After-Arrival</h3>
                   <FAQAccordion items={FULL_FAQ.filter(f => f.category === 'Niche')} />
                </div>
              </div>
              
              <div className="mt-20 bg-[#1A1F2C] text-white p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-10">
                 <div>
                    <h4 className="text-2xl font-black mb-2">Still have a question?</h4>
                    <p className="text-slate-400 font-medium">Our academic experts are ready for a one-on-one deep dive.</p>
                 </div>
                 <button onClick={() => scrollToId('contact')} className="bg-amber-500 text-[#1A1F2C] px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">Contact Us Directly</button>
              </div>
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
      
      <ScrollNavigation logoUrl={LOGO_URL} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100svh] flex flex-col items-center pt-32 lg:pt-0 lg:flex-row overflow-hidden scroll-mt-[76px]">
        <div className="absolute inset-0 hero-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10 flex-1 lg:flex-none">
          <div className="lg:w-1/2 text-center lg:text-left mt-8 md:mt-0">
            <SectionBadge text="Your partner in Education" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6">
              <span className="text-[#1A1F2C] block">Migration</span>
              <span className="text-amber-500 block">Simplified!!</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Empowering students to achieve global academic success with tailored migration strategies and dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 lg:mb-0">
              <button 
                onClick={() => scrollToId('destinations')} 
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-10 py-4 rounded-full font-black shadow-xl shadow-amber-200/50 hover:from-yellow-400 hover:to-amber-600 hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest"
              >
                Explore Destinations
              </button>
              <a href="https://wa.me/94775009929" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] text-white px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp text-xl"></i> Talk to us
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[380px] md:h-[650px] w-full max-w-[400px] lg:max-w-none mb-12 lg:mb-0 flex items-center justify-center overflow-visible">
            <div className="relative w-full h-full">
              <div className="hero-bubble hero-bubble-center absolute top-1/2 left-1/2 w-[140px] h-[140px] md:w-[260px] md:h-[260px] bg-white/95 backdrop-blur-md [border-radius:60%_40%_30%_70%/60%_30%_70%_40%] animate-float-center z-20">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-4xl mb-1 md:mb-2">❤️</span>
                  <span className="text-[10px] md:text-xl font-black uppercase tracking-tight text-[#1A1F2C]">Students <br/> First</span>
                </div>
              </div>
              <div className="hero-bubble absolute top-[15%] left-[10%] md:top-[10%] md:left-[5%] w-[85px] h-[85px] md:w-[170px] md:h-[170px] bg-amber-400 [border-radius:30%_70%_70%_30%/50%_40%_60%_50%] z-30 animate-float-tl">
                <div className="flex flex-col items-center justify-center text-white">
                  <span className="text-lg md:text-3xl mb-0.5">🏛️</span>
                  <span className="text-sm md:text-4xl font-black leading-none">450+</span>
                  <span className="text-[6px] md:text-[10px] font-bold uppercase tracking-widest mt-0.5">Universities</span>
                </div>
              </div>
              <div className="hero-bubble absolute top-[12%] right-[10%] md:top-[5%] md:right-[5%] w-[90px] h-[90px] md:w-[180px] md:h-[180px] bg-white [border-radius:50%_50%_20%_80%/30%_60%_40%_70%] z-10 border-slate-100 animate-float-tr">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg md:text-3xl mb-0.5">🌍</span>
                  <span className="text-sm md:text-3xl font-black text-[#1A1F2C] leading-none">10+</span>
                  <span className="text-[6px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">Countries</span>
                </div>
              </div>
              <div className="hero-bubble absolute bottom-[15%] left-[12%] md:bottom-[8%] md:left-[8%] w-[90px] h-[90px] md:w-[180px] md:h-[180px] bg-indigo-600 [border-radius:40%_60%_50%_50%/70%_30%_60%_40%] z-30 animate-float-bl">
                <div className="flex flex-col items-center justify-center text-white">
                  <span className="text-lg md:text-3xl mb-0.5">📚</span>
                  <span className="text-sm md:text-3xl font-black leading-none">10k+</span>
                  <span className="text-[6px] md:text-[10px] font-bold uppercase tracking-widest opacity-80 mt-0.5">Programs</span>
                </div>
              </div>
              <div className="hero-bubble absolute bottom-[15%] right-[8%] md:bottom-[10%] md:right-[0%] w-[95px] h-[95px] md:w-[200px] md:h-[200px] bg-[#1A1F2C] [border-radius:70%_30%_30%_70%/60%_70%_30%_40%] z-30 animate-float-br">
                <div className="flex flex-col items-center justify-center text-white px-4 text-center">
                  <span className="text-lg md:text-3xl mb-0.5">🛫</span>
                  <span className="text-[6px] md:text-[11px] font-black text-amber-500 uppercase tracking-tighter mb-0.5 leading-tight">End to End Application</span>
                  <span className="text-[8px] md:text-[18px] font-black text-white leading-tight">management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="aboutus" className="py-24 bg-white relative overflow-hidden scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-100 rounded-full blur-[60px] opacity-60"></div>
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                  alt="About Gradway" 
                  className="rounded-[2.5rem] shadow-2xl relative z-10 border-8 border-white"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <SectionBadge text="Our Story" />
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-8 leading-tight">Empowering Global Dreams from Sri Lanka.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium">
                Gradway (Pvt) Ltd is a premier education consultancy based in the heart of Colombo. We bridge the gap between ambitious students and world-class international education providers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                   <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-bullseye-arrow text-xl"></i>
                   </div>
                   <h4 className="font-black text-[#1A1F2C] mb-4 uppercase text-xs tracking-[0.2em]">Our Mission</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium italic">"To simplify migration and provide transparent, expert guidance for absolute academic success."</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                   <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-eye text-xl"></i>
                   </div>
                   <h4 className="font-black text-[#1A1F2C] mb-4 uppercase text-xs tracking-[0.2em]">Our Vision</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium italic">"To be the most trusted pathway for Sri Lankan leaders to achieve global recognition and growth."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50 scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionBadge text="Our Comprehensive Process" />
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C]">Migration Made Simple</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className={`bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col ${i === 6 ? 'lg:col-span-2' : ''}`}>
                <div className={`${s.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`${s.icon} text-xl ${s.iconColor}`}></i>
                </div>
                <h3 className="text-lg font-black text-[#1A1F2C] mb-3 leading-tight">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1 font-medium">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-24 bg-white scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="mb-12 text-center lg:text-left">
             <SectionBadge text="Our Global Destinations" />
             <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C]">Your Future, Globalized</h2>
          </div>
          <div className="space-y-16">
            {regions.map((region) => (
              <div key={region} className="relative">
                <div className="flex justify-between items-center mb-6 border-l-4 border-amber-500 pl-4">
                  <h3 className="text-2xl font-black text-[#1A1F2C]">{region}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => scrollContainer(region, 'left')} className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                    <button onClick={() => scrollContainer(region, 'right')} className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                  </div>
                </div>
                <div 
                  ref={(el) => { scrollRefs.current[region] = el; }}
                  className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6 px-2 snap-x snap-mandatory"
                >
                  {DESTINATIONS.filter(d => d.region === region).map((dest) => (
                    <div key={dest.id} className="min-w-[60vw] md:min-w-[360px] snap-center list-none">
                      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-transparent p-1 md:p-2">
                        <GlowingEffect spread={40} glow={true} disabled={false} proximity={150} inactiveZone={0} borderWidth={2.02} />
                        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] bg-slate-50 p-6 md:p-8 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl group">
                          <div className="relative flex h-full flex-col">
                            <div className="flex justify-between items-start mb-6">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                  <i className={`${dest.icon} text-2xl`} style={{ color: dest.color }}></i>
                               </div>
                               <img src={dest.image} alt={dest.name} className="w-10 h-6 object-cover rounded shadow-sm border border-white" />
                            </div>
                            <h3 className="text-xl font-black text-[#1A1F2C] mb-3">{dest.name}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{dest.description}</p>
                            <button onClick={() => scrollToId('contact')} className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 mt-auto">Inquire Now <i className="fa-solid fa-arrow-right"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-24 bg-[#0a0d14] text-white scroll-mt-[76px] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 text-center mb-16">
          <SectionBadge text="Student Stories" lightVariant />
          <h2 className="text-4xl md:text-5xl font-black mb-6">Voices of Global Success</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium">Real results from Sri Lankan students who embarked on their international academic journey with Gradway.</p>
        </div>
        <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUCCESS_STORIES.map((story, i) => (
            <div key={i} className="bg-[#111827] p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group flex flex-col relative overflow-hidden">
              <div className="absolute top-6 right-8 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-500/20">Success</div>
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, idx) => (
                  <i key={idx} className="fa-solid fa-star text-yellow-500 text-[10px]"></i>
                ))}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-10 flex-1 font-medium italic">"{story.quote}"</p>
              <div className="mt-auto border-t border-white/5 pt-8">
                <h4 className="font-black text-lg text-white mb-2">{story.name}</h4>
                <div className="flex flex-col gap-1">
                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{story.university}</p>
                   <p className="text-slate-500 text-[9px] font-black uppercase tracking-tight">{story.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 relative scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 flex flex-col gap-12">
          
          <div className="text-center max-w-4xl mx-auto mb-4">
            <SectionBadge text="Let's Chat!" amberOutline />
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] mb-2 leading-tight tracking-tight">Got Questions?</h2>
            <h2 className="text-4xl md:text-6xl font-black text-blue-600 leading-tight tracking-tight">We're all ears.</h2>
            <p className="text-slate-500 text-lg mt-8 font-medium">Whether you're confused about visas or curious about campus life, our friendly experts are here to help you navigate your journey.</p>
          </div>

          <div className="max-w-4xl mx-auto w-full relative">
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-black text-xs shadow-lg rotate-12 z-20">Say Hello! 👋</div>
            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative z-10 border border-slate-100 overflow-hidden">
              {!formSubmitted ? (
                <form className="space-y-8" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-3">Your Name</label>
                      <div className="relative">
                        <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                        <input required type="text" placeholder="John Doe" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-sm font-medium" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-3">Phone Number</label>
                      <div className="relative">
                        <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                        <input required type="tel" placeholder="+94 77 500 9929" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-sm font-medium" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-3">Email ID</label>
                    <div className="relative">
                      <i className="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                      <input required type="email" placeholder="john@example.com" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-sm font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-3">How can we help?</label>
                    <div className="relative">
                      <i className="fa-solid fa-align-left absolute left-4 top-5 text-slate-300"></i>
                      <textarea required rows={3} placeholder="I'm interested in studying abroad in..." className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all text-sm font-medium resize-none"></textarea>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                    Send Message <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center text-center animate-[fadeIn_0.5s_ease-out]">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-5xl mb-8 shadow-2xl shadow-green-200 animate-[bounce_1s_ease-in-out_infinite]">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-4xl font-black text-[#1A1F2C] mb-4">Message Received!</h3>
                  <p className="text-slate-600 text-xl font-semibold max-w-lg leading-relaxed">
                    Thank you for reaching out to Gradway! Our academic experts will review your profile and get in touch with you ASAP to kickstart your global journey.
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-12 text-xs font-black uppercase tracking-widest text-amber-600 hover:scale-110 transition-transform">
                    Send another inquiry
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
            <a href="tel:+94775009929" className="flex flex-col items-center gap-5 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-[1.5rem] flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all"><i className="fa-solid fa-phone"></i></div>
              <div className="text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Call Us</span>
                <span className="text-sm font-black text-[#1A1F2C] tracking-tight whitespace-nowrap">(+94) 077 500 9929</span>
              </div>
            </a>
            <a href="mailto:info@gradwayedu.com" className="flex flex-col items-center gap-5 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-[1.5rem] flex items-center justify-center text-2xl group-hover:bg-purple-600 group-hover:text-white transition-all"><i className="fa-solid fa-envelope"></i></div>
              <div className="text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Email</span>
                <span className="text-sm font-black text-[#1A1F2C] tracking-tight whitespace-nowrap">info@gradwayedu.com</span>
              </div>
            </a>
            <a href="https://wa.me/94775009929" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-5 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-[1.5rem] flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-all"><i className="fa-brands fa-whatsapp"></i></div>
              <div className="text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">WhatsApp</span>
                <span className="text-sm font-black text-[#1A1F2C] tracking-tight whitespace-nowrap">(+94) 077 500 9929</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <SectionBadge text="Help Center" amberOutline />
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-6 leading-tight">Frequently Asked Questions</h2>
              <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">Common concerns from fellow students, addressed with transparency and expertise.</p>
              <button 
                onClick={() => setView('faq-full')}
                className="bg-[#1A1F2C] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-slate-200"
              >
                Find out more about FAQ
              </button>
            </div>
            <div className="lg:w-2/3">
              <FAQAccordion items={MAIN_FAQ} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LegalModal 
        isOpen={policyModalOpen} 
        onClose={() => setPolicyModalOpen(false)} 
        title="Privacy Policy" 
        content={(
          <div className="space-y-4">
            <p className="font-bold text-slate-900">Privacy Policy for Gradway (Pvt) Ltd.</p>
            <p><strong>1. Information Collection:</strong> We collect personal data such as full name, email, contact number, and academic qualifications when you fill out our assessment or contact forms. This is essential for providing tailored educational consultancy.</p>
            <p><strong>2. Use of Information:</strong> Your data is used exclusively to facilitate university applications, migration documentation, and to communicate relevant study abroad opportunities.</p>
            <p><strong>3. Data Sharing:</strong> Gradway (Pvt) Ltd shares your information only with official partner universities and relevant immigration authorities. We never sell your data to marketing third parties.</p>
            <p><strong>4. Security:</strong> We employ industry-standard security measures to ensure your personal information is stored securely.</p>
            <p><strong>5. Your Rights:</strong> You have the right to request a copy of the data we hold about you or ask for its deletion at any time by contacting us at info@gradwayedu.com.</p>
          </div>
        )} 
      />
      <LegalModal 
        isOpen={termsModalOpen} 
        onClose={() => setTermsModalOpen(false)} 
        title="Terms of Service" 
        content={(
          <div className="space-y-4">
            <p className="font-bold text-slate-900">Terms of Service for Gradway (Pvt) Ltd.</p>
            <p><strong>1. Scope of Services:</strong> Gradway (Pvt) Ltd provides expert consultancy for international higher education, including university selection, application management, and visa advisory.</p>
            <p><strong>2. Accuracy of Data:</strong> Clients are responsible for ensuring all documentation provided is authentic and accurate.</p>
            <p><strong>3. Application Outcomes:</strong> While we maintain a high success rate, the final decision for university admission or visa issuance rests solely with the educational institution and respective government.</p>
            <p><strong>4. Fees and Refunds:</strong> Any service fees charged by Gradway (Pvt) Ltd are clearly communicated and subject to individual service agreements.</p>
            <p><strong>5. Limitation of Liability:</strong> Gradway (Pvt) Ltd is not liable for changes in international migration laws that may occur during the process.</p>
          </div>
        )} 
      />

      <ChatWidget />
    </div>
  );
};

export default App;
