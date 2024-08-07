import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const fetchCategories = async () => {
  const categories = collection(db, "categories");
  const categoryDocuments = await getDocs(categories);
  const categoryList = categoryDocuments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return categoryList;
};
