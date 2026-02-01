import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap,
  Globe,
  Award,
  Users,
  Trophy,
  Palette,
  Code,
  Layers,
  Check,
  Zap,
  Heart,
  Globe2,
  TrendingUp,
  Clock,
  Users2,
  BadgeCheck,
  UserCheck,
  Headset,
  Handshake,
  BarChart3,
  ShieldCheck,
  Building2,
  Briefcase,
  FileText,
  ShieldAlert,
  ArrowUp,
  RefreshCcw,
  Telescope,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Compass,
  Train,
  Tag,
  Target,
  BookOpen,
  Network
} from 'lucide-react';
import { DESTINATIONS, SERVICES, SUCCESS_STORIES, MAIN_FAQ, FULL_FAQ, UK_UNIVERSITIES } from './constants';
import { getGeminiResponse } from './services/geminiService';
import { ScrollNavigation } from './components/ui/scroll-navigation-menu';
import { OfferCarousel } from './components/ui/offer-carousel';
import { BentoExperience } from './components/ui/bento-grid-experience';
import { GlowingEffect } from './components/ui/glowing-effect';
import { cn } from './lib/utils';

const LOGO_URL = "https://i.ibb.co/3ykG4SjV/logo.png";
const TIKTOK_URL = "https://www.tiktok.com/@gradway_education?_r=1&_t=ZS-92huBpIVt6y";
const WA_PHONE = "94775009929";
const PHONE_DISPLAY = "+94 77 500 9929";
const WA_PREFILLED_MSG = encodeURIComponent("Hi, I’m interested in studying abroad.\n\nName:\nPreferred Study Country:\nIntended Program / Level:\n\nThank you.");
const WA_LINK = `https://wa.me/${WA_PHONE}?text=${WA_PREFILLED_MSG}`;

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

const GOOGLE_PARTNER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfe7ey8DPdmtWbedIFKxJYBxqTncoLSbrp6vYgYf4zO2sJ3Iw/formResponse";
const PARTNER_FORM_ENTRIES = {
    agencyName: "entry.68479215",
    website: "entry.1681270789",
    contactName: "entry.1216033871",
    jobTitle: "entry.52047501",
    email: "entry.897416871",
    phone: "entry.390589167",
    address: "entry.601026757",
    regions: "entry.2051213170",
    message: "entry.1323148708"
};

const NEWSLETTER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfqVHdpFMQYrR5mdHDuMIkcryqN-V42DIA7W72bJ5AJihGbiw/formResponse";
const NEWSLETTER_ENTRY_ID = "entry.1657033578";

