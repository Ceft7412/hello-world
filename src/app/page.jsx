import MainLayout from "./layouts/MainLayout";
import Card from "@/components/Card";
import { fetchCategories } from "@/services/category";
import { fetchBlogs } from "@/services/blogService";
import Search from "@/components/Search";
import Filter from "@/components/Filter";

export default async function Home({ searchParams }) {
  let categories = [];
  let blogs = [];

  const filter = searchParams.filter || "";
  const filterCategory = searchParams.category || "";
  const search = searchParams.search || "";

  try {
    categories = await fetchCategories();
    blogs = await fetchBlogs(filter, search, filterCategory);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-2 w-full  sm:flex-row justify-between">
        <Filter categories={categories} />
        <Search />
      </div>
      <div className="home self-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-20">
        <Card blogs={blogs} />
      </div>
    </MainLayout>
  );
}

export const metadata = {
  searchParams: true,
};
