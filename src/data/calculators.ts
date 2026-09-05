import { CalculatorMeta, FAQItem } from '../types/calculator';

export const CALCULATORS: (CalculatorMeta & {
  faqs: FAQItem[];
  example: {
    input: string;
    output: string;
    explanation: string;
  };
})[] = [
  // CATEGORY 1: SPPU GPA CALCULATORS
  {
    id: 'sppu-cgpa-to-percentage',
    slug: 'sppu-cgpa-to-percentage',
    title: 'SPPU CGPA to Percentage Calculator',
    shortTitle: 'CGPA to Percentage',
    description: 'Convert your SPPU (Pune University) CGPA into official equivalent percentage using 2019/2024 CBCS pattern formulas.',
    category: 'gpa',
    badge: 'Most Popular',
    iconName: 'GraduationCap',
    popular: true,
    keywords: ['SPPU CGPA to percentage', 'pune university cgpa converter', 'sppu 2019 pattern cgpa to percentage', 'cgpa to percentage sppu formula'],
    formulaSummary: 'SPPU Piecewise Formula: CGPA ≥ 8.25: (10 × CGPA) - 7.5 | CGPA 6.75-8.24: (5 × CGPA) + 33.75 | CGPA 5.75-6.74: (7.5 × CGPA) + 16.875',
    example: {
      input: 'CGPA = 8.50 (2019 Pattern)',
      output: 'Percentage = 77.50% (First Class with Distinction)',
      explanation: 'Since 8.50 falls in the range 8.25 - 9.74, formula is (10 × 8.50) - 7.5 = 85.0 - 7.5 = 77.50%.',
    },
    faqs: [
      {
        question: 'What is the official SPPU formula for CGPA to Percentage?',
        answer: 'SPPU uses a piecewise continuous range formula for CBCS 2019 and 2024 patterns. For CGPA between 8.25 and 9.74, Percentage = (10 × CGPA) - 7.5. For CGPA between 6.75 and 8.24, Percentage = (5 × CGPA) + 33.75.',
      },
      {
        question: 'Does SPPU multiply CGPA by 9.5 or 8.9?',
        answer: 'While CBSE and AICTE default to 9.5, SPPU issued a specific circular for CBCS Engineering and science courses defining bracketed equations to ensure continuous fairness across divisions.',
      },
      {
        question: 'What CGPA is required for First Class with Distinction in SPPU?',
        answer: 'A CGPA of 7.75 or higher (or equivalent percentage of 66% and above) qualifies for First Class with Distinction in SPPU.',
      },
    ],
  },
  {
    id: 'sppu-percentage-to-cgpa',
    slug: 'sppu-percentage-to-cgpa',
    title: 'SPPU Percentage to CGPA Calculator',
    shortTitle: 'Percentage to CGPA',
    description: 'Reverse convert your aggregate percentage into expected SPPU CGPA and 10-point scale grade.',
    category: 'gpa',
    badge: 'Official Range',
    iconName: 'Percent',
    popular: false,
    keywords: ['percentage to cgpa sppu', 'pune university percentage to grade points', 'convert marks to cgpa sppu'],
    formulaSummary: 'Inverse SPPU CBCS piecewise mapping based on percentage brackets.',
    example: {
      input: 'Percentage = 77.50%',
      output: 'CGPA = 8.50',
      explanation: 'For 75.0% - 94.99%, inverse formula is (Percentage + 7.5) / 10 = (77.50 + 7.5) / 10 = 8.50.',
    },
    faqs: [
      {
        question: 'How to convert percentage to CGPA for SPPU?',
        answer: 'Use the reverse bracket calculation: For percentages between 75% and 94.99%, add 7.5 and divide by 10.',
      },
      {
        question: 'Is 70% equivalent to 7.0 CGPA?',
        answer: 'No, in SPPU 70.0% converts to approximately 7.25 CGPA according to the (Percentage - 33.75) / 5 equation.',
      },
    ],
  },
  {
    id: 'sppu-sgpa-to-percentage',
    slug: 'sppu-sgpa-to-percentage',
    title: 'SPPU SGPA to Percentage Calculator',
    shortTitle: 'SGPA to Percentage',
    description: 'Quickly find your semester-wise percentage from your SGPA on your SPPU mark sheet.',
    category: 'gpa',
    badge: 'Semester',
    iconName: 'Calculator',
    popular: true,
    keywords: ['sppu sgpa to percentage', 'semester gpa to percentage pune university', 'sgpa to marks sppu'],
    formulaSummary: 'Applied according to SPPU semester grading scale regulations.',
    example: {
      input: 'SGPA = 9.10',
      output: 'Percentage = 83.50% (Grade O)',
      explanation: 'Formula: (10 × 9.10) - 7.5 = 91.0 - 7.5 = 83.50%.',
    },
    faqs: [
      {
        question: 'Can I use the same formula for SGPA as CGPA in SPPU?',
        answer: 'Yes! The semester-level conversion from SGPA to percentage follows the same conversion standard as cumulative CGPA in SPPU.',
      },
    ],
  },
  {
    id: 'sppu-sgpa-to-cgpa',
    slug: 'sppu-sgpa-to-cgpa',
    title: 'SPPU SGPA to CGPA Calculator',
    shortTitle: 'SGPA to CGPA',
    description: 'Calculate your cumulative CGPA from semester SGPAs (Sem 1 through Sem 8) with credit weighting.',
    category: 'gpa',
    badge: 'Multi-Sem',
    iconName: 'TrendingUp',
    popular: true,
    keywords: ['sppu sgpa to cgpa', 'calculate cgpa from 8 semesters sppu', 'credit weighted cgpa calculator'],
    formulaSummary: 'CGPA = Σ(SGPA_i × Credits_i) / Σ(Credits_i)',
    example: {
      input: 'Sem 1 (20 cr): 8.0, Sem 2 (20 cr): 8.6',
      output: 'CGPA = 8.30 (First Class with Distinction)',
      explanation: '(8.0 × 20 + 8.6 × 20) / 40 = (160 + 172) / 40 = 8.30.',
    },
    faqs: [
      {
        question: 'Do all SPPU semesters have equal credit weight?',
        answer: 'In SPPU Engineering, semesters usually carry between 18 and 24 credits. Our calculator allows entering custom credits for exact precision or standard equal weighting.',
      },
    ],
  },
  {
    id: 'sppu-cgpa-calculator',
    slug: 'sppu-cgpa-calculator',
    title: 'SPPU Course CGPA Calculator',
    shortTitle: 'Course CGPA',
    description: 'Calculate semester SGPA and grade points directly from individual subject credits and grades.',
    category: 'gpa',
    badge: 'Subject-wise',
    iconName: 'BookOpen',
    popular: false,
    keywords: ['sppu course gpa calculator', 'calculate gpa from subject grades sppu', 'credit point calculator'],
    formulaSummary: 'SGPA = Σ(Subject Grade Points × Credits) / Total Credits',
    example: {
      input: 'Sub 1: Grade A (8 pts, 4 cr), Sub 2: Grade O (10 pts, 3 cr)',
      output: 'SGPA = 8.86',
      explanation: '(8 × 4 + 10 × 3) / (4 + 3) = (32 + 30) / 7 = 62 / 7 = 8.86.',
    },
    faqs: [
      {
        question: 'What are the grade points for SPPU letter grades?',
        answer: 'O = 10, A+ = 9, A = 8, B+ = 7, B = 6, C = 5, P = 4, F = 0.',
      },
    ],
  },
  {
    id: 'semester-wise-cgpa',
    slug: 'semester-wise-cgpa',
    title: 'Semester-wise CGPA Tracker',
    shortTitle: 'Sem-wise CGPA',
    description: 'Track your cumulative CGPA progression from 1st year to 4th year across all 8 semesters.',
    category: 'gpa',
    iconName: 'LineChart',
    popular: false,
    keywords: ['semester wise cgpa calculator sppu', 'engineering cgpa tracker pune university', '8 semester cgpa'],
    formulaSummary: 'Cumulative progression tracker with live trend analytics.',
    example: {
      input: 'Sem 1: 7.8, Sem 2: 8.2, Sem 3: 8.5',
      output: 'Cumulative CGPA = 8.17',
      explanation: 'Average of 3 semesters weighted by credit totals.',
    },
    faqs: [
      {
        question: 'How does SPPU calculate final degree CGPA?',
        answer: 'For 4-year B.E./B.Tech programs, SPPU calculates the final CGPA based on credits earned across all semesters, with special weightage on 3rd and 4th year honors where specified.',
      },
    ],
  },

  // CATEGORY 2: MARKS CALCULATORS
  {
    id: 'marks-percentage',
    slug: 'marks-percentage',
    title: 'Marks Percentage Calculator',
    shortTitle: 'Marks Percentage',
    description: 'Calculate overall marks percentage, status, and class division instantly.',
    category: 'marks',
    badge: 'Essential',
    iconName: 'FileCheck',
    popular: true,
    keywords: ['marks percentage calculator', 'calculate percentage from marks', 'total marks percentage'],
    formulaSummary: 'Percentage = (Obtained Marks / Total Maximum Marks) × 100',
    example: {
      input: 'Obtained = 645, Total = 750',
      output: 'Percentage = 86.00% (First Class with Distinction)',
      explanation: '(645 / 750) × 100 = 86.00%.',
    },
    faqs: [
      {
        question: 'How is university percentage calculated from marks?',
        answer: 'Divide the total marks scored across all theory, practical, and internal heads by the total maximum marks and multiply by 100.',
      },
    ],
  },
  {
    id: 'internal-external-marks',
    slug: 'internal-external-marks',
    title: 'SPPU In-Sem + End-Sem Marks Calculator',
    shortTitle: 'In-Sem + End-Sem',
    description: 'Check combined 30 In-Sem and 70 End-Sem theory marks and verify SPPU passing eligibility.',
    category: 'marks',
    badge: 'SPPU Rule',
    iconName: 'Layers',
    popular: false,
    keywords: ['sppu in sem end sem marks calculator', '30 insem 70 endsem sppu passing', 'internal external marks pune university'],
    formulaSummary: 'End-Sem min 28/70 AND Combined min 40/100',
    example: {
      input: 'In-Sem = 24/30, End-Sem = 32/70',
      output: 'Total = 56/100 (PASSED - Both criteria cleared)',
      explanation: 'End-Sem 32 ≥ 28 and Total 56 ≥ 40, so subject is cleared.',
    },
    faqs: [
      {
        question: 'What is the passing rule for 30 In-Sem and 70 End-Sem in SPPU?',
        answer: 'You MUST score at least 28 marks out of 70 in End-Sem, and your combined score (In-Sem + End-Sem) must be at least 40 out of 100.',
      },
      {
        question: 'What happens if I score 30/30 in In-Sem but 25/70 in End-Sem?',
        answer: 'You will receive ATKT/Fail in the theory paper because you did not meet the individual 28/70 cutoff in the End-Sem university exam.',
      },
    ],
  },
  {
    id: 'required-marks',
    slug: 'required-marks',
    title: 'Required End-Sem Marks Calculator',
    shortTitle: 'Required Marks',
    description: 'Find out exactly how many marks you need in the 70-mark End-Sem exam based on your In-Sem score.',
    category: 'marks',
    badge: 'Exam Prep',
    iconName: 'Target',
    popular: false,
    keywords: ['required marks in end sem sppu', 'how many marks needed in end sem to pass', 'in sem to end sem calculator'],
    formulaSummary: 'Required = Max(Target Total - In-Sem, SPPU Minimum 28)',
    example: {
      input: 'In-Sem = 18/30, Target = 40% Pass',
      output: 'Need 28 / 70 in End-Sem',
      explanation: 'Even though 40 - 18 = 22, the mandatory SPPU End-Sem minimum cutoff is 28.',
    },
    faqs: [
      {
        question: 'If I scored 0 in In-Sem, can I still pass?',
        answer: 'Yes! If you score at least 40 out of 70 in the End-Sem exam, your total will be 40/100, which satisfies both passing criteria.',
      },
    ],
  },
  {
    id: 'passing-marks',
    slug: 'passing-marks',
    title: 'SPPU Passing Marks Calculator',
    shortTitle: 'Passing Marks',
    description: 'Calculate minimum passing marks for any SPPU theory, practical, term work, or oral head.',
    category: 'marks',
    badge: 'Cutoff',
    iconName: 'ShieldCheck',
    popular: true,
    keywords: ['sppu passing marks calculator', 'pune university passing criteria', 'passing marks for 50 100 25'],
    formulaSummary: 'Passing Marks = 40% of Maximum Marks (rounded up)',
    example: {
      input: 'Max Marks = 50 (Term Work / Oral)',
      output: 'Passing Marks = 20 / 50',
      explanation: '40% of 50 = 20 marks.',
    },
    faqs: [
      {
        question: 'What are the passing marks for a 25-mark Term Work?',
        answer: 'For 25 marks, 40% is 10 marks. You must score at least 10/25 to pass.',
      },
    ],
  },
  {
    id: 'total-marks-calculator',
    slug: 'total-marks-calculator',
    title: 'Total Marks & Breakdown Calculator',
    shortTitle: 'Total Marks',
    description: 'Calculate total marks across all semester subjects, identify pass/fail counts and percentage.',
    category: 'marks',
    iconName: 'Calculator',
    popular: false,
    keywords: ['total marks calculator', 'sppu semester marks accumulator', 'subject marks sum'],
    formulaSummary: 'Total = Σ(Subject Marks) | Percentage = (Total / Max Total) × 100',
    example: {
      input: '5 subjects of 100 marks each',
      output: 'Total = 412 / 500 (82.40%)',
      explanation: 'Sum of all subject marks divided by total maximum marks.',
    },
    faqs: [
      {
        question: 'Can I add practical and oral marks together with theory?',
        answer: 'Yes, our total marks calculator lets you enter custom maximum marks for each subject or head.',
      },
    ],
  },
  {
    id: 'average-marks-calculator',
    slug: 'average-marks-calculator',
    title: 'Average Marks Calculator',
    shortTitle: 'Average Marks',
    description: 'Find mean subject marks, highest score, lowest score, and performance distribution.',
    category: 'marks',
    iconName: 'BarChart2',
    popular: false,
    keywords: ['average marks calculator', 'mean marks sppu', 'subject marks average'],
    formulaSummary: 'Average = Total Marks / Number of Subjects',
    example: {
      input: 'Scores: 78, 85, 92, 68, 74',
      output: 'Average = 79.4 marks (Highest: 92, Lowest: 68)',
      explanation: '(78 + 85 + 92 + 68 + 74) / 5 = 397 / 5 = 79.4.',
    },
    faqs: [
      {
        question: 'How is average marks different from percentage?',
        answer: 'Average marks gives you the typical score out of each subject (e.g. 79.4 out of 100), which directly equals percentage when all subjects are out of 100.',
      },
    ],
  },

  // CATEGORY 3: STUDENT UTILITY
  {
    id: 'target-cgpa-calculator',
    slug: 'target-cgpa-calculator',
    title: 'Target CGPA Calculator',
    shortTitle: 'Target CGPA',
    description: 'Find what SGPA you need in upcoming semesters to graduate with your dream CGPA or Distinction.',
    category: 'utility',
    badge: 'Planner',
    iconName: 'Compass',
    popular: false,
    keywords: ['target cgpa calculator', 'what sgpa needed for 8 cgpa sppu', 'cgpa goal planner'],
    formulaSummary: 'Required SGPA = [Target × Total Credits - Current Total Points] / Remaining Credits',
    example: {
      input: 'Current CGPA = 7.4 (44 credits), Target CGPA = 8.0 (44 remaining credits)',
      output: 'Need SGPA = 8.60 in remaining semesters',
      explanation: '[8.0 × 88 - 7.4 × 44] / 44 = [704 - 325.6] / 44 = 378.4 / 44 = 8.60 SGPA.',
    },
    faqs: [
      {
        question: 'What if the required SGPA is greater than 10.0?',
        answer: 'If the calculation yields >10.0, the target CGPA is mathematically unreachable with the remaining credits. The calculator will inform you of the highest achievable CGPA.',
      },
    ],
  },
  {
    id: 'attendance-percentage',
    slug: 'attendance-percentage',
    title: 'Attendance Percentage Calculator',
    shortTitle: 'Attendance %',
    description: 'Check your current attendance percentage against the mandatory 75% SPPU university threshold.',
    category: 'utility',
    badge: '75% Rule',
    iconName: 'UserCheck',
    popular: false,
    keywords: ['sppu attendance calculator', 'attendance percentage calculator', '75 percent attendance pune university'],
    formulaSummary: 'Attendance % = (Attended / Total Conducted) × 100',
    example: {
      input: 'Attended = 48, Conducted = 60',
      output: 'Attendance = 80.0% (SAFE - Above 75%)',
      explanation: '(48 / 60) × 100 = 80.0%.',
    },
    faqs: [
      {
        question: 'Is 75% attendance compulsory in SPPU?',
        answer: 'Yes, SPPU ordinance mandates a minimum 75% attendance in theory and practical sessions for grant of term and eligibility to appear in university examinations.',
      },
    ],
  },
  {
    id: 'required-attendance',
    slug: 'required-attendance',
    title: 'Required Attendance & Bunk Calculator',
    shortTitle: 'Bunk & Attendance',
    description: 'Calculate how many upcoming classes you must attend to hit 75%, or how many you can safely bunk.',
    category: 'utility',
    badge: 'Smart Planner',
    iconName: 'Clock',
    popular: false,
    keywords: ['bunk calculator sppu', 'how many classes to attend for 75 percent', 'attendance bunker calculator'],
    formulaSummary: 'Bunks Allowed = (Attended / 0.75) - Total | Needed = (0.75 × Total - Attended) / 0.25',
    example: {
      input: 'Attended = 30, Conducted = 50 (Current 60%)',
      output: 'Must attend next 30 classes consecutively',
      explanation: '(0.75 × 50 - 30) / (1 - 0.75) = (37.5 - 30) / 0.25 = 7.5 / 0.25 = 30 classes.',
    },
    faqs: [
      {
        question: 'How accurate is the bunk margin?',
        answer: 'The calculation calculates the exact discrete floor of classes you can miss while keeping your percentage strictly ≥ 75.0%.',
      },
    ],
  },
  {
    id: 'grade-calculator',
    slug: 'grade-calculator',
    title: 'SPPU Grade Calculator (10-Point Scale)',
    shortTitle: 'Grade Calculator',
    description: 'Convert percentage into SPPU CBCS Letter Grade (O, A+, A, B+, B, C, P, F) and grade points.',
    category: 'utility',
    iconName: 'Award',
    popular: false,
    keywords: ['sppu grade calculator', 'pune university grading system', 'sppu 10 point grading scale'],
    formulaSummary: 'SPPU Official CBCS Grade Table (O = 90-100%, A+ = 80-89%, A = 70-79%...)',
    example: {
      input: 'Marks Percentage = 76.5%',
      output: 'Grade = A (Very Good, 8 Grade Points)',
      explanation: 'Falls within the 70.0% to 79.9% bracket for Grade A.',
    },
    faqs: [
      {
        question: 'What is Grade O in SPPU?',
        answer: 'Grade O stands for Outstanding, awarded for scores 90% and above, carrying 10.0 grade points.',
      },
    ],
  },
  {
    id: 'class-division-calculator',
    slug: 'class-division-calculator',
    title: 'SPPU Class / Division Calculator',
    shortTitle: 'Class & Division',
    description: 'Determine your degree honours: Distinction, First Class, Higher Second Class, or Pass Class.',
    category: 'utility',
    iconName: 'Medal',
    popular: false,
    keywords: ['sppu class division calculator', 'first class with distinction sppu', 'higher second class cgpa sppu'],
    formulaSummary: 'Distinction: CGPA ≥ 7.75 | First Class: 6.75 - 7.74 | Higher Second: 6.25 - 6.74 | Second: 5.75 - 6.24',
    example: {
      input: 'CGPA = 7.82',
      output: 'First Class with Distinction',
      explanation: 'CGPA is greater than 7.75 threshold.',
    },
    faqs: [
      {
        question: 'What is the cutoff for Higher Second Class in SPPU?',
        answer: 'CGPA between 6.25 and 6.74 (or 55% to 59.9%) is classified as Higher Second Class.',
      },
    ],
  },
];
