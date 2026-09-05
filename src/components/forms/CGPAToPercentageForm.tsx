import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { calculateSPPUCGPAToPercentage } from '../../lib/calculations/sppu';
import { CalculationResult, SPPUPattern, IllustrationState } from '../../types/calculator';

interface CGPAToPercentageFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

export const CGPAToPercentageForm: React.FC<CGPAToPercentageFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [cgpa, setCgpa] = useState<string>('8.50');
  const [pattern, setPattern] = useState<SPPUPattern>('2019');
  const [error, setError] = useState<string>('');

  const handleInputChange = (val: string) => {
    setCgpa(val);
    setError('');
    onActiveInputChange(val);
    onStateChange('typing');
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const num = parseFloat(cgpa);
    if (isNaN(num) || num < 0 || num > 10) {
      setError('Please enter a valid CGPA between 0.00 and 10.00');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateSPPUCGPAToPercentage(num, pattern);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Calculation error');
        onStateChange('idle');
      }
    }, 450);
  };

  const handleReset = () => {
    setCgpa('');
    setError('');
    onActiveInputChange('');
    onStateChange('idle');
  };

  const quickSamples = ['7.50', '8.25', '8.75', '9.20', '9.80'];

  return (
    <form onSubmit={handleCalculate} className="space-y-5">
      {/* Pattern Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select SPPU Syllabus Pattern
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: '2019', label: '2019 Pattern (CBCS)', sub: 'Current Engineering' },
            { id: '2024', label: '2024 Pattern (NEP)', sub: 'New CBCS Syllabus' },
            { id: 'general', label: 'General / AICTE', sub: 'Linear (CGPA × 9.5)' },
          ].map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPattern(p.id as SPPUPattern)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                pattern === p.id
                  ? 'bg-blue-50/80 border-blue-600 text-blue-900 shadow-2xs font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{p.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 truncate">{p.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main CGPA Input Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="cgpa-input" className="text-sm font-bold text-slate-800">
            Enter Your SPPU CGPA (0.00 – 10.00)
          </label>
          <span className="text-xs text-slate-400">e.g. 8.50 or 7.82</span>
        </div>

        <div className="relative">
          <input
            id="cgpa-input"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={cgpa}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="8.50"
            className={`w-full px-4 py-3.5 text-xl font-bold font-mono rounded-xl bg-slate-50 border-2 transition-all focus:outline-hidden ${
              error
                ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500'
                : 'border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900'
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
            CGPA
          </div>
        </div>

        {error && (
          <p className="mt-1.5 text-xs font-semibold text-rose-600 animate-in fade-in">
            {error}
          </p>
        )}
      </div>

      {/* Quick Sample CGPA Chips */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 mr-2">Try sample:</span>
        <div className="inline-flex flex-wrap gap-1.5 mt-1">
          {quickSamples.map(sample => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                handleInputChange(sample);
              }}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 border border-slate-200 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculate Percentage</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
          title="Reset form"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
