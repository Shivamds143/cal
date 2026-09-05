import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, GraduationCap, ShieldCheck, Award, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does SPPU use CGPA × 9.5 to convert to Percentage?',
      a: 'No. While CBSE and some technical boards use 9.5, SPPU CBCS circulars officially prescribe a piecewise formula (e.g. for CGPA between 8.25 and 9.24, Percentage = 75 + (CGPA - 8.25) × 10). Using 9.5 can produce discrepancies on official verification.'
    },
    {
      q: 'What is the minimum passing score in SPPU In-Sem and End-Sem exams?',
      a: 'For a 100-mark theory course (30 In-Sem + 70 End-Sem), you must secure at least 28 marks (40%) in the End-Semester exam individually, and at least 40 marks out of 100 in total.'
    },
    {
      q: 'How is CGPA calculated from SGPA across multiple semesters?',
      a: 'CGPA is calculated as the credit-weighted average: CGPA = Σ(SGPA_i × Credits_i) / Σ(Credits_i). If all semesters have identical credits (e.g. 20 credits each), it simplifies to the arithmetic mean of the SGPAs.'
    },
    {
      q: 'What CGPA is required for First Class with Distinction in SPPU?',
      a: 'A cumulative CGPA of 7.75 or higher qualifies for First Class with Distinction. A CGPA of 6.75 to 7.74 qualifies for First Class, 6.25 to 6.74 for Higher Second Class, and 5.50 to 6.24 for Second Class.'
    },
    {
      q: 'How do backlogs (ATKT) affect my CGPA calculation?',
      a: 'When you clear a backlog subject in subsequent examination cycles, the newly earned grade points replace the previous zero or failing grade points in the cumulative credit calculations.'
    },
    {
      q: 'Is this calculator free and safe to use?',
      a: 'Yes, 100% free forever. All calculations are carried out entirely client-side inside your web browser. No personal student data is stored or transferred to any remote servers.'
    }
  ];

  const gradeTable = [
    { grade: 'O', point: 10, marks: '80% – 100%', desc: 'Outstanding' },
    { grade: 'A+', point: 9, marks: '70% – 79%', desc: 'Excellent' },
    { grade: 'A', point: 8, marks: '60% – 69%', desc: 'Very Good' },
    { grade: 'B+', point: 7, marks: '55% – 59%', desc: 'Good' },
    { grade: 'B', point: 6, marks: '50% – 54%', desc: 'Above Average' },
    { grade: 'C', point: 5, marks: '45% – 49%', desc: 'Average' },
    { grade: 'P', point: 4, marks: '40% – 44%', desc: 'Pass' },
    { grade: 'F', point: 0, marks: '< 40%', desc: 'Fail / ATKT' },
  ];

  return (
    <div id="about-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>SPPU Academic Reference</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          About & University FAQs
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Comprehensive guide to Savitribai Phule Pune University (SPPU) grading systems, letter grades, and academic policies.
        </p>
      </div>

      {/* SPPU 10-Point Letter Grade Scale Table */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              SPPU 10-Point UGC-CBCS Letter Grading Scale
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Official grade points and mark distribution ranges
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4">Grade Point</th>
                <th className="py-3 px-4">Marks Range (%)</th>
                <th className="py-3 px-4">Performance Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
              {gradeTable.map(row => (
                <tr key={row.grade} className="hover:bg-blue-50/50">
                  <td className="py-3 px-4 font-bold text-blue-700 text-base">{row.grade}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{row.point}</td>
                  <td className="py-3 px-4">{row.marks}</td>
                  <td className="py-3 px-4 font-sans text-slate-700 font-medium">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Student FAQs Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Frequently Asked Academic Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clarifications regarding SPPU examinations, percentage conversion, and degree honours
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4.5">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="font-bold text-sm sm:text-base text-slate-800 group-hover:text-blue-600 transition-colors">
                  {faq.q}
                </span>
                {openIdx === idx ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600 shrink-0" />
                )}
              </button>

              {openIdx === idx && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6 animate-in fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
