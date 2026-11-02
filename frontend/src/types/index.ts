export type BuildingType =
  | 'INDEPENDENT_HOUSE'
  | 'VILLA'
  | 'APARTMENT'
  | 'COMMERCIAL'
  | 'OFFICE'
  | 'RENOVATION'
  | 'OTHER';

export type ServicePackage =
  | 'LABOUR_ONLY'
  | 'LABOUR_PLUS_MATERIAL'
  | 'STRUCTURE_ONLY'
  | 'TURNKEY'
  | 'RENOVATION';

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export type ProjectStatus = 'COMPLETED' | 'ONGOING' | 'PLANNED';

export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'DISCUSSION'
  | 'QUOTATION'
  | 'WON'
  | 'LOST';

export interface ContractorLocation {
  id: string;
  city: string;
  locality: string;
  pincode?: string;
  isPrimary: boolean;
}

export interface ContractorRate {
  id: string;
  contractorId: string;
  buildingCategory: BuildingType;
  packageType: ServicePackage;
  minRatePerSqft: number;
  maxRatePerSqft: number;
  unit: string; // e.g. "sq.ft"
  inclusions: string[];
  exclusions: string[];
  minAreaSqft?: number;
  pricingNotes?: string;
}

export interface ProjectMedia {
  id: string;
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'BLUEPRINT';
  caption: string;
  stage: 'FOUNDATION' | 'BRICKWORK' | 'PLASTER' | 'FINISHING' | 'COMPLETED';
}

export interface ConstructionProject {
  id: string;
  contractorId: string;
  contractorName?: string;
  title: string;
  buildingType: BuildingType;
  projectStatus: ProjectStatus;
  city: string;
  locality: string;
  plotAreaSqft?: number;
  builtUpAreaSqft: number;
  floors: number;
  approxCostInr: number;
  startDate: string;
  completionDate?: string;
  isVerified: boolean;
  coverImage: string;
  media: ProjectMedia[];
  description: string;
  specifications?: Record<string, string>;
}

export interface ReviewRating {
  workQuality: number; // 1-5
  timeliness: number; // 1-5
  communication: number; // 1-5
  budgetTransparency: number; // 1-5
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerLocation: string;
  contractorId: string;
  projectId?: string;
  projectTitle?: string;
  reviewType: 'PROJECT_REVIEW' | 'INTERACTION_FEEDBACK';
  overallRating: number;
  ratings: ReviewRating;
  feedbackText: string;
  isVerifiedHomeowner: boolean;
  createdAt: string;
}

export interface Contractor {
  id: string;
  businessName: string;
  proprietorName: string;
  logoUrl?: string;
  profilePhotoUrl: string;
  city: string;
  state: string;
  primaryLocality: string;
  operatingCities: string[];
  phone: string;
  whatsappNumber?: string;
  email: string;
  bio: string;
  experienceYears: number;
  languages: string[];
  verificationStatus: VerificationStatus;
  verificationBadges: {
    govtIdVerified: boolean;
    gstVerified: boolean;
    siteInspected: boolean;
  };
  supportedCategories: BuildingType[];
  supportedPackages: ServicePackage[];
  rates: ContractorRate[];
  completedProjectsCount: number;
  ongoingProjectsCount: number;
  avgRating: number;
  reviewCount: number;
  isPublished: boolean;
  isDemoRecord: boolean;
  featuredOrder?: number;
}

export interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  contractorId: string;
  contractorName?: string;
  buildingType: BuildingType;
  city: string;
  locality: string;
  builtUpAreaSqft: number;
  floors?: number;
  estimatedBudgetInr: number;
  packageType: ServicePackage;
  desiredStartDate?: string;
  requirementDescription: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface EstimatorInputs {
  builtUpAreaSqft: number;
  floors: number;
  buildingType: BuildingType;
  packageType: ServicePackage;
  qualityTier: 'BASIC' | 'STANDARD' | 'PREMIUM' | 'LUXURY';
  city: string;
}

export interface EstimatorResult {
  builtUpAreaSqft: number;
  ratePerSqft: number;
  estimatedCostInr: number;
  breakdown: {
    foundation: number;
    structureAndBrickwork: number;
    plasterAndFlooring: number;
    electricalAndPlumbing: number;
    paintingAndFinishing: number;
  };
  sampleBrands: {
    cement: string;
    steel: string;
    tiles: string;
    fittings: string;
  };
}
