
import React, { useState, useEffect, useRef } from 'react';
import { DESTINATIONS, SERVICES, SUCCESS_STORIES, MAIN_FAQ, FULL_FAQ } from './constants';
import { getGeminiResponse } from './services/geminiService';
import { ScrollNavigation } from './components/ui/scroll-navigation-menu';
import { motion, AnimatePresence } from 'motion/react';
import { Service, FAQ } from './types';
import { GlowingEffect } from './components/ui/glowing-effect';
import { 
  Telescope, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MessageSquare, 
  GraduationCap, 
  Globe, 
  Layers, 
  CheckCircle2, 
  Check, 
  Zap,
  Heart,
  X,
  FileText,
  ShieldAlert,
  ArrowUp,
  RefreshCcw,
  Shield,
  MapPin,
  Clock,
  TrendingUp,
  Target,
  BookOpen,
  ChevronDown,
  Loader2,
  Compass,
  Train,
  Utensils,
  Play
} from 'lucide-react';
import { cn } from './lib/utils';

const LOGO_URL = "https://i.ibb.co/3ykG4SjV/logo.png";
const TIKTOK_URL = "https://www.tiktok.com/@gradway_education?_r=1&_t=ZS-92huBpIVt6y";
const WA_PHONE = "94775009929";
const PHONE_DISPLAY = "+94 77 500 9929";
const WA_PREFILLED_MSG = encodeURIComponent("Hi, I’m interested in studying abroad.\n\nName:\nPreferred Study Country:\nIntended Program / Level:\n\nThank you.");
const WA_LINK = `https://wa.me/${WA_PHONE}?text=${WA_PREFILLED_MSG}`;

// GOOGLE FORM CONFIGURATION
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe0osLal3ZHqpy3mMBrtIvA0Xf0TkEFJ8aieLX3bFefI-8pAQ/formResponse";
const FORM_ENTRIES = {
  name: "entry.2104636556",
  phone: "entry.1820781302",
  email: "entry.1675582797",
  programLevel: "entry.1976373844",
  countries: "entry.1757388082",
  fieldOfStudy: "entry.1764432255",
  intake: "entry.957759174",
  message: "entry.1508256747"
};

// NEWSLETTER FORM CONFIGURATION
const NEWSLETTER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfqVHdpFMQYrR5mdHDuMIkcryqN-V42DIA7W72bJ5AJihGbiw/formResponse";
const NEWSLETTER_ENTRY_ID = "entry.1657033578";

type ViewState = 'main' | 'careers' | 'faq-full' | 'services-full' | 'destination-uk';
type ModalType = 'none' | 'privacy' | 'terms' | 'refund';

const FIELDS_OF_STUDY = [
  "Medicine & Health Sciences",
  "Engineering & Technology",
  "Business & Management",
  "Information Technology & Computer Science",
  "Law & Legal Studies",
  "Arts & Humanities",
  "Social Sciences",
  "Natural Sciences",
  "Architecture & Design",
  "Education & Teaching",
  "Hospitality & Tourism",
  "Other"
];

const PROGRAM_LEVELS = [
  "Foundation",
  "Undergraduate",
  "Pre Master",
  "Postgraduate"
];

const StudentsFirstIcon = ({ className }: { className?: string }) => (
  <Heart className={cn("w-full h-full text-[#FF4D4D] fill-[#FF4D4D]", className)} strokeWidth={1} />
);

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

