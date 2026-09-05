import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { calculateInternalExternalMarks } from '../../lib/calculations/marks';
import { CalculationResult, IllustrationState } from '../../types/calculator';

interface InternalExternalFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

export const InternalExternalForm: React.FC<InternalExternalFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [inSem, setInSem] = useState<string>('24');
  const [inSemMax, setInSemMax] = useState<number>(30);
  const [endSem, setEndSem] = useState<string>('34');
  const [endSemMax, setEndSemMax] = useState<number>(70);
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const inVal = parseFloat(inSem);
    const endVal = parseFloat(endSem);

    if (isNaN(inVal) || isNaN(endVal)) {
      setError('Please enter valid scores for both In-Sem and End-Sem');
      onStateChange('idle');
      return;
    }
    if (inVal < 0 || inVal > inSemMax) {
      setError(`In-Sem score must be between 0 and ${inSemMax}`);
      onStateChange('idle');
      return;
    }
    if (endVal < 0 || endVal > endSemMax) {
      setError(`End-Sem score must be between 0 and ${endSemMax}`);
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateInternalExternalMarks(inVal, inSemMax, endVal, endSemMax);
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
    setEndSem('');
    setError('');
    onActiveInputChange('');
    onStateChange('idle');
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      {/* SPPU Passing Rule Callout */}
      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">SPPU Engineering Passing Rule: </span>
          <span>Requires at least <strong>28 / 70</strong> in End-Sem AND <strong>40 / 100</strong> combined.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* In-Sem Marks */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              In-Sem Score (out of {inSemMax})
            </label>
            <span className="text-[10px] font-semibold text-slate-400">Max {inSemMax}</span>
          </div>
          <input
            type="number"
            step="0.5"
            min="0"
            max={inSemMax}
            value={inSem}
            onChange={e => {
              setInSem(e.target.value);
              setError('');
              onActiveInputChange(e.target.value);
              onStateChange('typing');
            }}
            placeholder="e.g. 24"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        {/* End-Sem Marks */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              End-Sem Score (out of {endSemMax})
            </label>
            <span className="text-[10px] font-semibold text-rose-500">Min 28 to Pass</span>
          </div>
          <input
            type="number"
            step="0.5"
            min="0"
            max={endSemMax}
            value={endSem}
            onChange={e => {
              setEndSem(e.target.value);
              setError('');
            }}
            placeholder="e.g. 34"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
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
          <Sparkles className="w-4 h-4" />
          <span>Check Total & Passing Status</span>
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
