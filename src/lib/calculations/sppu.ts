import { CalculationResult, SPPUPattern } from '../../types/calculator';

/**
 * Calculates SPPU Percentage from CGPA according to official University CBCS Circular & Patterns.
 */
export function calculateSPPUCGPAToPercentage(
  cgpa: number,
  pattern: SPPUPattern = '2019'
): CalculationResult {
  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    throw new Error('Please enter a valid CGPA between 0.00 and 10.00');
  }

  let percentage = 0;
  let formulaUsed = '';
  const steps: string[] = [];

  if (pattern === '2019' || pattern === '2024') {
    // SPPU Official Piecewise Range Formula
    if (cgpa >= 9.75) {
      percentage = 20 * cgpa - 100;
      formulaUsed = 'Percentage = (20 × CGPA) - 100 [For CGPA 9.75 - 10.0]';
      steps.push(`Applied Range 9.75 - 10.00 formula: 20 × ${cgpa.toFixed(2)} - 100`);
      steps.push(`Calculation: ${(20 * cgpa).toFixed(2)} - 100 = ${percentage.toFixed(2)}%`);
    } else if (cgpa >= 8.25) {
      percentage = 10 * cgpa - 7.5;
      formulaUsed = 'Percentage = (10 × CGPA) - 7.5 [For CGPA 8.25 - 9.74]';
      steps.push(`Applied Range 8.25 - 9.74 formula: 10 × ${cgpa.toFixed(2)} - 7.5`);
      steps.push(`Calculation: ${(10 * cgpa).toFixed(2)} - 7.5 = ${percentage.toFixed(2)}%`);
    } else if (cgpa >= 6.75) {
      percentage = 5 * cgpa + 33.75;
      formulaUsed = 'Percentage = (5 × CGPA) + 33.75 [For CGPA 6.75 - 8.24]';
      steps.push(`Applied Range 6.75 - 8.24 formula: 5 × ${cgpa.toFixed(2)} + 33.75`);
      steps.push(`Calculation: ${(5 * cgpa).toFixed(2)} + 33.75 = ${percentage.toFixed(2)}%`);
    } else if (cgpa >= 5.75) {
      percentage = 7.5 * cgpa + 16.875;
      formulaUsed = 'Percentage = (7.5 × CGPA) + 16.875 [For CGPA 5.75 - 6.74]';
      steps.push(`Applied Range 5.75 - 6.74 formula: 7.5 × ${cgpa.toFixed(2)} + 16.875`);
      steps.push(`Calculation: ${(7.5 * cgpa).toFixed(2)} + 16.875 = ${percentage.toFixed(2)}%`);
    } else if (cgpa >= 4.75) {
      percentage = 10 * cgpa + 2.5;
      formulaUsed = 'Percentage = (10 × CGPA) + 2.5 [For CGPA 4.75 - 5.74]';
      steps.push(`Applied Range 4.75 - 5.74 formula: 10 × ${cgpa.toFixed(2)} + 2.5`);
      steps.push(`Calculation: ${(10 * cgpa).toFixed(2)} + 2.5 = ${percentage.toFixed(2)}%`);
    } else if (cgpa >= 4.0) {
      percentage = 10 * cgpa + 2.5;
      formulaUsed = 'Percentage = (10 × CGPA) + 2.5 [For CGPA 4.00 - 4.74]';
      steps.push(`Applied Range 4.00 - 4.74 formula: 10 × ${cgpa.toFixed(2)} + 2.5`);
      steps.push(`Calculation: ${(10 * cgpa).toFixed(2)} + 2.5 = ${percentage.toFixed(2)}%`);
    } else {
      percentage = Math.max(0, cgpa * 9.5);
      formulaUsed = 'Percentage = CGPA × 9.5 [Below Passing Standard]';
      steps.push(`CGPA is below 4.00 minimum pass threshold: ${cgpa.toFixed(2)} × 9.5 = ${percentage.toFixed(2)}%`);
    }
  } else if (pattern === '2015') {
    // 2015 Pattern or linear standard
    if (cgpa >= 8.25) {
      percentage = 10 * cgpa - 7.5;
      formulaUsed = 'Percentage = (10 × CGPA) - 7.5';
    } else if (cgpa >= 6.75) {
      percentage = 5 * cgpa + 33.75;
      formulaUsed = 'Percentage = (5 × CGPA) + 33.75';
    } else if (cgpa >= 5.75) {
      percentage = 7.5 * cgpa + 16.875;
      formulaUsed = 'Percentage = (7.5 × CGPA) + 16.875';
    } else {
      percentage = 10 * cgpa + 2.5;
      formulaUsed = 'Percentage = (10 × CGPA) + 2.5';
    }
    steps.push(`Applied SPPU 2015 circular formula`);
    steps.push(`Result: ${percentage.toFixed(2)}%`);
  } else {
    // General Linear Formula
    percentage = cgpa * 9.5;
    formulaUsed = 'Percentage = CGPA × 9.5 (Standard AICTE / SPPU General)';
    steps.push(`Direct conversion: ${cgpa.toFixed(2)} × 9.5 = ${percentage.toFixed(2)}%`);
  }

  // Cap between 0 and 100
  percentage = Math.min(100, Math.max(0, percentage));

  const { grade, divisionClass, status } = getSPPUGradeAndClass(cgpa);

  return {
    primaryValue: percentage.toFixed(2),
    primaryLabel: 'Equivalent Percentage',
    primaryUnit: '%',
    grade,
    divisionClass,
    status,
    formulaUsed,
    steps,
    secondaryValues: [
      { label: 'CGPA', value: cgpa.toFixed(2), badgeColor: 'blue' },
      { label: 'Grade Awarded', value: grade, badgeColor: 'purple' },
      { label: 'Class Awarded', value: divisionClass, badgeColor: 'green' },
      { label: 'Academic Pattern', value: pattern === '2019' ? '2019 Pattern' : pattern === '2024' ? '2024 Pattern' : pattern === '2015' ? '2015 Pattern' : 'General Linear', badgeColor: 'slate' },
    ],
    notes: 'Formula follows official SPPU Ordinance / Circular table for CBCS Engineering and Degree courses. Verify official mark sheet for college-specific regulations.',
    remarks: cgpa >= 7.75 ? 'Outstanding Performance! First Class with Distinction.' : cgpa >= 6.75 ? 'Great Performance! First Class achieved.' : cgpa >= 6.25 ? 'Good academic standing. Higher Second Class.' : cgpa >= 4.0 ? 'Pass Class achieved.' : 'Needs Improvement (Below Pass threshold).',
  };
}

