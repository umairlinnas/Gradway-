import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
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
  { id: 1, title: "Home", url: "#top", icon: <Home className="w-3.5 h-3.5" /> },
  { id: 2, title: "About Us", url: "#aboutus", icon: <User className="w-3.5 h-3.5" /> },
  { id: 3, title: "Services", url: "#services", icon: <Settings className="w-3.5 h-3.5" /> },
  { id: 4, title: "Destinations", url: "#destinations", icon: <Info className="w-3.5 h-3.5" /> },
  { id: 5, title: "Stories", url: "#stories", icon: <Quote className="w-3.5 h-3.5" /> },
  { id: 6, title: "Contact", url: "#contact", icon: <Mail className="w-3.5 h-3.5" /> }
]

export const ScrollNavigation: React.FC<ScrollNavbarProps> = ({ 
  menuItems = defaultMenuItems,
  className = "",
  logoUrl = ""
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Reveal glass and enlarge logo when scrolling past 10px
    setIsScrolled(latest > 10)
  })

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
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
          "fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ease-in-out py-3",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-100" 
            : "bg-transparent border-transparent",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-12 md:h-14">
            <motion.div
              className="flex-shrink-0"
              animate={{ 
                scale: isScrolled ? 1.3 : 1,
                y: isScrolled ? 6 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <a href="#top" className="block">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden p-1.5 border border-slate-100/50">
                  <img src={logoUrl} alt="Gradway" className="w-full h-full object-contain" />
                </div>
              </a>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-0.5">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={item.url}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                      "text-[#1A1F2C] hover:text-amber-500"
                    )}
                  >
                    {item.title}
                  </a>
                  {hoveredItem === item.id && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-amber-50/80 rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
              ))}
              <button className="ml-4 bg-amber-500 text-white px-5 py-2 rounded-full shadow-lg shadow-amber-200/40 hover:bg-amber-600 hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-[8px]">
                Assessment
              </button>
            </div>

            <div className="lg:hidden">
              <motion.button
                onClick={toggleMenu}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300",
                  isScrolled ? "bg-[#1A1F2C] text-white shadow-xl" : "bg-white text-[#1A1F2C] shadow-md border border-slate-100"
                )}
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
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a0d14]/50 backdrop-blur-md cursor-pointer"
              onClick={toggleMenu}
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative w-full max-w-[300px] bg-white border border-slate-50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[310] flex flex-col overflow-hidden"
            >
              <div className="p-5 flex flex-col items-center">
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 rounded-full hover:bg-slate-50 transition-colors z-[320]"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>

                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md p-1.5 border border-slate-50 mb-5">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>

                <div className="w-full space-y-1.5">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        href={item.url}
                        onClick={toggleMenu}
                        className="flex items-center space-x-3.5 px-4 py-2.5 rounded-[1.1rem] bg-slate-50/80 hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all group"
                      >
                        <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-amber-500 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className="text-[8.5px] font-black uppercase tracking-[0.15em] text-[#1A1F2C]">
                          {item.title}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 w-full flex flex-col items-center">
                  <div className="flex justify-center gap-3.5 mb-2.5">
                    <a href="https://wa.me/94775009929" className="text-slate-300 hover:text-green-500 transition-colors"><i className="fa-brands fa-whatsapp text-sm"></i></a>
                    <a href="https://web.facebook.com/p/GradWay-Education-Consultancy-61577557164852" className="text-slate-300 hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook text-sm"></i></a>
                    <a href="https://www.instagram.com/gradway_education" className="text-slate-300 hover:text-pink-500 transition-colors"><i className="fa-brands fa-instagram text-sm"></i></a>
                  </div>
                  <p className="text-[7.5px] font-black text-slate-300 uppercase tracking-widest">Migration Simplified</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
