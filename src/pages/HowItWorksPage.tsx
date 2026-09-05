import React from 'react';
import { HowItWorks } from '../components/HowItWorks';
import { SEOHead } from '../components/SEOHead';

export function HowItWorksPage() {
  return (
    <>
      <SEOHead
        title="How SPPU CGPA to Percentage Conversion Works — Official Formulas Explained | SPPUCalc"
        description="Learn how Savitribai Phule Pune University (SPPU) converts CGPA to percentage using the official CBCS piecewise formula. Understand passing rules, 75% attendance mandate, and grading scales."
        canonicalPath="/how-it-works"
      />
      <HowItWorks />
    </>
  );
}