const FAQAccordion: React.FC<{ items: FAQ[] }> = ({ items }) => {
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

const NumberedSection: React.FC<{ num: string | number; title: string; color?: 'amber' | 'indigo' | 'blue' | 'emerald' }> = ({ num, title, color = 'amber' }) => (
  <h4 className="font-black text-[#1A1F2C] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
    <span className={cn(
      "w-8 h-8 rounded-lg text-white flex items-center justify-center text-[10px] shrink-0 transition-colors",
      color === 'amber' ? "bg-amber-500" : 
      color === 'blue' ? "bg-blue-600" : 
      color === 'emerald' ? "bg-emerald-600" : 
      "bg-indigo-500"
    )}>{num}</span>
    {title}
  </h4>
);

interface ServiceCardRendererProps {
  service: Service;
  scrollToId: (id: string) => void;
}

const ServiceCardRenderer: React.FC<ServiceCardRendererProps> = ({ service, scrollToId }) => {
  const renderContent = () => {
    switch (service.id) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { icon: <Target className="text-blue-500" />, label: "Academic Audit", text: "In-depth analysis of your academics for global mapping." },
              { icon: <BookOpen className="text-amber-500" />, label: "English Language Proficiency", text: "Guidance on meeting Language requirements for top institutions." },
              { icon: <TrendingUp className="text-emerald-500" />, label: "Strategic Roadmap", text: "A future-proof road to academic and professional success in your dream destination" }
            ].map((pillar, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 hover:scale-105 transition-all duration-300 hover:shadow-lg active:scale-95 cursor-default group/pillar">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover/pillar:bg-white transition-colors">{pillar.icon}</div>
                <h4 className="font-black text-[#1A1F2C] text-xs uppercase tracking-widest">{pillar.label}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
               <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl">
                  <h4 className="font-black text-amber-600 uppercase text-[10px] tracking-widest mb-3">Global Matching Index</h4>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">We provide cross-destination intelligence, comparing UK, Canada, Australia and many more based on your specific budget and career path.</p>
               </div>
               <ul className="grid grid-cols-1 gap-3">
                  {["Scholarship Eligibility Checks", "Post-Study Work Opportunity Audits", "Campus Environment Assessments"].map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[11px] font-bold text-slate-700">
                      <Check size={14} className="text-amber-500" /> {point}
                    </li>
                  ))}
               </ul>
            </div>
            <div className="bg-[#1A1F2C] p-8 rounded-[3rem] text-white flex flex-col justify-center relative overflow-hidden">
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full"></div>
               <h5 className="text-2xl font-black uppercase tracking-tighter mb-4">Precision Matching</h5>
               <p className="text-slate-400 text-[11px] leading-relaxed italic">"Our goal is to ensure you don't just get a degree, but the right platform for your future professional life."</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-8">
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
               <div className="flex items-start justify-between mb-8">
                  <h4 className="font-black text-[#1A1F2C] uppercase tracking-widest text-xs">Submission Quality Standards</h4>
                  <CheckCircle2 className="text-emerald-500" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 01</span>
                    <p className="text-sm font-bold text-slate-800">Document Audit</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 02</span>
                    <p className="text-sm font-bold text-slate-800">SOP Making/Editing</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 03</span>
                    <p className="text-sm font-bold text-slate-800">Verification</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage 04</span>
                    <p className="text-sm font-bold text-slate-800">Submission and Tracking</p>
                  </div>
               </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-emerald-500 text-white p-10 rounded-[3rem] shadow-lg">
               <Zap className="mb-6" />
               <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-tight">Live Confidence Simulation</h4>
               <p className="text-emerald-50 text-sm leading-relaxed font-medium">We conduct mock interviews for both university admission boards and visa officers, giving you the edge in communication and poise.</p>
            </div>
            <div className="space-y-6 px-4">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><Clock size={16}/></div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#1A1F2C]">Intensive Drill Sessions</p>
                  <p className="text-[11px] text-slate-500">Master frequently asked visa questions.</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><MessageSquare size={16}/></div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#1A1F2C]">Expert Feedback</p>
                  <p className="text-[11px] text-slate-500">Direct critique on the answers and tips to improve.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="bg-[#1A1F2C] text-white p-10 md:p-14 rounded-[4rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Shield className="text-rose-500" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter">Migration Compliance</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">We offer end-to-end visa application and preparation guidance, covering Sri Lankan banking requirements, documentation, and compliance with student visa regulations across global destinations.</p>
               </div>
               <div className="flex flex-col justify-center space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-black">1</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Financial Check</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-black">2</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Immigration Check</span>
                  </div>
               </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {[
               { title: "Foundation & Pathway", text: "Ideal for students looking for alternative entry points into top-tier global campuses." },
               { title: "Direct Undergraduate", text: "Direct admission support for students across multiple global destinations." },
               { title: "Direct Post-Graduate", text: "Strategic guidance for professionals and graduates aiming for Master's degree and graduate Programs globally." }
             ].map((route, idx) => (
               <div key={idx} className="p-8 bg-violet-50 rounded-[2.5rem] border border-violet-100 hover:scale-105 transition-transform duration-300">
                  <Layers className="text-violet-500 mb-4" size={24} />
                  <h5 className="font-black text-[#1A1F2C] text-xs uppercase tracking-widest mb-2">{route.title}</h5>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{route.text}</p>
               </div>
             ))}
          </div>
        );
      case 7:
        return (
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1 space-y-4">
                  <h4 className="text-xl font-black uppercase tracking-widest text-[#1A1F2C]">The 360° Arrival Promise</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Transitioning from Colombo to global capitals shouldn't be scary. We manage the details so you focus on your first week of lectures.</p>
               </div>
               <div className="flex gap-4">
                  <div className="w-16 h-16 bg-teal-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><MapPin /></div>
                  <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Globe /></div>
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {['Flight Booking', 'Sim Cards', 'Bank Opening', 'accommodation'].map((item) => (
                 <div key={item} className="px-2 md:px-4 py-4 bg-white border border-slate-100 rounded-2xl text-[8px] sm:text-[9px] font-black uppercase tracking-tight text-slate-400 text-center shadow-sm flex items-center justify-center overflow-hidden whitespace-nowrap">
                   {item}
                 </div>
               ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id={`service-${service.id}`} className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 items-start hover:shadow-2xl transition-all overflow-hidden group scroll-mt-24">
      <div className={`w-24 h-24 ${service.iconBg} ${service.iconColor} rounded-[2.5rem] flex items-center justify-center text-5xl shrink-0 shadow-lg border border-white group-hover:scale-110 transition-transform`}>
        <i className={`fa-solid ${service.icon}`}></i>
      </div>
      <div className="flex-1 space-y-10">
        <div>
          <h2 className="text-4xl font-black text-[#1A1F2C] mb-4 uppercase tracking-tight">{service.title}</h2>
          <div className="h-1.5 w-24 bg-amber-500 rounded-full mb-8"></div>
        </div>
        
        {renderContent()}

        <button onClick={() => scrollToId('contact')} className="bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-amber-500 active:scale-95 transition-all inline-flex items-center gap-3">
           Book a Consultation <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

const LegalModal: React.FC<{ type: ModalType; onClose: () => void }> = ({ type, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (type === 'none') return null;

  const LegalFooter = ({ colorClass = 'text-amber-500', sectionNum = "12", sectionColor = "blue" }: { colorClass?: string; sectionNum?: string; sectionColor?: 'blue' | 'amber' | 'emerald' }) => (
    <section className="pt-10 border-t border-slate-100 text-center space-y-8 pb-16">
      <div>
        <NumberedSection num={sectionNum} title="Contact Information" color={sectionColor} />
        <p className={cn("font-black uppercase tracking-tighter text-2xl mb-1", 
          sectionColor === 'amber' ? "text-amber-500" : 
          sectionColor === 'emerald' ? "text-emerald-600" : 
          "text-[#1A1F2C]")}>Gradway (Pvt) Limited</p>
        <p className="font-bold text-slate-600 text-[13px] mb-8">Reach us at info@gradwayedu.com</p>
      </div>
      
      <hr className="border-slate-100 w-full mx-auto" />

      <div className="flex flex-row justify-center items-center gap-6 md:gap-10 px-4">
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-whatsapp"></i></a>
        <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-facebook"></i></a>
        <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-instagram"></i></a>
        <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-black hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-tiktok"></i></a>
        <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-linkedin"></i></a>
      </div>

      <div className="flex flex-col items-center leading-tight pt-4">
        <span className="text-[10px] font-black text-[#1A1F2C] uppercase tracking-[0.3em]">Migration</span>
        <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", colorClass)}>Simplified!!</span>
      </div>
    </section>
  );

  const privacyBody = (
    <div className="space-y-12 text-slate-600 text-[13px] md:text-sm leading-relaxed font-medium">
      <div className="text-center border-b border-slate-100 pb-10">
        <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tighter mb-2">Privacy Policy</h4>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Gradway (Private) Limited</p>
        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services – Sri Lanka</p>
        <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Last Updated: 01/01/2026</p>
      </div>

      <p className="text-base font-semibold text-[#1A1F2C]">
        Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”) is committed to protecting the privacy, confidentiality, and security of personal data entrusted to us.
      </p>

      <p>
        This Privacy Policy explains how personal data is collected, used, disclosed, stored, and protected in accordance with the <strong>Personal Data Protection Act No. 9 of 2022 of Sri Lanka</strong>, and in line with internationally accepted data protection principles.
        By accessing our website, submitting enquiries, or engaging our services, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.
      </p>

      <section>
        <NumberedSection num="1" title="Information Collection" color="amber" />
        <p className="mb-4">We collect personal data only where it is lawful, necessary, and proportionate for the provision of education consultancy services.</p>
        <p className="mb-6 font-bold text-[#1A1F2C]">The categories of personal data we may collect include:</p>
        
        <div className="space-y-8 ml-4">
          <div className="py-1">
            <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Personal and Contact Information</h5>
            <ul className="list-disc ml-6 space-y-2">
              <li>Full name, date of birth, and nationality</li>
              <li>Residential address, email address, and phone number</li>
              <li>Passport and identification details (where required)</li>
            </ul>
          </div>
          
          <div className="py-1">
            <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Academic and Professional Information</h5>
            <ul className="list-disc ml-6 space-y-2">
              <li>Academic history, qualifications, transcripts, and certificates</li>
              <li>English language test results (IELTS, TOEFL, etc.)</li>
              <li>Employment history, curriculum vitae, portfolios, and references (where applicable)</li>
            </ul>
          </div>
          
          <div className="py-1">
            <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Financial and Compliance Information</h5>
            <ul className="list-disc ml-6 space-y-2">
              <li>Proof of financial capacity and sponsorship details</li>
              <li>Payment records</li>
              <li>Visa and immigration documentation and police clearance certificates</li>
              <li>Health-related information strictly where required for applications</li>
            </ul>
          </div>
          
          <div className="py-1">
            <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Communication and Technical Information</h5>
            <ul className="list-disc ml-6 space-y-2">
              <li>Records of consultations and correspondence</li>
              <li>IP address, browser and device details</li>
              <li>Website usage data, cookies, and analytics information used to ensure functionality, security, and service improvement</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 font-medium italic text-slate-400">We do not collect personal data that is unrelated to the delivery of our services.</p>
      </section>

      <section>
        <NumberedSection num="2" title="Consent" color="amber" />
        <p className="mb-6">Personal data is collected and processed with your explicit and informed consent, except where processing is otherwise permitted or required by law.</p>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="font-bold text-[#1A1F2C] uppercase text-[10px] tracking-widest border-b border-slate-100 pb-2">Consent is deemed provided when you:</p>
            <ul className="list-disc ml-8 space-y-2">
              <li>Submit enquiry or application forms</li>
              <li>Contact us via email, phone, or messaging platforms</li>
              <li>Book or attend consultations</li>
              <li>Provide documentation for academic or visa processing</li>
              <li>Proceed with or confirm engagement of our services</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-bold text-[#1A1F2C] uppercase text-[10px] tracking-widest border-b border-slate-100 pb-2">You acknowledge that:</p>
            <ul className="list-disc ml-8 space-y-2">
              <li>Certain personal data is essential to assess eligibility and process applications</li>
              <li>Processing is required to comply with institutional, immigration, and regulatory obligations</li>
              <li>Withdrawal of consent may restrict or prevent continuation of services where processing is necessary to fulfil those obligations</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-[12px]">You may withdraw consent at any time by contacting us in writing. Withdrawal will not affect processing already lawfully carried out.</p>
      </section>

      <section>
        <NumberedSection num="3" title="Use of Personal Data" color="amber" />
        <p className="mb-4">Personal data collected by Gradway is used solely for lawful and specified purposes, including:</p>
        <ul className="list-disc ml-8 space-y-2 mb-8">
          <li>Academic assessment and education pathway planning</li>
          <li>Course, institution, and destination guidance</li>
          <li>Preparation and submission of applications</li>
          <li>Visa and immigration guidance and documentation support</li>
          <li>Communication of updates, requirements, and outcomes</li>
          <li>Internal record-keeping for compliance, quality assurance, and dispute resolution</li>
        </ul>
        
        <div className="space-y-6">
          <NumberedSection num="3.1" title="Marketing & Success Announcements" color="amber" />
          <p>Gradway may share general success updates related to admissions or visa outcomes for informational and promotional purposes, to demonstrate service experience and track record.</p>
          <p>Such disclosures are limited, proportionate, and handled responsibly.</p>
          <p className="font-bold">Without additional consent, Gradway may share only general, non-sensitive information, including:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc ml-8 mb-6">
            <li>Name of applicant</li>
            <li>Confirmation that a visa or admission has been granted</li>
            <li>Destination country</li>
            <li>Name of the institution and programme applied for</li>
            <li>Type or level of programme or visa</li>
            <li>Date on which the visa or admission was granted</li>
            <li>Validity period of the visa, where applicable</li>
          </ul>
          
          <div className="space-y-4">
            <p className="font-bold mb-1">With explicit prior consent, we may additionally share:</p>
            <ul className="list-disc ml-8 space-y-1">
              <li>Photographs or videos taken for promotional or marketing purposes</li>
              <li>Testimonials or statements provided voluntarily by the student</li>
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-400"><strong>Gradway does not publish</strong> passport numbers, identification numbers, full dates of birth, contact details, financial information, academic records, immigration documents, or any other sensitive personal data.</p>
          </div>
          <p>Consent for promotional use is obtained separately and may be withdrawn at any time. Withdrawal will apply only to future promotional use and will not affect content already lawfully published. Personal data is not used for purposes incompatible with those stated above.</p>
        </div>
      </section>

      <section>
        <NumberedSection num="4" title="Disclosure to Third Parties" color="amber" />
        <p className="mb-4">Personal data is disclosed only where necessary and lawful, and only to authorized parties directly involved in the study abroad process, including:</p>
        <ul className="list-disc ml-8 space-y-2">
          <li>Universities, colleges, and education providers</li>
          <li>Embassies, visa offices, and immigration authorities</li>
          <li>Official application, verification, and compliance platforms</li>
          <li>Authorized service providers supporting documentation or processing</li>
        </ul>
        <p className="mt-4 font-bold text-[#1A1F2C]">Gradway does not sell, rent, trade, or disclose personal data to marketing agencies, advertisers, or unrelated third parties.</p>
      </section>

      <section>
        <NumberedSection num="5" title="Cross-Border Data Transfers" color="amber" />
        <p>As an international education consultancy, personal data may be transferred outside Sri Lanka to institutions or authorities in destination countries. Such transfers occur only where required for admissions or visa processing and are carried out with appropriate safeguards to ensure data protection.</p>
      </section>

      <section>
        <NumberedSection num="6" title="Data Retention" color="amber" />
        <div className="space-y-4">
          <p>Personal data is retained only for as long as necessary to:</p>
          <ul className="list-disc ml-8 space-y-2">
            <li>Deliver consultancy services</li>
            <li>Meet institutional, regulatory, or legal requirements</li>
            <li>Maintain records for compliance and dispute resolution</li>
          </ul>
          <p>Once no longer required, data is securely deleted, anonymised, or archived in accordance with lawful retention practices.</p>
        </div>
      </section>

      <section>
        <NumberedSection num="7" title="Data Security" color="amber" />
        <p>We implement appropriate technical and administrative measures to protect personal data, including controlled document handling and access limited to authorised personnel only. While reasonable measures are taken, no system can be guaranteed to be entirely secure.</p>
      </section>

      <section>
        <NumberedSection num="8" title="Cookies & Website Usage" color="amber" />
        <p>Our website may use cookies and analytics tools to improve performance, understand user interaction, and enhance user experience. Users may manage cookie preferences through their browser settings.</p>
      </section>

      <section>
        <NumberedSection num="9" title="Rights of Data Subjects" color="amber" />
        <div className="space-y-4">
          <p>In accordance with applicable law, you may request:</p>
          <ul className="list-disc ml-8 space-y-2">
            <li>Access to personal data held by us</li>
            <li>Correction of inaccurate or incomplete data</li>
            <li>Deletion of personal data, subject to legal and service obligations</li>
            <li>Restriction of certain processing activities</li>
          </ul>
          <p>Requests may be made using the contact details below. Identity verification may be required.</p>
        </div>
      </section>

      <section>
        <NumberedSection num="10" title="Children and Minors" color="amber" />
        <p>Where services are provided to individuals under 18 years of age, verifiable parental or guardian consent is required. Only personal data necessary for service delivery is processed, and parents or guardians may request access to or correction of the minor’s data.</p>
      </section>

      <section>
        <NumberedSection num="11" title="Third-Party Websites" color="amber" />
        <p>Our website may contain links to external websites. Gradway is not responsible for the content, security, or privacy practices of third-party sites.</p>
      </section>

      <section>
        <NumberedSection num="12" title="Changes to This Policy" color="amber" />
        <p>This Privacy Policy may be updated periodically to reflect legal, regulatory, or operational changes. Updated versions will be published on our website. Continued use of our services constitutes acceptance of the revised policy.</p>
      </section>

      <LegalFooter colorClass="text-amber-500" sectionNum="13" sectionColor="amber" />
    </div>
  );

  const tosBody = (
    <div className="space-y-12 text-slate-600 text-[13px] md:text-sm leading-relaxed font-medium">
      <div className="text-center border-b border-slate-100 pb-10">
        <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tighter mb-2">Terms of Service</h4>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Gradway (Private) Limited</p>
        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services – Sri Lanka</p>
        <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Effective Date: 01/01/2026</p>
      </div>

      <p className="text-base font-semibold text-[#1A1F2C]">
        These Terms of Service (“Terms”) govern the access to and use of services provided by Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”). By accessing our website, engaging in consultations, submitting information, or using any of our services, you agree to be bound by these Terms in their entirety.
      </p>

      <section>
        <NumberedSection num="1" title="Scope of Services" color="blue" />
        <p className="mb-4">Gradway provides professional education consultancy services, which may include:</p>
        <ul className="list-disc ml-8 space-y-2 mb-6">
          <li>Academic profile assessment and counselling</li>
          <li>Course, institution, and destination guidance</li>
          <li>Application preparation and submission support</li>
          <li>Student visa and migration-related documentation guidance</li>
          <li>Pre-departure and post-arrival advisory support</li>
        </ul>
        <p>Gradway acts solely as an advisory and facilitation service provider. All final decisions regarding admissions, visas, immigration approvals, scholarships, enrolment conditions, or timelines are made exclusively by universities, colleges, embassies, and immigration authorities.</p>
        <p className="mt-4 font-bold">Gradway does not have the authority to influence, guarantee, or override such decisions.</p>
      </section>

      <section>
        <NumberedSection num="2" title="Client Responsibilities" color="blue" />
        <p className="mb-4">Clients are solely responsible for ensuring that all information and documentation provided to Gradway is accurate, complete, and truthful.</p>
        <p className="mb-4 font-bold text-[#1A1F2C]">This includes:</p>
        <ul className="list-disc ml-8 space-y-2 mb-6">
          <li>Academic records, certificates, and transcripts</li>
          <li>Financial documents and proof of sponsorship</li>
          <li>Identity documents and visa-related history</li>
        </ul>
        <p>Submission of false, misleading, altered, or fraudulent information may result in immediate termination of services without refund, and Gradway reserves the right to withdraw representation without further obligation. Gradway shall not be liable for outcomes arising from inaccurate, incomplete, or delayed information provided by the client.</p>
      </section>

      <section>
        <NumberedSection num="3" title="No Guarantee of Outcomes" color="blue" />
        <p>While Gradway provides professional guidance and maintains quality standards, no guarantees are made or implied regarding admission outcomes, visa approvals, processing timelines, scholarships, or post-study work outcomes. Outcomes are subject to external factors beyond Gradway’s control, including institutional criteria, immigration regulations, and individual applicant profiles.</p>
      </section>

      <section>
        <NumberedSection num="4" title="Fees and Third-Party Costs" color="blue" />
        <p>Consultancy fees, where applicable, will be communicated separately and are generally non-refundable. Third-party costs (application fees, visa fees, medical tests, courier charges, and institutional deposits) are payable by the client and are not controlled by Gradway. Gradway is not responsible for changes in third-party fees or refund policies.</p>
      </section>

      <section>
        <NumberedSection num="5" title="Limitation of Liability" color="blue" />
        <p>To the fullest extent permitted by law, Gradway shall not be liable for indirect, incidental, consequential, or economic losses. Gradway’s liability shall be limited to the amount paid to Gradway for consultancy services. Gradway shall not be responsible for losses arising from visa refusals, admission denials, or policy changes by universities or embassies.</p>
      </section>

      <section>
        <NumberedSection num="6" title="Confidentiality and Data Use" color="blue" />
        <p>Gradway handles personal information in accordance with its Privacy Policy. Client data is used strictly for service delivery, compliance, communication, and lawful operational purposes. Clients consent to the sharing of necessary information with relevant institutions and authorities as required to provide services.</p>
      </section>

      <section>
        <NumberedSection num="7" title="Intellectual Property" color="blue" />
        <p>All original content created by Gradway, including website text, layouts, graphics, and proprietary materials, is the intellectual property of Gradway (Private) Limited. Unauthorized reproduction or misuse is prohibited.</p>
        
        <div className="mt-8">
          <NumberedSection num="7.1" title="Logo Usage and Fair Use Disclaimer" color="blue" />
          <p className="mt-4">University names, logos, trademarks, and crests displayed on this website are the property of their respective owners. Such logos are used solely for informational and reference purposes to identify destinations and institutions. Use does not imply official partnership or endorsement. Usage is intended to fall within fair use; rights holders may contact us for review or removal.</p>
        </div>
      </section>

      <section>
        <NumberedSection num="8" title="Suspension or Termination" color="blue" />
        <p>Gradway reserves the right to suspend or termination services where false information is provided, documents are withheld, terms are violated, or client conduct is abusive or obstructive. Termination does not relieve the client of outstanding obligations.</p>
      </section>

      <section>
        <NumberedSection num="9" title="Amendments" color="blue" />
        <p>Gradway reserves the right to modify these Terms at any time. Updated versions will be published on our website and take effect immediately. Continued use of services constitutes acceptance.</p>
      </section>

      <section>
        <NumberedSection num="10" title="Governing Law" color="blue" />
        <p>These Terms shall be governed by the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts of Colombo, Sri Lanka.</p>
      </section>

      <section>
        <NumberedSection num="11" title="Acceptance" color="blue" />
        <p>Engaging with Gradway staff, booking consultations, or submitting documents constitutes full and unconditional acceptance of these Terms of Service.</p>
      </section>

      <LegalFooter colorClass="text-blue-600" sectionNum="12" sectionColor="blue" />
    </div>
  );

  const refundBody = (
    <div className="space-y-12 text-slate-600 text-[13px] md:text-sm leading-relaxed font-medium">
      <div className="text-center border-b border-slate-100 pb-10">
        <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tighter mb-2">Refund & Cancellation</h4>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Gradway (Private) Limited</p>
        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services – Sri Lanka</p>
        <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Effective Date: 01/01/2026</p>
      </div>

      <p className="text-base font-semibold text-[#1A1F2C]">
        This Refund & Cancellation Policy outlines the conditions under which refunds, cancellations, and service withdrawals are handled by Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”).
        By engaging our services, you acknowledge and agree to the terms set out below.
      </p>

      <section>
        <NumberedSection num="1" title="Nature of Consultancy Services" color="emerald" />
        <p className="mb-4">Gradway provides professional education consultancy and advisory services. These services involve time, expertise, planning, document review, communication with institutions, and strategic guidance.</p>
        <div className="space-y-4">
          <p className="font-bold text-[#1A1F2C] uppercase text-[10px] tracking-widest border-b border-slate-100 pb-2">As such:</p>
          <ul className="list-disc ml-8 space-y-2">
            <li>Consultancy services are intangible and time-based</li>
            <li>Value is delivered progressively from the commencement of engagement</li>
            <li>Outcomes are influenced by third parties such as universities and embassies</li>
          </ul>
        </div>
      </section>

      <section>
        <NumberedSection num="2" title="Refund Policy" color="emerald" />
        
        <div className="space-y-8">
          <div>
            <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-emerald-500/30">2.1 General Rule</h5>
            <p>Unless explicitly agreed in writing, fees paid to Gradway are non-refundable once services have commenced. This includes, but is not limited to: profile evaluations, university mapping, application preparation, and visa guidance.</p>
          </div>

          <div>
            <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-emerald-500/30">2.2 Non-Refundable Circumstances</h5>
            <p className="mb-4">Refunds will not be issued in the following situations:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc ml-8">
              <li>Change of mind by the client</li>
              <li>Visa refusal or application rejection</li>
              <li>Admission denial by an institution</li>
              <li>Delays caused by third parties</li>
              <li>Changes in immigration policies</li>
              <li>Failure to provide accurate information</li>
              <li>Withdrawal after services commenced</li>
              <li>Submission of false documents</li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-emerald-500/30">2.3 Exceptional Refunds</h5>
            <p>In limited and exceptional circumstances, Gradway may consider a refund at its sole discretion, provided that the request is submitted in writing and services have not commenced.</p>
          </div>
        </div>
      </section>

      <section>
        <NumberedSection num="3" title="Third-Party Fees and Payments" color="emerald" />
        <p className="mb-4">Fees paid to third parties are non-refundable and are governed by the policies of those entities. This includes:</p>
        <ul className="list-disc ml-8 space-y-2">
          <li>University or college application fees</li>
          <li>Visa application fees</li>
          <li>Medical examination fees</li>
          <li>Courier, translation, or certification charges</li>
        </ul>
        <p className="mt-4 font-bold">Gradway does not control third-party refund decisions and bears no liability for such costs.</p>
      </section>

      <section>
        <NumberedSection num="4" title="Cancellation by the Client" color="emerald" />
        <p>Clients may cancel services by providing written notice to Gradway. However, cancellation does not automatically entitle the client to a refund, and outstanding balances remain payable.</p>
      </section>

      <section>
        <NumberedSection num="5" title="Cancellation or Termination by Gradway" color="emerald" />
        <p>Gradway reserves the right to suspend or terminate services without refund where false info is provided, conduct is abusive, or policies are breached. Such termination does not waive outstanding payment obligations.</p>
      </section>

      <section>
        <NumberedSection num="6" title="No Guarantee Clause" color="emerald" />
        <p>Refunds are not linked to outcomes. Gradway does not guarantee admission outcomes, visa approvals, processing timelines, or scholarships. Unfavourable outcomes do not constitute grounds for refunds.</p>
      </section>

      <section>
        <NumberedSection num="7" title="Refund Processing Method" color="emerald" />
        <p>Where a refund is approved, it will be issued using the original payment method where possible. Processing timelines may vary, and administrative or transaction fees may be deducted.</p>
      </section>

      <section>
        <NumberedSection num="8" title="Policy Amendments" color="emerald" />
        <p>Gradway reserves the right to update or modify this policy at any time. Continued use of our services constitutes acceptance of the updated policy.</p>
      </section>

      <LegalFooter colorClass="text-emerald-600" sectionNum="9" sectionColor="emerald" />
    </div>
  );

  const content = type === 'privacy' ? {
    title: "Privacy Policy",
    icon: <ShieldAlert className="text-amber-500" size={32} />,
    body: privacyBody
  } : type === 'terms' ? {
    title: "Terms of Service",
    icon: <FileText className="text-blue-600" size={32} />,
    body: tosBody
  } : {
    title: "Refund Policy",
    icon: <RefreshCcw className="text-emerald-600" size={32} />,
    body: refundBody
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-[#0a0d14]/80 backdrop-blur-xl cursor-pointer"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] cursor-default"
      >
        <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-white relative z-10 shrink-0">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
            {content.icon}
          </div>
          <div className="flex-1 flex items-center justify-between">
            <h3 className="text-2xl font-black text-[#1A1F2C] uppercase tracking-tighter">{content.title}</h3>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
              <X size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-14 custom-scrollbar mb-4">
          {content.body}
          <div className="h-12 w-full shrink-0"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// COMPONENT MOVED OUTSIDE TO FIX NEWSLETTER INPUT FOCUS BUG
interface FooterProps {
  onModal: (type: ModalType) => void;
  onNavigate: (id: string) => void;
  onSetView: (v: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onModal, onNavigate, onSetView }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const newsletterFormRef = useRef<HTMLFormElement>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    setNewsletterLoading(true);
    if (newsletterFormRef.current) {
      newsletterFormRef.current.submit();
      setTimeout(() => {
        setNewsletterLoading(false);
        setNewsletterSubmitted(true);
        setNewsletterEmail("");
      }, 1000);
    }
  };

  const handleRefill = () => {
    setNewsletterSubmitted(false);
  };

  return (
    <footer className="bg-[#111520] text-white pt-24 pb-12 relative overflow-hidden">
      <iframe name="newsletter_target" style={{ display: 'none' }} />
      <form ref={newsletterFormRef} action={NEWSLETTER_FORM_URL} method="POST" target="newsletter_target" style={{ display: 'none' }}>
        <input type="hidden" name={NEWSLETTER_ENTRY_ID} value={newsletterEmail} />
      </form>

      <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
              <img src={LOGO_URL} alt="Gradway Logo" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-2xl font-black tracking-tighter leading-none uppercase">Gradway (Pvt) Ltd.</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">Empowering the next generation of Sri Lankan leaders through world-class global education pathways and ethical migration consultancy.</p>
          
          <div className="space-y-2 pt-2">
            <a href={`tel:${WA_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-amber-500 hover:scale-105 transition-transform origin-left group">
               <Phone size={16} />
               <span className="text-sm font-black tracking-widest">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <div className="flex flex-row items-center gap-5 text-2xl flex-nowrap overflow-visible">
             <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-all"><i className="fa-brands fa-whatsapp"></i></a>
             <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all"><i className="fa-brands fa-facebook"></i></a>
             <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all"><i className="fa-brands fa-instagram"></i></a>
             <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-125 transition-all"><i className="fa-brands fa-tiktok"></i></a>
             <a href="mailto:info@gradwayedu.com" className="text-[#EA4335] hover:scale-125 transition-all"><i className="fa-solid fa-at"></i></a>
             <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Services</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
            <li onClick={() => onSetView('services-full')} className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer hover:translate-x-1 duration-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Course & University Selection</li>
            <li onClick={() => onSetView('services-full')} className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer hover:translate-x-1 duration-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Visa Application & Support</li>
            <li onClick={() => onSetView('services-full')} className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer hover:translate-x-1 duration-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Departure & After Arrival Support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('aboutus')}>About Us</li>
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('destinations')}>Destinations</li>
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('faq-full')}>FAQ</li>
            <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('careers')}>Careers</li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Stay Updated</h4>
            {!newsletterSubmitted ? (
              <form onSubmit={handleNewsletterSubmit} className="flex bg-white/5 p-1 rounded-full border border-white/10 overflow-hidden group">
                <input 
                  type="email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email address" 
                  className="bg-transparent border-0 px-4 py-2 text-xs outline-none flex-1 text-white placeholder:text-slate-600" 
                />
                <button 
                  type="submit" 
                  disabled={newsletterLoading}
                  className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors shrink-0 disabled:opacity-50"
                >
                  {newsletterLoading ? (
                    <Loader2 className="animate-spin text-[10px]" size={12} />
                  ) : (
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  )}
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-500">
                  <Check size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Subscribed!</span>
                </div>
                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] leading-relaxed">Thank you, you have been subscribed to our updates.</p>
                <button 
                  onClick={handleRefill}
                  className="text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-4"
                >
                  Click to re-fill
                </button>
              </motion.div>
            )}
            <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-tight">Service updates & Announcements</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2025 Gradway (Private) Limited. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
           <button onClick={() => onModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
           <button onClick={() => onModal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
           <button onClick={() => onModal('refund')} className="hover:text-white transition-colors">Refund & Cancellation</button>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(244,63,94,0.3)] group"
        >
           Back to the Top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

// COMPONENT MOVED OUTSIDE TO FIX FOCUS BUG
const ChatWidget: React.FC<{
  chatOpen: boolean;
  setChatOpen: (o: boolean) => void;
  chatMessage: string;
  setChatMessage: (m: string) => void;
  chatHistory: { role: 'user' | 'bot'; text: string }[];
  isTyping: boolean;
  handleChatSubmit: (e: React.FormEvent) => void;
}> = ({ chatOpen, setChatOpen, chatMessage, setChatMessage, chatHistory, isTyping, handleChatSubmit }) => (
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

const UKDestinationPage: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const [selectedCity, setSelectedCity] = useState(0);
  const cities = [
    { name: "London", desc: "Home to 30+ universities, London offers unparalleled access to culture, internships, and global networks.", stats: "£1,200/mo Rent • Excellent Tube", rating: "#1 Student City" },
    { name: "Edinburgh", desc: "A historic academic hub known for its stunning architecture, vibrant festivals, and world-class research institutions.", stats: "£950/mo Rent • Very Walkable", rating: "UNESCO City" },
    { name: "Manchester", desc: "The industrial heart of the North, now a thriving student hub with a massive student population and rich musical heritage.", stats: "£850/mo Rent • Metrolink Tram", rating: "The Northern Powerhouse" },
    { name: "Birmingham", desc: "The UK's second-largest city, boasting multiple top universities and a young, diverse population in the heart of England.", stats: "£800/mo Rent • Great Train Links", rating: "Multicultural Hub" }
  ];

  return (
    <main className="animate-[fadeIn_0.5s_ease-out] bg-[#020617] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070" 
            className="w-full h-full object-cover opacity-30 scale-105" 
            alt="London Skyline" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400">
            <Globe size={14} /> UK Education Excellence
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Uncover Your <br />
            <span className="text-blue-500">Potential</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Embark on a journey through centuries of academic heritage and vibrant modern culture. The UK awaits your ambition.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <button onClick={onContact} className="bg-blue-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl shadow-blue-600/20">Start Your Journey +</button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              <Play size={16} fill="white" /> Watch Video
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Scroll to explore</span>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </section>

      {/* Chapter 1: Legacy */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Chapter I: Heritage</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">A Legacy of Learning</h2>
          <p className="text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            From the historic cobblestones of <span className="text-white border-b border-blue-500">Oxford</span> to the bustling innovation hubs of <span className="text-white border-b border-blue-500">London</span>, the United Kingdom offers an education system respected worldwide. It is not merely about degrees; it is about immersing yourself in a tradition that has shaped leaders, scientists, and artists for centuries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Compass className="text-blue-500" />, title: "World-Class Research", desc: "Access to pioneering research facilities and libraries that house centuries of knowledge." },
            { icon: <Globe className="text-blue-500" />, title: "Global Community", desc: "Join a diverse student body from over 200 countries, creating a truly global network." },
            { icon: <TrendingUp className="text-blue-500" />, title: "Career Acceleration", desc: "Benefit from strong industry links and the 2-year Graduate Route post-study work visa." }
          ].map((card, i) => (
            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
              <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter 2: Cities */}
      <section className="py-24 px-6 md:px-12 bg-[#0a0d14]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Chapter II: Living</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Explore <br /> Iconic Cities</h2>
            <p className="text-slate-400 font-medium leading-relaxed">The UK is a tapestry of cultures. Choose the environment that inspires you.</p>
            <div className="space-y-2">
              {cities.map((city, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedCity(i)}
                  className={cn(
                    "w-full px-8 py-5 rounded-2xl text-left font-black uppercase tracking-widest text-xs flex justify-between items-center transition-all",
                    selectedCity === i ? "bg-blue-600 text-white" : "bg-white/5 text-slate-500 hover:bg-white/10"
                  )}
                >
                  {city.name}
                  <ChevronDown className={cn("transition-transform", selectedCity === i ? "-rotate-90" : "")} size={16} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full"></div>
            <div className="relative bg-[#020617] border border-white/10 rounded-[3rem] p-8 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
               <img 
                 src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400" 
                 className="w-full h-48 object-cover rounded-3xl mb-8 border border-white/10" 
                 alt="City" 
               />
               <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-black uppercase tracking-tight">{cities[selectedCity].name}</h3>
                  <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase rounded-full">{cities[selectedCity].rating}</span>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">{cities[selectedCity].desc}</p>
               <div className="flex items-center gap-6 py-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                    <MapPin size={14} className="text-blue-500" /> {cities[selectedCity].stats.split('•')[0]}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                    <Train size={14} className="text-blue-500" /> {cities[selectedCity].stats.split('•')[1]}
                  </div>
               </div>
               <button onClick={onContact} className="w-full mt-4 py-4 bg-transparent border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">View Universities</button>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Institutions */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
           <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Chapter III: Institutions</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Partner Universities</h2>
           </div>
           <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"><X size={16} className="rotate-45" /></button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"><ChevronDown size={16} className="-rotate-90" /></button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "University of Edinburgh", location: "Scotland, UK", tag: "Top 10 UK", fields: "Computer Science • Law • Medicine" },
            { name: "University of Manchester", location: "Manchester, UK", tag: "Russell Group", fields: "Engineering • Business" },
            { name: "King's College London", location: "London, UK", tag: "Gold Rated", fields: "Politics • Health" }
          ].map((uni, i) => (
            <div key={i} className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden hover:scale-[1.02] transition-all flex flex-col h-full group">
               <div className="h-48 bg-slate-800 relative">
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase border border-white/10">{uni.tag}</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform">
                    <div className="w-16 h-16 border-4 border-white/20 rounded-xl"></div>
                  </div>
               </div>
               <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{uni.name}</h3>
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">{uni.location}</span>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-4">{uni.fields}</p>
                    <button onClick={onContact} className="text-blue-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">View Programs <ArrowUp size={14} className="rotate-45" /></button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter 4: Essentials */}
      <section className="py-24 bg-gradient-to-b from-[#0a0d14] to-[#020617] px-6 md:px-12">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Chapter IV: Essentials</span>
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Your Path <br /> to the UK</h2>
               <p className="text-slate-400 font-medium leading-relaxed max-w-md">Navigating the Student Visa (Formerly Tier 4) can be complex. We simplify the process into four clear stages.</p>
               <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] space-y-4">
                  <div className="flex items-center gap-3 text-blue-400">
                    <Shield size={20} /> <span className="text-xs font-black uppercase tracking-widest">Did you know?</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">The UK now offers a <span className="text-blue-400">Graduate Route</span> visa allowing you to stay and work for 2 years after graduation without a sponsor.</p>
               </div>
            </div>

            <div className="space-y-12 relative">
               <div className="absolute left-6 top-8 bottom-8 w-px bg-white/10"></div>
               {[
                 { step: "1", title: "Secure Your Offer", desc: "Apply to universities and receive an unconditional offer letter." },
                 { step: "2", title: "Get Your CAS", desc: "Receive your Confirmation of Acceptance for Studies (CAS) number from your university." },
                 { step: "3", title: "Visa Application", desc: "Submit your application online, pay the health surcharge, and book biometrics." },
                 { step: "4", title: "Biometrics & Travel", desc: "Attend your appointment and await your vignette to travel." }
               ].map((item, i) => (
                 <div key={i} className="relative pl-16 group">
                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-[#020617] border border-blue-500/50 text-blue-500 flex items-center justify-center font-black z-10 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl shadow-blue-600/10">{item.step}</div>
                    <h4 className="text-xl font-black uppercase tracking-tight mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Chapter 5: Experience */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Chapter V: Experience</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Life Beyond the Classroom</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[600px]">
            <div className="lg:col-span-2 relative rounded-[3rem] overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt="Students" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
               <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Vibrant Student Life</h3>
                  <p className="text-slate-300 text-sm font-medium">Join societies, sports clubs, and meet friends for life.</p>
               </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-rows-2 gap-6">
               <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <Utensils size={32} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase text-slate-500">Avg. Costs</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Cost of Living</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">Ranges from £900 - £1,300 per month depending on the city.</p>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-2/3"></div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="relative rounded-[3rem] overflow-hidden group border border-white/10">
                     <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500" alt="Food" />
                     <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50 block mb-1">Culture & Food</span>
                        <div className="h-px w-8 bg-blue-500 mb-2"></div>
                     </div>
                  </div>
                  <div className="bg-blue-600 rounded-[3rem] p-10 flex flex-col justify-between group hover:bg-blue-700 transition-all cursor-pointer">
                     <Train size={32} className="text-white" />
                     <div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-1">Travel Europe</h4>
                        <p className="text-[10px] text-blue-100 font-medium">Paris is just 2 hours away by train.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-blue-600 relative overflow-hidden text-center">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
         <div className="relative z-10 max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Ready to Write <br /> Your Story?</h2>
            <p className="text-blue-50 text-lg md:text-xl font-medium max-w-2xl mx-auto">Our consultants are ready to guide you through university selection, application, and visa processes. 100% free initial consultation.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
               <button onClick={onContact} className="bg-white text-blue-600 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl">Book Free Consultation</button>
               <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">Download Brochure</button>
            </div>
         </div>
      </section>
    </main>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('main');
  const [modal, setModal] = useState<ModalType>('none');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // FORM STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [intake, setIntake] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [selectedProgramLevel, setSelectedProgramLevel] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    if (modal !== 'none') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modal]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (hiddenFormRef.current) {
        hiddenFormRef.current.submit();
        setTimeout(() => {
            setFormSubmitted(true);
            setIsSubmitting(false);
            setName(""); setPhone(""); setEmail(""); setIntake(""); setMessage(""); 
            setSelectedCountries([]); setSelectedFieldOfStudy(""); setSelectedProgramLevel("");
        }, 1500);
    }
  };

  const toggleCountrySelection = (countryName: string) => {
    setSelectedCountries(prev => {
      if (prev.includes(countryName)) {
        return prev.filter(c => c !== countryName);
      }
      if (prev.length < 4) {
        return [...prev, countryName];
      }
      return prev;
    });
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

  const navigateToServiceDetail = (id: number) => {
    setView('services-full');
    setTimeout(() => {
      const el = document.getElementById(`service-${id}`);
      if (el) {
        const offset = 100;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  const scrollContainer = (region: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[region];
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

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
            <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all">Visit LinkedIn Page</a>
          </div>

          <div className="w-full max-w-5xl pt-20 border-t border-slate-200">
            <h2 className="text-3xl font-black mb-12 text-[#1A1F2C] uppercase tracking-tighter">Join the Community</h2>
            <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-10">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all"><i className="fa-brands fa-whatsapp text-3xl"></i></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp</span>
              </a>
              <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all"><Linkedin /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all"><Instagram /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram</span>
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all"><i className="fa-brands fa-tiktok text-3xl"></i></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">TikTok</span>
              </a>
              <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><Facebook /></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facebook</span>
              </a>
            </div>
          </div>
        </main>
        <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
        <ChatWidget 
          chatOpen={chatOpen} setChatOpen={setChatOpen} 
          chatMessage={chatMessage} setChatMessage={setChatMessage} 
          chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} 
        />
        <AnimatePresence>
          {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
        </AnimatePresence>
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
              <p className="text-slate-500 text-xl font-medium leading-relaxed">A comprehensive guide to the professional services we provide for Sri Lankan students seeking world-class education.</p>
            </div>
            <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
              {SERVICES.map((s) => <ServiceCardRenderer key={s.id} service={s} scrollToId={scrollToId} />)}
            </div>
          </div>
        </main>
        <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
        <ChatWidget 
          chatOpen={chatOpen} setChatOpen={setChatOpen} 
          chatMessage={chatMessage} setChatMessage={setChatMessage} 
          chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} 
        />
        <AnimatePresence>
          {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
        </AnimatePresence>
      </div>
    );
  }

  if (view === 'faq-full') {
    // Group FAQ by category for the creative layout
    const groupedFaqs = FULL_FAQ.reduce((acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = [];
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);

    return (
      <div className="min-h-screen bg-slate-50">
        <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
        <main className="pt-32 pb-24 animate-[fadeIn_0.5s_ease-out]">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <SectionBadge text="Comprehensive Guide" amberOutline />
                <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] mb-8 leading-tight uppercase tracking-tighter">Your Knowledge Hub.</h1>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Everything you need to know about starting your international education journey from Sri Lanka.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-16">
                {Object.entries(groupedFaqs).map(([category, items]) => (
                  <section key={category} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-slate-200"></div>
                      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">{category}</h2>
                      <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    <FAQAccordion items={items} />
                  </section>
                ))}
              </div>

              <div className="mt-24 p-12 bg-[#1A1F2C] rounded-[4rem] text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full"></div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tight relative z-10">Still have questions?</h3>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 font-medium">Our consultants are ready to provide personalized guidance for your specific situation. Book a free session today.</p>
                <button 
                  onClick={() => scrollToId('contact')}
                  className="bg-amber-500 text-[#1A1F2C] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all relative z-10"
                >
                  Book Free Assessment
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
        <ChatWidget 
          chatOpen={chatOpen} setChatOpen={setChatOpen} 
          chatMessage={chatMessage} setChatMessage={setChatMessage} 
          chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} 
        />
        <AnimatePresence>
          {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
        </AnimatePresence>
      </div>
    );
  }

  if (view === 'destination-uk') {
    return (
      <div className="min-h-screen">
        <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
        <UKDestinationPage onContact={() => scrollToId('contact')} />
        <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
        <ChatWidget 
          chatOpen={chatOpen} setChatOpen={setChatOpen} 
          chatMessage={chatMessage} setChatMessage={setChatMessage} 
          chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} 
        />
        <AnimatePresence>
          {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]" id="top">
      <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />

      <iframe name="google_form_target" id="google_form_target" style={{ display: 'none' }} />

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
              Empowering students to achieve global academic success with tailored strategies and dedicated support from our Colombo headquarters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={() => scrollToId('destinations')} className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-12 py-5 rounded-full font-black shadow-2xl shadow-amber-200/50 hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest">Explore Destinations</button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] text-white px-12 py-5 rounded-full font-black shadow-xl hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp text-xl"></i> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[500px] md:h-[650px] w-full flex items-center justify-center">
             <div className="relative w-full h-full max-w-[600px]">
               <div className="hero-bubble absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] md:w-[260px] md:h-[260px] bg-white z-20 flex flex-col items-center justify-center shadow-2xl animate-float-center hero-bubble-center p-8 text-slate-900">
                  <StudentsFirstIcon className="mb-2 md:mb-4 w-12 h-12 md:w-20 md:h-20" />
                  <span className="text-[12px] md:text-xl font-black uppercase tracking-widest leading-none">Students</span>
                  <span className="text-[12px] md:text-xl font-black uppercase tracking-widest leading-none">First</span>
               </div>
               
               <div className="hero-bubble absolute top-[15%] left-[5%] lg:top-[8%] lg:left-[2%] w-[100px] h-[100px] md:w-[170px] md:h-[170px] bg-[#FFB800] z-30 animate-float-tl p-4 text-[#1A1F2C]">
                  <GraduationCap size={40} className="mb-2 hidden md:block" />
                  <GraduationCap size={20} className="mb-1 md:hidden" />
                  <span className="text-xl md:text-4xl font-black leading-none">450+</span>
                  <span className="text-[7px] md:text-[11px] font-black uppercase tracking-widest opacity-80 text-black">UNIVERSITIES</span>
               </div>
               
               <div className="hero-bubble absolute top-[10%] right-[5%] lg:top-[5%] lg:right-[2%] w-[110px] h-[110px] md:w-[180px] md:h-[180px] bg-white z-10 animate-float-tr p-4 border border-slate-100">
                  <Globe size={40} className="mb-2 hidden md:block text-[#FFB800]" />
                  <Globe size={20} className="mb-1 md:hidden text-[#FFB800]" />
                  <span className="text-xl md:text-4xl font-black text-[#1A1F2C] leading-none">10+</span>
                  <span className="text-[7px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">COUNTRIES</span>
               </div>
               
               <div className="hero-bubble absolute bottom-[15%] left-[2%] lg:bottom-[15%] lg:left-[-10%] w-[110px] h-[110px] md:w-[180px] md:h-[180px] bg-[#4F46E5] z-30 animate-float-bl p-4 text-white">
                  <Layers size={40} className="mb-2 hidden md:block" />
                  <Layers size={20} className="mb-1 md:hidden" />
                  <span className="text-xl md:text-4xl font-black leading-none">10k+</span>
                  <span className="text-[7px] md:text-[11px] font-black uppercase tracking-widest opacity-80">PROGRAMS</span>
               </div>
               
               <div className="hero-bubble absolute bottom-[5%] right-[2%] lg:bottom-[15%] lg:right-[-10%] w-[110px] h-[110px] md:w-[200px] md:h-[200px] bg-black z-20 animate-float-br p-6 text-white text-center">
                  <CheckCircle2 size={40} className="mb-2 hidden md:block text-white" />
                  <CheckCircle2 size={20} className="mb-1 md:hidden text-white" />
                  <div className="flex flex-col items-center">
                    <span className="text-[6px] md:text-[9px] font-black uppercase tracking-widest leading-tight">END TO END</span>
                    <span className="text-[6px] md:text-[9px] font-black uppercase tracking-widest leading-tight">APPLICATION</span>
                    <span className="text-[6px] md:text-[9px] font-black uppercase tracking-widest leading-tight">MANAGEMENT</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

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
            <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium">Gradway (Pvt) Limited is a premier education consultancy based in Colombo. We bridge the gap between ambitious Sri Lankan students and world-class international institutions through transparent and expert partnerships.</p>
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

      <section id="services" className="py-24 bg-slate-50 scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionBadge text="Our Expertise" />
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C] uppercase tracking-tighter">Our Services</h2>
            <p className="mt-4 text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              We take you from confusion to clarity, with our comprehensive support tailored to your academic goals, ensuring smooth transition from application to arrival at your dream destination.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => {
              const isLast = i === SERVICES.length - 1;
              return (
                <div 
                  key={i} 
                  onClick={() => navigateToServiceDetail(s.id)} 
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
                  <h3 className="text-lg font-black text-[#1A1F2C] mb-4 leading-tight relative z-10 uppercase whitespace-nowrap lg:whitespace-normal">{s.title}</h3>
                  <p className={cn(
                    "text-slate-500 text-xs leading-relaxed mb-6 flex-1 font-medium relative z-10",
                    isLast ? "max-w-none" : ""
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

      <section id="destinations" className="py-24 bg-white scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="mb-10 text-center lg:text-left">
             <SectionBadge text="World Map" />
             <h2 className="text-3xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter uppercase">Our Global Destinations</h2>
          </div>
          {['Europe', 'Americas & Pacific', 'Asia & Other'].map((region) => (
            <div key={region} className="mb-12">
              <div className="flex justify-between items-center mb-6 border-l-4 border-amber-500 pl-6">
                <h3 className="text-2xl font-black text-[#1A1F2C] uppercase tracking-widest text-sm">{region}</h3>
                <div className="flex gap-2">
                  <button onClick={() => scrollContainer(region, 'left')} className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                  <button onClick={() => scrollContainer(region, 'right')} className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                </div>
              </div>
              <div ref={(el) => { scrollRefs.current[region] = el; }} className="flex overflow-x-auto scrollbar-hide space-x-6 pt-24 pb-20 px-4 snap-x snap-mandatory">
                {DESTINATIONS.filter(d => d.region === region).map((dest) => (
                  <div key={dest.id} className="min-w-[75vw] md:min-w-[340px] snap-center" onClick={() => dest.id === 'uk' ? setView('destination-uk') : scrollToId('contact')}>
                    <div className="relative h-full rounded-[3.5rem] border-[1px] border-transparent p-4 overflow-visible">
                      <GlowingEffect
                        spread={60}
                        glow={true}
                        disabled={false}
                        proximity={300} 
                        inactiveZone={0.01}
                        borderWidth={4}
                      />
                      <div className="relative flex h-[380px] flex-col justify-between overflow-hidden rounded-[3.25rem] border bg-white p-10 shadow-sm transition-all duration-300 hover:shadow-2xl group cursor-pointer border-slate-100">
                        <div className="flex justify-between items-start mb-8 relative z-10">
                           <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform border border-slate-50">
                              <i className={`${dest.icon} text-4xl`} style={{ color: dest.color }}></i>
                           </div>
                           <img src={dest.image} alt={dest.name} className="w-16 h-10 object-cover rounded shadow-md border-[0.5px] border-black/10" />
                        </div>
                        <h3 className="text-3xl font-black text-[#1A1F2C] mb-4 relative z-10 uppercase tracking-tighter">{dest.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium relative z-10">{dest.description}</p>
                        <button className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 group-hover:translate-x-2 transition-transform relative z-10">Learn More <i className="fa-solid fa-arrow-right"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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

      <section id="contact" className="py-24 bg-slate-50 scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 text-center flex flex-col items-center">
          <SectionBadge text="Contact Hub" amberOutline />
          <h2 className="text-4xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter mb-12 leading-tight uppercase max-w-4xl">Start Your Journey.</h2>
          
          <div className="w-full max-w-3xl bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl text-left border border-slate-100 mb-16 relative overflow-visible">
            {!formSubmitted ? (
              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm border-transparent focus:bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+9477 500 9929" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm border-transparent focus:bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="info@gradwayedu.com" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm border-transparent focus:bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Program Level</label>
                    <div className="relative">
                      <select 
                        required
                        value={selectedProgramLevel}
                        onChange={(e) => setSelectedProgramLevel(e.target.value)}
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none appearance-none font-medium text-sm border-transparent focus:bg-white focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select program level</option>
                        {PROGRAM_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 relative" ref={countryDropdownRef}>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Countries (Select up to 4)</label>
                    <button 
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none border-transparent font-medium text-sm flex items-center justify-between hover:bg-slate-100 transition-all"
                    >
                      <span className={selectedCountries.length === 0 ? "text-slate-400" : "text-slate-800"}>
                        {selectedCountries.length > 0 ? selectedCountries.join(", ") : "Select destinations"}
                      </span>
                      <ChevronDown size={16} className={cn("transition-transform duration-300", isCountryDropdownOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {isCountryDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 max-h-[300px] overflow-y-auto custom-scrollbar"
                        >
                          <div className="grid grid-cols-1 gap-1">
                            {DESTINATIONS.map(d => (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => toggleCountrySelection(d.name)}
                                className={cn(
                                  "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group",
                                  selectedCountries.includes(d.name) ? "bg-amber-50 text-amber-600" : "hover:bg-slate-50 text-slate-600"
                                )}
                              >
                                <div className={cn(
                                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                  selectedCountries.includes(d.name) ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 group-hover:border-amber-500"
                                )}>
                                  {selectedCountries.includes(d.name) && <Check size={12} strokeWidth={3} />}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider">{d.name}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Field of study</label>
                    <div className="relative">
                      <select 
                        required
                        value={selectedFieldOfStudy}
                        onChange={(e) => setSelectedFieldOfStudy(e.target.value)}
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none appearance-none font-medium text-sm border-transparent focus:bg-white focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select your field</option>
                        {FIELDS_OF_STUDY.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Intake (Month / Year)</label>
                  <input required value={intake} onChange={(e) => setIntake(e.target.value)} placeholder="Eg - September 2026" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm border-transparent focus:bg-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                  <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Tell us about your Goals, Budget or if you have any questions" className="w-full px-8 py-5 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-sm resize-none border-transparent focus:bg-white"></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-submit w-full bg-[#1A1F2C] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-4xl mb-6 shadow-xl"><i className="fa-solid fa-check"></i></div>
                <h3 className="text-3xl font-black mb-4">Inquiry Received!</h3>
                <p className="text-slate-500 font-medium">Thank you for reaching out. Your details have been recorded, and a Gradway consultant will call you shortly.</p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                  }}
                  className="mt-8 text-amber-600 font-black uppercase text-[10px] tracking-widest hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </div>

          <form 
            ref={hiddenFormRef} 
            action={GOOGLE_FORM_URL} 
            method="POST" 
            target="google_form_target" 
            style={{ display: 'none' }}
          >
              <input type="hidden" name={FORM_ENTRIES.name} value={name} />
              <input type="hidden" name={FORM_ENTRIES.phone} value={phone} />
              <input type="hidden" name={FORM_ENTRIES.email} value={email} />
              <input type="hidden" name={FORM_ENTRIES.programLevel} value={selectedProgramLevel} />
              <input type="hidden" name={FORM_ENTRIES.fieldOfStudy} value={selectedFieldOfStudy} />
              <input type="hidden" name={FORM_ENTRIES.intake} value={intake} />
              <input type="hidden" name={FORM_ENTRIES.message} value={message || "-"} />
              {selectedCountries.length > 0 ? selectedCountries.map((c, idx) => (
                  <input key={idx} type="hidden" name={FORM_ENTRIES.countries} value={c.toUpperCase()} />
              )) : (
                  <input type="hidden" name={FORM_ENTRIES.countries} value="-" />
              )}
          </form>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-5xl px-4 pb-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-[#25D366] transition-all w-full md:w-auto md:flex-1 min-w-[220px]">
              <div className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform"><MessageSquare /></div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">WhatsApp</span>
                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight">+94 77 500 9929</span>
              </div>
            </a>
            <a href={`tel:${WA_PHONE.replace(/\s/g, '')}`} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-amber-500 transition-all w-full md:w-auto md:flex-1 min-w-[220px]">
              <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform"><Phone /></div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Call Us</span>
                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight">+94 77 500 9929</span>
              </div>
            </a>
            <a href="mailto:info@gradwayedu.com" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group hover:border-indigo-600 transition-all w-full md:w-auto md:flex-1 min-w-[220px]">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform"><Mail /></div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Email</span>
                <span className="block text-xs font-black text-[#1A1F2C] tracking-tight truncate leading-tight">info@gradwayedu.com</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-white scroll-mt-[76px]">
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <SectionBadge text="Knowledge Base" amberOutline />
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium mb-10">Clear, student-focused answers for your migration concerns.</p>
            <button onClick={() => setView('faq-full')} className="bg-[#1A1F2C] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">View Full FAQ</button>
          </div>
          <div className="lg:w-2/3">
            <FAQAccordion items={MAIN_FAQ} />
          </div>
        </div>
      </section>

      <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
      <ChatWidget 
        chatOpen={chatOpen} setChatOpen={setChatOpen} 
        chatMessage={chatMessage} setChatMessage={setChatMessage} 
        chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} 
      />
      <AnimatePresence>
        {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
