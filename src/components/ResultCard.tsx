import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Copy, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CalculationResult } from '../types/calculator';

interface ResultCardProps {
  result: CalculationResult | null;
  loading?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, loading }) => {
  const [copied, setCopied] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [displayNumber, setDisplayNumber] = useState<number | string>(0);

  // Count-up animation for numeric results
  useEffect(() => {
    if (!result) return;
    const numVal = parseFloat(String(result.primaryValue));
    
    if (isNaN(numVal)) {
      setDisplayNumber(result.primaryValue);
      return;
    }

    let start = 0;
    const end = numVal;
    const duration = 600; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * ease;
      
      setDisplayNumber(current.toFixed(2));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayNumber(result.primaryValue);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [result]);

  if (loading) {
    return (
      <div className="w-full bg-blue-50/60 border border-blue-200/80 rounded-2xl p-6 sm:p-8 text-center animate-pulse">
        <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-blue-800">Calculating SPPU Result...</p>
        <p className="text-xs text-blue-600 mt-1">Applying CBCS formula equations</p>
      </div>
    );
  }

  if (!result) return null;

  const handleCopy = () => {
    const textToCopy = `SPPU Calculator Result:\n${result.primaryLabel}: ${result.primaryValue} ${result.primaryUnit || ''}\n${result.grade ? `Grade: ${result.grade}\n` : ''}${result.divisionClass ? `Class: ${result.divisionClass}\n` : ''}Formula: ${result.formulaUsed}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    if (result.status === 'Distinction') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Distinction
        </span>
      );
    }
    if (result.status === 'Pass' || result.status === 'Good' || result.status === 'Safe') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {result.status === 'Safe' ? 'Attendance Safe' : 'Cleared / Pass'}
        </span>
      );
    }
    if (result.status === 'Warning') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          Attention Required
        </span>
      );
    }
    if (result.status === 'Fail') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          Cutoff Not Met / ATKT
        </span>
      );
    }
    return null;
  };

  return (
    <div 
      id="calculation-result-card"
      className="w-full bg-gradient-to-b from-white to-blue-50/40 border-2 border-blue-200 rounded-2xl p-5 sm:p-7 shadow-lg shadow-blue-500/5 transition-all duration-300"
    >
      {/* Top Bar: Label & Actions */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
            {result.primaryLabel}
          </span>
          {getStatusBadge()}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors"
          title="Copy result to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Main Big Metric */}
      <div className="py-5 text-center sm:text-left">
        <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-mono">
            {displayNumber}
          </span>
          {result.primaryUnit && (
            <span className="text-2xl sm:text-3xl font-bold text-blue-600 font-sans">
              {result.primaryUnit}
            </span>
          )}
        </div>

        {/* Remarks / Motivation */}
        {result.remarks && (
          <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600">
            {result.remarks}
          </p>
        )}
      </div>

      {/* Secondary Values Grid (Grade, Class, Pattern, etc.) */}
      {result.secondaryValues && result.secondaryValues.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 pb-2 border-t border-blue-100/80">
          {result.secondaryValues.map((item, idx) => (
            <div key={idx} className="bg-white/90 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="block text-[11px] font-medium text-slate-400 truncate">
                {item.label}
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-800 truncate mt-0.5">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Formula Used Pill */}
      {result.formulaUsed && (
        <div className="mt-3 p-3 rounded-xl bg-blue-50/80 border border-blue-100 text-[11px] sm:text-xs text-blue-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Formula Applied: </span>
            <code className="text-blue-800 font-mono text-[11px]">{result.formulaUsed}</code>
          </div>
        </div>
      )}

      {/* Step by Step Breakdown Collapsible */}
      {result.steps && result.steps.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-blue-700 py-1.5"
          >
            <span>{showSteps ? 'Hide Step-by-Step Calculation' : 'View Step-by-Step Calculation'}</span>
            {showSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showSteps && (
            <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1.5 text-slate-700">
              {result.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-slate-400 select-none">0{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
