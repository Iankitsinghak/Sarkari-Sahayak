import type { Scheme, UserProfile } from './types';

export const indianStates: string[] = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

export const genders: string[] = ["Male", "Female", "Other"];
export const incomeLevels: string[] = ["Below 1 Lakh", "1-5 Lakhs", "5-10 Lakhs", "Above 10 Lakhs"];
export const occupations: string[] = ["Student", "Farmer", "Worker", "Entrepreneur", "Unemployed", "Government Employee", "Private Employee"];
export const educationLevels: string[] = ["Below 10th", "10th Pass", "12th Pass", "Graduate", "Post-Graduate"];
export const casteCategories: string[] = ["General", "OBC", "SC", "ST", "EWS"];
export const disabilityStatuses: string[] = ["No", "Yes"];
export const schemeCategories: string[] = ["Education", "Agriculture", "Employment", "Health", "Women", "Startup"];


export const defaultProfile: UserProfile = {
  fullName: "Aarav Sharma",
  age: 25,
  gender: "Male",
  locationState: "Maharashtra",
  locationDistrict: "Pune",
  incomeLevel: "1-5 Lakhs",
  occupation: "Student",
  educationLevel: "Graduate",
  casteCategory: "General",
  disabilityStatus: "No",
  aadhaarLinked: "Yes",
};


export const schemes: Scheme[] = [
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
];
