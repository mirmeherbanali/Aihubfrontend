
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userType: string;
  companyName: string;
  companyWebsite: string;
  companyEmail: string;
  status: string;
  created_by: string | null;
  updated_by: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  country: string;
  industry: string;
  role: string;
}

export interface UserResult {
  message: string;
  list: User;
}

export interface UserProfile {
  success: boolean;
  result: UserResult;
}
