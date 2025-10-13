export interface User {
  _id: string | number;
  firstName?: string;
  lastName?: string;
  userType?: string;
  companyName?: string;
  companyWebsite?: string;
  companyEmail?: string;
  status?: string;
  created_by?: string | null;
  updated_by?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  country?: string;
  industry?: string;
  role?: string;
  toolname?: string;
  category?: string;
  submiteddate?: string;
}

export interface UserResult {
  message: string;
  list: User;
}

export interface UserProfile {
  success: boolean;
  result: UserResult;
}
