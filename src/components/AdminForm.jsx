import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/postApi";

const AdminForm = ({ editingPost, setEditingPost, refreshPosts }) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    if (editingPost) {
      setForm(editingPost);
    }
  }, [editingPost]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPost) {
      await updatePost(editingPost.id, form);
      alert("Post updated!");
    } else {
      const result = await createPost(form);
      alert("Post created!");
      console.log(result);
    }

    setForm({ title: "", slug: "", content: "", tags: "" });
    setEditingPost(null);
    refreshPosts();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <input
        className="w-full border p-2 bg-white dark:bg-neutral-800  dark:text-white dark:border-gray-700"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 bg-white dark:bg-neutral-800  dark:text-white dark:border-gray-700"
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
      />
      <textarea
        className="w-full border p-2 h-40 bg-white dark:bg-neutral-800  dark:text-white dark:border-gray-700"
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 bg-white dark:bg-neutral-800  dark:text-white dark:border-gray-700"
        name="tags"
        placeholder="Tags"
        value={form.tags}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {editingPost ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default AdminForm;
