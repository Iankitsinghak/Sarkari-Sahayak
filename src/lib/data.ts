import type { UserProfile } from './types';

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
export const schemeCategories: string[] = ["Education", "Agriculture", "Employment", "Health", "Women", "Startup", "Social Security", "Housing"];


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
