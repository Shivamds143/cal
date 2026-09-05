import { CalculationResult } from '../../types/calculator';
import { getSPPUGradeAndClass } from './sppu';

/**
 * Calculates Required SGPA in remaining semesters to achieve a Target CGPA
 */
export function calculateTargetCGPA(
  currentCGPA: number,
  completedCredits: number,
  targetCGPA: number,
  remainingCredits: number
): CalculationResult {
  if (isNaN(currentCGPA) || isNaN(completedCredits) || isNaN(targetCGPA) || isNaN(remainingCredits)) {
    throw new Error('Please enter valid numeric values for all fields');
  }
  if (completedCredits <= 0 || remainingCredits <= 0) {
    throw new Error('Credits must be greater than 0');
  }
  if (targetCGPA < 0 || targetCGPA > 10) {
    throw new Error('Target CGPA must be between 0.00 and 10.00');
  }

  const totalCredits = completedCredits + remainingCredits;
  const targetTotalPoints = targetCGPA * totalCredits;
  const currentTotalPoints = currentCGPA * completedCredits;
  const neededPoints = targetTotalPoints - currentTotalPoints;
  const requiredSGPA = neededPoints / remainingCredits;

  const isAchievable = requiredSGPA <= 10.0 && requiredSGPA >= 0;
  const steps: string[] = [
    `Current earned grade points: ${currentCGPA.toFixed(2)} × ${completedCredits} = ${currentTotalPoints.toFixed(2)}`,
    `Total credits upon graduation: ${completedCredits} + ${remainingCredits} = ${totalCredits}`,
    `Total points needed for ${targetCGPA.toFixed(2)} CGPA: ${targetCGPA.toFixed(2)} × ${totalCredits} = ${targetTotalPoints.toFixed(2)}`,
    `Points required in remaining credits: ${targetTotalPoints.toFixed(2)} - ${currentTotalPoints.toFixed(2)} = ${neededPoints.toFixed(2)}`,
    `Required SGPA: ${neededPoints.toFixed(2)} / ${remainingCredits} credits = ${requiredSGPA.toFixed(2)}`,
  ];

  let remarks = '';
  if (requiredSGPA > 10.0) {
    remarks = `A target CGPA of ${targetCGPA.toFixed(2)} is mathematically impossible because the maximum attainable SGPA is 10.00. The highest possible CGPA you can reach is ${(((currentTotalPoints + 10 * remainingCredits) / totalCredits)).toFixed(2)}.`;
  } else if (requiredSGPA <= 0) {
    remarks = `You have already achieved enough points! Even with a minimum passing SGPA, your overall CGPA will surpass ${targetCGPA.toFixed(2)}.`;
  } else {
    remarks = `You need an average SGPA of ${requiredSGPA.toFixed(2)} across your remaining ${remainingCredits} credits to achieve an overall CGPA of ${targetCGPA.toFixed(2)}.`;
  }

  return {
    primaryValue: isAchievable ? Math.max(0, requiredSGPA).toFixed(2) : 'Impossible (>10.0)',
    primaryLabel: 'Required SGPA in Remaining Semesters',
    primaryUnit: isAchievable ? 'SGPA' : '',
    status: isAchievable ? (requiredSGPA <= 8.5 ? 'Good' : 'Warning') : 'Fail',
    formulaUsed: 'Required SGPA = [Target × (Done + Left) - (Current × Done)] / Left',
    steps,
    secondaryValues: [
      { label: 'Current CGPA', value: currentCGPA.toFixed(2), badgeColor: 'blue' },
      { label: 'Target CGPA', value: targetCGPA.toFixed(2), badgeColor: 'purple' },
      { label: 'Max Possible CGPA', value: (((currentTotalPoints + 10 * remainingCredits) / totalCredits)).toFixed(2), badgeColor: 'green' },
    ],
    remarks,
  };
}

/**
 * Grade Calculator for SPPU 10-Point Scale
 */
export function calculateGradeFromMarks(marksPercentage: number): CalculationResult {
  if (isNaN(marksPercentage) || marksPercentage < 0 || marksPercentage > 100) {
    throw new Error('Please enter a percentage between 0 and 100');
  }

  let gradeLetter = 'F';
  let gradePoints = 0;
  let description = 'Fail';
  let divisionClass = 'Fail';
  let status: 'Pass' | 'Fail' | 'Distinction' | 'Good' = 'Fail';

  if (marksPercentage >= 90) {
    gradeLetter = 'O';
    gradePoints = 10;
    description = 'Outstanding';
    divisionClass = 'First Class with Distinction';
    status = 'Distinction';
  } else if (marksPercentage >= 80) {
    gradeLetter = 'A+';
    gradePoints = 9;
    description = 'Excellent';
    divisionClass = 'First Class with Distinction';
    status = 'Distinction';
  } else if (marksPercentage >= 70) {
    gradeLetter = 'A';
    gradePoints = 8;
    description = 'Very Good';
    divisionClass = 'First Class with Distinction';
    status = 'Distinction';
  } else if (marksPercentage >= 60) {
    gradeLetter = 'B+';
    gradePoints = 7;
    description = 'Good';
    divisionClass = 'First Class';
    status = 'Good';
  } else if (marksPercentage >= 55) {
    gradeLetter = 'B';
    gradePoints = 6;
    description = 'Above Average';
    divisionClass = 'Higher Second Class';
    status = 'Good';
  } else if (marksPercentage >= 50) {
    gradeLetter = 'C';
    gradePoints = 5;
    description = 'Average';
    divisionClass = 'Second Class';
    status = 'Pass';
  } else if (marksPercentage >= 40) {
    gradeLetter = 'P';
    gradePoints = 4;
    description = 'Pass';
    divisionClass = 'Pass Class';
    status = 'Pass';
  } else {
    gradeLetter = 'F';
    gradePoints = 0;
    description = 'Fail / Backlog';
    divisionClass = 'Fail';
    status = 'Fail';
  }

  return {
    primaryValue: gradeLetter,
    primaryLabel: 'SPPU Letter Grade',
    primaryUnit: `(${gradePoints} pts)`,
    grade: `${gradeLetter} (${description})`,
    divisionClass,
    status,
    formulaUsed: 'SPPU 10-Point Relative / Absolute Grading Scale',
    steps: [
      `Input Percentage: ${marksPercentage.toFixed(1)}%`,
      `Grade Bracket: ${gradeLetter} (${description})`,
      `Equivalent Grade Point: ${gradePoints} on a 10.0 scale`,
    ],
    secondaryValues: [
      { label: 'Grade Points', value: `${gradePoints} / 10`, badgeColor: 'blue' },
      { label: 'Description', value: description, badgeColor: 'purple' },
      { label: 'Division/Class', value: divisionClass, badgeColor: 'green' },
    ],
  };
}
