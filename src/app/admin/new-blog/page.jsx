import NewBlog from "@/components/NewBlog";
import AdminLayout from "@/app/layouts/AdminLayout";
import { fetchCategories } from "@/services/category";
async function Dashboard() {
  let categories = [];
  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error("Error fetching categories: ", error);
  }
  return (
    <AdminLayout>
      <NewBlog categories={categories} />
    </AdminLayout>
  );
}

export default Dashboard;
