import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeHero } from './components/HomeHero';
import { CalculatorsHub } from './components/CalculatorsHub';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { CalculatorShell } from './components/CalculatorShell';
import { CALCULATORS } from './data/calculators';
import { 
  Calculator as CalcIcon, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  Clock,
  Compass
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (slug: string) => {
    setActiveTab(slug);
    window.location.hash = slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if activeTab matches a specific calculator slug
  const isCalculatorPage = CALCULATORS.some(c => c.slug === activeTab);

  // Popular calculators for the homepage highlight
  const popularCalculators = CALCULATORS.filter(c => c.popular);
  const marksCalculators = CALCULATORS.filter(c => c.category === 'marks').slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Sticky Navigation */}
      <Header
        activeTab={activeTab}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={navigateTo}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HomeHero
              onOpenSearch={() => setIsSearchOpen(true)}
              onNavigate={navigateTo}
            />

            <CalculatorsHub onNavigate={navigateTo} />
          </div>
        )}

        {/* 2. All 17 Calculators Hub Page */}
        {activeTab === 'calculators-hub' && (
          <CalculatorsHub onNavigate={navigateTo} />
        )}

        {/* 3. How It Works Page */}
        {activeTab === 'how-it-works' && (
          <HowItWorks onNavigate={navigateTo} />
        )}

        {/* 4. About & FAQs Page */}
        {activeTab === 'about' && (
          <AboutSection />
        )}

        {/* 5. Specific Calculator Tool Page */}
        {isCalculatorPage && (
          <CalculatorShell
            slug={activeTab}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}
export default App;
