import MainLayout from "./layouts/MainLayout";
import Card from "@/components/Card";
import { fetchCategories } from "@/services/category";
import { fetchBlogs } from "@/services/blogService";
import { fetchSubcategoriesByCategory } from "@/services/subcategory";
import Search from "@/components/Search";
import Filter from "@/components/Filter";

export default async function Home() {
  let categories = [];
  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

 

  return (
    <MainLayout>
      <div className="flex justify-between w-full">
        <Filter categories={categories} />
        <Search />
      </div>
      <div className="home self-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-20">
        <Card  />
      </div>
    </MainLayout>
  );
}
