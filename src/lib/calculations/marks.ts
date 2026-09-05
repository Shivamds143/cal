import { CalculationResult } from '../../types/calculator';

/**
 * Calculates standard Marks Percentage
 */
export function calculateMarksPercentage(
  obtainedMarks: number,
  totalMarks: number
): CalculationResult {
  if (isNaN(obtainedMarks) || isNaN(totalMarks) || totalMarks <= 0) {
    throw new Error('Please enter valid obtained marks and positive total marks');
  }
  if (obtainedMarks < 0) {
    throw new Error('Obtained marks cannot be negative');
  }
  if (obtainedMarks > totalMarks) {
    throw new Error('Obtained marks cannot exceed maximum total marks');
  }

  const percentage = (obtainedMarks / totalMarks) * 100;
  const isPassed = percentage >= 40.0;

  let grade = 'F (Fail)';
  let divisionClass = 'Fail';
  let status: 'Pass' | 'Fail' | 'Distinction' | 'Good' = 'Fail';

  if (percentage >= 75) {
    grade = 'Distinction (O / A+)';
    divisionClass = 'First Class with Distinction';
    status = 'Distinction';
  } else if (percentage >= 60) {
    grade = 'First Class (A)';
    divisionClass = 'First Class';
    status = 'Good';
  } else if (percentage >= 55) {
    grade = 'Higher Second (B+)';
    divisionClass = 'Higher Second Class';
    status = 'Good';
  } else if (percentage >= 50) {
    grade = 'Second Class (B)';
    divisionClass = 'Second Class';
    status = 'Pass';
  } else if (percentage >= 40) {
    grade = 'Pass Class (C / P)';
    divisionClass = 'Pass Class';
    status = 'Pass';
  }

  return {
    primaryValue: percentage.toFixed(2),
    primaryLabel: 'Percentage',
    primaryUnit: '%',
    grade,
    divisionClass,
    status,
    formulaUsed: 'Percentage = (Obtained Marks / Total Marks) × 100',
    steps: [
      `Obtained: ${obtainedMarks} / Maximum: ${totalMarks}`,
      `Calculation: (${obtainedMarks} / ${totalMarks}) × 100 = ${percentage.toFixed(2)}%`,
    ],
    secondaryValues: [
      { label: 'Marks Ratio', value: `${obtainedMarks} / ${totalMarks}`, badgeColor: 'blue' },
      { label: 'Result Status', value: isPassed ? 'PASSED' : 'FAILED', badgeColor: isPassed ? 'green' : 'rose' },
      { label: 'Awarded Class', value: divisionClass, badgeColor: 'purple' },
    ],
    remarks: isPassed
      ? `Successfully cleared with ${percentage.toFixed(2)}%.`
      : 'Below minimum passing requirement of 40%.',
  };
}

/**
 * Calculates SPPU In-Sem (30) + End-Sem (70) or Custom Passing
 */
