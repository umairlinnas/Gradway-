
import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Home, User, Settings, Mail, Info, Quote } from "lucide-react"
import { cn } from "../../lib/utils"

interface MenuItem {
  id: number
  title: string
  url: string
  icon: React.ReactNode
}

interface ScrollNavbarProps {
  menuItems?: MenuItem[]
  className?: string
  logoUrl?: string
}

const defaultMenuItems: MenuItem[] = [
  { id: 1, title: "Home", url: "top", icon: <Home className="w-3.5 h-3.5" /> },
  { id: 2, title: "About Us", url: "aboutus", icon: <User className="w-3.5 h-3.5" /> },
  { id: 3, title: "Services", url: "services", icon: <Settings className="w-3.5 h-3.5" /> },
  { id: 4, title: "Destinations", url: "destinations", icon: <Info className="w-3.5 h-3.5" /> },
  { id: 5, title: "Stories", url: "stories", icon: <Quote className="w-3.5 h-3.5" /> },
  { id: 6, title: "Contact", url: "contact", icon: <Mail className="w-3.5 h-3.5" /> }
]

export const ScrollNavigation: React.FC<ScrollNavbarProps> = ({ 
  menuItems = defaultMenuItems,
  className = "",
  logoUrl = ""
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolled])

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 60; // Updated from 70 to 60
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'top' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Fix: Use 'as const' on transition types to satisfy TypeScript's strict animation generator types.
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: { 
        type: "spring" as const, 
        stiffness: 400, 
        damping: 40, 
        staggerChildren: 0.03, 
        staggerDirection: -1 
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 350, 
        damping: 30, 
        staggerChildren: 0.05, 
        delayChildren: 0.05 
      }
    }
  }

  const itemVariants = {
    closed: { y: 10, opacity: 0 },
    open: { y: 0, opacity: 1 }
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ease-in-out",
          isScrolled 
            ? "py-3 bg-white/75 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-b border-slate-200/50" 
            : "py-5 md:py-6 bg-transparent border-transparent shadow-none",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-12 md:h-14">
            <motion.div
              className="flex-shrink-0 origin-left"
              animate={{ scale: isScrolled ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <a href="#top" onClick={(e) => scrollToSection(e, 'top')} className="block">
                <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden p-1.5 border border-slate-100">
                  <img src={logoUrl} alt="Gradway" className="w-full h-full object-contain" />
                </div>
              </a>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={`#${item.url}`}
                    onClick={(e) => scrollToSection(e, item.url)}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                      "text-[#1A1F2C] hover:text-amber-600"
                    )}
                  >
                    {item.title}
                  </a>
                  {hoveredItem === item.id && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-amber-50/90 rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
              ))}
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="ml-4 bg-amber-500 text-white px-6 py-2.5 rounded-full shadow-lg shadow-amber-200/40 hover:bg-amber-600 hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-[9px]"
              >
                Assessment
              </a>
            </div>

            <div className="lg:hidden">
              <motion.button
                onClick={toggleMenu}
                className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 shadow-md border border-slate-100 bg-white text-[#1A1F2C]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a0d14]/60 backdrop-blur-lg cursor-pointer"
              onClick={toggleMenu}
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative w-full max-w-[280px] bg-white border border-slate-50 rounded-[2.5rem] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)] z-[310] flex flex-col overflow-hidden max-h-[85vh]"
            >
              <div className="p-5 flex flex-col items-center overflow-y-auto scrollbar-hide">
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 rounded-full hover:bg-slate-50 transition-colors z-[320]"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>

                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md p-1.5 border border-slate-50 mb-4 mt-2">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>

                <div className="w-full space-y-1">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        href={`#${item.url}`}
                        onClick={(e) => scrollToSection(e, item.url)}
                        className="flex items-center space-x-3.5 px-4 py-2.5 rounded-[1.25rem] bg-slate-50/80 hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all group"
                      >
                        <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-amber-500 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className="text-[8.5px] font-black uppercase tracking-[0.2em] text-[#1A1F2C]">
                          {item.title}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 w-full flex flex-col items-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <motion.a 
                      href="https://wa.me/94775009929" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#25D366]"
                      whileHover={{ scale: 1.3, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fa-brands fa-whatsapp text-xl"></i>
                    </motion.a>
                    <motion.a 
                      href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#1877F2]"
                      whileHover={{ scale: 1.3, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fa-brands fa-facebook text-xl"></i>
                    </motion.a>
                    <motion.a 
                      href="https://www.instagram.com/gradway_education" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#E4405F]"
                      whileHover={{ scale: 1.3, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fa-brands fa-instagram text-xl"></i>
                    </motion.a>
                    <motion.a 
                      href="https://www.linkedin.com/company/gradway-pvt-ltd-sl/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#0077B5]"
                      whileHover={{ scale: 1.3, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fa-brands fa-linkedin text-xl"></i>
                    </motion.a>
                  </div>
                  
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-[8px] font-black text-[#1A1F2C] uppercase tracking-[0.3em]">Migration</span>
                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em]">Simplified!!</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
