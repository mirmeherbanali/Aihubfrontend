import React, { CSSProperties, ReactNode } from "react";
export interface ToolCardProps {
  title: string;
 logo?: string | File; // <-- allow both
  value?: ReactNode;            // dynamic content
  onClick?: () => void;
  style?: CSSProperties;        // allow custom style overrides
  className?: string;           // allow custom class overrides
   disabled?: boolean; // new prop
}


export interface Tool {
  userId: any;
  _id: string;
  toolName: string;
  logo?: string;
  category: {
    _id: string;
    categoryName: string;
  } | null; // populated Category object
  description?: string;
  pricingType?: "Free" | "Paid" | "Premium";
  websiteUrl?: string;
  demoVideoUrl?: string;
  tags?: string[];
  features?: string[];
  screenshots?: string[];
  developerId: string;
  status: "Pending" | "Approved" | "Rejected";
  created_by?: string | null;
  updated_by?: string | null;
  createdAt?: string;
  updatedAt?: string;
}


