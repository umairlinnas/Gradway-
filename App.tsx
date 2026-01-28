import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Telescope, 
  Phone, 
  GraduationCap, 
  Globe, 
  Layers, 
  CheckCircle2, 
  Check, 
  Heart, 
  X, 
  FileText, 
  ArrowUp, 
  RefreshCcw, 
  Shield, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Target, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Compass, 
  Train, 
  Users2, 
  Globe2, 
  Send,
  Award,
  Languages,
  Search,
  FileCheck,
  Palette,
  Code,
  Trophy,
  Plane,
  ShieldQuestion
} from 'lucide-react';
import { cn } from './lib/utils';
import { DESTINATIONS, SERVICES, SUCCESS_STORIES, FULL_FAQ, UK_UNIVERSITIES, PROGRAM_LEVELS, FIELDS_OF_STUDY } from './constants';
import { getGeminiResponse } from './services/geminiService';
import { ScrollNavigation } from './components/ui/scroll-navigation-menu';
import { OfferCarousel } from './components/ui/offer-carousel';
import { BentoExperience } from './components/ui/bento-grid-experience';
import { GermanyBentoExperience } from './components/ui/germany-bento-grid';
import { FranceBentoExperience } from './components/ui/france-bento-grid';
import { GlowingEffect } from './components/ui/glowing-effect';

const LOGO_URL = "https://i.ibb.co/3ykG4SjV/logo.png";
const TIKTOK_URL = "https://www.tiktok.com/@gradway_education?_r=1&_t=ZS-92huBpIVt6y";
const WA_PHONE = "94775009929";
const PHONE_DISPLAY = "+94 77 500 9929";
const WA_LINK = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent("Hi, I’m interested in studying abroad.\n\nName:\nPreferred Study Country:\nIntended Program / Level:\n\nThank you.")}`;

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

const SectionBadge = ({ text, lightVariant, amberOutline }: any) => (
    <div className={cn("inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border", 
        lightVariant ? "bg-white/10 border-white/10" : amberOutline ? "bg-amber-100 border-amber-200" : "bg-slate-100 border-slate-200")}>
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span className={cn("text-[10px] font-black uppercase tracking-widest", lightVariant ? "text-white" : amberOutline ? "text-amber-600" : "text-[#1A1F2C]")}>{text}</span>
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
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none text-left text-sm font-medium flex items-center justify-between hover:bg-slate-100 focus:border-amber-500 focus:bg-white transition-all">
                <span className={!value ? "text-slate-400" : "text-slate-800"}>{value || placeholder || "Select option"}</span>
                <ChevronDown size={14} className={cn("transition-