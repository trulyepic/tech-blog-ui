// const API_BASE = "http://localhost:8000/posts";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPost = async (postData) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return res.json();
};

export const getPosts = async () => {
  const res = await fetch(API_BASE_URL);
  return res.json();
};

export const updatePost = async (id, postData) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getPostBySlug = async (slug) => {
  const res = await fetch(`${API_BASE_URL}/${slug}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
};