export function calculateInternalExternalMarks(
  inSemScore: number,
  inSemMax: number = 30,
  endSemScore: number,
  endSemMax: number = 70,
  passPercentage: number = 40
): CalculationResult {
  if (isNaN(inSemScore) || isNaN(endSemScore)) {
    throw new Error('Please enter valid numeric scores for In-Sem and End-Sem');
  }
  if (inSemScore < 0 || inSemScore > inSemMax) {
    throw new Error(`In-Sem marks must be between 0 and ${inSemMax}`);
  }
  if (endSemScore < 0 || endSemScore > endSemMax) {
    throw new Error(`End-Sem marks must be between 0 and ${endSemMax}`);
  }

  const totalObtained = inSemScore + endSemScore;
  const totalMax = inSemMax + endSemMax;
  const percentage = (totalObtained / totalMax) * 100;

  // SPPU Rule: Minimum 40% aggregate AND minimum 40% in End-Sem for university theory exam (28 out of 70)
  const minEndSemRequired = endSemMax === 70 ? 28 : (endSemMax * passPercentage) / 100;
  const passedEndSemMin = endSemScore >= minEndSemRequired;
  const passedTotalMin = totalObtained >= (totalMax * passPercentage) / 100;
  const passed = passedEndSemMin && passedTotalMin;

  const steps: string[] = [
    `In-Sem: ${inSemScore} / ${inSemMax}`,
    `End-Sem: ${endSemScore} / ${endSemMax} (Passing cutoff is ${minEndSemRequired.toFixed(0)}/${endSemMax})`,
    `Total Aggregate: ${totalObtained} / ${totalMax} (${percentage.toFixed(2)}%)`,
  ];

  if (!passedEndSemMin) {
    steps.push(`⚠️ Failed End-Sem individual threshold (Needed at least ${minEndSemRequired.toFixed(0)}, scored ${endSemScore})`);
  }
  if (!passedTotalMin) {
    steps.push(`⚠️ Failed total aggregate threshold (Needed at least ${(totalMax * 0.4).toFixed(0)}, scored ${totalObtained})`);
  }

  return {
    primaryValue: `${totalObtained}/${totalMax}`,
    primaryLabel: 'Total Marks',
    primaryUnit: `(${percentage.toFixed(1)}%)`,
    status: passed ? 'Pass' : 'Fail',
    grade: passed ? (percentage >= 75 ? 'Distinction' : percentage >= 60 ? 'First Class' : 'Pass Class') : 'ATKT / Backlog',
    divisionClass: passed ? (percentage >= 75 ? 'First Class with Distinction' : 'Passed') : 'Failed in Subject',
    formulaUsed: 'Total = In-Sem + End-Sem (Rule: End-Sem ≥ 28/70 & Total ≥ 40/100)',
    steps,
    secondaryValues: [
      { label: 'Aggregate %', value: `${percentage.toFixed(2)}%`, badgeColor: 'blue' },
      { label: 'End-Sem Cutoff', value: passedEndSemMin ? 'CLEARED' : 'NOT MET (Min 28)', badgeColor: passedEndSemMin ? 'green' : 'rose' },
      { label: 'Subject Status', value: passed ? 'PASSED' : 'ATKT / FAILED', badgeColor: passed ? 'green' : 'rose' },
    ],
    remarks: passed
      ? 'Congratulations! You have satisfied both SPPU End-Sem minimum cutoff and overall aggregate criteria.'
      : 'Did not meet passing criteria. Remember that SPPU requires min 28/70 in End-Sem and min 40/100 combined.',
  };
}

/**
 * Calculates Required Marks in End-Sem given In-Sem score and target
 */
export function calculateRequiredMarks(
  inSemScore: number,
  inSemMax: number = 30,
  endSemMax: number = 70,
  targetAggregatePercent: number = 40
): CalculationResult {
  if (isNaN(inSemScore) || inSemScore < 0 || inSemScore > inSemMax) {
    throw new Error(`Please enter valid In-Sem marks between 0 and ${inSemMax}`);
  }

  const totalMax = inSemMax + endSemMax;
  const targetTotalMarks = (totalMax * targetAggregatePercent) / 100;
  let rawRequired = targetTotalMarks - inSemScore;

  // SPPU rule: Minimum 28/70 in End-Sem always applies regardless of how high In-Sem is
  const officialMinEndSem = endSemMax === 70 ? 28 : (endSemMax * 0.4);
  const effectiveRequired = Math.max(rawRequired, officialMinEndSem);

  const steps: string[] = [
    `In-Sem score: ${inSemScore} / ${inSemMax}`,
    `Target total marks for ${targetAggregatePercent}%: ${targetTotalMarks.toFixed(1)} / ${totalMax}`,
    `Mathematical difference: ${targetTotalMarks.toFixed(1)} - ${inSemScore} = ${rawRequired.toFixed(1)} marks`,
    `Official SPPU End-Sem cutoff rule: Minimum ${officialMinEndSem.toFixed(0)} / ${endSemMax} is strictly required.`,
  ];

  let isPossible = true;
  let remarks = '';

  if (effectiveRequired > endSemMax) {
    isPossible = false;
    remarks = `Target of ${targetAggregatePercent}% is not mathematically achievable with an In-Sem score of ${inSemScore}. Max possible is ${((inSemScore + endSemMax) / totalMax * 100).toFixed(1)}%.`;
  } else {
    remarks = `You must score at least ${Math.ceil(effectiveRequired)} marks out of ${endSemMax} in your End-Sem examination to achieve ${targetAggregatePercent}%.`;
  }

  return {
    primaryValue: isPossible ? Math.ceil(effectiveRequired) : 'Not Possible',
    primaryLabel: `Required End-Sem Marks (out of ${endSemMax})`,
    primaryUnit: isPossible ? `marks` : '',
    status: isPossible ? (effectiveRequired <= officialMinEndSem ? 'Safe' : 'Good') : 'Fail',
    formulaUsed: 'Required End-Sem = Max(Target Total - In-Sem, SPPU Minimum 28)',
    steps,
    secondaryValues: [
      { label: 'Target Aggregate', value: `${targetAggregatePercent}%`, badgeColor: 'blue' },
      { label: 'Min Passing Cutoff', value: `${officialMinEndSem.toFixed(0)} / ${endSemMax}`, badgeColor: 'purple' },
      { label: 'Max Possible %', value: `${(((inSemScore + endSemMax) / totalMax) * 100).toFixed(1)}%`, badgeColor: 'slate' },
    ],
    remarks,
  };
}

