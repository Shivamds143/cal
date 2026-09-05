import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight, Target } from 'lucide-react';
import { calculateRequiredMarks } from '../../lib/calculations/marks';
import { CalculationResult, IllustrationState } from '../../types/calculator';

interface RequiredMarksFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

export const RequiredMarksForm: React.FC<RequiredMarksFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [inSem, setInSem] = useState<string>('18');
  const [inSemMax] = useState<number>(30);
  const [endSemMax] = useState<number>(70);
  const [targetPercent, setTargetPercent] = useState<string>('60');
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const inVal = parseFloat(inSem);
    const targetVal = parseFloat(targetPercent);

    if (isNaN(inVal) || isNaN(targetVal)) {
      setError('Please enter valid scores for In-Sem and Target %');
      onStateChange('idle');
      return;
    }
    if (inVal < 0 || inVal > inSemMax) {
      setError(`In-Sem marks must be between 0 and ${inSemMax}`);
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateRequiredMarks(inVal, inSemMax, endSemMax, targetVal);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Calculation error');
        onStateChange('idle');
      }
    }, 450);
  };

  const handleReset = () => {
    setInSem('');
    setTargetPercent('40');
    setError('');
    onActiveInputChange('');
    onStateChange('idle');
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* In-Sem Score */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Your In-Sem Marks (out of 30)
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="30"
            value={inSem}
            onChange={e => {
              setInSem(e.target.value);
              setError('');
              onActiveInputChange(e.target.value);
              onStateChange('typing');
            }}
            placeholder="e.g. 18"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        {/* Desired Target Aggregate % */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Desired Target Score (%)
          </label>
          <input
            type="number"
            step="1"
            min="40"
            max="100"
            value={targetPercent}
            onChange={e => {
              setTargetPercent(e.target.value);
              setError('');
            }}
            placeholder="e.g. 60"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Target Quick Presets */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 mr-2">Target Goals:</span>
        <div className="inline-flex flex-wrap gap-1.5 mt-1">
          {[
            { label: 'Just Pass (40%)', val: '40' },
            { label: 'Higher Second (55%)', val: '55' },
            { label: 'First Class (60%)', val: '60' },
            { label: 'Distinction (75%)', val: '75' },
          ].map(goal => (
            <button
              key={goal.val}
              type="button"
              onClick={() => setTargetPercent(goal.val)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 transition-colors"
            >
              {goal.label}
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
          <Target className="w-4 h-4" />
          <span>Find Needed End-Sem Score</span>
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
