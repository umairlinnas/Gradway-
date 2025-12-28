
import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS, SERVICES, STEPS, FAQS, TESTIMONIALS } from './constants';
import { getGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

  const destinationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-2 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
              <div className="h-16 w-auto flex items-center justify-center overflow-hidden">
                <img 
                  src={logoUrl} 
                  alt="Gradway Logo" 
                  className="h-full w-auto object-contain" 
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/200x80?text=Gradway";
                  }} 
                />
              </div>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-bold text-[#1A1F2C]">
            <a href="#" className="hover:text-[#FBBF24] transition-colors uppercase tracking-wide">Home</a>
            <a href="#destinations" className="hover:text-[#FBBF24] transition-colors uppercase tracking-wide">Destinations</a>
            <a href="#services" className="hover:text-[#FBBF24] transition-colors uppercase tracking-wide">Services</a>
            <a href="#about" className="hover:text-[#FBBF24] transition-colors uppercase tracking-wide">About</a>
            <button className="gradient-button text-white px-8 py-3 rounded-full shadow-lg font-bold uppercase tracking-wider text-xs">
              Book Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#FBBF24]/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-slate-200/40 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto px-4 md:px-12 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-20 lg:mb-0 z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full mb-6 border border-slate-200">
               <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Official Study Partner</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-[#1A1F2C] leading-[1.1] mb-8">
              Migration <br />
              <span className="text-[#FBBF24]">
                S<span className="dot-i text-[#1A1F2C]">mpl</span>ified!!
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
              The Sri Lanka-based partner connecting you to world-class education that fits your profile, budget, and dreams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={scrollToDestinations}
                className="gradient-button text-white px-10 py-5 rounded-full font-extrabold shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest"
              >
                Start Exploring
              </button>
              <button className="group flex items-center space-x-3 text-[#1A1F2C] font-bold text-sm uppercase tracking-widest hover:text-amber-500 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md group-hover:bg-amber-50">
                  <i className="fa-brands fa-whatsapp text-xl text-green-500"></i>
                </div>
                <span>Free Consultation</span>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[600px] flex items-center justify-center">
            {/* Animated Blobs with .blob class for hover interaction */}
            <div className="absolute top-10 left-10 md:left-20 w-56 h-56 bg-[#FBBF24] blob shadow-2xl flex flex-col items-center justify-center text-white p-6 animate-float-slow z-20">
               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                 <i className="fa-solid fa-hotel text-xl"></i>
               </div>
               <span className="text-4xl font-black">500+</span>
               <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">Institutions</span>
            </div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#1A1F2C] blob shadow-2xl flex flex-col items-center justify-center text-white p-6 animate-float-medium z-30">
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-3">
                 <i className="fa-solid fa-globe text-xl text-amber-400"></i>
               </div>
               <span className="text-3xl font-black">10+</span>
               <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Countries</span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/40 backdrop-blur-xl border border-white/50 blob shadow-xl flex flex-col items-center justify-center text-[#1A1F2C] p-6 animate-float-slow z-10">
               <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                 <i className="fa-solid fa-user-graduate text-2xl text-amber-600"></i>
               </div>
               <span className="text-xl font-black uppercase tracking-tight text-center">Students <br/>First</span>
            </div>
            <div className="absolute top-0 right-20 w-40 h-40 bg-white blob shadow-lg flex flex-col items-center justify-center text-slate-800 p-4 animate-float-medium z-0">
               <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                 <i className="fa-solid fa-book-open text-blue-500"></i>
               </div>
               <span className="text-2xl font-black">10k+</span>
               <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Programs</span>
            </div>
            <div className="absolute w-[80%] h-[80%] border-[40px] border-amber-50/50 rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* Global Opportunities Section */}
      <section ref={destinationsRef} id="destinations" className="py-32 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col mb-20">
            <div className="max-w-2xl text-left">
               <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Global Opportunities</span>
               <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] leading-tight mb-4">Your World-Class <br/>Destination Awaits</h2>
               <p className="text-slate-500 text-lg mb-8">Pick a country, and we'll handle the roadmap to get you there.</p>
               
               <button className="px-10 py-4 bg-[#1A1F2C] text-white rounded-full font-bold text-sm hover:bg-amber-500 transition-all flex items-center space-x-3 w-fit shadow-xl hover:shadow-amber-200">
                <span>View All 10+ Destinations</span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest) => (
              <div key={dest.id} className="group relative bg-slate-50 rounded-[2.5rem] overflow-hidden p-8 hover:bg-white hover:shadow-2xl hover:shadow-amber-100 transition-all duration-500 border border-transparent hover:border-amber-100">
                <div className="flex justify-between items-start mb-10">
                   <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className={`${dest.icon} text-2xl`} style={{ color: dest.color }}></i>
                   </div>
                   <div className="w-12 h-8 rounded shadow-sm overflow-hidden border border-slate-200">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                   </div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-[#1A1F2C]">{dest.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {dest.description}
                </p>
                <div className="flex items-center space-x-2 text-[#1A1F2C] font-bold text-xs uppercase tracking-[0.2em] group-hover:text-amber-500 transition-colors">
                  <span>Explore Unis</span>
                  <i className="fa-solid fa-arrow-right translate-x-0 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talk to a counsellor Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#7799FF] via-[#88AAFF] to-[#DDAAFF] overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl"></div>
         </div>

         <div className="container mx-auto px-4 text-center text-white relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-sm">Talk to a counsellor</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
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
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-56 bg-white rounded-3xl p-2 shadow-2xl border border-blue-100 popup-enter z-50">
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
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
             <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="h-16 w-auto flex items-center justify-center">
                     <img 
                       src={logoUrl} 
                       alt="Gradway Logo" 
                       className="h-full w-auto object-contain invert" 
                     />
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
                <h4 className="font-black uppercase tracking-widest text-amber-400 mb-8 text-sm">Destinations</h4>
                <ul className="space-y-4 text-slate-400 font-medium">
                   <li><a href="#" className="hover:text-white transition-colors text-sm">United Kingdom</a></li>
                   <li><a href="#" className="hover:text-white transition-colors text-sm">Canada</a></li>
                   <li><a href="#" className="hover:text-white transition-colors text-sm">Australia</a></li>
                   <li><a href="#" className="hover:text-white transition-colors text-sm">Germany</a></li>
                </ul>
             </div>
             <div>
                <h4 className="font-black uppercase tracking-widest text-amber-400 mb-8 text-sm">Quick Links</h4>
                <ul className="space-y-4 text-slate-400 font-medium text-sm">
                   <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                </ul>
             </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
             <p>© {new Date().getFullYear()} GradWay (Pvt) Ltd. All Rights Reserved.</p>
             <p className="mt-4 md:mt-0">Colombo 5, Sri Lanka</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 gradient-button rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform"
          >
            <i className="fa-solid fa-comment-dots"></i>
          </button>
        ) : (
          <div className="bg-white w-[350px] h-[550px] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-in fade-in zoom-in duration-300">
            <div className="bg-[#1A1F2C] p-8 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-[#1A1F2C]">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <div>
                  <h4 className="font-bold leading-none">GradBot</h4>
                  <span className="text-[10px] opacity-60 font-black uppercase tracking-wider">Education Expert</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:rotate-90 transition-transform text-white/50 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
               {chatHistory.length === 0 && (
                 <div className="text-center mt-12 space-y-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600 text-2xl">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">How can I help you study abroad?</p>
                 </div>
               )}
               {chatHistory.map((chat, i) => (
                 <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm shadow-sm ${chat.role === 'user' ? 'bg-[#1A1F2C] text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                      {chat.text}
                    </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-3xl rounded-bl-none border border-slate-100 shadow-sm flex space-x-1">
                       <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                       <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                       <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                 </div>
               )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-6 bg-white border-t border-slate-100 flex items-center space-x-2">
               <input 
                 type="text" 
                 value={chatMessage}
                 onChange={(e) => setChatMessage(e.target.value)}
                 placeholder="Ask about UK, Canada, Visas..."
                 className="flex-1 bg-slate-100 border-0 rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
               />
               <button type="submit" className="w-12 h-12 bg-amber-400 text-[#1A1F2C] rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 transition-colors">
                 <i className="fa-solid fa-paper-plane text-sm"></i>
               </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
