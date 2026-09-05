import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Search, 
  Menu, 
  X, 
  GraduationCap, 
  Sparkles,
  BookOpen,
  HelpCircle,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80' 
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <Link 
            to="/"
            id="header-logo-btn"
            aria-label="SPPUCalc Home"
            className="flex items-center gap-3 group text-left focus:outline-hidden transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.01] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  SPPU<span className="text-blue-600">Calc</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 uppercase">
                  Pune Univ
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Academic Calculations for Students
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Hidden below 768px) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              id="nav-home-link"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.02] cursor-pointer ${
                isActive('/')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Home
            </Link>

            <Link
              to="/calculators"
              id="nav-calculators-link"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.02] cursor-pointer flex items-center gap-1.5 ${
                isActive('/calculators')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Calculators
              <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.2 rounded-full">
                17
              </span>
            </Link>

            <Link
              to="/sppu-cgpa-to-percentage"
              id="nav-cgpa-link"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.02] cursor-pointer ${
                isActive('/sppu-cgpa-to-percentage')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              CGPA → %
            </Link>

            <Link
              to="/how-it-works"
              id="nav-how-it-works-link"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.02] cursor-pointer ${
                isActive('/how-it-works')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              How It Works
            </Link>

            <Link
              to="/about"
              id="nav-about-link"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.02] cursor-pointer ${
                isActive('/about')
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              About & FAQs
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Instant Search Button */}
            <button
              id="header-search-trigger-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/60 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.02] cursor-pointer group"
              aria-label="Open search modal"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="hidden sm:inline">Search calculator...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white rounded border border-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Popular Shortcut Pill */}
            <Link
              to="/sppu-cgpa-to-percentage"
              id="header-popular-shortcut-btn"
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:scale-[1.02] cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              CGPA to %
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu-drawer" 
          className="md:hidden bg-white/98 backdrop-blur-lg border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
            Quick Navigation
          </div>
          <div className="grid grid-cols-1 gap-1">
            <Link
              to="/"
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-98 cursor-pointer block ${
                isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              🏠 Home
            </Link>

            <Link
              to="/calculators"
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all duration-200 active:scale-98 cursor-pointer ${
                isActive('/calculators') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                All 17 Calculators
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">17</span>
            </Link>

            <Link
              to="/sppu-cgpa-to-percentage"
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              SPPU CGPA to Percentage
            </Link>

            <Link
              to="/sppu-sgpa-to-cgpa"
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              SGPA to CGPA (Multi-Sem)
            </Link>

            <Link
              to="/internal-external-marks"
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              30 In-Sem + 70 End-Sem Rules
            </Link>

            <Link
              to="/how-it-works"
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              How It Works
            </Link>

            <Link
              to="/about"
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              About SPPU Grading & FAQs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
