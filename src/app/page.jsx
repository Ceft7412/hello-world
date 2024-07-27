// app/page.js
import { fetchBlogs } from "@/services/blogService";
import MainLayout from "./layouts/MainLayout";
import Loader from "@/components/Loader";

import Card from "@/components/Card";
export default async function Home() {
  let blogs = [];
  try {
    blogs = await fetchBlogs();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <MainLayout>
      <div className="home self-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-20">
        <Card />
      </div>
    </MainLayout>
  );
}
