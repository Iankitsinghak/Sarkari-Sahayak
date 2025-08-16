import type { Scheme } from '@/lib/types';

// In a real-world application, this data would be fetched from a live API.
// For now, we are using a static list of schemes.
const schemes: Scheme[] = [
    {
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      category: 'Agriculture',
      eligibility: 'All landholding farmer families.',
      benefits: 'Rs. 6,000 per year in three equal installments.',
      requiredDocuments: 'Aadhaar card, Bank account details, Land ownership documents.',
      applicationProcess: 'Register on the PM-KISAN portal or through Common Service Centers (CSCs).',
      officialLink: 'https://pmkisan.gov.in/',
    },
    {
      name: 'Startup India Seed Fund Scheme',
      category: 'Startup',
      eligibility: 'Startups recognized by DPIIT, incorporated not more than 2 years ago.',
      benefits: 'Up to Rs. 20 Lakhs as a grant for proof of concept, and up to Rs. 50 Lakhs through convertible debentures for market entry.',
      requiredDocuments: 'Startup recognition certificate, Business plan, Company incorporation documents.',
      applicationProcess: 'Apply online through the Startup India portal.',
      officialLink: 'https://www.startupindia.gov.in/',
    },
    {
      name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      category: 'Health',
      eligibility: 'Based on SECC 2011 data for rural and urban areas. Check eligibility on the portal.',
      benefits: 'Health insurance cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.',
      requiredDocuments: 'Aadhaar card, Ration card, Contact details.',
      applicationProcess: 'No specific registration needed if you are an eligible beneficiary. Use your mobile number to check eligibility.',
      officialLink: 'https://mera.pmjay.gov.in/search/login',
    },
    {
      name: 'Post-Matric Scholarship for Students with Disabilities',
      category: 'Education',
      eligibility: 'Students with 40% or more disability studying in class 11th or above. Annual family income should not exceed Rs. 2.5 lakhs.',
      benefits: 'Maintenance allowance, book grants, and reimbursement of compulsory non-refundable fees.',
      requiredDocuments: 'Disability certificate, Income certificate, Previous year mark sheet, Aadhaar card.',
      applicationProcess: 'Apply through the National Scholarship Portal (NSP).',
      officialLink: 'https://scholarships.gov.in/',
    },
    {
      name: 'Pradhan Mantri Mudra Yojana (PMMY)',
      category: 'Employment',
      eligibility: 'Any Indian Citizen who has a business plan for a non-farm sector income-generating activity.',
      benefits: 'Loans up to Rs. 10 lakh are provided under three categories: Shishu, Kishor, and Tarun.',
      requiredDocuments: 'Business plan, KYC documents (Aadhaar, PAN), Proof of business address.',
      applicationProcess: 'Approach any lending institution (Banks, NBFCs, MFIs) with the required documents.',
      officialLink: 'https://www.mudra.org.in/',
    },
    {
      name: 'Mahila Samman Savings Certificate',
      category: 'Women',
      eligibility: 'A woman can open an account for herself, or a guardian can open on behalf of a minor girl.',
      benefits: 'Fixed interest rate of 7.5% compounded quarterly. Minimum deposit Rs. 1000, maximum Rs. 2 Lakhs for a two-year tenure.',
      requiredDocuments: 'KYC documents (Aadhaar and PAN), Account opening form.',
      applicationProcess: 'Available at Post Offices and authorized banks.',
      officialLink: 'https://www.indiapost.gov.in/',
    },
    {
      name: 'Atal Pension Yojana (APY)',
      category: 'Social Security',
      eligibility: 'Any Indian citizen between 18-40 years with a bank account.',
      benefits: 'Fixed pension of Rs. 1000, 2000, 3000, 4000, or 5000 per month after the age of 60.',
      requiredDocuments: 'Aadhaar Card, Bank account details.',
      applicationProcess: 'Subscribe through your bank or post office.',
      officialLink: 'https://www.npscra.nsdl.co.in/apply-for-apy.php',
    },
    {
      name: 'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
      category: 'Housing',
      eligibility: 'Economically Weaker Section (EWS), Low Income Group (LIG) and Middle Income Group (MIG). The beneficiary family should not own a pucca house.',
      benefits: 'Credit-linked subsidy on home loans, financial assistance for house construction.',
      requiredDocuments: 'Aadhaar Card, Income proof, Property documents (if applicable).',
      applicationProcess: 'Apply online through the PMAY-U official website or through Common Service Centers (CSCs).',
      officialLink: 'https://pmay-urban.gov.in/',
    },
    {
      name: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
      category: 'Education',
      eligibility: 'Students of class 9 from economically weaker sections, who have secured at least 55% marks in Class 8 examination. Parental income not more than Rs. 3.5 lakh per annum.',
      benefits: 'Scholarship of Rs. 12,000 per annum.',
      requiredDocuments: 'Caste certificate, Income certificate, Mark sheet of class 8.',
      applicationProcess: 'Apply through the National Scholarship Portal (NSP).',
      officialLink: 'https://scholarships.gov.in/',
    },
    {
      name: 'Sukanya Samriddhi Yojana (SSY)',
      category: 'Women',
      eligibility: 'Girl child below the age of 10 years. An account can be opened by parents or legal guardians.',
      benefits: 'High interest rate, tax benefits under Section 80C. The account matures after 21 years or on marriage of the girl child after she attains 18 years.',
      requiredDocuments: 'Birth certificate of the girl child, Identity and address proof of the guardian.',
      applicationProcess: 'Open an account in any post office or authorized bank branch.',
      officialLink: 'https://www.indiapost.gov.in/',
    },
    {
      name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)',
      category: 'Employment',
      eligibility: 'Rural youth between 15 and 35 years of age.',
      benefits: 'Skill training and placement support in various sectors.',
      requiredDocuments: 'Aadhaar Card, BPL Card (if applicable), Age proof.',
      applicationProcess: 'Contact the State Skill Development Mission or find a training center nearby.',
      officialLink: 'https://ddugky.gov.in/',
    },
  ];

/**
 * Fetches the list of all available government schemes.
 * In a real application, this would make an API call to a government database.
 * @returns A promise that resolves to an array of schemes.
 */
export async function getAllSchemes(): Promise<Scheme[]> {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return schemes;
}
