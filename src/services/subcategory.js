import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const fetchSubcategoriesByCategory = async (categoryId) => {
  const subcategoriesCol = collection(db, "subcategories");
  const q = query(subcategoriesCol, where("categoryId", "==", categoryId));
  const subcategorySnapshot = await getDocs(q);
  const subcategories = subcategorySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return subcategories;
};
