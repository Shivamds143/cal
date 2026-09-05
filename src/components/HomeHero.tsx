import React, { useMemo, useState } from 'react';
import { Search, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';

interface HomeHeroProps {
  onOpenSearch: () => void;
  onNavigate: (slug: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onOpenSearch, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularCards = useMemo(() => {
    const order = [
      'sppu-cgpa-to-percentage',
      'sppu-sgpa-to-cgpa',
      'sppu-percentage-to-cgpa',
      'passing-marks',
      'internal-external-marks',
      'required-attendance',
    ];

    return order
      .map(slug => CALCULATORS.find(calc => calc.slug === slug))
      .filter((calc): calc is (typeof CALCULATORS)[number] => Boolean(calc));
  }, []);

  const handleSearch = (event?: React.FormEvent) => {
    event?.preventDefault();

    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      onOpenSearch();
      return;
    }

    const directMatch = CALCULATORS.find(
      calc =>
        calc.slug.toLowerCase() === query ||
        calc.title.toLowerCase().includes(query) ||
        calc.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );

    if (directMatch) {
      onNavigate(directMatch.slug);
      return;
    }

    onOpenSearch();
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] pt-6 pb-8 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
            <GraduationCap className="h-3.5 w-3.5" />
            SPPU Academic Calculators
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Calculate your SPPU results quickly and accurately.
          </h1>

          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            CGPA, SGPA, Percentage, Passing Marks, Attendance and more.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mx-auto mt-7 max-w-2xl">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm ring-1 ring-slate-100 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search calculators..."
              aria-label="Search calculators"
              className="w-full border-0 bg-transparent px-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none sm:text-base"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleSearch(event);
                }
              }}
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-10 sm:mt-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-600">Popular Calculators</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Start with the essentials
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {popularCards.map(calc => (
              <button
                key={calc.id}
                type="button"
                onClick={() => onNavigate(calc.slug)}
                className="group rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_40px_rgba(59,130,246,0.12)] active:scale-[0.99]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 shadow-sm">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  {calc.badge && (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
                      {calc.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-blue-700">
                  {calc.shortTitle || calc.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {calc.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                  Calculate
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
