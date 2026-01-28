import * as React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Tag, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import { GlowingEffect } from "./glowing-effect";

export interface Offer {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  brandLogoSrc: string;
  brandName: string;
  promoCode?: string;
  href: string;
}

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = React.forwardRef<HTMLAnchorElement, OfferCardProps>(({ offer }, ref) => (
  <motion.a
    ref={ref}
    href={offer.href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex-shrink-0 w-[280px] sm:w-[300px] h-[380px] rounded-[2.5rem] overflow-hidden group snap-start bg-white border border-slate-100 shadow-sm"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <GlowingEffect spread={40} proximity={200} />
    {/* Background Image */}
    <div className="h-2/5 overflow-hidden relative z-10">
      <img
        src={offer.imageSrc}
        alt={offer.imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
    </div>

    {/* Card Content */}
    <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-white p-6 flex flex-col justify-between z-10">
      <div className="space-y-4">
        <div className="flex">
          <div className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
            <Tag className="w-3 h-3 mr-1.5 fill-white text-white" />
            <span>{offer.tag}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black text-[#1A1F2C] leading-tight uppercase tracking-tight group-hover:text-blue-600 transition-colors">
            {offer.title}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 mt-2">
            {offer.description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className="text-blue-600" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {offer.brandName}
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transform transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-blue-600 group-hover:text-white shadow-sm">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.a>
));
OfferCard.displayName = "OfferCard";

export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
}

const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8;
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div ref={ref} className={cn("relative w-full group/carousel", className)} {...props}>
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-xl hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2 pt-4"
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
        
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-xl hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    );
  }
);
OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };