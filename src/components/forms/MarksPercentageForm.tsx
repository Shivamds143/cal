import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { calculateMarksPercentage } from '../../lib/calculations/marks';
import { CalculationResult, IllustrationState } from '../../types/calculator';

interface MarksPercentageFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

export const MarksPercentageForm: React.FC<MarksPercentageFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [obtained, setObtained] = useState<string>('645');
  const [total, setTotal] = useState<string>('750');
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const ob = parseFloat(obtained);
    const tot = parseFloat(total);

    if (isNaN(ob) || isNaN(tot) || tot <= 0) {
      setError('Please enter valid numeric obtained and total marks');
      onStateChange('idle');
      return;
    }
    if (ob > tot) {
      setError('Obtained marks cannot be greater than maximum total marks');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateMarksPercentage(ob, tot);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Calculation error');
        onStateChange('idle');
      }
    }, 450);
  };

  const handleReset = () => {
    setObtained('');
    setTotal('750');
    setError('');
    onActiveInputChange('');
    onStateChange('idle');
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Obtained Marks */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Marks Obtained
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            value={obtained}
            onChange={e => {
              setObtained(e.target.value);
              setError('');
              onActiveInputChange(e.target.value);
              onStateChange('typing');
            }}
            placeholder="e.g. 645"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        {/* Total Maximum Marks */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Maximum Total Marks
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={total}
            onChange={e => {
              setTotal(e.target.value);
              setError('');
            }}
            placeholder="e.g. 750"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Common SPPU Max Marks Preset Chips */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 mr-2">Common Total Presets:</span>
        <div className="inline-flex flex-wrap gap-1.5 mt-1">
          {['100', '500', '650', '750', '800', '1000'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTotal(t)}
              className="px-2 py-0.5 text-xs font-mono rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200"
            >
              /{t}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-xs font-semibold text-rose-600 animate-in fade-in">
          {error}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculate Percentage</span>
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
