import { useEffect, useState } from "react";
import AdminForm from "../../components/AdminForm";
import { deletePost, getUserPosts } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();
  // const token = JSON.parse(localStorage.getItem("user"))?.access_token;

  // let token = null;

  // if (typeof window !== "undefined") {
  //   try {
  //     token = JSON.parse(localStorage.getItem("user"))?.access_token;
  //   } catch (e) {
  //     console.warn("Token read error:", e);
  //   }
  // }

  const fetchPosts = async () => {
    try {
      const data = await getUserPosts();
      setPosts(data);
    } catch (err) {
      console.error("Unauthorized or failed to fetch posts.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      fetchPosts();
    }
  };

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const getToken = () => {
      try {
        return JSON.parse(localStorage.getItem("user"))?.access_token || null;
      } catch (e) {
        console.warn("Token read error:", e);
        return null;
      }
    };

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    fetchPosts();
  }, [navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>
      <AdminForm
        editingPost={editingPost}
        setEditingPost={setEditingPost}
        refreshPosts={fetchPosts}
      />
      <hr className="my-8" />
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        Published Posts
      </h2>
      <table className="table-auto w-full text-left border dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-800 ">
            <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Title
            </th>
            <th className="px-4 py-2 text-gray-900 dark:text-gray-100">Slug</th>
            <th className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t dark:border-gray-700">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                {post.title}
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                {post.slug}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => setEditingPost(post)}
                  className="text-blue-600 dark:text-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  Delete
                </button>

                <a
                  href={`/posts/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:underline dark:text-gray-300"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
