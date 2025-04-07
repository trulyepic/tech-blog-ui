import { useEffect, useState } from "react";
import { getPublicPosts } from "../../api/postApi";
import PostCard from "../../components/PostCard";
import ExternalLinkCard from "../../components/ExternalLinkCard";
import { Title, Meta, Link as HeadLink } from "react-head";
import ExternalLinksSection from "../../components/ExternalLinksSection";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPublicPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLocaleLowerCase())
  );

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

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
