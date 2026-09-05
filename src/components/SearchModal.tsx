import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calculator, ArrowRight } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSelect = (slug: string) => {
    navigate(`/${slug}`);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : {};
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = CALCULATORS.filter(calc => {
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const inTitle = calc.title.toLowerCase().includes(q);
    const inDesc = calc.description.toLowerCase().includes(q);
    const inKeywords = calc.keywords.some(k => k.toLowerCase().includes(q));
    const inFormula = calc.formulaSummary.toLowerCase().includes(q);

    return matchesCategory && (inTitle || inDesc || inKeywords || inFormula);
  });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault();
      handleSelect(filtered[0].slug);
    }
  };

  return (
    <div 
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 md:p-20 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search SPPU calculator (e.g. CGPA to %, Passing marks, In-sem...)"
            aria-label="Search SPPU calculators"
            className="w-full text-base sm:text-lg text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear query"
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50/80 border-b border-slate-100 overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'All (17)' },
            { id: 'gpa', label: 'SPPU GPA (6)' },
            { id: 'marks', label: 'Marks & Passing (6)' },
            { id: 'utility', label: 'Student Utility (5)' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200 active:scale-95 hover:scale-[1.02] cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Calculator className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-700">No calculators found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "CGPA", "SGPA", "Percentage", or "Passing marks"</p>
            </div>
          ) : (
            filtered.map((calc, idx) => (
              <button
                key={calc.id}
                onClick={() => handleSelect(calc.slug)}
                className="w-full p-3 rounded-2xl hover:bg-blue-50/60 transition-all duration-200 flex items-center justify-between text-left group active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-start gap-3 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800 group-hover:text-blue-700">
                        {calc.title}
                      </span>
                      {calc.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                          {calc.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {calc.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {idx === 0 && (
                    <span className="hidden sm:inline text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      ↵ Enter
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
