// store/useCategoryStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCategoryStore = create(
  persist(
    (set) => ({
      slug: null,
      setSlug: (slug: string) => set({ slug }),
      clear: () => set({ slug: null }),
    }),
    {
      name: "category-store", // key in localStorage
    }
  )
);

export const useBlogStore = create(
  persist(
    (set) => ({
      authorName: null,
      blogId:null,
      setAuthorName: (authorName: string) => set({ authorName }),
      setBlogId: (blogId: string) => set({ blogId }),

      clear: () => set({ authorName: null,blogId:null }),
    }),
    {
      name: "blog-store",
    }
  )
);