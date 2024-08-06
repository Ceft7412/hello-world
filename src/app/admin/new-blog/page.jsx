// src/app/admin/dashboard/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import ModalCenter from "@/components/Modals/ModalCenter"; // Import the modal component
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AdminLayout from "@/app/layouts/AdminLayout";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

function Dashboard() {
  const themeColor = useSelector((state) => state.theme.themeColor);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setMessage("Blog post published successfully!");
    reset();
    setEditorContent("");
  };

  const handlePublishClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleSubmit(onSubmit)(); // Call the form submit handler
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
    <AdminLayout>
      {message && (
        <div className="fixed flex gap-2 left-5 bottom-5 rounded p-2 px-3 bg-[#DBFCD6] border border-green-200 text-white">
          <CheckRoundedIcon className="text-green-500" />
          <p className="text-green-800">{message}</p>
        </div>
      )}

      <div className="container sm:w-[85%]">
        <h1 className="text-[26px] mb-8">Add New Blog 🚀</h1>
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
            {errors.title && <span>{errors.title.message}</span>}
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
          </div>
          <div>
            <RichTextEditor
              value={editorContent}
              onChange={(content) => {
                setEditorContent(content);
                setValue("content", content); // update react-hook-form value
              }}
            />
            <textarea
              className="rounded-md p-2 w-full"
              {...register("content", { required: "Content is required" })}
              value={editorContent}
              readOnly
              hidden
            />
            {errors.content && <span>{errors.content.message}</span>}
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
    </AdminLayout>
  );
}

export default Dashboard;
