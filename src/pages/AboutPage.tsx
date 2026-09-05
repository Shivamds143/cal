import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';

// Global FAQ data for the About page structured data
const ABOUT_FAQS = [
  {
    question: 'Does SPPU use CGPA × 9.5 to convert to Percentage?',
    answer: 'No. While CBSE and some technical boards use 9.5, SPPU CBCS circulars officially prescribe a piecewise formula (e.g. for CGPA between 8.25 and 9.24, Percentage = 75 + (CGPA - 8.25) × 10). Using 9.5 can produce discrepancies on official verification.',
  },
  {
    question: 'What is the minimum passing score in SPPU In-Sem and End-Sem exams?',
    answer: 'For a 100-mark theory course (30 In-Sem + 70 End-Sem), you must secure at least 28 marks (40%) in the End-Semester exam individually, and at least 40 marks out of 100 in total.',
  },
  {
    question: 'How is CGPA calculated from SGPA across multiple semesters?',
    answer: 'CGPA is calculated as the credit-weighted average: CGPA = Σ(SGPA_i × Credits_i) / Σ(Credits_i). If all semesters have identical credits (e.g. 20 credits each), it simplifies to the arithmetic mean of the SGPAs.',
  },
  {
    question: 'What CGPA is required for First Class with Distinction in SPPU?',
    answer: 'A cumulative CGPA of 7.75 or higher qualifies for First Class with Distinction. A CGPA of 6.75 to 7.74 qualifies for First Class, 6.25 to 6.74 for Higher Second Class, and 5.50 to 6.24 for Second Class.',
  },
  {
    question: 'How do backlogs (ATKT) affect my CGPA calculation?',
    answer: 'When you clear a backlog subject in subsequent examination cycles, the newly earned grade points replace the previous zero or failing grade points in the cumulative credit calculations.',
  },
  {
    question: 'Is this calculator free and safe to use?',
    answer: 'Yes, 100% free forever. All calculations are carried out entirely client-side inside your web browser. No personal student data is stored or transferred to any remote servers.',
  },
];

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About SPPU Grading System & FAQs — Grade Scale, Divisions, ATKT Rules | SPPUCalc"
        description="Everything about SPPU's 10-point UGC-CBCS grading scale, letter grades (O, A+, A, B+, B, C, P, F), class divisions, ATKT backlog rules, and frequently asked academic questions."
        canonicalPath="/about"
      />
      <StructuredData type="faq" faqs={ABOUT_FAQS} />
      <AboutSection />
    </>
  );
}
