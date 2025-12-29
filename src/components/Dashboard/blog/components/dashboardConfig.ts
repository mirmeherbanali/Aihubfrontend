// dashboardConfig.ts
import { AUTHOR_COLUMNS,BLOG_COLUMNS,CATEGORY_COLUMNS } from "./authorTableConfig";
import {
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
  useGetAllAuthorsQuery,
} from "@/features/author/authorApi";

import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/features/blog/blogApi"; 

import {
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useGetAllBlogCategoriesQuery,
} from "@/features/blog/blogCategoryApi";

import { blogSchema } from "@/lib/validators/blogValidator";
import { authorSchema } from "@/lib/validators/authorValidator";
import { blogCategorySchema } from "@/lib/validators/blogCategoryValidator";

import {
  BLOG_FORM,
  AUTHOR_FORM,
  CATEGORY_FORM,
} from "@/lib/dashboard/blog/fields/formFields";

export const TAB_CONFIG: Record<string, any> = {
  author: {
    columns: AUTHOR_COLUMNS,
    useGetAllQuery: useGetAllAuthorsQuery,
    createMutation: useCreateAuthorMutation,
    updateMutation: useUpdateAuthorMutation,
    deleteMutation: useDeleteAuthorMutation,
    formSchema: authorSchema,
    formFields: AUTHOR_FORM,
  },
  blog: {
    columns: BLOG_COLUMNS,
    useGetAllQuery: useGetAllBlogsQuery,
    createMutation: useCreateBlogMutation,
    updateMutation: useUpdateBlogMutation,
    deleteMutation: useDeleteBlogMutation,
    formSchema: blogSchema,
    formFields: BLOG_FORM,
  },
  category: {
    columns: CATEGORY_COLUMNS,
    useGetAllQuery: useGetAllBlogCategoriesQuery,
    createMutation: useCreateBlogCategoryMutation,
    updateMutation: useUpdateBlogCategoryMutation,
    deleteMutation: useDeleteBlogCategoryMutation,
    formSchema: blogCategorySchema,
    formFields: CATEGORY_FORM,
  },
};
