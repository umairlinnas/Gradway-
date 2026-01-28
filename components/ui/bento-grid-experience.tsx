import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Utensils, Briefcase, ShieldCheck, Plane, ArrowRight, Clock, Users2, Heart, Globe2, TrendingUp, MapPin, Trophy, Palette, Code } from "lucide-react";
import { cn } from "../../lib/utils";

function Counter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = value / (2000 / 16);
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
    <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-emerald-100">
      <Clock size={24} className="text-emerald-600" />
      <motion.div className="absolute w-0.5 h-3 bg-emerald-600 rounded-full origin-bottom mb-3" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}

function FlightPath() {
  return (
    <div className="relative w-full h-24 overflow-hidden rounded-2xl bg-slate-800 flex items-center justify-center">
      <Globe2 className="text-slate-700 w-32 h-32 absolute opacity-30" />
      <motion.div className="relative z-10 flex items-center text-blue-400" initial={{ x: -120, y: 35, rotate: 0, opacity: 0 }} animate={{ x: [-120, -50, 120], y: [35, 35, -50], rotate: [0, 0, -25], opacity: [0, 1, 1, 0] }} transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.3, 1], ease: "easeInOut" }}>
        <Plane size={32} className="drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
        <motion.div className="absolute -left-14 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" initial={{ width: 0, opacity: 0 }} animate={{ width: [0, 60, 100], opacity: [0, 0.4, 0], rotate: [0, 0, 15] }} transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.3, 1], ease: "easeInOut" }} style={{ transformOrigin: 'right center' }} />
      </motion.div>
      <div className="absolute bottom-6 left-0 right-0 h-px bg-slate-700/50" style={{ backgroundImage: 'linear-gradient(to right, #334155 50%, transparent 50%)', backgroundSize: '20px 1px' }} />
    </div>
  );
}

function SocietyIcons() {
  const [index, setIndex] = useState(0);
  const icons = [<Trophy size={28}/>, <Palette size={28}/>, <Code size={28}/>];
  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % icons.length), 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
      <AnimatePresence mode="wait"><motion.div key={index} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }}>{icons[index]}</motion.div></AnimatePresence>
    </div>
  );
}

const BentoCard = ({ children, className }: any) => (
  <motion.div whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }} className={cn("relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 border border-slate-100 bg-white group", className)}>{children}</motion.div>
);

export function BentoExperience({ onContact }: { onContact: () => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
      <BentoCard className="col-span-2 md:col-span-8 md:row-span-2 bg-[#00247D] border-blue-800 text-white shadow-2xl flex flex-col justify-center min-h-[320px]">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 blur-[100px] rounded-full" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3"><div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md"><Users size={24} /></div><span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200">The Global Choice</span></div>
          <div><h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none"><Counter value={400000} /></h3><p className="text-xl md:text-2xl font-bold text-blue-100 mt-4 leading-tight uppercase">International Community</p></div>
          <p className="text-blue-100/60 text-sm font-medium leading-relaxed max-w-xl">Representing 200+ nationalities, the UK offers an unparalleled multicultural academic ecosystem where you build connections that span the globe.</p>
        </div>
      </BentoCard>

      <BentoCard className="col-span-2 md:col-span-4 md:row-span-3 flex flex-col justify-between shadow-sm bg-slate-50/50">
        <div className="space-y-8">
          <div className="flex items-center justify-between"><div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100"><Utensils size={24} /></div><span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Budget Guide</span></div>
          <div className="space-y-2"><h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Cost of Living</h4><p className="text-slate-500 text-xs font-medium">Monthly estimates for students.</p></div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-4">
             <div className="flex items-center justify-center gap-2"><span className="text-4xl font-black text-blue-600 tracking-tighter">£1,171</span><span className="text-slate-300 font-bold">to</span><span className="text-4xl font-black text-slate-900 tracking-tighter">£1,529</span></div>
             <div className="space-y-4"><div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5"><motion.div initial={{ width: "0%" }} whileInView={{ width: "70%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-blue-400 to-blue-700 rounded-full shadow-lg" /></div><div className="flex justify-between text-[8px] font-black uppercase text-slate-400 px-1"><span>Regional</span><span>London Hub</span></div></div>
          </div>
        </div>
        <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
           <div className="flex items-start gap-3"><ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} /><p className="text-[11px] text-slate-500 font-medium">NHS healthcare access included with your student visa.</p></div>
           <div className="flex items-start gap-3"><Heart className="text-rose-500 shrink-0 mt-0.5" size={16} /><p className="text-[11px] text-slate-500 font-medium">Significant student discounts on groceries and dining.</p></div>
        </div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-emerald-50/50 border-emerald-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><WorkClock /><h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight">Work & Earn</h3><p className="text-emerald-800/70 text-[11px] font-medium leading-relaxed">Students can work <span className="font-black">20 hours/week</span> during term time and full-time in breaks. <span className="text-emerald-600/50">T&C</span></p></div>
        <div className="mt-4 flex items-center justify-between"><span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Rate: £11.44+ /hr</span><Briefcase size={16} className="text-emerald-300" /></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-slate-900 border-slate-800 text-white flex flex-col justify-between min-h-[240px]">
        <div className="flex-1"><FlightPath /></div>
        <div className="mt-4"><h3 className="text-lg font-black uppercase tracking-tight">Global Gateway</h3><p className="text-slate-400 text-[11px] font-medium mt-2 uppercase tracking-wide">Seamless travel across Europe.</p></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-blue-50 border-blue-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><SocietyIcons /><h3 className="text-lg font-black text-blue-900 uppercase tracking-tight leading-tight">200+ Societies</h3><p className="text-blue-700/60 text-[11px] font-medium">From cultural groups to advanced tech labs, build lifelong networks.</p></div>
        <div className="flex gap-1 mt-4"><span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-blue-600 border border-blue-100">Clubs</span><span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-blue-600 border border-blue-100">Teams</span></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-slate-50 border-slate-200 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-800 shadow-sm border border-slate-100"><TrendingUp size={24} /></div><h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">Career Readiness</h3><p className="text-slate-500 text-[11px] font-medium">Focus on industry placements and professional mentorship.</p></div>
        <motion.div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }}><div className="h-full w-2/3 bg-slate-800" /></motion.div>
      </BentoCard>

      <BentoCard className="col-span-2 md:col-span-4 bg-gradient-to-br from-rose-50 to-amber-50 border-rose-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-4">
          <div className="flex items-center gap-3"><MapPin size={20} className="text-rose-600" /><h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">The Lankan Spirit</h3></div>
          <p className="text-slate-600 text-xs font-medium leading-relaxed">With 50,000+ Sri Lankans in the UK, find a vibrant community waiting to welcome you.</p>
          <div className="flex -space-x-3 overflow-hidden pt-2">{[1,2,3,4].map(i => (<div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center"><Users2 size={14} className="text-slate-400" /></div>))}<div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-rose-500 text-white text-[8px] font-bold">+50k</div></div>
        </div>
        <div className="text-[9px] font-black uppercase text-rose-600 tracking-[0.2em] flex items-center gap-2">Strong Alumni Network <ArrowRight size={10} /></div>
      </BentoCard>
    </div>
  );
}