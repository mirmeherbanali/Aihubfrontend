export interface Category {
  id: string;
  _id: string;
  categoryName: string;
  slug: string;
  categoryDescription: string;
  faqs?: { question: string; answer: string }[];
  status?: "Active" | "Inactive" | "Deleted";
}