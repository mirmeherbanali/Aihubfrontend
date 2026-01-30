import PageHero from "@/components/Hero/PageHero";
import CategoryGrid from "./CategoryGrid"
import CategoryClient from "./CategoryClient";
import styles from "@/components/ui/style/CategoryPage.module.scss";
import Link from "next/link";

import { getCategories } from "@/features/serverApi/serverApi";
import { getPaginationRange } from "@/components/shared/utilPagination";

const PER_PAGE = 6;

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;

  const data = await getCategories();

  // ✅ only published categories
  const categories = data

  const totalPages = Math.ceil(categories.length / PER_PAGE);

  const paginatedCategories = categories.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <>
      {/* ================= SERVER FALLBACK ================= */}
      <div className={styles.homeServer}>
        <PageHero
          content="Explore <span style='color:#ffd700'>AI Tools</span> by Category"
          subcontent="Find the perfect AI tool for your industry, use case, or role."
          queryPlaceholder="Search for Tools & Categories"
        />

        <section className={styles.categorySection}>
          <h2 className={styles.heading}>All Categories</h2>

          <CategoryGrid
            title=""
            items={paginatedCategories}
          />
        </section>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {/* PREV */}
            <Link
              href={`/category?page=${Math.max(1, page - 1)}`}
              className={page === 1 ? styles.disabled : ""}
              aria-disabled={page === 1}
            >
              &lt;
            </Link>

            {/* PAGE NUMBERS */}
            {getPaginationRange(page, totalPages).map((item, i) =>
              item === "..." ? (
                <span key={i} className={styles.ellipsis}>
                  …
                </span>
              ) : (
                <Link
                  key={i}
                  href={`/category?page=${item}`}
                  className={page === item ? styles.activePage : ""}
                >
                  {item}
                </Link>
              )
            )}

            {/* NEXT */}
            <Link
              href={`/category?page=${Math.min(totalPages, page + 1)}`}
              className={page === totalPages ? styles.disabled : ""}
              aria-disabled={page === totalPages}
            >
              &gt;
            </Link>
          </div>
        )}
      </div>

      {/* ================= CLIENT ENHANCEMENT ================= */}
      <div className={styles.homeClient}>
        <CategoryClient />
      </div>
    </>
  );
}
