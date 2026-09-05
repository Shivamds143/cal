import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { CalculatorsHub } from '../components/CalculatorsHub';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';

export function HomePage() {
  return (
    <>
      <SEOHead
        title="SPPU Calculator — Free CGPA, SGPA, Percentage & Marks Calculators"
        description="Free online calculators for SPPU (Pune University) students. Convert CGPA to percentage, SGPA to CGPA, calculate passing marks, attendance percentage, and more — instantly and accurately."
        canonicalPath="/"
      />
      <StructuredData type="website" />
      <div>
        <HomeHero />
        <CalculatorsHub />
      </div>
    </>
  );
}
