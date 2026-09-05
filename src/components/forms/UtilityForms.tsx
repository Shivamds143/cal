import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight, UserCheck, Compass, Award, Medal, Plus, Trash2 } from 'lucide-react';
import { calculateTargetCGPA, calculateGradeFromMarks } from '../../lib/calculations/utility';
import { calculateAttendance, calculateRequiredAttendance } from '../../lib/calculations/attendance';
import { calculateCourseSGPA, CourseSubject, getSPPUGradeAndClass } from '../../lib/calculations/sppu';
import { calculateAverageMarks } from '../../lib/calculations/marks';
import { CalculationResult, IllustrationState } from '../../types/calculator';

interface BaseFormProps {
  onCalculate: (res: CalculationResult) => void;
  onStateChange: (state: IllustrationState) => void;
  onActiveInputChange: (val: string) => void;
}

/**
 * 1. Target CGPA Form
 */
export const TargetCGPAForm: React.FC<BaseFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [currentCGPA, setCurrentCGPA] = useState<string>('7.40');
  const [completedCredits, setCompletedCredits] = useState<string>('44');
  const [targetCGPA, setTargetCGPA] = useState<string>('8.00');
  const [remainingCredits, setRemainingCredits] = useState<string>('44');
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const curr = parseFloat(currentCGPA);
    const doneCr = parseFloat(completedCredits);
    const target = parseFloat(targetCGPA);
    const leftCr = parseFloat(remainingCredits);

    if (isNaN(curr) || isNaN(doneCr) || isNaN(target) || isNaN(leftCr)) {
      setError('Please enter valid numeric values in all fields');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateTargetCGPA(curr, doneCr, target, leftCr);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Calculation error');
        onStateChange('idle');
      }
    }, 450);
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Current Cumulative CGPA
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={currentCGPA}
            onChange={e => {
              setCurrentCGPA(e.target.value);
              onActiveInputChange(e.target.value);
              onStateChange('typing');
            }}
            placeholder="7.40"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Credits Completed So Far
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={completedCredits}
            onChange={e => setCompletedCredits(e.target.value)}
            placeholder="44"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Desired Target CGPA
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={targetCGPA}
            onChange={e => setTargetCGPA(e.target.value)}
            placeholder="8.00"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Remaining Credits to Graduate
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={remainingCredits}
            onChange={e => setRemainingCredits(e.target.value)}
            placeholder="44"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>
      </div>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
      >
        <Compass className="w-4 h-4" />
        <span>Calculate Required SGPA</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

/**
 * 2. Attendance % Form
 */
export const AttendanceForm: React.FC<BaseFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [attended, setAttended] = useState<string>('48');
  const [conducted, setConducted] = useState<string>('60');
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const att = parseFloat(attended);
    const cond = parseFloat(conducted);

    if (isNaN(att) || isNaN(cond) || cond <= 0) {
      setError('Please enter valid positive numbers');
      onStateChange('idle');
      return;
    }
    if (att > cond) {
      setError('Attended lectures cannot exceed total conducted');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateAttendance(att, cond);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Error');
        onStateChange('idle');
      }
    }, 450);
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Lectures Attended
          </label>
          <input
            type="number"
            step="1"
            min="0"
            value={attended}
            onChange={e => {
              setAttended(e.target.value);
              onActiveInputChange(e.target.value);
              onStateChange('typing');
            }}
            placeholder="48"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Total Lectures Conducted
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={conducted}
            onChange={e => setConducted(e.target.value)}
            placeholder="60"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>
      </div>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
      >
        <UserCheck className="w-4 h-4" />
        <span>Check 75% Attendance Status</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

/**
 * 3. Required Attendance & Bunk Form
 */
export const RequiredAttendanceForm: React.FC<BaseFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [attended, setAttended] = useState<string>('30');
  const [conducted, setConducted] = useState<string>('50');
  const [targetPct, setTargetPct] = useState<number>(75);
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const att = parseFloat(attended);
    const cond = parseFloat(conducted);

    if (isNaN(att) || isNaN(cond) || cond <= 0) {
      setError('Please enter valid positive numbers');
      onStateChange('idle');
      return;
    }
    if (att > cond) {
      setError('Attended lectures cannot exceed conducted');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateRequiredAttendance(att, cond, targetPct);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Error');
        onStateChange('idle');
      }
    }, 450);
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Lectures Attended
          </label>
          <input
            type="number"
            step="1"
            min="0"
            value={attended}
            onChange={e => {
              setAttended(e.target.value);
              onActiveInputChange(e.target.value);
              onStateChange('typing');
            }}
            placeholder="30"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Total Conducted
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={conducted}
            onChange={e => setConducted(e.target.value)}
            placeholder="50"
            className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Target Attendance Threshold
        </label>
        <div className="flex gap-2">
          {[75, 80, 85].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTargetPct(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                targetPct === t
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t}% Goal
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>Calculate Needed Lectures / Bunk Margin</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

/**
 * 4. Grade Calculator Form
 */
export const GradeForm: React.FC<BaseFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [marksPct, setMarksPct] = useState<string>('76.5');
  const [error, setError] = useState<string>('');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const num = parseFloat(marksPct);
    if (isNaN(num) || num < 0 || num > 100) {
      setError('Please enter a valid percentage between 0 and 100');
      onStateChange('idle');
      return;
    }

    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateGradeFromMarks(num);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Error');
        onStateChange('idle');
      }
    }, 450);
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Enter Subject / Aggregate Percentage (%)
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="100"
          value={marksPct}
          onChange={e => {
            setMarksPct(e.target.value);
            onActiveInputChange(e.target.value);
            onStateChange('typing');
          }}
          placeholder="76.5"
          className="w-full px-4 py-3.5 text-xl font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
        />
      </div>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
      >
        <Award className="w-4 h-4" />
        <span>Get SPPU Letter Grade & Points</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

