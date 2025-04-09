// const API_BASE = "http://localhost:8000/posts";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const getAuthHeaders = () => {
//   const token = JSON.parse(localStorage.getItem("user"))?.access_token;
//   return {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };
// };

const getAuthHeaders = () => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.access_token;
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  } catch (err) {
    console.error("Storage access error:", err);
    return { "Content-Type": "application/json" };
  }
};

export const createPost = async (postData) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(postData),
  });
  return res.json();
};

// export const getPublicPosts = async () => {
//   const res = await fetch(API_BASE_URL); // GET /posts
//   console.log("API base:", import.meta.env.VITE_API_BASE_URL);

//   return res.json();
// };
export const getPublicPosts = async (page = 1, pageSize = 9) => {
  const res = await fetch(`${API_BASE_URL}?page=${page}&page_size=${pageSize}`);
  const data = await res.json();
  // console.log("api post: ", data);
  return data; // Will return { total, posts }
};

export const getUserPosts = async () => {
  const token = JSON.parse(localStorage.getItem("user"))?.access_token;
  if (!token) throw new Error("No access token found");

  const res = await fetch(`${API_BASE_URL}my`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ This line is critical
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user posts");
  }

  return res.json();
};

export const updatePost = async (id, postData) => {
  const res = await fetch(`${API_BASE_URL}${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(postData),
  });
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_BASE_URL}${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const getPostBySlug = async (slug) => {
  const res = await fetch(`${API_BASE_URL}${slug}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
};
