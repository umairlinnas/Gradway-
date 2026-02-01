
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Euro, Clock, Briefcase, Palette, Award, Check, TrendingUp, Plane, Heart } from "lucide-react";
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

const BentoCard = ({ children, className }: any) => (
  <motion.div whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }} className={cn("relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 border border-slate-100 bg-white group", className)}>
    {children}
  </motion.div>
);

export function FranceBentoExperience() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
      <BentoCard className="col-span-2 md:col-span-8 md:row-span-2 bg-[#0055A4] border-blue-800 text-white shadow-2xl flex flex-col justify-center min-h-[320px]">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 blur-[100px] rounded-full" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3"><div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md"><Award size={24} className="text-white" /></div><span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200">The Cultural Pinnacle</span></div>
          <div><h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none"><Counter value={358000} /></h3><p className="text-xl md:text-2xl font-bold text-white mt-4 leading-tight uppercase">International Talents</p></div>
          <p className="text-blue-100/60 text-sm font-medium leading-relaxed max-w-xl">France is the 4th most popular study destination globally, hosting a diverse community of ambitious scholars.</p>
        </div>
      </BentoCard>

      <BentoCard className="col-span-2 md:col-span-4 md:row-span-3 flex flex-col justify-between shadow-sm bg-slate-50/50">
        <div className="space-y-8">
          <div className="flex items-center justify-between"><div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100"><Euro size={24} /></div><span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Monthly Budget</span></div>
          <div className="space-y-2"><h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Cost of Living</h4><p className="text-slate-500 text-xs font-medium">Estimated monthly spend for students.</p></div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-4">
             <div className="flex items-center justify-center gap-2"><span className="text-4xl font-black text-blue-600 tracking-tighter">€650</span><span className="text-slate-300 font-bold">to</span><span className="text-4xl font-black text-slate-900 tracking-tighter">€1,000</span></div>
             <div className="space-y-4"><div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5"><motion.div initial={{ width: "0%" }} whileInView={{ width: "75%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-blue-400 to-blue-700 rounded-full shadow-lg" /></div><div className="flex justify-between text-[8px] font-black uppercase text-slate-400 px-1"><span>Regional</span><span>Paris Hub</span></div></div>
          </div>
        </div>
        <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
           <div className="flex items-start gap-3"><div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div><p className="text-[11px] text-slate-500 font-medium">Housing assistance (CAF) available for many students.</p></div>
           <div className="flex items-start gap-3"><div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div><p className="text-[11px] text-slate-500 font-medium">Student ID provides 50% discount on museums & travel.</p></div>
        </div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-emerald-50/50 border-emerald-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100"><Clock size={24} /></div><h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight">Work Rights</h3><p className="text-emerald-800/70 text-[11px] font-medium leading-relaxed">Permitted to work up to <span className="font-black">964 hours per year</span>.</p></div>
        <div className="mt-4 flex items-center justify-between"><span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Rate: €11.65+ /hr</span><Briefcase size={16} className="text-emerald-300" /></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-slate-900 border-slate-800 text-white flex flex-col justify-between min-h-[240px]">
        <div className="flex-1 flex items-center justify-center"><div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]"><TrendingUp className="text-white" size={32} /></div></div>
        <div className="mt-4"><h3 className="text-lg font-black uppercase tracking-tight">Post-Study APS</h3><p className="text-slate-400 text-[11px] font-medium mt-2">Master's graduates can apply for a <span className="text-white font-bold">1-year residence permit</span>.</p></div>
      </BentoCard>

      <BentoCard className="col-span-1 md:col-span-4 bg-blue-50 border-blue-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-6"><div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50"><Palette size={28}/></div><h3 className="text-lg font-black text-blue-900 uppercase tracking-tight leading-tight">Lifestyle Balance</h3><p className="text-blue-700/60 text-[11px] font-medium">From the Alps to the French Riviera—academic rigor meets ultimate culture.</p></div>
        <div className="flex gap-1 mt-4"><span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-blue-600 border border-blue-100">Culture</span><span className="px-2 py-1 bg-white text-[8px] font-black uppercase rounded-md text-blue-600 border border-blue-100">Nature</span></div>
      </BentoCard>

      <BentoCard className="col-span-2 md:col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 flex flex-col justify-between min-h-[240px]">
        <div className="space-y-4"><div className="flex items-center gap-3"><Heart size={20} className="text-blue-600" /><h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Global Alumni</h3></div><p className="text-slate-600 text-xs font-medium leading-relaxed">Join France Alumni, a worldwide network of former international students.</p></div>
        <div className="text-[9px] font-black uppercase text-blue-600 tracking-[0.2em] flex items-center gap-2">Strong Industry Links <Plane size={10} /></div>
      </BentoCard>
    </div>
  );
}