/**
 * 5. Class / Division Form
 */
export const ClassDivisionForm: React.FC<BaseFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [cgpa, setCgpa] = useState<string>('7.85');
  const [error, setError] = useState<string>('');

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
      const { grade, divisionClass, status } = getSPPUGradeAndClass(num);
      onCalculate({
        primaryValue: divisionClass,
        primaryLabel: 'SPPU Degree Honours / Division',
        grade,
        divisionClass,
        status,
        formulaUsed: 'SPPU CBCS Honours Class Thresholds (Distinction ≥ 7.75, First Class ≥ 6.75)',
        steps: [
          `Input CGPA: ${num.toFixed(2)}`,
          `Classification: ${divisionClass}`,
          `Grade Category: ${grade}`,
        ],
        secondaryValues: [
          { label: 'CGPA', value: num.toFixed(2), badgeColor: 'blue' },
          { label: 'Awarded Grade', value: grade, badgeColor: 'purple' },
        ],
      });
      onStateChange('success');
    }, 450);
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Enter Your SPPU CGPA (0.00 – 10.00)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={cgpa}
          onChange={e => {
            setCgpa(e.target.value);
            onActiveInputChange(e.target.value);
            onStateChange('typing');
          }}
          placeholder="7.85"
          className="w-full px-4 py-3.5 text-xl font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 focus:outline-hidden"
        />
      </div>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
      >
        <Medal className="w-4 h-4" />
        <span>Check Awarded Division Class</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

/**
 * 6. Course Subject SGPA Form
 */
export const CourseCGPAForm: React.FC<BaseFormProps> = ({
  onCalculate,
  onStateChange,
  onActiveInputChange,
}) => {
  const [courses, setCourses] = useState<CourseSubject[]>([
    { name: 'Engg Mathematics III', gradePoint: 9, credits: 4 },
    { name: 'Data Structures', gradePoint: 8, credits: 4 },
    { name: 'Computer Architecture', gradePoint: 8, credits: 3 },
    { name: 'Object Oriented Prog', gradePoint: 10, credits: 3 },
    { name: 'Data Structures Lab', gradePoint: 10, credits: 1 },
    { name: 'OOP Lab', gradePoint: 9, credits: 1 },
  ]);
  const [error, setError] = useState<string>('');

  const handleGradeChange = (idx: number, gp: number) => {
    const updated = [...courses];
    updated[idx].gradePoint = gp;
    setCourses(updated);
    onActiveInputChange(String(gp));
    onStateChange('typing');
  };

  const handleCreditChange = (idx: number, cr: number) => {
    const updated = [...courses];
    updated[idx].credits = cr;
    setCourses(updated);
  };

  const addSubject = () => {
    setCourses([...courses, { name: `Subject ${courses.length + 1}`, gradePoint: 8, credits: 3 }]);
  };

  const removeSubject = (idx: number) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((_, i) => i !== idx));
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onStateChange('calculating');
    setTimeout(() => {
      try {
        const res = calculateCourseSGPA(courses);
        onCalculate(res);
        onStateChange('success');
      } catch (err: any) {
        setError(err.message || 'Error');
        onStateChange('idle');
      }
    }, 450);
  };

  const gradeOptions = [
    { label: 'O (10 pts)', val: 10 },
    { label: 'A+ (9 pts)', val: 9 },
    { label: 'A (8 pts)', val: 8 },
    { label: 'B+ (7 pts)', val: 7 },
    { label: 'B (6 pts)', val: 6 },
    { label: 'C (5 pts)', val: 5 },
    { label: 'P (4 pts)', val: 4 },
    { label: 'F (0 pts)', val: 0 },
  ];

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {courses.map((c, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <input
              type="text"
              value={c.name}
              onChange={e => {
                const updated = [...courses];
                updated[idx].name = e.target.value;
                setCourses(updated);
              }}
              className="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 focus:outline-hidden"
              placeholder="Subject name"
            />
            
            <select
              value={c.gradePoint}
              onChange={e => handleGradeChange(idx, parseInt(e.target.value))}
              className="px-2 py-1.5 text-xs font-bold font-mono rounded-lg bg-white border border-slate-200"
            >
              {gradeOptions.map(g => (
                <option key={g.val} value={g.val}>{g.label}</option>
              ))}
            </select>

            <select
              value={c.credits}
              onChange={e => handleCreditChange(idx, parseInt(e.target.value))}
              className="w-16 px-1.5 py-1.5 text-xs font-semibold font-mono rounded-lg bg-white border border-slate-200"
            >
              {[1, 2, 3, 4, 5, 6].map(cr => (
                <option key={cr} value={cr}>{cr} Cr</option>
              ))}
            </select>

            {courses.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubject(idx)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSubject}
        className="w-full py-2 rounded-xl border border-dashed border-blue-300 text-blue-700 hover:bg-blue-50 text-xs font-bold flex items-center justify-center gap-1"
      >
        <Plus className="w-4 h-4" />
        <span>Add Another Subject</span>
      </button>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>Calculate Subject SGPA</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};
