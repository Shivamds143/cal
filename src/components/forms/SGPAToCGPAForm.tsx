import React, { useState } from 'react';
import { Sparkles, RotateCcw, Plus, Trash2, ArrowRight } from 'lucide-react';
import { calculateSGPAToCGPA, SemesterEntry } from '../../lib/calculations/sppu';
import { CalculationResult, IllustrationState } from '../../types/calculator';

interface SGPAToCGPAFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

export const SGPAToCGPAForm: React.FC<SGPAToCGPAFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [semesters, setSemesters] = useState<SemesterEntry[]>([
    { semNumber: 1, sgpa: 8.4, credits: 20, active: true },
    { semNumber: 2, sgpa: 8.8, credits: 20, active: true },
    { semNumber: 3, sgpa: 8.1, credits: 22, active: true },
    { semNumber: 4, sgpa: 8.6, credits: 22, active: true },
  ]);
  const [useCredits, setUseCredits] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleSgpaChange = (index: number, val: string) => {
    const parsed = parseFloat(val);
    const updated = [...semesters];
    updated[index].sgpa = isNaN(parsed) ? 0 : parsed;
    setSemesters(updated);
    setError('');
    onActiveInputChange(val);
    onStateChange('typing');
  };

  const handleCreditChange = (index: number, val: string) => {
    const parsed = parseFloat(val);
    const updated = [...semesters];
    updated[index].credits = isNaN(parsed) ? 0 : parsed;
    setSemesters(updated);
    setError('');
  };

  const addSemester = () => {
    if (semesters.length >= 8) return;
    setSemesters([
      ...semesters,
      { semNumber: semesters.length + 1, sgpa: 8.0, credits: 20, active: true },
    ]);
  };

  const removeSemester = (index: number) => {
    if (semesters.length <= 1) return;
    const updated = semesters.filter((_, i) => i !== index).map((s, idx) => ({
      ...s,
      semNumber: idx + 1,
    }));
    setSemesters(updated);
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const active = semesters.map(s => ({
      ...s,
      credits: useCredits ? s.credits : undefined,
    }));

    if (active.some(s => s.sgpa <= 0 || s.sgpa > 10)) {
      setError('All semester SGPAs must be between 1.00 and 10.00');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateSGPAToCGPA(active);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Calculation error');
        onStateChange('idle');
      }
    }, 450);
  };

  const handleReset = () => {
    setSemesters([
      { semNumber: 1, sgpa: 0, credits: 20, active: true },
      { semNumber: 2, sgpa: 0, credits: 20, active: true },
    ]);
    setError('');
    onActiveInputChange('');
    onStateChange('idle');
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-5">
      {/* Credit Option Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <span className="text-xs font-bold text-slate-800 block">Credit-Weighted Calculation</span>
          <span className="text-[11px] text-slate-500">Weight by SPPU semester credits (recommended)</span>
        </div>
        <input
          type="checkbox"
          checked={useCredits}
          onChange={e => setUseCredits(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
      </div>

      {/* Semesters List */}
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {semesters.map((sem, idx) => (
          <div
            key={sem.semNumber}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors"
          >
            <div className="w-14 text-xs font-bold text-slate-700">
              Sem {sem.semNumber}
            </div>

            {/* SGPA Input */}
            <div className="flex-1 relative">
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={sem.sgpa === 0 ? '' : sem.sgpa}
                onChange={e => handleSgpaChange(idx, e.target.value)}
                placeholder="SGPA (e.g. 8.5)"
                className="w-full px-3 py-2 text-sm font-bold font-mono rounded-lg bg-white border border-slate-200 focus:outline-hidden focus:border-blue-600"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">
                SGPA
              </span>
            </div>

            {/* Credits Input */}
            {useCredits && (
              <div className="w-24 relative">
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="40"
                  value={sem.credits || 20}
                  onChange={e => handleCreditChange(idx, e.target.value)}
                  placeholder="Credits"
                  className="w-full px-2.5 py-2 text-sm font-semibold font-mono rounded-lg bg-white border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                  Cr
                </span>
              </div>
            )}

            {/* Delete button */}
            {semesters.length > 1 && (
              <button
                type="button"
                onClick={() => removeSemester(idx)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Remove semester"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Semester Button */}
      {semesters.length < 8 && (
        <button
          type="button"
          onClick={addSemester}
          className="w-full py-2 px-3 rounded-xl border border-dashed border-blue-300 text-blue-700 hover:bg-blue-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Semester (Up to 8 Semesters)</span>
        </button>
      )}

      {error && (
        <p className="text-xs font-semibold text-rose-600 animate-in fade-in">
          {error}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculate Cumulative CGPA</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
