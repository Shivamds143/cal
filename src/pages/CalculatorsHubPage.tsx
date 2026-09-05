import React from 'react';
import { CalculatorsHub } from '../components/CalculatorsHub';
import { SEOHead } from '../components/SEOHead';

export function CalculatorsHubPage() {
  return (
    <>
      <SEOHead
        title="All 17 SPPU Academic Calculators — CGPA, SGPA, Marks, Attendance | SPPUCalc"
        description="Browse all 17 free SPPU calculators: CGPA to percentage, SGPA to CGPA, passing marks, In-Sem/End-Sem rules, attendance percentage, target CGPA planner, grade calculator, and more."
        canonicalPath="/calculators"
      />
      <CalculatorsHub />
    </>
  );
}
