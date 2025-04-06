import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  console.log("post: ", post);
  return (
    <div className="border dark:border-gray-700 p-4 rounded shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900">
      <Link to={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold text-blue-600 hover:underline dark:text-blue-400">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-500 text-sm mb-2 dark:text-gray-400">
        {post.slug}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        By: <span className="font-medium">{post.user?.username}</span>
      </p>
      <p className="line-clamp-3 text-gray-700 dark:text-gray-300">
        {post.content.slice(0, 150)}...
      </p>
      <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
        {post.tags}
      </div>
    </div>
  );
};

export default PostCard;
