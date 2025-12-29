import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS } from './constants';
import { getGeminiResponse } from './services/geminiService';

const LOGO_URL = "https://i.ibb.co/3ykG4SjV/logo.png";

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const destinationsRef = useRef<HTMLDivElement>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const scrollContainer = (region: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[region];
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const regions = ['Europe', 'Americas & Pacific', 'Asia & Other'];
  const navLinks = ['Home', 'About Us', 'Services', 'Destinations', 'Stories', 'Contact'];

  return (
    <div className={`min-h-screen bg-[#FAFAFA] ${mobileMenuOpen ? 'overflow-hidden' : ''}`} id="top">
      
      {/* Redesigned Mobile Navigation Drawer */}
      <div className={`drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-16">
            <div className="w-12 h-12 bg-white rounded-full p-2">
              <img src={LOGO_URL} alt="Gradway" className="w-full h-full object-contain" />
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '')}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="nav-link-mobile text-3xl font-bold text-white hover:text-amber-500 transition-colors"
                style={{ transitionDelay: `${0.1 + idx * 0.05}s` }}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10 text-white/50 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-amber-500">Connect with us</p>
            <div className="flex space-x-6 text-2xl">
              <a href="https://wa.me/94775009929" className="hover:text-amber-500 transition-colors"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            </div>
            <p className="text-[10px] leading-relaxed">Gradway (Pvt) Ltd. Colombo 05, Sri Lanka.<br/>Migration Simplified.</p>
          </div>
        </div>
      </div>

      {/* Navigation - Main */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-2 shadow-md' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#top" className="relative z-[110] block">
              <div className={`transition-all duration-300 ease-in-out bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg
                ${isScrolled ? 'w-12 h-12' : 'w-16 h-16 md:w-20 md:h-20'}`}>
                <img src={LOGO_URL} alt="Gradway" className="w-[85%] h-[85%] object-contain" />
              </div>
            </a>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-[11px] font-black text-[#1A1F2C]">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-amber-500 transition-colors uppercase tracking-widest relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-amber-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-amber-600 transition-all font-black uppercase tracking-widest text-[10px]">
              Assessment
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
             <button onClick={() => setMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center bg-white shadow-md rounded-full text-xl text-[#1A1F2C]">
               <i className="fa-solid fa-bars-staggered"></i>
             </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Redesigned Mobile Layout */}
      <section className="relative min-h-[100svh] flex flex-col items-center pt-24 lg:pt-0 lg:flex-row overflow-hidden">
        {/* Fun Background Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10 flex-1 lg:flex-none">
          <div className="lg:w-1/2 text-center lg:text-left mt-8 md:mt-0">
            <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full mb-6 border border-slate-200">
               <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1F2C]">Your partner in Education</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6">
              <span className="text-[#1A1F2C] block">Migration</span>
              <span className="text-amber-500 block">Simplified!!</span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Empowering Sri Lankan students to achieve global academic success with tailored migration strategies and dedicated support.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 lg:mb-0">
              <button onClick={() => destinationsRef.current?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-[#1A1F2C] text-white px-10 py-4 rounded-full font-black shadow-xl hover:bg-slate-800 transition-all text-[11px] uppercase tracking-widest">
                Explore Destinations
              </button>
              <a href="https://wa.me/94775009929" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] text-white px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp text-xl"></i> Talk to us
              </a>
            </div>
          </div>

          {/* Hero Bubbles - Clustered Group for Mobile */}
          <div className="lg:w-1/2 relative h-[380px] md:h-[650px] w-full max-w-[400px] lg:max-w-none mb-12 lg:mb-0 flex items-center justify-center overflow-visible">
            <div className="relative w-full h-full animate-float-cluster lg:animate-none">
              
              {/* 1. Middle Bubble: Students First */}
              <div className="hero-bubble hero-bubble-center absolute top-1/2 left-1/2 w-[140px] h-[140px] md:w-[260px] md:h-[260px] bg-white/95 backdrop-blur-md [border-radius:60%_40%_30%_70%/60%_30%_70%_40%] animate-float-center z-20">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-4xl mb-1 md:mb-2">❤️</span>
                  <span className="text-[10px] md:text-xl font-black uppercase tracking-tight text-[#1A1F2C]">Students <br/> First</span>
                </div>
              </div>

              {/* 2. Top Left: 450+ Universities */}
              <div className="hero-bubble absolute top-[10%] left-[5%] md:top-[10%] md:left-[5%] w-[85px] h-[85px] md:w-[170px] md:h-[170px] bg-amber-400 [border-radius:30%_70%_70%_30%/50%_40%_60%_50%] z-30">
                <div className="flex flex-col items-center justify-center text-white">
                  <span className="text-lg md:text-3xl mb-0.5">🏛️</span>
                  <span className="text-sm md:text-4xl font-black leading-none">450+</span>
                  <span className="text-[6px] md:text-[10px] font-bold uppercase tracking-widest mt-0.5">Universities</span>
                </div>
              </div>
              
              {/* 3. Top Right: 10+ Countries */}
              <div className="hero-bubble absolute top-[5%] right-[5%] md:top-[5%] md:right-[5%] w-[90px] h-[90px] md:w-[180px] md:h-[180px] bg-white [border-radius:50%_50%_20%_80%/30%_60%_40%_70%] z-10 border-slate-100">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg md:text-3xl mb-0.5">🌍</span>
                  <span className="text-sm md:text-3xl font-black text-[#1A1F2C] leading-none">10+</span>
                  <span className="text-[6px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">Countries</span>
                </div>
              </div>

              {/* 4. Bottom Left: 10k+ Programs */}
              <div className="hero-bubble absolute bottom-[10%] left-[8%] md:bottom-[8%] md:left-[8%] w-[90px] h-[90px] md:w-[180px] md:h-[180px] bg-indigo-600 [border-radius:40%_60%_50%_50%/70%_30%_60%_40%] z-30">
                <div className="flex flex-col items-center justify-center text-white">
                  <span className="text-lg md:text-3xl mb-0.5">📚</span>
                  <span className="text-sm md:text-3xl font-black leading-none">10k+</span>
                  <span className="text-[6px] md:text-[10px] font-bold uppercase tracking-widest opacity-80 mt-0.5">Programs</span>
                </div>
              </div>

              {/* 5. Bottom Right: Application Management */}
              <div className="hero-bubble absolute bottom-[10%] right-[2%] md:bottom-[10%] md:right-[0%] w-[95px] h-[95px] md:w-[200px] md:h-[200px] bg-[#1A1F2C] [border-radius:70%_30%_30%_70%/60%_70%_30%_40%] z-30">
                <div className="flex flex-col items-center justify-center text-white px-2">
                  <span className="text-lg md:text-3xl mb-0.5">🛫</span>
                  <span className="text-[6px] md:text-[11px] font-black text-amber-500 uppercase tracking-tighter mb-0.5">Application</span>
                  <span className="text-[8px] md:text-[18px] font-black text-white leading-tight">Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section ref={destinationsRef} id="destinations" className="py-16 bg-white scroll-mt-12">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="mb-12 text-center lg:text-left">
             <span className="text-amber-500 font-black uppercase tracking-widest text-[11px] mb-2 block">Our Destinations</span>
             <h2 className="text-3xl md:text-4xl font-black text-[#1A1F2C]">Your Future, Globalized</h2>
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
                    <div key={dest.id} className="min-w-[280px] md:min-w-[360px] snap-center bg-slate-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amber-100">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <i className={`${dest.icon} text-2xl`} style={{ color: dest.color }}></i>
                         </div>
                         <img src={dest.image} alt={dest.name} className="w-10 h-6 object-cover rounded shadow-sm border border-white" />
                      </div>
                      <h3 className="text-xl font-black text-[#1A1F2C] mb-3">{dest.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{dest.description}</p>
                      <button className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                         Learn More <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-slate-50 scroll-mt-12">
        <div className="container mx-auto px-4 lg:px-12 text-center">
          <h2 className="text-3xl font-black text-[#1A1F2C] mb-12 uppercase tracking-widest">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Profile Analysis', icon: 'fa-user-graduate', desc: 'Holistic evaluation of your credentials to find the best match.' },
              { title: 'University Selection', icon: 'fa-building-columns', desc: 'Precise matching with globally recognized partner universities.' },
              { title: 'Visa Consultancy', icon: 'fa-passport', desc: 'Flawless documentation and mock sessions for visa success.' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-slate-100">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className={`fa-solid ${s.icon} text-2xl text-amber-500`}></i>
                </div>
                <h3 className="text-xl font-black text-[#1A1F2C] mb-4">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#1A1F2C] text-white scroll-mt-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight">Your Journey Begins Now</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
             <a href="tel:+94775009929" className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all"><i className="fa-solid fa-phone text-2xl"></i></div>
                <span className="font-bold text-xl">+94 77 500 9929</span>
             </a>
             <a href="mailto:info@gradwayedu.com" className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all"><i className="fa-solid fa-envelope text-2xl"></i></div>
                <span className="font-bold text-xl">info@gradwayedu.com</span>
             </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 text-center text-slate-500">
        <div className="container mx-auto px-4">
           <div className="w-16 h-16 bg-white rounded-full p-3 mx-auto mb-6 shadow-lg">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest mb-4">© {new Date().getFullYear()} GradWay (Pvt) Ltd. Colombo 05, Sri Lanka.</p>
           <p className="text-[8px] font-bold">Migration Simplified</p>
        </div>
      </footer>

      {/* AI Bot Integration */}
      <div className="fixed bottom-6 right-6 z-[150]">
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
               <input type="text" value={chatMessage} onChange={e => setChatMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-slate-100 border-0 rounded-full px-4 text-xs py-3 outline-none" />
               <button type="submit" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-paper-plane text-sm"></i></button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;