/**
 * Calculates SPPU CGPA from Percentage (Reverse Conversion)
 */
export function calculatePercentageToSPPUCGPA(
  percentage: number,
  pattern: SPPUPattern = '2019'
): CalculationResult {
  if (isNaN(percentage) || percentage < 0 || percentage > 100) {
    throw new Error('Please enter a valid percentage between 0 and 100');
  }

  let cgpa = 0;
  let formulaUsed = '';
  const steps: string[] = [];

  if (pattern === '2019' || pattern === '2024') {
    if (percentage >= 95.0) {
      cgpa = (percentage + 100) / 20;
      formulaUsed = 'CGPA = (Percentage + 100) / 20 [For 95% - 100%]';
      steps.push(`Applied inverse formula for ≥ 95%: (${percentage.toFixed(2)} + 100) / 20 = ${cgpa.toFixed(2)}`);
    } else if (percentage >= 75.0) {
      cgpa = (percentage + 7.5) / 10;
      formulaUsed = 'CGPA = (Percentage + 7.5) / 10 [For 75% - 94.99%]';
      steps.push(`Applied inverse formula for 75% - 94.99%: (${percentage.toFixed(2)} + 7.5) / 10 = ${cgpa.toFixed(2)}`);
    } else if (percentage >= 67.5) {
      cgpa = (percentage - 33.75) / 5;
      formulaUsed = 'CGPA = (Percentage - 33.75) / 5 [For 67.5% - 74.99%]';
      steps.push(`Applied inverse formula for 67.5% - 74.99%: (${percentage.toFixed(2)} - 33.75) / 5 = ${cgpa.toFixed(2)}`);
    } else if (percentage >= 60.0) {
      cgpa = (percentage - 16.875) / 7.5;
      formulaUsed = 'CGPA = (Percentage - 16.875) / 7.5 [For 60% - 67.49%]';
      steps.push(`Applied inverse formula for 60% - 67.49%: (${percentage.toFixed(2)} - 16.875) / 7.5 = ${cgpa.toFixed(2)}`);
    } else if (percentage >= 50.0) {
      cgpa = (percentage - 2.5) / 10;
      formulaUsed = 'CGPA = (Percentage - 2.5) / 10 [For 50% - 59.99%]';
      steps.push(`Applied inverse formula for 50% - 59.99%: (${percentage.toFixed(2)} - 2.5) / 10 = ${cgpa.toFixed(2)}`);
    } else if (percentage >= 40.0) {
      cgpa = (percentage - 2.5) / 10;
      formulaUsed = 'CGPA = (Percentage - 2.5) / 10 [For 40% - 49.99%]';
      steps.push(`Applied inverse formula for 40% - 49.99%: (${percentage.toFixed(2)} - 2.5) / 10 = ${cgpa.toFixed(2)}`);
    } else {
      cgpa = percentage / 9.5;
      formulaUsed = 'CGPA = Percentage / 9.5';
      steps.push(`Applied standard divisor 9.5: ${percentage.toFixed(2)} / 9.5 = ${cgpa.toFixed(2)}`);
    }
  } else {
    cgpa = percentage / 9.5;
    formulaUsed = 'CGPA = Percentage / 9.5 (Linear Standard)';
    steps.push(`Direct conversion: ${percentage.toFixed(2)} / 9.5 = ${cgpa.toFixed(2)}`);
  }

  cgpa = Math.min(10, Math.max(0, cgpa));
  const { grade, divisionClass, status } = getSPPUGradeAndClass(cgpa);

  return {
    primaryValue: cgpa.toFixed(2),
    primaryLabel: 'Estimated SPPU CGPA',
    primaryUnit: 'CGPA',
    grade,
    divisionClass,
    status,
    formulaUsed,
    steps,
    secondaryValues: [
      { label: 'Input Percentage', value: `${percentage.toFixed(2)}%`, badgeColor: 'blue' },
      { label: 'Expected Grade', value: grade, badgeColor: 'purple' },
      { label: 'Expected Class', value: divisionClass, badgeColor: 'green' },
    ],
    notes: 'Inverted using the official SPPU piecewise equation for CBCS pattern.',
  };
}

