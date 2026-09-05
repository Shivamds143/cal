import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://sppucalc.com';

interface FAQ {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  type: 'website' | 'calculator' | 'faq';
  calculatorName?: string;
  calculatorDescription?: string;
  calculatorSlug?: string;
  faqs?: FAQ[];
}

/**
 * Injects JSON-LD structured data into the page head.
 * 
 * Supports three schema types:
 * - "website": WebSite schema with SearchAction (for homepage)
 * - "calculator": WebApplication schema + FAQPage schema (for each calculator)
 * - "faq": Standalone FAQPage schema (for the About page)
 */
export const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  calculatorName,
  calculatorDescription,
  calculatorSlug,
  faqs,
}) => {
  const schemas: object[] = [];

  if (type === 'website') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SPPUCalc — SPPU Academic Calculators',
      url: SITE_URL,
      description:
        'Free online calculators for Savitribai Phule Pune University (SPPU) students. Calculate CGPA to percentage, SGPA to CGPA, passing marks, and more.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/calculators?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    });
  }

  if (type === 'calculator' && calculatorName && calculatorSlug) {
    // WebApplication schema for the calculator tool
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: calculatorName,
      description: calculatorDescription || '',
      url: `${SITE_URL}/${calculatorSlug}`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      creator: {
        '@type': 'Organization',
        name: 'SPPUCalc',
        url: SITE_URL,
      },
    });

    // BreadcrumbList for calculator pages
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Calculators',
          item: `${SITE_URL}/calculators`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: calculatorName,
          item: `${SITE_URL}/${calculatorSlug}`,
        },
      ],
    });
  }

  // FAQPage schema — used for both calculator-specific FAQs and the About page
  if ((type === 'calculator' || type === 'faq') && faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  if (schemas.length === 0) return null;

  return (
    <Helmet>
      {schemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
