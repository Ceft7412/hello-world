import MainLayout from "./layouts/MainLayout";
import Card from "@/components/Card";
import { fetchCategories } from "@/services/category";
import { fetchBlogs } from "@/services/blogService";
import Search from "@/components/Search";
import Filter from "@/components/Filter";

export default async function Home({ searchParams }) {
  let categories = [];
  let blogs = [];

  // Assigns the filter and search query parameters to the variables filter and search respectively
  const filter = searchParams.filter || "";
  const search = searchParams.search || "";
  try {
    categories = await fetchCategories();
    // Fetches blogs based on the filter and search query parameters
    blogs = await fetchBlogs(filter, search);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <MainLayout>
      <div className="flex justify-between w-full">
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
