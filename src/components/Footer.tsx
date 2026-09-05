import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';

export const Footer: React.FC = () => {
  const gpaCalcs = CALCULATORS.filter(c => c.category === 'gpa');
  const marksCalcs = CALCULATORS.filter(c => c.category === 'marks');
  const utilityCalcs = CALCULATORS.filter(c => c.category === 'utility');

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                SPPU<span className="text-blue-400">Calc</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Free, accurate, and student-first academic calculators designed specifically for students of Savitribai Phule Pune University (SPPU). Built to calculate CGPA, SGPA, percentage, marks, and passing criteria in seconds.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>SPPU 2019 / 2024 CBCS Pattern Verified</span>
            </div>
          </div>

          {/* Col 2: GPA Calculators */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              GPA Calculators
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {gpaCalcs.map(calc => (
                <li key={calc.id}>
                  <Link
                    to={`/${calc.slug}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {calc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Marks & Passing */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Marks & Passing
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {marksCalcs.map(calc => (
                <li key={calc.id}>
                  <Link
                    to={`/${calc.slug}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {calc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Utility & Planning */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Student Utilities
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {utilityCalcs.map(calc => (
                <li key={calc.id}>
                  <Link
                    to={`/${calc.slug}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {calc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Disclaimer & Legal Note */}
        <div className="pt-8 pb-4 text-xs text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-400">Official Disclaimer:</strong> This portal is an independent academic utility built for educational and estimation purposes by and for SPPU students. Conversion formulas are based on public circulars and standard Choice Based Credit System (CBCS) ordinances issued by Savitribai Phule Pune University. Always cross-verify with your college examination department and official university grade card for formal verification.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SPPU Calculator. Free forever for students.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made for SPPU students with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>in Pune, MH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
