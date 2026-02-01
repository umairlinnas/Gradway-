
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Euro, Clock, Briefcase, Languages, ShieldCheck, Search, Check, TrendingUp, FileCheck, Plane } from "lucide-react";
import { cn } from "../../lib/utils";

function Counter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setDisplayValue(value); clearInterval(timer); }
      else { setDisplayValue(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{displayValue.toLocaleString()}+</span>;
}

function WorkClock() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-red-100">
      <Clock size={24} className="text-red-600" />
      <motion.div className="absolute w-0.5 h-3 bg-red-600 rounded-full origin-bottom mb-3" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}

const BentoCard = ({ children, className }: any) => (
  <motion.div whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }} className={cn("relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 border border-slate-100 bg-white group", className)}>
    {children}
  </motion.div>
);

export function GermanyBentoExperience() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
      <BentoCard className="col-span-2 md:col-span-8 md:row-span-2 bg-[#1A1F2C] border-slate-800 text-white shadow-2xl flex flex-col justify-center min-h-[320px]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3"><div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md"><Users size={24} className="text-red-500" /></div><span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Europe's Global Hub</span></div>
          <div><h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none"><Counter value={325000} /></h3><p className="text-xl md:text-2xl font-bold text-white mt-4 leading-tight uppercase">International Community</p></div>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">Join a thriving global network of students from over 190 countries currently excelling in German universities.</p>
        </div>
      </BentoCard>

      <BentoCard className="col-span-2 md:col-span-4 md:row-span-3 flex flex-col justify-between shadow-sm bg-slate-50/50">
        <div className="space-y-8">
          <div className="flex items-center justify-between"><div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-red-100"><Euro size={24} /></div><span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Monthly Budget</span></div>
          <div className="space-y-2"><h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Cost of Living</h4><p className="text-slate-500 text-xs font-medium">Estimates for a comfortable student lifestyle.</p></div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-4">
             <div className="flex items-center justify-center gap-2"><span className="text-4xl font-black text-red-600 tracking-tighter">€900</span><span className="text-slate-300 font-bold">to</span><span className="text-4xl font-black text-slate-900 tracking-tighter">€1,200</span></div>
             <div className="space-y-4"><div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5"><motion.div initial={{ width: "0%" }} whileInView={{ width: "65%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-red-400 to-red-700 rounded-full shadow-lg" /></div><div className="flex justify-between text-[8px] font-black uppercase text-slate-400 px-1"><span>Regional</span><span>Major Cities</span></div></div>
          </div>
        </div>
        <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
           <div className="flex items-start gap-3"><div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div><p className="text-[11px] text-slate-500 font-medium">Health insurance approx. €110 included in budget.</p></div>
           <div className="flex items-start gap-3"><div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div><p className="text-[11px] text-slate-500 font-medium">Student semester ticket covers all public transit.</p></div>
        </div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-red-50/50 border-red-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><WorkClock /><h3 className="text-lg font-black text-red-900 uppercase tracking-tight">Part-time Work</h3><p className="text-red-800/70 text-[11px] font-medium leading-relaxed">International students are permitted to work <span className="font-black">20 hours/week</span>.</p></div>
        <div className="mt-4 flex items-center justify-between"><span className="text-[10px] font-black uppercase text-red-600 tracking-widest">Wages: €12.50+ /hr</span><Briefcase size={16} className="text-red-300" /></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-slate-900 border-slate-800 text-white flex flex-col justify-between min-h-[240px]">
        <div className="flex-1 flex items-center justify-center"><div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative"><Search className="text-amber-500" size={32} /><motion.div className="absolute inset-0 border-2 border-amber-500 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} /></div></div>
        <div className="mt-4"><h3 className="text-lg font-black uppercase tracking-tight">Job Seeker Visa</h3><p className="text-slate-400 text-[11px] font-medium mt-2">Stay back for <span className="text-white font-bold">18 months</span> post-graduation.</p></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-amber-50/50 border-amber-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-red-50"><Languages size={28}/></div><h3 className="text-lg font-black text-amber-900 uppercase tracking-tight leading-tight">Medium of Study</h3><p className="text-amber-700/60 text-[11px] font-medium">Over <span className="font-black">2,000+ international programs</span> taught in English.</p></div>
        <div className="flex gap-1 mt-4"><span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-amber-600 border border-amber-100">IELTS</span><span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-amber-600 border border-amber-100">DAAD</span></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-slate-50 border-slate-200 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-slate-100"><FileCheck size={24} /></div><h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">Key Essentials</h3><div className="space-y-2"><div className="flex justify-between text-[10px] font-bold border-b border-slate-100 pb-1"><span className="text-red-600 uppercase">APS Cert</span><span className="text-slate-400 uppercase tracking-tighter">Academic Verification</span></div><div className="flex justify-between text-[10px] font-bold"><span className="text-amber-600 uppercase">Blocked Account</span><span className="text-slate-400 uppercase tracking-tighter">Financial Proof</span></div></div></div>
        <ShieldCheck size={16} className="text-slate-300 self-end" />
      </BentoCard>

      <BentoCard className="col-span-2 md:col-span-4 bg-gradient-to-br from-red-50 to-amber-50 border-red-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-4"><div className="flex items-center gap-3"><TrendingUp size={20} className="text-red-600" /><h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Industry Hub</h3></div><p className="text-slate-600 text-xs font-medium leading-relaxed">Europe's industrial engine. Pathways to BMW, Siemens, and SAP.</p></div>
        <div className="text-[9px] font-black uppercase text-red-600 tracking-[0.2em] flex items-center gap-2">Global Engineering Leader <Plane size={10} /></div>
      </BentoCard>
    </div>
  );
}