/**
 * Passing Marks Calculator
 */
export function calculatePassingMarks(
  maxMarks: number,
  passingPercentage: number = 40
): CalculationResult {
  if (isNaN(maxMarks) || maxMarks <= 0) {
    throw new Error('Please enter a valid positive total maximum marks');
  }

  const passingMarks = (maxMarks * passingPercentage) / 100;
  const roundedPassingMarks = Math.ceil(passingMarks);

  return {
    primaryValue: roundedPassingMarks,
    primaryLabel: 'Minimum Passing Marks',
    primaryUnit: `/ ${maxMarks}`,
    status: 'Pass',
    formulaUsed: 'Passing Marks = (Maximum Marks × Passing %) / 100',
    steps: [
      `Maximum Marks: ${maxMarks}`,
      `Passing Percentage: ${passingPercentage}%`,
      `Calculation: (${maxMarks} × ${passingPercentage}) / 100 = ${passingMarks.toFixed(2)} → ${roundedPassingMarks}`,
    ],
    secondaryValues: [
      { label: 'Standard SPPU Rule', value: '40% Minimum', badgeColor: 'blue' },
      { label: 'Marks Needed', value: `${roundedPassingMarks} of ${maxMarks}`, badgeColor: 'green' },
    ],
    remarks: `A student must obtain at least ${roundedPassingMarks} out of ${maxMarks} to be declared passed in this subject.`,
  };
}

/**
 * Average Marks Calculator
 */
export function calculateAverageMarks(subjectMarks: { name: string; obtained: number; max: number }[]): CalculationResult {
  const valid = subjectMarks.filter(s => s.max > 0 && !isNaN(s.obtained) && s.obtained >= 0);
  if (valid.length === 0) {
    throw new Error('Please enter at least one subject with valid marks');
  }

  const totalObtained = valid.reduce((acc, s) => acc + s.obtained, 0);
  const totalMax = valid.reduce((acc, s) => acc + s.max, 0);
  const avgObtained = totalObtained / valid.length;
  const percentage = (totalObtained / totalMax) * 100;
  
  const marksList = valid.map(s => s.obtained);
  const highest = Math.max(...marksList);
  const lowest = Math.min(...marksList);

  return {
    primaryValue: avgObtained.toFixed(1),
    primaryLabel: 'Average Marks Per Subject',
    primaryUnit: 'marks',
    status: percentage >= 40 ? 'Pass' : 'Fail',
    formulaUsed: 'Average = Sum of Marks / Total Number of Subjects',
    steps: [
      `Total Marks Scored: ${totalObtained} / ${totalMax}`,
      `Subjects Counted: ${valid.length}`,
      `Average: ${totalObtained} / ${valid.length} = ${avgObtained.toFixed(2)}`,
    ],
    secondaryValues: [
      { label: 'Overall Percentage', value: `${percentage.toFixed(2)}%`, badgeColor: 'blue' },
      { label: 'Highest Score', value: highest, badgeColor: 'green' },
      { label: 'Lowest Score', value: lowest, badgeColor: 'rose' },
    ],
  };
}
