import { useEffect, useState } from "react";
import { getPublicPosts } from "../../api/postApi";
import PostCard from "../../components/PostCard";
import ExternalLinkCard from "../../components/ExternalLinkCard";
import exhibitImg from "../../assets/images/exhibt.png";
import starflickWikiImg from "../../assets/images/starflick.png";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  //   const externalLinks = [
  //     {
  //       title: "My Portfolio",
  //       url: "https://yourportfolio.com",
  //       description: "Explore my personal projects, apps, and tools.",
  //       image: "https://via.placeholder.com/400x200", // Optional
  //     },
  //     {
  //       title: "Dev Blog on Hashnode",
  //       url: "https://hashnode.com/@yourhandle",
  //       description: "Articles and tutorials on React, FastAPI, and more.",
  //     },
  //     {
  //       title: "Music Discovery App",
  //       url: "https://yourmusicapp.com",
  //       image: "https://via.placeholder.com/400x200",
  //     },
  //   ];

  const externalLinks = [
    {
      title: "Ex-hibt",
      url: "https://www.ex-hibt.com/",
      description:
        "Create Your Images Collections & Explore Collections From Other Users",
      image: exhibitImg,
      favicon: "https://www.ex-hibt.com/favicon.ico",
    },
    {
      title: "StarFlick Wiki Hub",
      url: "https://www.starflickswiki.com/",
      description:
        "Starflicks WikiExplore information on all your favorite Korean shows and Star them up",
      image: starflickWikiImg,
      favicon: "https://www.starflickswiki.com/favicon.ico",
    },
    {
      title: "Music Discovery App",
      url: "https://yourmusicapp.com",
      image: "https://via.placeholder.com/400x200",
    },
  ];

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
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          External Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {externalLinks.map((link, idx) => (
            <ExternalLinkCard key={idx} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
