import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculatePassingMarks } from '../../lib/calculations/marks';
import { CalculationResult, IllustrationState } from '../../types/calculator';

interface PassingMarksFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

export const PassingMarksForm: React.FC<PassingMarksFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [maxMarks, setMaxMarks] = useState<string>('70');
  const [passingPct, setPassingPct] = useState<number>(40);
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const maxVal = parseFloat(maxMarks);

    if (isNaN(maxVal) || maxVal <= 0) {
      setError('Please enter a valid positive total maximum marks');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculatePassingMarks(maxVal, passingPct);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Calculation error');
        onStateChange('idle');
      }
    }, 450);
  };

  const handleReset = () => {
    setMaxMarks('70');
    setPassingPct(40);
    setError('');
    onActiveInputChange('');
    onStateChange('idle');
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Enter Total Maximum Marks of Head / Subject
        </label>
        <div className="relative">
          <input
            type="number"
            step="1"
            min="1"
            value={maxMarks}
            onChange={e => {
              setMaxMarks(e.target.value);
              setError('');
              onActiveInputChange(e.target.value);
              onStateChange('typing');
            }}
            placeholder="e.g. 70 or 100"
            className="w-full px-4 py-3.5 text-xl font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
            MAX MARKS
          </div>
        </div>
      </div>

      {/* Common SPPU Examination Heads */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 mr-2">SPPU Standard Heads:</span>
        <div className="inline-flex flex-wrap gap-1.5 mt-1">
          {[
            { label: 'End-Sem Theory (70 marks)', val: '70' },
            { label: 'Combined Theory (100 marks)', val: '100' },
            { label: 'Practical / Oral (50 marks)', val: '50' },
            { label: 'Term Work (25 marks)', val: '25' },
            { label: 'Audit Course (50 marks)', val: '50' },
          ].map(h => (
            <button
              key={h.label}
              type="button"
              onClick={() => {
                setMaxMarks(h.val);
                onActiveInputChange(h.val);
              }}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 transition-colors"
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-xs font-semibold text-rose-600 animate-in fade-in">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Find Minimum Passing Marks</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
