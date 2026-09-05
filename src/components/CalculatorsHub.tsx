import React, { useState } from 'react';
import { 
  Calculator as CalcIcon, 
  ArrowRight, 
  Search, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Target, 
  UserCheck, 
  Layers 
} from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CalculatorCategory } from '../types/calculator';

interface CalculatorsHubProps {
  onNavigate: (slug: string) => void;
}

export const CalculatorsHub: React.FC<CalculatorsHubProps> = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState<'all' | CalculatorCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = CALCULATORS.filter(calc => {
    const matchesCat = selectedTab === 'all' || calc.category === selectedTab;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    return matchesCat && (
      calc.title.toLowerCase().includes(q) ||
      calc.description.toLowerCase().includes(q) ||
      calc.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  const categories = [
    { id: 'all', label: 'All Calculators', count: CALCULATORS.length, icon: '🌟' },
    { id: 'gpa', label: 'SPPU GPA Calculators', count: CALCULATORS.filter(c => c.category === 'gpa').length, icon: '🎓' },
    { id: 'marks', label: 'Marks & Passing Rules', count: CALCULATORS.filter(c => c.category === 'marks').length, icon: '📑' },
    { id: 'utility', label: 'Student Utilities', count: CALCULATORS.filter(c => c.category === 'utility').length, icon: '⚡' },
  ];

  return (
    <div id="calculators-hub-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete SPPU Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          All 17 SPPU Student Calculators
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600">
          From CBCS CGPA conversions to In-Sem passing criteria and 75% attendance planning—select any calculator below to get instant results.
        </p>

        {/* Search input in Hub */}
        <div className="mt-6 max-w-md mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter calculators (e.g. CGPA, In-sem, Target)..."
            className="w-full px-4 py-3 pl-10 text-sm font-semibold rounded-2xl bg-white border border-slate-300 focus:border-blue-600 focus:outline-hidden shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedTab(cat.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedTab === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              selectedTab === cat.id ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid of Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(calc => (
          <div
            key={calc.id}
            onClick={() => {
              onNavigate(calc.slug);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Card Top: Icon & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                  <CalcIcon className="w-6 h-6" />
                </div>
                {calc.badge && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                    {calc.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {calc.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {calc.description}
              </p>
            </div>

            {/* Formula Snippet & Action Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 truncate max-w-[60%]">
                {calc.formulaSummary.split(':')[0]}
              </span>
              <div className="flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Calculate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