/**
 * Calculates SPPU SGPA to Percentage
 */
export function calculateSPPUSGPAToPercentage(
  sgpa: number,
  pattern: SPPUPattern = '2019'
): CalculationResult {
  const result = calculateSPPUCGPAToPercentage(sgpa, pattern);
  return {
    ...result,
    primaryLabel: 'Equivalent Semester Percentage',
    secondaryValues: [
      { label: 'Semester SGPA', value: sgpa.toFixed(2), badgeColor: 'blue' },
      ...(result.secondaryValues?.filter(v => v.label !== 'CGPA') || []),
    ],
  };
}

/**
 * Calculates CGPA from multiple Semester SGPAs and optional credits
 */
export interface SemesterEntry {
  semNumber: number;
  sgpa: number;
  credits?: number;
  active?: boolean;
}

export function calculateSGPAToCGPA(semesters: SemesterEntry[]): CalculationResult {
  const activeSems = semesters.filter(s => s.active !== false && !isNaN(s.sgpa) && s.sgpa > 0);
  
  if (activeSems.length === 0) {
    throw new Error('Please enter at least one valid Semester SGPA (1.00 - 10.00)');
  }

  let totalCreditWeightedSgpa = 0;
  let totalCredits = 0;
  let isCreditWeighted = false;
  const steps: string[] = [];

  // Check if any credit is custom specified
  const hasCustomCredits = activeSems.some(s => s.credits && s.credits > 0);

  if (hasCustomCredits) {
    isCreditWeighted = true;
    activeSems.forEach(s => {
      const cr = s.credits || 20; // default SPPU sem credit approx 20-22
      totalCreditWeightedSgpa += s.sgpa * cr;
      totalCredits += cr;
      steps.push(`Sem ${s.semNumber}: SGPA ${s.sgpa.toFixed(2)} × ${cr} Credits = ${(s.sgpa * cr).toFixed(2)}`);
    });
  } else {
    activeSems.forEach(s => {
      totalCreditWeightedSgpa += s.sgpa;
      totalCredits += 1;
      steps.push(`Sem ${s.semNumber}: SGPA ${s.sgpa.toFixed(2)}`);
    });
  }

  const finalCgpa = totalCredits > 0 ? totalCreditWeightedSgpa / totalCredits : 0;
  const clampedCgpa = Math.min(10, Math.max(0, finalCgpa));
  const { grade, divisionClass, status } = getSPPUGradeAndClass(clampedCgpa);
  
  // Percentage estimation
  const pctResult = calculateSPPUCGPAToPercentage(clampedCgpa, '2019');

  steps.push(
    isCreditWeighted
      ? `Total Credit-Points: ${totalCreditWeightedSgpa.toFixed(2)} / Total Credits: ${totalCredits} = ${clampedCgpa.toFixed(2)}`
      : `Sum of SGPAs: ${totalCreditWeightedSgpa.toFixed(2)} / ${activeSems.length} Semesters = ${clampedCgpa.toFixed(2)}`
  );

  return {
    primaryValue: clampedCgpa.toFixed(2),
    primaryLabel: 'Cumulative CGPA',
    primaryUnit: 'CGPA',
    grade,
    divisionClass,
    status,
    formulaUsed: isCreditWeighted ? 'CGPA = Σ(SGPA × Credits) / Σ(Credits)' : 'CGPA = Σ(SGPA) / Number of Semesters',
    steps,
    secondaryValues: [
      { label: 'Semesters Counted', value: activeSems.length, badgeColor: 'blue' },
      { label: 'Estimated Percentage', value: `${pctResult.primaryValue}%`, badgeColor: 'green' },
      { label: 'Final Grade', value: grade, badgeColor: 'purple' },
      { label: 'Awarded Class', value: divisionClass, badgeColor: 'slate' },
    ],
    notes: 'For engineering and professional degree programs, credits may vary per semester (typically 18-24 credits).',
  };
}

