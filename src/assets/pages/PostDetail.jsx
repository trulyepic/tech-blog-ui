import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug, getUserPosts } from "../../api/postApi";
import ReactMarkdown from "react-markdown";
import PostCard from "../../components/PostCard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Giscus from "@giscus/react";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [error, setError] = useState(null);
  //   const [isDarkMode, setIsDarkMode] = useState(
  //     document.documentElement.classList.contains("dark")
  //   );
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError("Post not found");
        console.error(err);
      }
    };
    const fetchLatestPost = async () => {
      const posts = await getUserPosts();
      const sortedPosts = posts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setLatestPost(sortedPosts.find((p) => p.slug !== slug));
    };

    fetchPost();
    fetchLatestPost();
  }, [slug]);

  // Listen for theme changes
  useEffect(() => {
    const updateDarkMode = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDarkMode(dark);
    };

    // Set it once on mount
    updateDarkMode();

    // Listen for changes to dark mode class
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!post) return <div className="p-6">Loading...</div>;

  const formattedDate = new Date(
    post.updated_at || post.created_at
  ).toLocaleDateString();

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Latest post slightly aligned left to match header */}
        {latestPost && (
          <aside className="w-72 flex-shrink-0 -ml-2">
            <h3 className="text-xl font-semibold mb-4">Latest Post</h3>
            <PostCard post={latestPost} />
          </aside>
        )}

        {/* Main post slightly extended to right */}
        <article className="flex-1 prose prose-neutral dark:prose-invert max-w-none text-left">
          <Link to="/" className="text-blue-600 no-underline">
            &larr; Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-1">{post.title}</h1>
          <p className="text-gray-500 text-sm -mt-1 dark:text-gray-400">
            {post.slug}
          </p>

          <p className="text-gray-500 text-xs italic -mt-2 dark:text-gray-400">
            Last updated: {formattedDate}
          </p>

          <div className="w-full overflow-x-hidden">
            {isDarkMode !== null && (
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="overflow-x-auto my-4 rounded-lg">
                        <SyntaxHighlighter
                          language={match[1]}
                          style={isDarkMode ? oneDark : oneLight}
                          PreTag="div"
                          wrapLongLines
                          customStyle={{
                            margin: 0,
                            background: "transparent",
                            padding: "1rem",
                            overflowX: "auto",
                            maxWidth: "100%",
                          }}
                          codeTagProps={{
                            style: {
                              whiteSpace: "pre",
                              display: "block",
                              maxWidth: "100%",
                            },
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            )}
          </div>

          <div className="mt-6 text-xs text-blue-700 dark:text-blue-400 flex flex-wrap gap-2">
            {post.tags.split(",").map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        <Giscus
          id="comments"
          repo={import.meta.env.VITE_GISCUS_REPO}
          repoId={import.meta.env.VITE_GISCUS_REPO_ID}
          category={import.meta.env.VITE_GISCUS_CATEGORY}
          categoryId={import.meta.env.VITE_GISCUS_CATEGORY_ID}
          mapping="pathname"
          term={post.title}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={isDarkMode ? "dark" : "light"}
          lang="en"
          loading="lazy"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
};

export default PostDetail;
