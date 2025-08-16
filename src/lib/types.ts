export interface UserProfile {
  fullName: string;
  age: number;
  gender: string;
  locationState: string;
  locationDistrict: string;
  incomeLevel: string;
  occupation: string;
  educationLevel: string;
  casteCategory: string;
  disabilityStatus: string;
  aadhaarLinked: string;
}

export interface Scheme {
  name: string;
  category: string;
  eligibility: string;
  benefits: string;
  requiredDocuments: string;
  applicationProcess: string;
  officialLink: string;
  summary?: string; // Optional field for AI-generated summary
}

export type ApplicationStatus = 'Not Applied' | 'Applied' | 'Approved' | 'Rejected';