const FIELDS_OF_STUDY_LIST = [
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

const PROGRAM_LEVELS_LIST = [
    "Foundation",
    "Undergraduate",
    "Pre Master",
    "Postgraduate"
];

const SectionBadge = ({ text, lightVariant, amberOutline }: { text: string; lightVariant?: boolean; amberOutline?: boolean }) => (
    <div className={cn(
        "inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border",
        lightVariant ? "bg-white/10 border-white/10" : 
        amberOutline ? "bg-amber-100 border-amber-200" : "bg-slate-100 border-slate-200"
    )}>
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span className={cn(
            "text-[10px] font-black uppercase tracking-widest",
            lightVariant ? "text-white" : amberOutline ? "text-amber-600" : "text-[#1A1F2C]"
        )}>{text}</span>
    </div>
);

const CustomDropdown = ({ label, value, options, onChange, placeholder, className }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("space-y-1 relative", className)} ref={containerRef}>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-all focus:border-amber-500 focus:bg-white"
            >
                <span className={!value ? "text-slate-400" : "text-slate-800"}>{value || placeholder || "Select option"}</span>
                <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-2 max-h-[200px] overflow-y-auto custom-scrollbar"
                    >
                        {options.map((opt: string) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group hover:bg-amber-50",
                                    value === opt ? "bg-amber-50 text-amber-600" : "text-slate-600"
                                )}
                            >
                                <span className="text-xs font-bold uppercase tracking-wider">{opt}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQAccordion = ({ items }: { items: any[] }) => {
    const [openId, setOpenId] = useState<number | null>(null);
    return (
        <div className="space-y-4">
            {items.map((faq) => (
                <div key={faq.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm transition-all hover:shadow-md">
                    <button 
                        onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                    >
                        <span className="font-black text-slate-800 text-sm md:text-base leading-tight pr-4 tracking-tight">{faq.question}</span>
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                            openId === faq.id ? "bg-amber-500 text-white rotate-45" : "bg-slate-100 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600"
                        )}>
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

const NumberedSection = ({ num, title, color = 'amber' }: any) => (
    <h4 className="font-black text-[#1A1F2C] text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] shrink-0 transition-colors !text-white font-black",
            color === 'amber' ? "bg-amber-500" : color === 'blue' ? "bg-blue-600" : color === 'emerald' ? "bg-emerald-600" : "bg-indigo-500"
        )}>{num}</span>
        {title}
    </h4>
);

const ServiceCardRenderer = ({ service, scrollToId }: any) => {
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
                                {["Scholarship Eligibility Checks", "Post-Study Work Opportunity Audits", "Campus Environment Assessments"].map(point => (
                                    <li key={point} className="flex items-center gap-3 text-[11px] font-bold text-slate-700">
                                        <Check size={14} className="text-amber-500" /> {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-[#1A1F2C] p-8 rounded-[3rem] text-white flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[100px] rounded-full" />
                            <h5 className="text-2xl font-black uppercase tracking-tight mb-4">Precision Matching</h5>
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
                                {[
                                    { step: "Stage 01", title: "Document Audit" },
                                    { step: "Stage 02", title: "SOP Making/Editing" },
                                    { step: "Stage 03", title: "Verification" },
                                    { step: "Stage 04", title: "Submission and Tracking" }
                                ].map(s => (
                                    <div key={s.step} className="space-y-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.step}</span>
                                        <p className="text-sm font-bold text-slate-800 tracking-tight">{s.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-emerald-500 text-white p-10 rounded-[3rem] shadow-lg">
                            <Zap className="mb-6" />
                            <h4 className="text-3xl font-black uppercase tracking-tight mb-4 leading-tight">Live Simulation</h4>
                            <p className="text-emerald-50 text-sm font-medium leading-relaxed">We conduct mock interviews for both university admission boards and visa officers, giving you the edge in communication and poise.</p>
                        </div>
                        <div className="space-y-6 px-4">
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><Clock size={16} /></div>
                                <div><p className="text-xs font-black uppercase text-[#1A1F2C]">Intensive Drill Sessions</p><p className="text-[11px] text-slate-500">Master frequently asked visa questions.</p></div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><MessageSquare size={16} /></div>
                                <div><p className="text-xs font-black uppercase text-[#1A1F2C]">Expert Feedback</p><p className="text-[11px] text-slate-500">Direct critique on the answers and tips to improve.</p></div>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="bg-[#1A1F2C] text-white p-10 md:p-14 rounded-[4rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full" />
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3"><ShieldCheck className="text-rose-500" /><h4 className="text-2xl font-black uppercase tracking-tight">Migration Compliance</h4></div>
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
                            {['Flight Booking', 'Sim Cards', 'Bank Opening', 'Accommodation'].map(item => (
                                <div key={item} className="px-2 md:px-4 py-4 bg-white border border-slate-100 rounded-2xl text-[8px] sm:text-[9px] font-black uppercase tracking-tight text-slate-400 text-center shadow-sm flex items-center justify-center overflow-hidden whitespace-nowrap">{item}</div>
                            ))}
                        </div>
                    </div>
                );
            default: return null;
        }
    };
    return (
        <div id={`service-${service.id}`} className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 items-start hover:shadow-2xl transition-all overflow-hidden group scroll-mt-24 relative">
            <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
            <div className={cn("relative z-10 w-24 h-24", service.iconBg, service.iconColor, "rounded-[2.5rem] flex items-center justify-center text-5xl shrink-0 shadow-lg border border-white group-hover:scale-110 transition-transform")}>
                <i className={`fa-solid ${service.icon}`}></i>
            </div>
            <div className="relative z-10 flex-1 space-y-10">
                <div><h2 className="text-4xl font-black text-[#1A1F2C] mb-4 uppercase tracking-tight">{service.title}</h2><div className="h-1.5 w-24 bg-amber-500 rounded-full mb-8" /></div>
                {renderContent()}
                <button onClick={() => scrollToId('contact')} className="bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-amber-500 active:scale-95 transition-all inline-flex items-center gap-3">Book a Consultation <i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    );
};

const LegalModal = ({ type, onClose }: { type: string, onClose: () => void }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);
    if (type === 'none') return null;
    const LegalFooter = ({ colorClass = 'text-amber-500', sectionNum = "12", sectionColor = "blue" }: any) => (
        <section className="pt-10 border-t border-slate-100 text-center space-y-8 pb-16">
            <div>
                <NumberedSection num={sectionNum} title="Contact Information" color={sectionColor} />
                <p className={cn("font-black uppercase tracking-tight text-2xl mb-1", sectionColor === 'amber' ? "text-amber-500" : sectionColor === 'emerald' ? "text-emerald-600" : "text-[#1A1F2C]")}>Gradway (Pvt) Limited</p>
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
                <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tight mb-2">Privacy Policy</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Gradway (Private) Limited</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services — Sri Lanka</p>
                <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Last Updated: 01/01/2026</p>
            </div>
            <p className="text-base font-semibold text-[#1A1F2C]">Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”) is committed to protecting the privacy, confidentiality, and security of personal data entrusted to us.</p>
            <p>This Privacy Policy explains how personal data is collected, used, disclosed, stored, and protected in accordance with the <strong>Personal Data Protection Act No. 9 of 2022 of Sri Lanka</strong>, and in line with internationally accepted data protection principles. By accessing our website, submitting enquiries, or engaging our services, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.</p>
            <section>
                <NumberedSection num="1" title="Information Collection" color="amber" />
                <p className="mb-4">We collect personal data only where it is lawful, necessary, and proportionate for the provision of education consultancy services.</p>
                <p className="mb-6 font-bold text-[#1A1F2C]">The categories of personal data we may collect include:</p>
                <div className="space-y-8 ml-4">
                    <div className="py-1">
                        <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Personal and Contact Information</h5>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Full name, date of birth, nationality, residential address, email address, phone number, passport and identification details (where required).</li>
                        </ul>
                    </div>
                    <div className="py-1">
                        <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Academic and Professional Information</h5>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Academic history, qualifications, transcripts, certificates, English language test results (IELTS, TOEFL, etc.), employment history, curriculum vitae, portfolios, and references (where applicable).</li>
                        </ul>
                    </div>
                    <div className="py-1">
                        <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Financial and Compliance Information</h5>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Proof of financial capacity, sponsorship details, payment records, visa and immigration documentation, police clearance certificates, and health-related information strictly where required for applications.</li>
                        </ul>
                    </div>
                    <div className="py-1">
                        <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-amber-500/30">Communication and Technical Information</h5>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Records of consultations and correspondence, IP address, browser and device details, website usage data, cookies, and analytics information used to ensure functionality, security, and service improvement.</li>
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
                    <li>Course, institution, and destination recommendations</li>
                    <li>Preparation and submission of applications</li>
                    <li>Visa and immigration guidance and documentation support</li>
                    <li>Communication of updates, requirements, and outcomes</li>
                    <li>Internal record-keeping for compliance, quality assurance, and dispute resolution</li>
                </ul>
                <div className="space-y-6">
                    <NumberedSection num="3.1" title="Use of Information for Marketing and Success Announcements" color="amber" />
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
                        <p className="font-bold mb-1">With explicit prior consent from the student, we may additionally share:</p>
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
                <p className="mb-4">As an international education consultancy, personal data may be transferred outside Sri Lanka to institutions or authorities in destination countries. Such transfers occur only where required for admissions or visa processing and are carried out with appropriate safeguards to ensure data protection.</p>
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
                <p>We implement appropriate technical and administrative measures to protect personal data, including controlled document handling, and access limited to authorised personnel only. While reasonable measures are taken, no system can be guaranteed to be entirely secure.</p>
            </section>
            <section>
                <NumberedSection num="8" title="Cookies and Website Usage" color="amber" />
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
                <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tight mb-2">Terms of Service</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Gradway (Private) Limited</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services — Sri Lanka</p>
                <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Effective Date: 01/01/2026</p>
            </div>
            <p className="text-base font-semibold text-[#1A1F2C]">These Terms of Service (“Terms”) govern the access to and use of services provided by Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”). By accessing our website, engaging in consultations, submitting information, or using any of our services, you agree to be bound by these Terms in their entirety.</p>
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
                <p>Gradway does not have the authority to influence, guarantee, or override such decisions.</p>
            </section>
            <section>
                <NumberedSection num="2" title="Client Responsibilities and Accuracy of Information" color="blue" />
                <p className="mb-4">Clients are solely responsible for ensuring that all information and documentation provided to Gradway is:</p>
                <ul className="list-disc ml-8 space-y-2 mb-6">
                    <li>Accurate, complete, and truthful</li>
                    <li>Authentic and verifiable</li>
                    <li>Submitted within the timelines communicated</li>
                </ul>
                <p>This includes, but is not limited to, academic records, financial documents, identity documents, and visa-related information.</p>
                <p>Submission of false, misleading, altered, or fraudulent information may result in immediate termination of services without refund, and Gradway reserves the right to withdraw representation without further obligation. Gradway shall not be liable for outcomes arising from inaccurate, incomplete, or delayed information provided by the client.</p>
            </section>
            <section>
                <NumberedSection num="3" title="No Guarantee of Outcomes" color="blue" />
                <p>While Gradway provides professional guidance and maintains quality standards, no guarantees are made or implied regarding:</p>
                <ul className="list-disc ml-8 space-y-2 mb-6">
                    <li>Admission Outcome</li>
                    <li>Visa approvals</li>
                    <li>Processing timelines</li>
                    <li>Scholarships or funding</li>
                    <li>Employment or post-study outcomes</li>
                </ul>
                <p>Outcomes are subject to external founder beyond Gradway’s control, including institutional criteria, immigration regulations, and individual applicant profiles.</p>
            </section>
            <section>
                <NumberedSection num="4" title="Fees and Third-Party Costs" color="blue" />
                <ul className="list-disc ml-8 space-y-2 mb-6">
                    <li>Consultancy fees, where applicable, will be communicated separately</li>
                    <li>Fees paid to Gradway are generally non-refundable unless explicitly stated in writing</li>
                    <li>Third-party costs (including application fees, visa fees, medical tests, courier charges, and institutional deposits) are payable by the client and are not controlled by Gradway</li>
                </ul>
                <p>Gradway is not responsible for changes in third-party fees, refund policies, or payment timelines.</p>
            </section>
            <section>
                <NumberedSection num="5" title="Limitation of Liability" color="blue" />
                <p>To the fullest extent permitted by law:</p>
                <ul className="list-disc ml-8 space-y-2 mb-6">
                    <li>Gradway shall not be liable for indirect, incidental, consequential, or economic losses</li>
                    <li>Gradway’s liability, if any, shall be limited to the amount paid to Gradway for consultancy services</li>
                    <li>Gradway shall not be responsible for losses arising from:</li>
                </ul>
                <ul className="list-none ml-12 space-y-2 mb-6 italic text-slate-500">
                    <li>o Visa refusals or delays</li>
                    <li>o Admission denials</li>
                    <li>o Policy or regulatory changes</li>
                    <li>o Decisions or actions of universities, embassies, or authorities</li>
                </ul>
            </section>
            <section>
                <NumberedSection num="6" title="Confidentiality and Data Use" color="blue" />
                <p>Gradway handles personal information in accordance with its Privacy Policy. Client data is used strictly for service delivery, compliance, communication, and lawful operational purposes.</p>
                <p>Clients consent to the sharing of necessary information with relevant institutions and authorities as required to provide services.</p>
            </section>
            <section>
                <NumberedSection num="7" title="Intellectual Property" color="blue" />
                <p>All original content created by Gradway, including website text, service descriptions, layouts, branding elements, graphics, process explanations, and proprietary materials, is the intellectual property of Gradway (Private) Limited unless otherwise stated.</p>
                <p>Unauthorized reproduction, distribution, or misuse of Gradway’s original content is prohibited.</p>
                <div className="mt-8">
                    <NumberedSection num="7.1" title="Logo Usage and Fair Use Disclaimer" color="blue" />
                    <p className="mt-4">University names, institutional names, logos, trademarks, crests, and brand identifiers displayed on this website are the property of their respective owners.</p>
                    <p>Such logos and identifiers are used by Gradway solely for informational and reference purposes, including identifying study destinations, institutions, and publicly available academic pathways.</p>
                    <p>Use of such logos does not imply:</p>
                    <ul className="list-disc ml-8 space-y-2 mb-6">
                        <li>Any official partnership, sponsorship, or endorsement</li>
                        <li>Exclusive representation or authority to act on behalf of the institution</li>
                    </ul>
                    <p>Gradway does not alter or misrepresent third-party logos. All usage is intended to fall within accepted principles of fair use and nominative reference. Rights holders may contact Gradway to request review or removal where appropriate.</p>
                </div>
            </section>
            <section>
                <NumberedSection num="8" title="Suspension or Termination of Services" color="blue" />
                <p>Gradway reserves the right to suspend or terminate services without liability where:</p>
                <ul className="list-disc ml-8 space-y-2 mb-6">
                    <li>False or misleading information is provided</li>
                    <li>Required documentation is withheld</li>
                    <li>These Terms or ethical standards are violated</li>
                    <li>Client conduct is abusive, unlawful, or obstructive</li>
                </ul>
                <p>Termination does not relieve the client of any outstanding obligations.</p>
            </section>
            <section>
                <NumberedSection num="9" title="Amendments to Terms" color="blue" />
                <p>Gradway reserves the right to modify these Terms at any time. Updated Terms will be published on our website and take effect immediately upon publication. Continued use of our services constitutes acceptance of the revised Terms.</p>
            </section>
            <section>
                <NumberedSection num="10" title="Governing Law and Jurisdiction" color="blue" />
                <p>These Terms shall be governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Colombo, Sri Lanka.</p>
            </section>
            <section>
                <NumberedSection num="11" title="Acceptance of Terms" color="blue" />
                <p>Engaging with Gradway staff, booking consultations, submitting documents, proceeding with profile reviews or receiving any services from us constitutes full and unconditional acceptance of these Terms of Service.</p>
            </section>
            <LegalFooter colorClass="text-blue-600" sectionNum="12" sectionColor="blue" />
        </div>
    );

    const refundBody = (
        <div className="space-y-12 text-slate-600 text-[13px] md:text-sm leading-relaxed font-medium">
            <div className="text-center border-b border-slate-100 pb-10">
                <h4 className="text-4xl font-black text-[#1A1F2C] uppercase tracking-tight mb-2">Refund & Cancellation Policy</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Gradway (Private) Limited</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Education Consultancy Services — Sri Lanka</p>
                <p className="text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 inline-block px-4 py-1.5 rounded-full">Effective Date: 01/01/2026</p>
            </div>
            <p className="text-base font-semibold text-[#1A1F2C]">This Refund & Cancellation Policy outlines the conditions under which refunds, cancellations, and service withdrawals are handled by Gradway (Private) Limited (“Gradway”, “we”, “our”, or “us”). By engaging our services, you acknowledge and agree to the terms set out below.</p>
            <section>
                <NumberedSection num="1" title="Nature of Consultancy Services" color="emerald" />
                <p className="mb-4">Gradway provides professional education consultancy and advisory services. These services involve time, expertise, planning, document review, communication with institutions, and strategic guidance.</p>
                <div className="space-y-4">
                    <p className="font-bold text-[#1A1F2C] uppercase text-[10px] tracking-widest border-b border-slate-100 pb-2">As such:</p>
                    <ul className="list-disc ml-8 space-y-2">
                        <li>Consultancy services are <strong>intangible and time-based</strong></li>
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
                        <p>Unless explicitly agreed in writing, <strong>fees paid to Gradway are non-refundable</strong> once services have commenced. This includes, but is not limited to:</p>
                        <ul className="list-disc ml-8 space-y-2 mt-4">
                            <li>Profile evaluations and counselling sessions</li>
                            <li>Course and university mapping</li>
                            <li>Application preparation or submission</li>
                            <li>Visa guidance and documentation support</li>
                            <li>Communication with institutions or authorities</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-emerald-500/30">2.2 Non-Refundable Circumstances</h5>
                        <p className="mb-4">Refunds will <strong>not</strong> be issued in the following situations:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc ml-8">
                            <li>Change of mind by the client</li>
                            <li>Visa refusal or application rejection</li>
                            <li>Admission denial by an institution</li>
                            <li>Delays caused by third parties</li>
                            <li>Changes in immigration or institutional policies</li>
                            <li>Client’s failure to provide accurate, complete, or timely information</li>
                            <li>Client withdrawal after services have commenced</li>
                            <li>Termination due to submission of false or misleading documents</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-[#1A1F2C] text-[11px] uppercase tracking-widest mb-3 underline underline-offset-4 decoration-emerald-500/30">2.3 Exceptional Refunds</h5>
                        <p>In limited and exceptional circumstances, Gradway may consider a refund <strong>at its sole discretion</strong>, provided that:</p>
                        <ul className="list-disc ml-8 space-y-2 mt-4">
                            <li>The request is submitted in writing</li>
                            <li>Services have not commenced</li>
                            <li>No third-party costs have been incurred</li>
                            <li>Approval is provided explicitly by Gradway management</li>
                        </ul>
                        <p className="mt-4 italic">Any approved refund will be processed within a reasonable timeframe.</p>
                    </div>
                </div>
            </section>
            <section>
                <NumberedSection num="3" title="Third-Party Fees and Payments" color="emerald" />
                <p className="mb-4">Fees paid to third parties are <strong>non-refundable</strong> and are governed by the policies of those entities. This includes:</p>
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
                <p>Clients may cancel services by providing written notice to Gradway. However, cancellation does not automatically entitle the client to a refund, and outstanding balances, if any, remain payable.</p>
            </section>
            <section>
                <NumberedSection num="5" title="Cancellation or Termination by Gradway" color="emerald" />
                <p>Gradway reserves the right to suspend or terminate services without refund where:</p>
                <ul className="list-disc ml-8 space-y-2 mt-4">
                    <li>False, fraudulent, or misleading information is provided</li>
                    <li>Required documentation is withheld or delayed</li>
                    <li>Client conduct is abusive, unethical, or unlawful</li>
                    <li>Terms of Service or policies are breached</li>
                </ul>
                <p className="mt-4">Such termination does not waive any outstanding payment obligations.</p>
            </section>
            <section>
                <NumberedSection num="6" title="No Guarantee Clause" color="emerald" />
                <p>Refunds are <strong>not linked</strong> to outcomes. Gradway does <strong>not</strong> guarantee:</p>
                <ul className="list-disc ml-8 space-y-2 mt-4">
                    <li>Admission outcomes</li>
                    <li>Visa approvals</li>
                    <li>Processing timelines</li>
                    <li>Scholarships or funding</li>
                </ul>
                <p className="mt-4">Unfavourable outcomes do not constitute grounds for refunds.</p>
            </section>
            <section>
                <NumberedSection num="7" title="Refund Processing Method" color="emerald" />
                <p>Where a refund is approved:</p>
                <ul className="list-disc ml-8 space-y-2 mt-4">
                    <li>Refunds will be issued using the original payment method where possible</li>
                    <li>Processing timelines may vary depending on banks or payment providers</li>
                    <li>Administrative or transaction fees may be deducted</li>
                </ul>
            </section>
            <section>
                <NumberedSection num="8" title="Policy Amendments" color="emerald" />
                <p>Gradway reserves the right to update or modify this Refund & Cancellation Policy at any time. Updated versions will be published on our website and take effect immediately. Continued use of our services constitutes acceptance of the updated policy.</p>
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
                        <h3 className="text-2xl font-black text-[#1A1F2C] uppercase tracking-tight">{content.title}</h3>
                        <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 md:p-14 custom-scrollbar mb-4">
                    {content.body}
                    <div className="h-12 w-full shrink-0" />
                </div>
            </motion.div>
        </motion.div>
    );
};

const Footer = ({ onModal, onNavigate, onSetView }: any) => {
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
            <form 
                ref={newsletterFormRef}
                action={NEWSLETTER_FORM_URL} 
                method="POST" 
                target="newsletter_target" 
                style={{ display: 'none' }}
            >
                <input type="hidden" name={NEWSLETTER_ENTRY_ID} value={newsletterEmail} />
            </form>

            <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
                            <img src={LOGO_URL} alt="Gradway Logo" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight leading-none uppercase">Gradway (Pvt) Ltd.</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
                        Empowering the next generation of Sri Lankan leaders through world-class global education pathways and ethical migration consultancy.
                    </p>
                    <div className="space-y-2 pt-2">
                        <a href={`tel:${WA_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-amber-500 hover:scale-105 transition-transform origin-left group">
                            <Phone size={16} />
                            <span className="text-sm font-black tracking-widest">{PHONE_DISPLAY}</span>
                        </a>
                    </div>
                    <div className="flex flex-row items-center gap-5 text-2xl flex-nowrap overflow-visible">
                        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-whatsapp"></i></a>
                        <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-facebook"></i></a>
                        <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-instagram"></i></a>
                        <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-125 transition-all"><i className="fa-brands fa-tiktok"></i></a>
                        <a href="mailto:info@gradwayedu.com" className="text-[#EA4335] hover:scale-125 transition-all"><i className="fa-solid fa-at"></i></a>
                        <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Quick Links</h4>
                    <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('aboutus')}>About Us</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onNavigate('destinations')}>Destinations</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('faq-full')}>FAQ</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('careers')}>Careers</li>
                        <li className="hover:text-white transition-colors cursor-pointer uppercase" onClick={() => onSetView('partner')}>Partner With Us</li>
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
                                    {newsletterLoading ? <Loader2 className="animate-spin text-[10px]" size={12} /> : <i className="fa-solid fa-arrow-right text-[10px]"></i>}
                                </button>
                            </form>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                <div className="flex items-center gap-2 text-amber-500">
                                    <Check size={14} strokeWidth={3} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Subscribed!</span>
                                </div>
                                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-medium leading-relaxed">Thank you, you have been subscribed to our updates.</p>
                                <button onClick={handleRefill} className="text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-4">Click to re-fill</button>
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

const PartnerPage = ({ onNavigate }: any) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agencyName, setAgencyName] = useState("");
    const [website, setWebsite] = useState("");
    const [contactName, setContactName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
    const regionDropdownRef = useRef<HTMLDivElement>(null);
    const partnerHiddenFormRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
                setIsRegionDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleRegionSelection = (countryName: string) => {
        setSelectedRegions(prev => {
            if (prev.includes(countryName)) return prev.filter(c => c !== countryName);
            return [...prev, countryName];
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (partnerHiddenFormRef.current) {
            partnerHiddenFormRef.current.submit();
            setTimeout(() => {
                setIsSubmitting(false);
                setFormSubmitted(true);
                setAgencyName(""); setWebsite(""); setContactName(""); setJobTitle("");
                setEmail(""); setPhone(""); setAddress(""); setSelectedRegions([]); setMessage("");
            }, 1500);
        }
    };

    const SocialRow = ({ emailOverride }: any) => (
        <div className="flex flex-row items-center gap-5 text-2xl flex-nowrap overflow-visible">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-instagram"></i></a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-black hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-tiktok"></i></a>
            <a href={`mailto:${emailOverride || 'info@gradwayedu.com'}`} className="text-[#EA4335] hover:scale-125 transition-all"><i className="fa-solid fa-at"></i></a>
            <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-125 transition-all text-3xl"><i className="fa-brands fa-linkedin"></i></a>
        </div>
    );

    return (
        <main className="animate-[fadeIn_0.5s_ease-out] bg-[#FAFAFA] text-[#1A1F2C] overflow-hidden">
            <iframe name="partner_form_target" style={{ display: 'none' }} />
            <form 
                ref={partnerHiddenFormRef}
                action={GOOGLE_PARTNER_FORM_URL} 
                method="POST" 
                target="partner_form_target" 
                style={{ display: 'none' }}
            >
                <input type="hidden" name={PARTNER_FORM_ENTRIES.agencyName} value={agencyName} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.website} value={website} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.contactName} value={contactName} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.jobTitle} value={jobTitle} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.email} value={email} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.phone} value={phone} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.address} value={address} />
                <input type="hidden" name={PARTNER_FORM_ENTRIES.message} value={message || "-"} />
                {selectedRegions.length > 0 ? selectedRegions.map((c, idx) => (
                    <input key={idx} type="hidden" name={PARTNER_FORM_ENTRIES.regions} value={c.toUpperCase()} />
                )) : <input type="hidden" name={PARTNER_FORM_ENTRIES.regions} value="-" />}
            </form>

            <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-indigo-50/30" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 blur-[120px] rounded-full animate-pulse" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 shadow-sm">
                        <Handshake size={14} /> B2B Collaboration
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] uppercase">
                        Let's Scale <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-indigo-600">Together.</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Gradway partners with elite agents and institutions worldwide to create ethical, high-quality migration pathways for international talent.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button onClick={() => {
                            const el = document.getElementById('partner-form-section');
                            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }} className="w-full sm:w-auto bg-[#1A1F2C] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all">Become a Partner</button>
                        <a href="mailto:admin@gradwayedu.com" className="w-full sm:w-auto bg-white border border-slate-200 text-[#1A1F2C] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-sm hover:bg-slate-50 active:scale-95 transition-all">Contact</a>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <SectionBadge text="Value Proposition" amberOutline />
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Why Gradway?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <BarChart3 className="text-amber-500" />, title: "Optimized Processing", desc: "Our rigorous documentation standards and deep institutional knowledge ensure your hard-earned leads transition seamlessly into successful global enrollments." },
                            { icon: <ShieldCheck className="text-indigo-500" />, title: "Operational Trust", desc: "We provide complete process transparency and ethical handling, acting as a reliable extension of your own brand." },
                            { icon: <Network className="text-emerald-500" />, title: "Global Network", desc: "Access 450+ universities across the UK, Canada, Australia, and beyond through a single partnership." }
                        ].map((feature, i) => (
                            <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-50">{feature.icon}</div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{feature.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="partner-form-section" className="py-32 px-6 md:px-12 bg-slate-50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em]">PARTNERSHIP INQUIRY</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">Apply for <br /> Collaboration</h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">Fill out the form to get started.</p>
                        </div>
                        <div className="space-y-6">
                            {[
                                "Faster Commission Settlements",
                                "Regional Marketing Support",
                                "B2B Support and training"
                            ].map(item => (
                                <div key={item} className="flex items-center gap-4 text-slate-800 font-bold uppercase tracking-widest text-[11px]">
                                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Check size={14} strokeWidth={3} /></div>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="pt-8 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Connect With Us</p>
                            <SocialRow emailOverride="admin@gradwayedu.com" />
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100">
                            {!formSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2"><Building2 size={10} /> Agency / Institution Name</label>
                                            <input required value={agencyName} onChange={e => setAgencyName(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="e.g. Global Education Hub" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2"><Globe2 size={10} /> Website (If Available)</label>
                                            <input value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="https://..." />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Primary Contact Name</label>
                                            <input required value={contactName} onChange={e => setContactName(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2"><Briefcase size={10} /> Job Title</label>
                                            <input required value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="e.g. Director" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Business Email</label>
                                            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="info@company.com" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">WhatsApp / Phone</label>
                                            <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="+xxx xxxxxxxx" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Address</label>
                                        <input required value={address} onChange={e => setAddress(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" placeholder="Street, City, Country" />
                                    </div>
                                    <div className="space-y-1 relative" ref={regionDropdownRef}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Recruitment Region / Countries</label>
                                        <button type="button" onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-all focus:border-amber-500 focus:bg-white">
                                            <span className={selectedRegions.length === 0 ? "text-slate-400" : "text-slate-800 line-clamp-1"}>{selectedRegions.length > 0 ? selectedRegions.join(", ") : "Select targeted destinations"}</span>
                                            <ChevronDown size={14} className={cn("transition-transform duration-300", isRegionDropdownOpen && "rotate-180")} />
                                        </button>
                                        <AnimatePresence>
                                            {isRegionDropdownOpen && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-[3rem] shadow-2xl p-4 max-h-[250px] overflow-y-auto custom-scrollbar">
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {DESTINATIONS.map(d => (
                                                            <button key={d.id} type="button" onClick={() => toggleRegionSelection(d.name)} className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group", selectedRegions.includes(d.name) ? "bg-amber-50 text-amber-600" : "hover:bg-slate-50 text-slate-600")}>
                                                                <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-all", selectedRegions.includes(d.name) ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 group-hover:border-amber-500")}>
                                                                    {selectedRegions.includes(d.name) && <Check size={10} strokeWidth={3} />}
                                                                </div>
                                                                <span className="text-[10px] font-bold uppercase tracking-wider">{d.name}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Inquiry / Message</label>
                                        <textarea rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm resize-none" placeholder="Tell us about your current student flow and goals..." />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#1A1F2C] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Request Collaboration"}
                                    </button>
                                </form>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"><Check size={32} strokeWidth={4} /></div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Request Sent!</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-10">Our B2B management team will review your application and contact you as soon as possible.</p>
                                    <div className="flex flex-col items-center gap-6 border-t border-slate-50 pt-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reach Us Instantly</p>
                                        <SocialRow emailOverride="admin@gradwayedu.com" />
                                    </div>
                                    <button onClick={() => setFormSubmitted(false)} className="mt-12 text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:underline">Send another request</button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const UKDestinationPage = ({ onContact }: { onContact: () => void }) => {
    const [selectedCity, setSelectedCity] = useState(0);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const pointerPos = useRef({ x: 0, y: 0 });

    const cities = [
        { name: "London", desc: "Home to 30+ universities, London offers unparalleled access to culture, internships, and global networks.", stats: "Premium Living Standards • Global Transit Access", rating: "#1 Student City", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200" },
        { name: "Manchester", desc: "A dynamic powerhouse of innovation and student life, Manchester is the heart of the UK's 'Northern Powerhouse'.", stats: "Dynamic Urban Living • Northern Transit Hub", rating: "The Powerhouse", image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?q=80&w=1200" },
        { name: "Edinburgh", desc: "A stunning capital blending historic prestige with modern academic rigor in one of the world's most scenic cities.", stats: "Historic Center Living • Scenic Walkable Hub", rating: "Academic Jewel", image: "https://images.unsplash.com/photo-1506370822645-6a56a10528d2?q=80&w=1200" },
        { name: "Cardiff", desc: "The friendly Welsh capital offering a high quality of life, affordable living, and major research institutions.", stats: "Optimal Living Value • Integrated Rail Link", rating: "Welsh Capital", image: "https://images.unsplash.com/photo-1582236318357-1901b0f5be87?q=80&w=1200" },
        { name: "Bristol", desc: "A creative and vibrant city known for its engineering heritage, artistic soul, and top-tier employability.", stats: "Creative Hub Value • Green Transit Options", rating: "Creative Core", image: "https://images.unsplash.com/photo-1563816738981-b558509069bc?q=80&w=1200" }
    ];

    const handleNext = () => setSelectedCity((prev) => (prev + 1) % cities.length);
    const handlePrev = () => setSelectedCity((prev) => (prev - 1 + cities.length) % cities.length);

    useEffect(() => {
        const handleMove = (e: PointerEvent) => {
            pointerPos.current = { x: e.clientX, y: e.clientY };
            checkHit();
        };
        const checkHit = () => {
            const element = document.elementFromPoint(pointerPos.current.x, pointerPos.current.y);
            const hitCard = element?.closest('[data-scroll-hit]');
            if (hitCard) { setHoveredId(hitCard.getAttribute('data-scroll-hit')); }
            else { setHoveredId(null); }
        };
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('scroll', checkHit, { passive: true });
        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('scroll', checkHit);
        };
    }, []);

    return (
        <main className="animate-[fadeIn_0.5s_ease-out] bg-[#FAFAFA] text-[#1A1F2C] overflow-hidden">
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-white px-6">
                <div className="absolute inset-0 z-0 bg-white">
                    <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070" className="w-full h-full object-cover opacity-25 scale-105" alt="London Skyline" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#FAFAFA]" />
                </div>
                <div className="relative z-10 max-w-4xl w-full flex flex-col items-center pt-[117px] pb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-900 mb-8 shadow-sm">
                        <Globe size={14} /> UK Education Excellence
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none uppercase mb-8 text-slate-950">
                        Uncover Your <br />
                        <span className="text-blue-900">Potential</span>
                    </h1>
                    <p className="text-slate-700 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-sm">
                        Embark on a journey through centuries of academic heritage and vibrant modern culture. The UK awaits your ambition.
                    </p>
                    <div className="flex flex-col items-center gap-8">
                        <button onClick={onContact} className="bg-blue-900 text-white px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/30">Start Your Journey +</button>
                        <div className="flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Scroll to explore</span>
                            <ChevronDown size={14} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter I: Heritage</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">A Legacy of Learning</h2>
                    <p className="text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        From the historic cobblestones of <span className="text-[#1A1F2C] border-b-2 border-blue-100">Oxford</span> to the bustling innovation hubs of <span className="text-[#1A1F2C] border-b-2 border-blue-100">London</span>, the United Kingdom offers an education system respected worldwide.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { id: 'h1', icon: <Compass className="text-blue-600" />, title: "World-Class Research", desc: "Access to pioneering research facilities and libraries that house centuries of knowledge." },
                        { id: 'h2', icon: <Globe className="text-blue-600" />, title: "Global Community", desc: "Join a diverse student body from over 200 countries, creating a truly global network." },
                        { id: 'h3', icon: <TrendingUp className="text-blue-600" />, title: "Career Acceleration", desc: "Benefit from strong industry links and the Graduate Route post study work visa." }
                    ].map((card, i) => (
                        <div key={i} data-scroll-hit={card.id} className={cn(
                            "p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm transition-all duration-300 group cursor-default relative overflow-hidden",
                            hoveredId === card.id ? "scale-[1.03] shadow-xl border-blue-200 -translate-y-2" : ""
                        )}>
                            <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                            <div className={cn("relative z-10 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 transition-colors", hoveredId === card.id && "bg-blue-600 text-white")}>{card.icon}</div>
                            <h3 className="relative z-10 text-xl font-black uppercase mb-4 tracking-tight text-[#1A1F2C]">{card.title}</h3>
                            <p className="relative z-10 text-slate-500 text-sm leading-relaxed font-medium">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="pt-8 pb-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter II: Living</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Explore <br /> Iconic Cities</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">The UK is a tapestry of cultures. Choose the environment that inspires you.</p>
                        <div className="hidden lg:flex flex-col gap-2">
                            {cities.map((city, i) => (
                                <button key={i} onClick={() => setSelectedCity(i)} className={cn(
                                    "w-full px-8 py-5 rounded-2xl text-left font-black uppercase tracking-widest text-xs flex justify-between items-center transition-all",
                                    selectedCity === i ? "bg-blue-600 text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                )}>
                                    {city.name}
                                    <ChevronDown size={16} className={cn("transition-transform", selectedCity === i ? "-rotate-90" : "")} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full" />
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selectedCity}
                                initial={{ opacity: 0, x: 20 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative bg-white border border-slate-100 rounded-[3rem] p-8 shadow-2xl min-h-[480px] flex flex-col overflow-hidden"
                            >
                                <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                                <div className="absolute top-8 right-8 flex gap-2 z-20">
                                    <button onClick={handlePrev} className="w-10 h-10 border border-slate-100 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"><ChevronLeft size={16} /></button>
                                    <button onClick={handleNext} className="w-10 h-10 border border-slate-100 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"><ChevronRight size={16} /></button>
                                </div>
                                <img src={cities[selectedCity].image} className="relative z-10 w-full h-48 object-cover rounded-[3rem] mb-8 border border-slate-100" alt={cities[selectedCity].name} />
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-[#1A1F2C]">{cities[selectedCity].name}</h3>
                                    <div className="px-3 py-1 bg-blue-600 text-[9px] font-black uppercase rounded-full text-white whitespace-nowrap shadow-sm">{cities[selectedCity].rating}</div>
                                </div>
                                <p className="relative z-10 text-slate-500 text-sm leading-relaxed mb-8 font-medium flex-grow">{cities[selectedCity].desc}</p>
                                <div className="relative z-10 flex flex-col gap-4 py-6 border-t border-slate-50 mt-auto">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400">
                                        <MapPin size={14} className="text-blue-500 shrink-0" /> {cities[selectedCity].stats.split('•')[0]}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400">
                                        <Train size={14} className="text-blue-500 shrink-0" /> {cities[selectedCity].stats.split('•')[1]}
                                    </div>
                                </div>
                                <button onClick={onContact} className="relative z-10 w-full mt-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black uppercase tracking-widest text-[10px] text-[#1A1F2C] hover:bg-blue-600 hover:text-white transition-all shadow-sm">Start Application</button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <section className="pt-24 pb-4 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter III: Institutions</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Partner Universities</h2>
                </div>
                {['Research Led Institutions', 'Industry Aligned Universities', 'London Study Destinations', 'Specialist & Regional Universities'].map(category => {
                    const filteredUnis = UK_UNIVERSITIES.filter(u => u.category === category);
                    const offers = filteredUnis.map((uni, idx) => ({
                        id: `${category}-${idx}`,
                        imageSrc: uni.image,
                        imageAlt: uni.name,
                        tag: uni.tag,
                        title: uni.name,
                        description: `Core Fields: ${uni.fields}`,
                        brandLogoSrc: '',
                        brandName: uni.location,
                        href: uni.url
                    }));
                    return (
                        <div key={category} className="mb-10">
                            <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4 px-2">
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-blue-900">{category}</h3>
                            </div>
                            <OfferCarousel offers={offers} />
                        </div>
                    );
                })}
                <div className="mt-4 p-10 bg-blue-50 rounded-[3rem] border border-blue-100 text-center">
                    <p className="text-blue-900 text-sm font-black uppercase tracking-widest">Discover more with Gradway</p>
                    <p className="text-blue-700/60 text-xs font-medium mt-2">These represent just a few of our represented institutions. Contact us to explore personalised top-tier university options across the UK and find the best match for your academic profile.</p>
                </div>
            </section>

            <section className="pt-24 pb-24 bg-slate-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter IV: Essentials</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Your Path <br /> to the UK</h2>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-md">Navigating the visa process shouldn't be stressful. We simplify the journey into four clear stages.</p>
                        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] space-y-4 shadow-sm">
                            <div className="flex items-center gap-3 text-blue-600">
                                <ShieldCheck size={20} /> <span className="text-xs font-black uppercase tracking-widest">Did you know?</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic">The UK offers a <span className="text-blue-600 font-bold">Graduate Route</span> visa allowing you to stay and work 2 years after graduation.</p>
                        </div>
                    </div>
                    <div className="space-y-12 relative">
                        <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200" />
                        {[
                            { id: 's1', step: "1", title: "Secure Your Offer", desc: "Apply to universities and receive an unconditional offer letter." },
                            { id: 's2', step: "2", title: "Get Your CAS", desc: "Receive your Confirmation of Acceptance for Studies (CAS) number." },
                            { id: 's3', step: "3", title: "Visa Application", desc: "Submit your application online and book biometrics." },
                            { id: 's4', step: "4", title: "Biometrics & Travel", desc: "Attend your appointment and await your travel vignette." }
                        ].map((item, i) => (
                            <div key={i} data-scroll-hit={item.id} className={cn(
                                "relative pl-16 group cursor-default transition-all duration-300",
                                hoveredId === item.id ? "translate-x-4" : ""
                            )}>
                                <div className={cn(
                                    "absolute left-0 top-0 w-12 h-12 rounded-full bg-white border border-blue-500/30 text-blue-600 flex items-center justify-center font-black z-10 transition-all shadow-lg",
                                    hoveredId === item.id && "bg-blue-600 text-white"
                                )}>{item.step}</div>
                                <h4 className={cn("text-xl font-black uppercase tracking-tight mb-2 text-[#1A1F2C] transition-colors", hoveredId === item.id && "text-blue-600")}>{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chapter V: Experience</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#1A1F2C]">Life Beyond Study</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Explore the academic heritage, global connectivity, and vibrant student community that defines the UK experience.
                    </p>
                </div>
                <BentoExperience onContact={onContact} />
            </section>

            <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden border-t border-slate-100">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">TAKE THE FIRST STEP</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#1A1F2C] mb-8">
                                Ready to Write <br />
                                Your Story?
                            </h2>
                            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                                Pursue your UK study dreams through our expert guidance and personalised strategic pathways.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <BadgeCheck size={28} className="fill-blue-50" />
                                </div>
                                  <div>
                                    <h4 className="text-xl font-black uppercase tracking-tight mb-1 text-[#1A1F2C]">Certified Experts</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">British Council certified education consultants.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                    <UserCheck size={28} className="fill-blue-50" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black uppercase tracking-tight mb-1 text-[#1A1F2C]">End-to-End Support</h4>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">From application to pre-departure briefing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-blue-600/5 blur-[100px] rounded-full" />
                        <div className="relative bg-blue-600 rounded-[4rem] p-10 md:p-14 text-white shadow-[0_40px_100px_rgba(37,99,235,0.25)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_50px_120px_rgba(37,99,235,0.4)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 blur-[50px] rounded-full translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">Let's Map Your Success.</h3>
                                    <p className="text-blue-50 text-base md:text-lg font-medium leading-relaxed max-w-sm">Our expert counselors offer a personalised 1:1 strategy session to find your perfect university match.</p>
                                </div>
                                <div className="space-y-6">
                                    <a href={`tel:${WA_PHONE}`} className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg shrink-0 group-hover/item:bg-white/30 transition-colors">
                                            <Headset className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60">Phone Support</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-blue-200">{PHONE_DISPLAY}</p>
                                        </div>
                                    </a>
                                    <a href="mailto:info@gradwayedu.com" className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg shrink-0 group-hover/item:bg-white/30 transition-colors">
                                            <Mail className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60">Email Inquiries</p>
                                            <p className="text-xl font-black tracking-tight group-hover/item:underline underline-offset-4 decoration-blue-200">info@gradwayedu.com</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="pt-8 border-t border-white/10">
                                    <button onClick={onContact} className="w-full bg-white text-blue-600 py-6 rounded-full font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-black hover:text-white transition-all active:scale-95">Book Session</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

const ChatWidget = ({ 
    chatOpen, 
    setChatOpen, 
    chatMessage, 
    setChatMessage, 
    chatHistory, 
    isTyping, 
    handleChatSubmit 
}: any) => (
    <div className="fixed bottom-6 right-6 z-[250]">
        {!chatOpen ? (
            <button 
                onClick={() => setChatOpen(true)}
                className="w-14 h-14 bg-amber-500 rounded-full shadow-lg flex items-center justify-center text-[#1A1F2C] text-2xl hover:scale-110 transition-all"
            >
                <i className="fa-solid fa-headset"></i>
            </button>
        ) : (
            <div className="bg-white w-[320px] h-[480px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100 animate-[fadeIn_0.3s_ease-out]">
                <div className="bg-[#1A1F2C] p-6 text-white flex justify-between items-center">
                    <span className="font-black text-xs uppercase tracking-widest">GradBot AI</span>
                    <button onClick={() => setChatOpen(false)}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-slate-50 custom-scrollbar">
                    {chatHistory.length === 0 && (
                        <p className="text-slate-500 text-center mt-8 italic text-xs">"Hi! I'm your Gradway AI assistant. How can I help you today?"</p>
                    )}
                    {chatHistory.map((c: any, i: number) => (
                        <div key={i} className={cn(
                            "p-4 rounded-2xl shadow-sm",
                            c.role === 'user' ? "bg-[#1A1F2C] text-white ml-8 rounded-br-none" : "bg-white border border-slate-200 mr-8 rounded-bl-none"
                        )}>
                            {c.text}
                        </div>
                    ))}
                    {isTyping && <div className="text-amber-500 font-black text-[10px] animate-pulse">GradBot is thinking...</div>}
                </div>
                <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t flex gap-2">
                    <input 
                        type="text" 
                        value={chatMessage} 
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 bg-slate-100 border-0 rounded-full px-4 text-xs py-3 outline-none font-medium"
                    />
                    <button type="submit" className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">
                        <i className="fa-solid fa-paper-plane text-sm"></i>
                    </button>
                </form>
            </div>
        )}
    </div>
);

const PopUpInquiryForm = ({ isOpen, onClose, countryPrefix = "UK Page" }: { isOpen: boolean, onClose: () => void, countryPrefix?: string }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedProgramLevel, setSelectedProgramLevel] = useState("");
    const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [intake, setIntake] = useState("");
    const [message, setMessage] = useState("");
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const hiddenFormRef = useRef<HTMLFormElement>(null);

    const toggleCountrySelection = (countryName: string) => {
        setSelectedCountries(prev => {
            if (prev.includes(countryName)) return prev.filter(c => c !== countryName);
            if (prev.length < 4) return [...prev, countryName];
            return prev;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (hiddenFormRef.current) {
            hiddenFormRef.current.submit();
            setTimeout(() => {
                setFormSubmitted(true);
                setIsSubmitting(false);
            }, 1500);
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleReset = () => {
        setFormSubmitted(false);
        setName(""); setPhone(""); setEmail(""); setIntake(""); setMessage("");
        setSelectedCountries([]); setSelectedFieldOfStudy(""); setSelectedProgramLevel("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                <button onClick={onClose} className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors z-[10]"><X size={20} className="text-slate-400" /></button>
                <iframe name="popup_target" style={{ display: 'none' }} />
                <form ref={hiddenFormRef} action={GOOGLE_FORM_URL} method="POST" target="popup_target" style={{ display: 'none' }}>
                    <input type="hidden" name={FORM_ENTRIES.name} value={name} />
                    <input type="hidden" name={FORM_ENTRIES.phone} value={phone} />
                    <input type="hidden" name={FORM_ENTRIES.email} value={email} />
                    <input type="hidden" name={FORM_ENTRIES.programLevel} value={selectedProgramLevel} />
                    <input type="hidden" name={FORM_ENTRIES.fieldOfStudy} value={selectedFieldOfStudy} />
                    <input type="hidden" name={FORM_ENTRIES.intake} value={intake} />
                    <input type="hidden" name={FORM_ENTRIES.message} value={`From ${countryPrefix}: ${message || "-"}`} />
                    {selectedCountries.length > 0 ? selectedCountries.map((c, idx) => (
                        <input key={idx} type="hidden" name={FORM_ENTRIES.countries} value={c.toUpperCase()} />
                    )) : <input type="hidden" name={FORM_ENTRIES.countries} value={countryPrefix.toUpperCase()} />}
                </form>
                <div className="p-10 overflow-y-auto custom-scrollbar">
                    {!formSubmitted ? (
                        <React.Fragment>
                            <div className="text-center mb-10">
                                <SectionBadge text="Inquiry" amberOutline />
                                <h3 className="text-3xl font-black uppercase text-[#1A1F2C] tracking-tight leading-tight mt-4">Start Your {countryPrefix} Journey</h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Connect with our headquarters in Colombo</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                                    <input required value={name} onChange={e => setName(e.target.value)} placeholder="Enter full name" className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                                    <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+94 xx xxx xxxx" className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <CustomDropdown label="Program Level" value={selectedProgramLevel} options={PROGRAM_LEVELS_LIST} onChange={setSelectedProgramLevel} placeholder="Select level" />
                                    <CustomDropdown label="Field of study" value={selectedFieldOfStudy} options={FIELDS_OF_STUDY_LIST} onChange={setSelectedFieldOfStudy} placeholder="Select field" />
                                </div>
                                <div className="space-y-1 relative" ref={countryDropdownRef}>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Countries (Up to 4)</label>
                                    <button type="button" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-all focus:border-amber-500 focus:bg-white">
                                        <span className={selectedCountries.length === 0 ? "text-slate-400" : "text-slate-800"}>{selectedCountries.length > 0 ? selectedCountries.join(", ") : "Select destinations"}</span>
                                        <ChevronDown size={14} className={cn("transition-transform duration-300", isCountryDropdownOpen && "rotate-180")} />
                                    </button>
                                    <AnimatePresence>
                                        {isCountryDropdownOpen && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 max-h-[200px] overflow-y-auto custom-scrollbar">
                                                <div className="grid grid-cols-1 gap-1">
                                                    {DESTINATIONS.map(d => (
                                                        <button key={d.id} type="button" onClick={() => toggleCountrySelection(d.name)} className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group", selectedCountries.includes(d.name) ? "bg-amber-50 text-amber-600" : "hover:bg-slate-50 text-slate-600")}>
                                                            <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-all", selectedCountries.includes(d.name) ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 group-hover:border-amber-500")}>
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
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Intake</label>
                                    <input required value={intake} onChange={e => setIntake(e.target.value)} placeholder="Eg - Sept 2026" className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Tell us about your goals, budget or if you have any questions" className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm resize-none" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#1A1F2C] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-amber-500 transition-all mt-4 active:scale-95 flex items-center justify-center gap-3">
                                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Submit Inquiry"}
                                </button>
                            </form>
                        </React.Fragment>
                    ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"><Check size={48} strokeWidth={4} /></div>
                            <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Request Received</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Thank you. Your details are recorded. A consultant will reach out to you shortly.</p>
                            <button onClick={handleReset} className="mt-10 text-amber-600 font-black uppercase text-xs tracking-widest hover:underline">Close</button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const StudentsFirstIcon = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center relative", className)}>
        <Heart className="text-amber-500 fill-amber-500" size={64} strokeWidth={1} />
        <Users className="text-white absolute" size={24} />
    </div>
);

export const App: React.FC = () => {
    const [view, setView] = useState('main');
    const [modal, setModal] = useState('none');
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ukFormOpen, setUkFormOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const pointerPos = useRef({ x: 0, y: 0 });

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [intake, setIntake] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
    const [selectedProgramLevel, setSelectedProgramLevel] = useState("");
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const hiddenFormRef = useRef<HTMLFormElement>(null);

    // Core Global Hover/Scroll Interaction Logic
    const checkHit = () => {
        const element = document.elementFromPoint(pointerPos.current.x, pointerPos.current.y);
        const hitCard = element?.closest('[data-scroll-hit]');
        if (hitCard) {
            setHoveredId(hitCard.getAttribute('data-scroll-hit'));
        } else {
            setHoveredId(null);
        }
    };

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            pointerPos.current = { x: e.clientX, y: e.clientY };
            checkHit();
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                pointerPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                checkHit();
            }
        };
        
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('scroll', checkHit, { passive: true });
        
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('scroll', checkHit);
        };
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#uk') setView('destination-uk');
            else if (hash === '#careers') setView('careers');
            else if (hash === '#faq-full') setView('faq-full');
            else if (hash === '#services-full') setView('services-full');
            else if (hash === '#partner') setView('partner');
            else setView('main');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    useEffect(() => {
        if (modal !== 'none' || ukFormOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modal, ukFormOpen]);

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
        // OFFSET SETTINGS: 
        // Increase this number to stop the scroll higher (more padding at top).
        // Decrease this number to stop the scroll lower (less padding at top).
        const SCROLL_OFFSET = 20;

        if (view !== 'main' && ['top', 'aboutus', 'services', 'destinations', 'stories', 'contact', 'faq'].includes(id)) {
            setView('main');
            window.location.hash = '';
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    window.scrollTo({
                        top: id === 'top' ? 0 : elementPosition - SCROLL_OFFSET,
                        behavior: 'smooth'
                    });
                }
            }, 100);
            return;
        }
        if (id === 'careers') { window.location.hash = '#careers'; return; }
        if (id === 'faq-full') { window.location.hash = '#faq-full'; return; }
        if (id === 'services-full') { window.location.hash = '#services-full'; return; }
        if (id === 'destination-uk') { window.location.hash = '#uk'; return; }
        if (id === 'partner') { window.location.hash = '#partner'; return; }
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: id === 'top' ? 0 : element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
                behavior: 'smooth'
            });
        }
    };

    const navigateToServiceDetail = (id: number) => {
        window.location.hash = '#services-full';
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
                    <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-tight tracking-tight mb-12 uppercase">Exploring New Talent.</h1>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-16">
                        We are always looking for visionary consultants and creative thinkers to join our mission in Colombo.
                    </p>
                    <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-lg w-full mb-20 relative overflow-hidden">
                        <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                        <h3 className="relative z-10 text-2xl font-black mb-4 uppercase tracking-tight text-slate-400">Current Opportunities</h3>
                        <p className="relative z-10 text-slate-800 font-bold text-xl mb-8 leading-tight tracking-tight">Currently, there are no open positions.</p>
                        <p className="relative z-10 text-slate-500 mb-8 font-medium">All future openings will be announced first on our LinkedIn page.</p>
                        <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block bg-[#1A1F2C] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all">Visit LinkedIn Page</a>
                    </div>
                    <div className="w-full max-w-5xl pt-20 border-t border-slate-200">
                        <h2 className="text-3xl font-black mb-12 text-[#1A1F2C] uppercase tracking-tight">Join the Community</h2>
                        <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-10">
                            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all"><i className="fa-brands fa-whatsapp text-3xl"></i></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp</span>
                            </a>
                            <a href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-[#0077B5] group-hover:bg-[#0077B5] group-hover:text-white transition-all"><i className="fa-brands fa-linkedin text-3xl"></i></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn</span>
                            </a>
                            <a href="https://www.instagram.com/gradway_education" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-[#E4405F] group-hover:bg-[#E4405F] group-hover:text-white transition-all"><i className="fa-brands fa-instagram text-3xl"></i></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instagram</span>
                            </a>
                            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all"><i className="fa-brands fa-tiktok text-3xl"></i></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">TikTok</span>
                            </a>
                            <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                                <div className="w-16 h-16 bg-white shadow-lg rounded-3xl flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all"><i className="fa-brands fa-facebook text-3xl"></i></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Facebook</span>
                            </a>
                        </div>
                    </div>
                </main>
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <ChatWidget chatOpen={chatOpen} setChatOpen={setChatOpen} chatMessage={chatMessage} setChatMessage={setChatMessage} chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} />
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
                            <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-tight tracking-tight mb-8 uppercase">Our Full Support.</h1>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed">
                                A comprehensive guide to the professional services we provide for Sri Lankan students seeking world-class education.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
                            {SERVICES.map((s) => (
                                <div key={s.id} data-scroll-hit={`service-full-${s.id}`}>
                                  <ServiceCardRenderer service={s} scrollToId={scrollToId} />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <ChatWidget chatOpen={chatOpen} setChatOpen={setChatOpen} chatMessage={chatMessage} setChatMessage={setChatMessage} chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} />
                <AnimatePresence>
                    {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
                </AnimatePresence>
            </div>
        );
    }

    if (view === 'faq-full') {
        const groupedFaqs = FULL_FAQ.reduce((acc: any, faq) => {
            if (!acc[faq.category]) acc[faq.category] = [];
            acc[faq.category].push(faq);
            return acc;
        }, {});
        return (
            <div className="min-h-screen bg-slate-50">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <main className="pt-32 pb-24 animate-[fadeIn_0.5s_ease-out]">
                    <div className="container mx-auto px-4 lg:px-12">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-20">
                                <SectionBadge text="Comprehensive Guide" amberOutline />
                                <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] mb-8 leading-tight uppercase tracking-tight">Your Knowledge Hub.</h1>
                                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Everything you need to know about starting your international education journey from Sri Lanka.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-16">
                                {Object.entries(groupedFaqs).map(([category, items]: any) => (
                                    <section key={category} className="space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px flex-1 bg-slate-200" />
                                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">{category}</h2>
                                            <div className="h-px flex-1 bg-slate-200" />
                                        </div>
                                        <FAQAccordion items={items} />
                                    </section>
                                ))}
                            </div>
                            <div className="mt-24 p-12 bg-[#1A1F2C] rounded-[4vrem] text-white text-center relative overflow-hidden">
                                <GlowingEffect spread={40} glow={true} proximity={300} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
                                <h3 className="relative z-10 text-3xl font-black mb-6 uppercase tracking-tight">Still have questions?</h3>
                                <p className="relative z-10 text-slate-400 mb-10 max-w-xl mx-auto font-medium">Our consultants are ready to provide personalised guidance for your specific situation. Book a free session today.</p>
                                <button onClick={() => scrollToId('contact')} className="relative z-10 bg-amber-50 text-[#1A1F2C] px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all">Book Free Assessment</button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <ChatWidget chatOpen={chatOpen} setChatOpen={setChatOpen} chatMessage={chatMessage} setChatMessage={setChatMessage} chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} />
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
                <PopUpInquiryForm isOpen={ukFormOpen} onClose={() => setUkFormOpen(false)} countryPrefix="UK" />
                <UKDestinationPage onContact={() => setUkFormOpen(true)} />
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <ChatWidget chatOpen={chatOpen} setChatOpen={setChatOpen} chatMessage={chatMessage} setChatMessage={setChatMessage} chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} />
                <AnimatePresence>
                    {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
                </AnimatePresence>
            </div>
        );
    }

    if (view === 'partner') {
        return (
            <div className="min-h-screen">
                <ScrollNavigation logoUrl={LOGO_URL} onNavigate={scrollToId} />
                <PartnerPage onNavigate={scrollToId} />
                <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
                <ChatWidget chatOpen={chatOpen} setChatOpen={setChatOpen} chatMessage={chatMessage} setChatMessage={setChatMessage} chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} />
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
                <div className="absolute inset-0 hero-pattern opacity-10 pointer-events-none" />
                <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10 flex-1 lg:flex-none">
                    <div className="lg:w-1/2 text-center lg:text-left mt-8 md:mt-0">
                        <SectionBadge text="your Experts in Education" />
                        <h1 className="text-5xl md:text-8xl font-black leading-[1.05] mb-6">
                            <span className="text-[#1A1F2C] block tracking-tight">Migration</span>
                            <span className="text-amber-500 block tracking-tight">Simplified!!</span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 mb-12 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                            Empowering students to achieve global academic success with tailored strategies and dedicated support from our headquarters in Colombo.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button onClick={() => scrollToId('destinations')} className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-12 py-5 rounded-full font-black shadow-2xl shadow-amber-200/50 hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest">Explore Destinations</button>
                            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] text-white px-12 py-5 rounded-full font-black shadow-xl hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-2"><i className="fa-brands fa-whatsapp text-xl"></i> WhatsApp Us</a>
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
                            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full" />
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" className="rounded-[3rem] shadow-2xl border-8 border-white relative z-10 object-cover aspect-video" alt="Gradway Community" />
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <SectionBadge text="About us" />
                        <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-8 leading-tight tracking-tight">Guiding Ambitions Beyond Borders</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-12 font-medium">Gradway (Pvt) Limited is a premier education consultancy based in Colombo. We bridge the gap between ambitious Sri Lankan students and world-class international institutions through transparent and expert partnerships.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div data-scroll-hit="mission-card" className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 transition-all duration-300 hover:border-amber-500 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden">
                                <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                                <div className="relative z-10 w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110"><i className="fa-solid fa-bullseye"></i></div>
                                <h4 className="relative z-10 font-black text-[#1A1F2C] mb-2 uppercase text-xs tracking-widest">Our Mission</h4>
                                <p className="relative z-10 text-xs text-slate-500 leading-relaxed font-medium italic">"To provide ethical, transparent, and personalized guidance that turns global education dreams into reality."</p>
                            </div>
                            <div data-scroll-hit="vision-card" className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 transition-all duration-300 hover:border-indigo-600 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden">
                                <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                                <div className="relative z-10 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110"><i className="fa-solid fa-eye"></i></div>
                                <h4 className="relative z-10 font-black text-[#1A1F2C] mb-2 uppercase text-xs tracking-widest">Our Vision</h4>
                                <p className="relative z-10 text-xs text-slate-500 leading-relaxed font-medium italic">"To become the premier bridge between Sri Lankan talent and world-class academic institutions."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="py-24 bg-slate-50 scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <SectionBadge text="Our Expertise" />
                        <h2 className="text-3xl md:text-5xl font-black text-[#1A1F2C] uppercase tracking-tight">Our Services</h2>
                        <p className="mt-4 text-slate-500 font-medium text-sm md:text-base leading-relaxed">We take you from confusion to clarity, with our comprehensive support tailored to your academic goals, ensuring smooth transition from application to arrival at your dream destination.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SERVICES.map((s, i) => (
                            <div key={i} data-scroll-hit={`service-card-${s.id}`} onClick={() => navigateToServiceDetail(s.id)} className={cn("bg-white p-8 rounded-[2.5rem] shadow-sm transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer relative overflow-hidden hover:shadow-lg hover:-translate-y-1", i === 6 && "md:col-span-2 lg:col-span-2")}>
                                <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                                <div className={cn(s.iconBg, "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform relative z-10")}>
                                    <i className={`${s.icon} text-xl ${s.iconColor}`} />
                                </div>
                                <h3 className="text-lg font-black text-[#1A1F2C] mb-4 leading-tight relative z-10 uppercase whitespace-nowrap lg:whitespace-normal tracking-tight">{s.title}</h3>
                                <p className={cn("text-slate-500 text-xs leading-relaxed mb-6 flex-1 font-medium relative z-10", i === 6 && "max-w-none")}>{s.description}</p>
                                <div className="text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 transition-transform relative z-10">Learn More <i className="fa-solid fa-arrow-right" /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="destinations" className="py-24 bg-white scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="mb-10 text-center lg:text-left">
                        <SectionBadge text="World Map" />
                        <h2 className="text-3xl md:text-6xl font-black text-[#1A1F2C] tracking-tight uppercase">Our Global Destinations</h2>
                    </div>
                    {['Europe', 'Americas & Pacific', 'Asia & Other'].map(region => (
                        <div key={region} className="mb-16">
                            <div className="flex justify-between items-center mb-4 border-l-4 border-amber-500 pl-6">
                                <h3 className="text-2xl font-black text-[#1A1F2C] uppercase tracking-widest text-sm">{region}</h3>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-left text-xs" /></button>
                                    <button className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all"><i className="fa-solid fa-chevron-right text-xs" /></button>
                                </div>
                            </div>
                            <div className="flex overflow-x-auto scrollbar-hide space-x-6 pt-6 pb-8 px-4 snap-x snap-mandatory">
                                {DESTINATIONS.filter(d => d.region === region).map(dest => {
                                    const cardId = `dest-card-${dest.id}`;
                                    return (
                                        <div key={dest.id} className="min-w-[75vw] md:min-w-[340px] snap-center" onClick={() => dest.id === 'uk' ? setView('destination-uk') : scrollToId('contact')}>
                                            <div className="relative h-full rounded-[3.5rem] border-[0.75px] border-transparent p-2 overflow-visible md:p-3" data-scroll-hit={cardId}>
                                                <GlowingEffect 
                                                    spread={56} 
                                                    glow={true} 
                                                    disabled={false} 
                                                    proximity={250} 
                                                    inactiveZone={0.01} 
                                                    borderWidth={4.95} 
                                                    movementDuration={0.63} 
                                                />
                                                <div className={cn("relative flex h-[380px] flex-col justify-between overflow-hidden rounded-[2.75rem] border bg-white p-10 shadow-sm transition-all duration-300 border-slate-100 group cursor-pointer", hoveredId === cardId && "shadow-2xl -translate-y-2")}>
                                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                                        <div className={cn("w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-transform border border-slate-50", hoveredId === cardId && "scale-110")}>
                                                            <i className={`${dest.icon} text-4xl`} style={{ color: dest.color }} />
                                                        </div>
                                                        <img src={dest.image} className="w-16 h-10 object-cover rounded shadow-md border-[0.5px] border-black/10" alt={dest.name} />
                                                    </div>
                                                    <h3 className="text-3xl font-black text-[#1A1F2C] mb-4 relative z-10 uppercase tracking-tight">{dest.name}</h3>
                                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium relative z-10">{dest.description}</p>
                                                    <div className={cn("text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 transition-transform relative z-10", hoveredId === cardId && "translate-x-2")}>Learn More <i className="fa-solid fa-arrow-right" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="stories" className="py-24 bg-[#0a0d14] text-white scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12 text-center mb-16">
                    <SectionBadge text="Real Stories" lightVariant />
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Student Success Stories</h2>
                </div>
                <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SUCCESS_STORIES.map((story, i) => {
                        const cardId = `story-card-${story.id}`;
                        return (
                            <div key={i} data-scroll-hit={cardId} className="bg-[#111827] p-8 rounded-[2.5rem] border border-white/5 group flex flex-col relative overflow-hidden">
                                <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                                <div className="relative z-10 flex gap-1 mb-8">
                                    {[...Array(5)].map((_, idx) => (
                                        <i key={idx} className="fa-solid fa-star text-amber-500 text-[10px]" />
                                    ))}
                                </div>
                                <p className="relative z-10 text-slate-200 text-sm leading-relaxed mb-10 flex-1 font-medium italic">"{story.quote}"</p>
                                <div className="relative z-10 mt-auto pt-8 border-t border-white/5">
                                    <h4 className="font-black text-lg mb-1 tracking-tight">{story.name}</h4>
                                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{story.tag} • {story.university}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section id="contact" className="py-24 bg-slate-50 scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12 text-center flex flex-col items-center">
                    <SectionBadge text="Contact Hub" amberOutline />
                    <h2 className="text-4xl md:text-7xl font-black text-[#1A1F2C] tracking-tight mb-12 leading-tight uppercase max-w-4xl">Start Your Journey.</h2>
                    <div className="w-full max-w-3xl bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl text-left border border-slate-100 mb-16 relative overflow-hidden">
                        <GlowingEffect spread={40} glow={true} proximity={200} inactiveZone={0.01} borderWidth={5.75} disabled={false} />
                        {!formSubmitted ? (
                            <form onSubmit={handleContactSubmit} className="relative z-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                                        <input required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                                        <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+94 xx xxx xxxx" className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="info@gradwayedu.com" className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                    </div>
                                    <CustomDropdown label="Program Level" value={selectedProgramLevel} options={PROGRAM_LEVELS_LIST} onChange={setSelectedProgramLevel} placeholder="Select program level" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1 relative" ref={countryDropdownRef}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Countries (Select up to 4)</label>
                                        <button type="button" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 transition-all focus:border-amber-500 focus:bg-white">
                                            <span className={selectedCountries.length === 0 ? "text-slate-400" : "text-slate-800"}>{selectedCountries.length > 0 ? selectedCountries.join(", ") : "Select destinations"}</span>
                                            <ChevronDown size={16} className={cn("transition-transform duration-300", isCountryDropdownOpen && "rotate-180")} />
                                        </button>
                                        <AnimatePresence>
                                            {isCountryDropdownOpen && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-[100] left-0 right-0 top-[110%] bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 max-h-[200px] overflow-y-auto custom-scrollbar">
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {DESTINATIONS.map(d => (
                                                            <button key={d.id} type="button" onClick={() => toggleCountrySelection(d.name)} className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left group", selectedCountries.includes(d.name) ? "bg-amber-50 text-amber-600" : "hover:bg-slate-50 text-slate-600")}>
                                                                <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-all", selectedCountries.includes(d.name) ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 group-hover:border-amber-500")}>
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
                                    <CustomDropdown label="Field of study" value={selectedFieldOfStudy} options={FIELDS_OF_STUDY_LIST} onChange={setSelectedFieldOfStudy} placeholder="Select field of study" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Intake (Month / Year)</label>
                                    <input required value={intake} onChange={e => setIntake(e.target.value)} placeholder="Eg - September 2026" className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                                    <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your Goals, Budget or if you have any questions" className="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-medium text-sm resize-none" />
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={isSubmitting} className="btn-submit w-full bg-[#1A1F2C] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Submit Inquiry"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-center py-12">
                                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"><Check size={48} strokeWidth={4} /></div>
                                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Inquiry Received!</h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-10">Thank you for reaching out. Your details have been recorded, and a Gradway consultant will call you shortly.</p>
                                <button onClick={() => setFormSubmitted(false)} className="text-amber-600 font-black uppercase text-xs tracking-widest hover:underline">Send another inquiry</button>
                            </motion.div>
                        )}
                        <form ref={hiddenFormRef} action={GOOGLE_FORM_URL} method="POST" target="google_form_target" style={{ display: 'none' }}>
                            <input type="hidden" name={FORM_ENTRIES.name} value={name} />
                            <input type="hidden" name={FORM_ENTRIES.phone} value={phone} />
                            <input type="hidden" name={FORM_ENTRIES.email} value={email} />
                            <input type="hidden" name={FORM_ENTRIES.programLevel} value={selectedProgramLevel} />
                            <input type="hidden" name={FORM_ENTRIES.fieldOfStudy} value={selectedFieldOfStudy} />
                            <input type="hidden" name={FORM_ENTRIES.intake} value={intake} />
                            <input type="hidden" name={FORM_ENTRIES.message} value={message || "-"} />
                            {selectedCountries.length > 0 ? selectedCountries.map((c, idx) => (
                                <input key={idx} type="hidden" name={FORM_ENTRIES.countries} value={c.toUpperCase()} />
                            )) : <input type="hidden" name={FORM_ENTRIES.countries} value="-" />}
                        </form>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-5xl px-4 pb-4">
                        {[
                            { href: WA_LINK, icon: <i className="fa-brands fa-whatsapp" />, label: "WhatsApp", val: PHONE_DISPLAY, color: "hover:border-[#25D366]", bg: "bg-[#25D366]" },
                            { href: `tel:${WA_PHONE}`, icon: <Phone />, label: "Call Us", val: PHONE_DISPLAY, color: "hover:border-amber-500", bg: "bg-amber-500" },
                            { href: "mailto:info@gradwayedu.com", icon: <Mail />, label: "Email", val: "info@gradwayedu.com", color: "hover:border-indigo-600", bg: "bg-indigo-600" }
                        ].map((box, idx) => (
                            <a key={idx} href={box.href} target={idx !== 1 ? "_blank" : undefined} rel={idx !== 1 ? "noopener noreferrer" : undefined} className={cn("bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-4 group transition-all w-full md:w-auto md:flex-1 min-w-[220px]", box.color)}>
                                <div className={cn(box.bg, "w-12 h-12 text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md group-hover:scale-110 transition-transform")}>{box.icon}</div>
                                <div className="text-left">
                                    <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">{box.label}</span>
                                    <span className="block text-xs font-black text-[#1A1F2C] tracking-tight truncate leading-tight">{box.val}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faq" className="py-24 bg-white scroll-mt-[76px]">
                <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <SectionBadge text="Knowledge Base" amberOutline />
                        <h2 className="text-4xl font-black mb-6 uppercase tracking-tight leading-tight">Frequently Asked Questions</h2>
                        <p className="text-slate-500 font-medium mb-10">Clear, student-focused answers for your migration concerns.</p>
                        <button onClick={() => setView('faq-full')} className="bg-[#1A1F2C] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">View Full FAQ</button>
                    </div>
                    <div className="lg:w-2/3">
                        <FAQAccordion items={MAIN_FAQ} />
                    </div>
                </div>
            </section>

            <Footer onModal={setModal} onNavigate={scrollToId} onSetView={setView} />
            <ChatWidget chatOpen={chatOpen} setChatOpen={setChatOpen} chatMessage={chatMessage} setChatMessage={setChatMessage} chatHistory={chatHistory} isTyping={isTyping} handleChatSubmit={handleChatSubmit} />
            
            <AnimatePresence>
                {modal !== 'none' && <LegalModal type={modal} onClose={() => setModal('none')} />}
            </AnimatePresence>
        </div>
    );
};

export default App;