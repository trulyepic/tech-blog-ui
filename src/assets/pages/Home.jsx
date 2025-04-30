import { useEffect, useState } from "react";
import { getPublicPosts } from "../../api/postApi";
import PostCard from "../../components/PostCard";
import ExternalLinkCard from "../../components/ExternalLinkCard";
import { Title, Meta, Link as HeadLink } from "react-head";
import ExternalLinksSection from "../../components/ExternalLinksSection";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 6;

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     if (loading) return; // prevent duplicate fetch
  //     setLoading(true);
  //     const data = await getPublicPosts(page, pageSize);
  //     console.log("Fetched posts:", data);
  //     setPosts((prev) => {
  //       const newPosts = data.posts.filter(
  //         (post) => !prev.some((p) => p.id === post.id)
  //       );
  //       return [...prev, ...newPosts];
  //     });
  //     setTotal(data.total);
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, [page]);

  const fetchPosts = async (currentPage) => {
    setLoading(true);
    try {
      const data = await getPublicPosts(currentPage, pageSize);
      console.log(
        `Fetched page ${currentPage}:`,
        data.posts.map((p) => p.id)
      );
      setPosts((prev) => {
        const newPosts = data.posts.filter(
          (post) => !prev.some((p) => p.id === post.id)
        );
        return [...prev, ...newPosts];
      });
      setTotal(data.total);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const hasMore = posts.length < total;

  // const handleLoadMore = () => {
  //   setPage((prev) => prev + 1);
  // };
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  // const filtered = posts.filter((post) =>
  //   post.title.toLowerCase().includes(search.toLocaleLowerCase())
  // );
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // console.log("post in home: ", posts);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* SEO META */}
      <Title>CodeSprig | Tech Tutorials and Tools</Title>
      <Meta
        name="description"
        content="Explore real-world coding projects, tutorials, and dev tools."
      />
      <Meta name="robots" content="index, follow" />
      <Meta
        property="og:title"
        content="CodeSprig | Tech Tutorials and Tools"
      />
      <Meta
        property="og:description"
        content="Explore real-world coding projects, tutorials, and dev tools."
      />
      <Meta property="og:url" content="https://codesprig.com/" />
      <Meta property="og:image" content="/preview.jpg" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta
        name="twitter:title"
        content="CodeSprig | Tech Tutorials and Tools"
      />
      <Meta
        name="twitter:description"
        content="Explore real-world coding projects, tutorials, and dev tools."
      />
      <Meta name="twitter:image" content="/preview.jpg" />
      <HeadLink rel="canonical" href="https://codesprig.com/" />
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Latest Blog Posts
      </h1>

      <input
        className="w-full border p-2 mb-6 bg-white dark:bg-neutral-800  dark:text-white dark:border-gray-700"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* <p className="text-sm text-gray-500 mb-2">
        Total posts: {posts.length} | Filtered posts: {filtered.length} | Total
        from backend: {total}
      </p> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      <div className="mt-16">
        {/* <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          External Links
        </h2> */}
        <ExternalLinksSection isGrid />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {externalLinks.map((link, idx) => (
            <ExternalLinkCard key={idx} link={link} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Home;
