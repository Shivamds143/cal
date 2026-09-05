import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight,
  Calculator
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <div id="how-it-works-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>SPPU Grading Framework Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          How SPPU Academic Calculations Work
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Understanding the official Savitribai Phule Pune University (SPPU) CBCS conversion formulas, passing cutoffs, and grade classifications.
        </p>
      </div>

      {/* 1. The SPPU CGPA to Percentage Piecewise Table */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              The SPPU Piecewise CGPA to Percentage Formula
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Why SPPU does NOT use a simple "CGPA × 9.5" formula for 2019/2024 patterns
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Unlike universities that use a linear multiplier, SPPU established a <strong>piecewise range-based formula</strong> in its official circulars. This ensures higher fidelity across grade bands:
        </p>

        {/* Piecewise Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">CGPA Range</th>
                <th className="py-3 px-4">Official Formula Equation</th>
                <th className="py-3 px-4">Resulting Percentage Range</th>
                <th className="py-3 px-4">Honours / Division</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">9.75 – 10.00</td>
                <td className="py-3 px-4 text-blue-700 font-semibold">95.0 + (CGPA - 9.75) × 20</td>
                <td className="py-3 px-4">95.0% – 100.0%</td>
                <td className="py-3 px-4 font-sans font-bold text-amber-600">First Class with Distinction</td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">9.25 – 9.74</td>
                <td className="py-3 px-4 text-blue-700 font-semibold">85.0 + (CGPA - 9.25) × 20</td>
                <td className="py-3 px-4">85.0% – 94.8%</td>
                <td className="py-3 px-4 font-sans font-bold text-amber-600">First Class with Distinction</td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">8.25 – 9.24</td>
                <td className="py-3 px-4 text-blue-700 font-semibold">75.0 + (CGPA - 8.25) × 10</td>
                <td className="py-3 px-4">75.0% – 84.9%</td>
                <td className="py-3 px-4 font-sans font-bold text-amber-600">First Class with Distinction</td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">7.25 – 8.24</td>
                <td className="py-3 px-4 text-blue-700 font-semibold">65.0 + (CGPA - 7.25) × 10</td>
                <td className="py-3 px-4">65.0% – 74.9%</td>
                <td className="py-3 px-4 font-sans font-bold text-blue-600">First Class</td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">6.75 – 7.24</td>
                <td className="py-3 px-4 text-blue-700 font-semibold">60.0 + (CGPA - 6.75) × 10</td>
                <td className="py-3 px-4">60.0% – 64.9%</td>
                <td className="py-3 px-4 font-sans font-bold text-blue-600">First Class</td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">5.75 – 6.74</td>
                <td className="py-3 px-4 text-blue-700 font-semibold">50.0 + (CGPA - 5.75) × 10</td>
                <td className="py-3 px-4">50.0% – 59.9%</td>
                <td className="py-3 px-4 font-sans text-slate-700">Higher Second Class</td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">4.75 – 5.74</td>
                <td className="py-3 px-4 text-blue-700 font-semibold">40.0 + (CGPA - 4.75) × 10</td>
                <td className="py-3 px-4">40.0% – 49.9%</td>
                <td className="py-3 px-4 font-sans text-slate-700">Second Class / Pass Class</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2">
          <Link
            to="/sppu-cgpa-to-percentage"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <Calculator className="w-4 h-4" />
            <span>Try SPPU CGPA to Percentage Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Passing Rules: 30 In-Sem & 70 End-Sem */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              SPPU Engineering Passing Rules (In-Sem & End-Sem)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Two mandatory conditions every student must meet in theory courses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Rule 1: End-Sem Cutoff</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              You <strong>MUST score at least 28 marks out of 70</strong> (40%) in the End-Semester written examination independently. Even if your In-Sem score is 30/30, scoring below 28 in End-Sem results in an <strong>'F' / ATKT</strong> grade.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Rule 2: Combined 40% Aggregate</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              The combined total of (In-Sem Marks + End-Sem Marks) <strong>MUST be at least 40 marks out of 100</strong>. If you score exactly 28 in End-Sem, you must have scored at least 12 marks in In-Sem.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/internal-external-marks"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Check In-Sem / End-Sem Marks Rule</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. 75% Attendance Requirement */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              The 75% Attendance Mandate & Safe Bunking
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              SPPU ordinance regarding minimum attendance for examination eligibility
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Under university ordinances, a student is required to maintain a minimum of <strong>75% attendance</strong> across theoretical and laboratory lectures to be eligible for the end-semester examination. Our attendance calculator tells you exactly how many consecutive lectures you can safely skip or how many more you must attend to cross the 75% threshold.
        </p>

        <div className="pt-2">
          <Link
            to="/required-attendance"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Open 75% Attendance & Bunk Planner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