/**
 * Calculates SPPU Subject Course Grade Points & SGPA
 */
export interface CourseSubject {
  name: string;
  gradePoint: number; // 0 to 10
  credits: number;
}

export function calculateCourseSGPA(courses: CourseSubject[]): CalculationResult {
  const validCourses = courses.filter(c => c.credits > 0 && !isNaN(c.gradePoint));
  if (validCourses.length === 0) {
    throw new Error('Please add at least one subject with valid credits and grade.');
  }

  let totalPoints = 0;
  let totalCredits = 0;
  const steps: string[] = [];

  validCourses.forEach((c, idx) => {
    const earned = c.gradePoint * c.credits;
    totalPoints += earned;
    totalCredits += c.credits;
    steps.push(`${c.name || `Subject ${idx + 1}`}: ${c.gradePoint} Grade Pt × ${c.credits} Credits = ${earned.toFixed(1)}`);
  });

  const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  const clampedSgpa = Math.min(10, Math.max(0, sgpa));
  const { grade, divisionClass, status } = getSPPUGradeAndClass(clampedSgpa);

  steps.push(`Total Grade Points (${totalPoints.toFixed(1)}) / Total Credits (${totalCredits}) = ${clampedSgpa.toFixed(2)}`);

  return {
    primaryValue: clampedSgpa.toFixed(2),
    primaryLabel: 'Semester SGPA',
    primaryUnit: 'SGPA',
    grade,
    divisionClass,
    status,
    formulaUsed: 'SGPA = Σ(Grade Points × Credits) / Σ(Credits)',
    steps,
    secondaryValues: [
      { label: 'Total Credits', value: totalCredits, badgeColor: 'blue' },
      { label: 'Total Earned Points', value: totalPoints.toFixed(1), badgeColor: 'purple' },
      { label: 'Awarded Class', value: divisionClass, badgeColor: 'green' },
    ],
  };
}

/**
 * Helper to determine Grade, Class and Status in SPPU
 */
export function getSPPUGradeAndClass(cgpa: number): {
  grade: string;
  divisionClass: string;
  status: 'Pass' | 'Fail' | 'Distinction' | 'Good';
} {
  if (cgpa >= 9.0) {
    return { grade: 'O (Outstanding)', divisionClass: 'First Class with Distinction', status: 'Distinction' };
  } else if (cgpa >= 8.25) {
    return { grade: 'A+ (Excellent)', divisionClass: 'First Class with Distinction', status: 'Distinction' };
  } else if (cgpa >= 7.75) {
    return { grade: 'A (Very Good)', divisionClass: 'First Class with Distinction', status: 'Distinction' };
  } else if (cgpa >= 6.75) {
    return { grade: 'A (Good)', divisionClass: 'First Class', status: 'Good' };
  } else if (cgpa >= 6.25) {
    return { grade: 'B+ (Fair)', divisionClass: 'Higher Second Class', status: 'Good' };
  } else if (cgpa >= 5.75) {
    return { grade: 'B (Above Average)', divisionClass: 'Second Class', status: 'Pass' };
  } else if (cgpa >= 5.0) {
    return { grade: 'C (Average)', divisionClass: 'Pass Class', status: 'Pass' };
  } else if (cgpa >= 4.0) {
    return { grade: 'P (Pass)', divisionClass: 'Pass Class', status: 'Pass' };
  } else {
    return { grade: 'F (Fail)', divisionClass: 'Fail / ATKT', status: 'Fail' };
  }
}
