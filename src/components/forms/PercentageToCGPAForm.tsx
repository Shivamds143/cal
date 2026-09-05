import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { calculatePercentageToSPPUCGPA } from '../../lib/calculations/sppu';
import { CalculationResult, SPPUPattern, IllustrationState } from '../../types/calculator';

interface PercentageToCGPAFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

export const PercentageToCGPAForm: React.FC<PercentageToCGPAFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [percentage, setPercentage] = useState<string>('77.50');
  const [pattern, setPattern] = useState<SPPUPattern>('2019');
  const [error, setError] = useState<string>('');

  const handleInputChange = (val: string) => {
    setPercentage(val);
    setError('');
    onActiveInputChange(val);
    onStateChange('typing');
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const num = parseFloat(percentage);
    if (isNaN(num) || num < 0 || num > 100) {
      setError('Please enter a valid percentage between 0.00 and 100.00');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculatePercentageToSPPUCGPA(num, pattern);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Calculation error');
        onStateChange('idle');
      }
    }, 450);
  };

  const handleReset = () => {
    setPercentage('');
    setError('');
    onActiveInputChange('');
    onStateChange('idle');
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Syllabus Pattern
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPattern('2019')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              pattern === '2019'
                ? 'bg-blue-50/80 border-blue-600 text-blue-900 shadow-2xs font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold">SPPU 2019/2024 CBCS</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Inverse Piecewise Formula</div>
          </button>
          <button
            type="button"
            onClick={() => setPattern('general')}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              pattern === 'general'
                ? 'bg-blue-50/80 border-blue-600 text-blue-900 shadow-2xs font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold">General AICTE</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Percentage / 9.5</div>
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="pct-input" className="text-sm font-bold text-slate-800">
            Enter Aggregate Percentage (0% – 100%)
          </label>
          <span className="text-xs text-slate-400">e.g. 77.50%</span>
        </div>

        <div className="relative">
          <input
            id="pct-input"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={percentage}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="77.50"
            className={`w-full px-4 py-3.5 text-xl font-bold font-mono rounded-xl bg-slate-50 border-2 transition-all focus:outline-hidden ${
              error
                ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500'
                : 'border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900'
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
            %
          </div>
        </div>

        {error && (
          <p className="mt-1.5 text-xs font-semibold text-rose-600 animate-in fade-in">
            {error}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculate CGPA</span>
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
