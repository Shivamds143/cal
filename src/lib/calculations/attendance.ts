import { CalculationResult } from '../../types/calculator';

/**
 * Calculates Student Attendance Percentage
 */
export function calculateAttendance(
  attended: number,
  totalConducted: number
): CalculationResult {
  if (isNaN(attended) || isNaN(totalConducted) || totalConducted <= 0) {
    throw new Error('Please enter valid positive total conducted lectures');
  }
  if (attended < 0) {
    throw new Error('Attended lectures cannot be negative');
  }
  if (attended > totalConducted) {
    throw new Error('Attended lectures cannot exceed total conducted lectures');
  }

  const percentage = (attended / totalConducted) * 100;
  const isEligible = percentage >= 75.0;
  const isCondoneEligible = percentage >= 60.0 && percentage < 75.0;

  let status: 'Safe' | 'Warning' | 'Fail' | 'Good' = 'Fail';
  let remarks = '';

  if (percentage >= 85) {
    status = 'Safe';
    remarks = 'Superb attendance! You are well clear of the 75% mandate.';
  } else if (percentage >= 75) {
    status = 'Good';
    remarks = 'You meet the mandatory 75% SPPU university attendance criterion.';
  } else if (percentage >= 60) {
    status = 'Warning';
    remarks = 'Defaulter alert! You are below 75%. You might need medical/principal condonation.';
  } else {
    status = 'Fail';
    remarks = 'Critical Defaulter! Serious detention risk for university term end exams.';
  }

  return {
    primaryValue: percentage.toFixed(1),
    primaryLabel: 'Current Attendance',
    primaryUnit: '%',
    status,
    formulaUsed: 'Attendance % = (Attended Lectures / Total Conducted) × 100',
    steps: [
      `Attended: ${attended} lectures`,
      `Total Conducted: ${totalConducted} lectures`,
      `Calculation: (${attended} / ${totalConducted}) × 100 = ${percentage.toFixed(2)}%`,
    ],
    secondaryValues: [
      { label: 'SPPU 75% Norm', value: isEligible ? 'SATISFIED' : isCondoneEligible ? 'WARNING (<75%)' : 'DEFAULTER (<60%)', badgeColor: isEligible ? 'green' : isCondoneEligible ? 'amber' : 'rose' },
      { label: 'Classes Missed', value: `${totalConducted - attended} lectures`, badgeColor: 'slate' },
    ],
    remarks,
  };
}

/**
 * Calculates Required Attendance (or Bunks Allowed) to maintain target %
 */
export function calculateRequiredAttendance(
  attended: number,
  totalConducted: number,
  targetPercentage: number = 75
): CalculationResult {
  if (isNaN(attended) || isNaN(totalConducted) || totalConducted <= 0) {
    throw new Error('Please enter valid numbers for lectures attended and conducted');
  }
  if (attended > totalConducted) {
    throw new Error('Attended lectures cannot exceed total conducted lectures');
  }

  const currentPct = (attended / totalConducted) * 100;
  const target = targetPercentage / 100;

  // If current % < target %, how many consecutive classes to attend?
  // (attended + x) / (totalConducted + x) >= target
  // attended + x >= target * totalConducted + target * x
  // x (1 - target) >= target * totalConducted - attended
  // x = ceil((target * totalConducted - attended) / (1 - target))

  if (currentPct < targetPercentage) {
    const needed = Math.ceil((target * totalConducted - attended) / (1 - target));
    const newTotal = totalConducted + needed;
    const newAttended = attended + needed;
    const newPct = (newAttended / newTotal) * 100;

    return {
      primaryValue: needed,
      primaryLabel: `Lectures to Attend Consecutively for ${targetPercentage}%`,
      primaryUnit: 'classes',
      status: 'Warning',
      formulaUsed: 'Needed = ⌈(Target × Total - Attended) / (1 - Target)⌉',
      steps: [
        `Current Attendance: ${currentPct.toFixed(1)}% (${attended}/${totalConducted})`,
        `Target: ${targetPercentage}%`,
        `Formula: (${targetPercentage}% × ${totalConducted} - ${attended}) / (1 - ${target})`,
        `Must attend next ${needed} classes without missing any.`,
        `Future attendance after attending: ${newAttended}/${newTotal} = ${newPct.toFixed(1)}%`,
      ],
      secondaryValues: [
        { label: 'Current Attendance', value: `${currentPct.toFixed(1)}%`, badgeColor: 'rose' },
        { label: 'Target Goal', value: `${targetPercentage}%`, badgeColor: 'blue' },
      ],
      remarks: `You need to attend the next ${needed} classes in a row to get back to ${targetPercentage}%.`,
    };
  } else {
    // How many classes can be bunked without dropping below target?
    // attended / (totalConducted + y) >= target
    // totalConducted + y <= attended / target
    // y = floor(attended / target - totalConducted)
    const canBunk = Math.floor(attended / target - totalConducted);
    const newTotal = totalConducted + canBunk;
    const newPct = (attended / newTotal) * 100;

    return {
      primaryValue: Math.max(0, canBunk),
      primaryLabel: `Classes You Can Safely Miss / Bunk`,
      primaryUnit: 'classes',
      status: 'Safe',
      formulaUsed: 'Bunks Allowed = ⌊(Attended / Target) - Total Conducted⌋',
      steps: [
        `Current Attendance: ${currentPct.toFixed(1)}% (${attended}/${totalConducted})`,
        `Target threshold: ${targetPercentage}%`,
        `Formula: (${attended} / ${target}) - ${totalConducted} = ${canBunk} classes`,
        `If you skip ${canBunk} classes, your attendance will stay at ${newPct.toFixed(1)}% (above ${targetPercentage}%).`,
      ],
      secondaryValues: [
        { label: 'Current Attendance', value: `${currentPct.toFixed(1)}%`, badgeColor: 'green' },
        { label: 'Buffer Margin', value: `${(currentPct - targetPercentage).toFixed(1)}% safe`, badgeColor: 'blue' },
      ],
      remarks: canBunk > 0
        ? `You have attendance margin! You can safely miss up to ${canBunk} lectures and still remain above ${targetPercentage}%.`
        : `You are exactly on the edge (${currentPct.toFixed(1)}%). Do not miss any upcoming lectures!`,
    };
  }
}
