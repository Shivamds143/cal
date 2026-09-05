import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CalculatorShell } from '../components/CalculatorShell';
import { CALCULATORS } from '../data/calculators';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';

export function CalculatorPage() {
  const { calculatorSlug } = useParams<{ calculatorSlug: string }>();

  const calculator = CALCULATORS.find(c => c.slug === calculatorSlug);

  // If the slug doesn't match any calculator, redirect to homepage
  if (!calculator) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SEOHead
        title={`${calculator.title} — Free Online Tool | SPPUCalc`}
        description={calculator.description}
        canonicalPath={`/${calculator.slug}`}
      />
      <StructuredData
        type="calculator"
        calculatorName={calculator.title}
        calculatorDescription={calculator.description}
        calculatorSlug={calculator.slug}
        faqs={calculator.faqs}
      />
      <CalculatorShell slug={calculator.slug} />
    </>
  );
}
