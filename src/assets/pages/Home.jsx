import { useEffect, useState } from "react";
import { getPosts } from "../../api/postApi";
import PostCard from "../../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Latest Blog Posts
      </h1>

      <input
        className="w-full border p-2 mb-6 bg-white dark:bg-neutral-800  dark:text-white dark:border-gray-700"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          🔥 Featured Toolkits
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
      </div> */}
    </div>
  );
};

export default Home;
