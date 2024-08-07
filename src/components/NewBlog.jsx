"use client";
import React, { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import ModalCenter from "@/components/Modals/ModalCenter";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { db, auth } from "@/firebase/firebase";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { collection, addDoc } from "firebase/firestore";

function NewBlog({ categories }) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const selectedCategory = watch("category");
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const themeColor = useSelector((state) => state.theme.themeColor);
  const [message, setMessage] = useState("");
  const [isSubcategoryValid, setIsSubcategoryValid] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const category = categories.find((category) => category.id === selectedCategory);
    setSubcategories(category ? category.subcategories : []);
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    try {
      // Since we are not using input and created the custom select for subcategory,
      // we need to validate it manually
      if (selectedSubcategory.length === 0) {
        setIsSubcategoryValid(false);
        return;
      }
      // Finding the selected category that matches the selected category id
      const selectedCategoryObject = categories.find(
        (category) => category.id === selectedCategory
      );

      // Get the current date
      const now = new Date();

      setPublishing(true);
      await addDoc(collection(db, "blogs"), {
        author: auth.currentUser.displayName,
        authorId: auth.currentUser.uid,
        title: data.title,
        summary: data.summary,
        content: editorContent,
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        likes: [],
        category: {
          id: selectedCategoryObject?.id,
          name: selectedCategoryObject?.name,
        },
        subcategories: selectedSubcategory.map((name) => {
          const subcategory = subcategories.find((sub) => sub.name === name);
          return {
            id: subcategory.id,
            name: subcategory.name,
          };
        }),
      });
      setMessage("Blog post published successfully!");
      reset();
      setEditorContent("");
    } catch (error) {
      setErrorSubmit("Error: ", error.message);
    }
    setPublishing(false);
  };

  const handleSubcategoryClick = (name) => {
    setSelectedSubcategory((prev) => {
      let newSubcategory;
      if (prev.includes(name)) {
        newSubcategory = prev.filter((subcategory) => subcategory !== name);
      } else {
        newSubcategory = [...prev, name];
      }
      if (newSubcategory.length > 0) {
        setIsSubcategoryValid(true);
      }
      return newSubcategory;
    });
  };

  const handlePublishClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleSubmit(onSubmit)();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <>
      {message && (
        <div className="fixed flex gap-2 left-5 bottom-5 rounded p-2 px-3 bg-[#DBFCD6] border border-green-200 text-white">
          <CheckRoundedIcon className="text-green-500" />
          <p className="text-green-800">{message}</p>
        </div>
      )}
      {publishing && (
        <div className="fixed bg-black/[0.5] text-white z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center">
          <p className="">Publishing the blog. Please wait...</p>
        </div>
      )}

      <div className="container sm:w-[85%]">
        <h1 className="text-[22px] mb-8">Add New Blog 🚀</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-8">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter title here"
              {...register("title", { required: "Title is required" })}
              className={`input text-[20px] p-2 rounded-md h-10 ring-1 ring-gray-400 outline-none w-full ${
                themeColor === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="summary mb-10">
            <textarea
              id="summary"
              name="summary"
              placeholder="Enter summary here"
              {...register("summary", { required: "Summary is required" })}
              className={`resize-none h-[100px] input text-[16px] p-2 rounded-md h-10 ring-1 ring-gray-400 outline-none w-full ${
                themeColor === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
            {errors.summary && (
              <span className="text-red-500">{errors.summary.message}</span>
            )}
          </div>
          <div className="mb-8">
            <RichTextEditor
              value={editorContent}
              onChange={(content) => {
                setEditorContent(content);
                setValue("content", content);
              }}
            />
            <textarea
              className="rounded-md p-2 w-full"
              {...register("content", { required: "Content is required" })}
              value={editorContent}
              readOnly
              hidden
            />
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </div>
          <div className="mb-8">
            <select
              id="category"
              name="category"
              value={selectedCategory}
              {...register("category", { required: "Category is required" })}
              className={`input text-[16px] p-2 rounded-md h-10 ring-1 ring-gray-400 outline-none w-full ${
                themeColor === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
          <div className="mb-8 ">
            <ul className="flex gap-2 flex-wrap">
              {subcategories.map((subcategory) => (
                <li
                  key={subcategory.name}
                  onClick={() => handleSubcategoryClick(subcategory.name)}
                  className={` flex items-center hover:bg-black/[0.1] active:scale-105 transtion-colors duration-300 cursor-pointer border p-2 rounded`}
                >
                  {subcategory.name}
                  {selectedSubcategory.includes(subcategory.name) && (
                    <CheckRoundedIcon className="ml-1 text-green-500" />
                  )}
                </li>
              ))}
            </ul>

            {!isSubcategoryValid && (
              <span className="text-red-500">
                At least one subcategory should be selected
              </span>
            )}
          </div>

          <button
            type="button"
            className="button self-end mt-10 bg-green-500 p-2 px-4 text-white hover:bg-green-600 transition-colors duration-400"
            onClick={handlePublishClick}
          >
            Publish
          </button>
        </form>
        <ModalCenter
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          title="Confirm Publish"
          message="Are you sure you want to publish this blog post?"
        />
      </div>
    </>
  );
}

export default NewBlog;
