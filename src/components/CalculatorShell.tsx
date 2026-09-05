import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Info, 
  ArrowRight,
  Calculator as CalcIcon,
  Layers,
  GraduationCap
} from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CalculatorMeta, CalculationResult, IllustrationState } from '../types/calculator';
import { CalculatorIllustration } from './CalculatorIllustration';
import { ResultCard } from './ResultCard';

// Forms
import { CGPAToPercentageForm } from './forms/CGPAToPercentageForm';
import { PercentageToCGPAForm } from './forms/PercentageToCGPAForm';
import { SGPAToCGPAForm } from './forms/SGPAToCGPAForm';
import { MarksPercentageForm } from './forms/MarksPercentageForm';
import { InternalExternalForm } from './forms/InternalExternalForm';
import { RequiredMarksForm } from './forms/RequiredMarksForm';
import { PassingMarksForm } from './forms/PassingMarksForm';
import { 
  TargetCGPAForm, 
  AttendanceForm, 
  RequiredAttendanceForm, 
  GradeForm, 
  ClassDivisionForm,
  CourseCGPAForm
} from './forms/UtilityForms';

interface CalculatorShellProps {
  slug: string;
  onNavigate: (slug: string) => void;
}

export const CalculatorShell: React.FC<CalculatorShellProps> = ({ slug, onNavigate }) => {
  const currentCalc = CALCULATORS.find(c => c.slug === slug) || CALCULATORS[0];
  
  const [illustrationState, setIllustrationState] = useState<IllustrationState>('idle');
  const [activeInput, setActiveInput] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Reset state when calculator changes
  useEffect(() => {
    setIllustrationState('idle');
    setActiveInput('');
    setResult(null);
    setOpenFaqIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleCalculate = (res: CalculationResult) => {
    setResult(res);
  };

  const relatedCalculators = CALCULATORS.filter(c => c.id !== currentCalc.id && (c.category === currentCalc.category || c.popular)).slice(0, 3);

  // Render the appropriate form based on slug
  const renderForm = () => {
    switch (currentCalc.slug) {
      case 'sppu-cgpa-to-percentage':
        return (
          <CGPAToPercentageForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'sppu-percentage-to-cgpa':
        return (
          <PercentageToCGPAForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'sppu-sgpa-to-percentage':
        return (
          <CGPAToPercentageForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'sppu-sgpa-to-cgpa':
      case 'semester-wise-cgpa':
        return (
          <SGPAToCGPAForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'sppu-cgpa-calculator':
        return (
          <CourseCGPAForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'marks-percentage':
      case 'total-marks-calculator':
      case 'average-marks-calculator':
        return (
          <MarksPercentageForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'internal-external-marks':
        return (
          <InternalExternalForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'required-marks':
        return (
          <RequiredMarksForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'passing-marks':
        return (
          <PassingMarksForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'target-cgpa-calculator':
        return (
          <TargetCGPAForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'attendance-percentage':
        return (
          <AttendanceForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'required-attendance':
        return (
          <RequiredAttendanceForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'grade-calculator':
        return (
          <GradeForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      case 'class-division-calculator':
        return (
          <ClassDivisionForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
      default:
        return (
          <CGPAToPercentageForm
            onCalculate={handleCalculate}
            onStateChange={setIllustrationState}
            onActiveInputChange={setActiveInput}
          />
        );
    }
  };

  return (
    <div id="calculator-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
        <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button onClick={() => onNavigate('calculators-hub')} className="hover:text-blue-600 transition-colors">
          Calculators
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">{currentCalc.shortTitle}</span>
      </nav>

      {/* Main Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
            {currentCalc.category === 'gpa' ? 'SPPU GPA Calculator' : currentCalc.category === 'marks' ? 'Marks & Passing' : 'Student Utility'}
          </span>
          {currentCalc.badge && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              ★ {currentCalc.badge}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {currentCalc.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {currentCalc.description}
        </p>
      </div>

      {/* Main Interactive 2-Column Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
        
        {/* Left Column (Forms & Results) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm shadow-slate-100">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  🧮
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-800">
                  {currentCalc.shortTitle} Tool
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                ● Live Client-Side
              </span>
            </div>

            {/* The Active Form */}
            {renderForm()}
          </div>

          {/* Result Card */}
          {result && (
            <ResultCard result={result} loading={illustrationState === 'calculating'} />
          )}
        </div>

        {/* Right Column (Animated 3D Student + Blue Calculator Illustration) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Illustration Status Banner */}
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-100 text-xs text-slate-500">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Interactive Visual Assistant
              </span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                illustrationState === 'success' ? 'bg-emerald-100 text-emerald-800' :
                illustrationState === 'calculating' ? 'bg-blue-100 text-blue-800 animate-pulse' :
                illustrationState === 'typing' ? 'bg-indigo-100 text-indigo-800' :
                'bg-slate-100 text-slate-600'
              }`}>
                {illustrationState === 'success' ? 'Calculated!' : illustrationState === 'calculating' ? 'Processing...' : illustrationState === 'typing' ? 'Entering value' : 'Ready'}
              </span>
            </div>

            {/* The 3D Student Illustration */}
            <CalculatorIllustration
              state={illustrationState}
              activeValue={activeInput}
              resultValue={result ? result.primaryValue : ''}
              className="my-2"
            />

            <p className="text-center text-xs text-slate-400 mt-2">
              Move cursor over illustration for 3D parallax. Screen mirrors calculation values!
            </p>
          </div>
        </div>

      </div>

      {/* Official Formula Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Official SPPU Formula & Conversion Rules
            </h2>
            <p className="text-xs text-slate-500">Savitribai Phule Pune University CBCS Regulations</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-800 leading-relaxed mb-6">
          {currentCalc.formulaSummary}
        </div>

        {/* Step-by-Step Example */}
        {currentCalc.example && (
          <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-200/70 space-y-2">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Step-by-Step Example:
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 font-semibold">
              <strong>Given: </strong>{currentCalc.example.input}
            </p>
            <p className="text-xs sm:text-sm text-blue-700 font-semibold">
              <strong>Calculated Result: </strong>{currentCalc.example.output}
            </p>
            <p className="text-xs text-slate-600">
              {currentCalc.example.explanation}
            </p>
          </div>
        )}
      </section>

      {/* FAQs Section for this Calculator */}
      {currentCalc.faqs && currentCalc.faqs.length > 0 && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">Answers to common student questions about {currentCalc.shortTitle}</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {currentCalc.faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-800 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600 shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6 animate-in fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Calculators Grid */}
      <section className="mt-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">
          Related SPPU Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedCalculators.map(calc => (
            <button
              key={calc.id}
              onClick={() => onNavigate(calc.slug)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CalcIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {calc.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {calc.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 mt-4 group-hover:translate-x-1 transition-transform">
                <span>Calculate Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
