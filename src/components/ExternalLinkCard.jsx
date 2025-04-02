import { Link } from "react-router-dom";

const ExternalLinkCard = ({ link }) => {
  return (
    // <div className="border dark:border-gray-700 p-4 rounded shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900">
    //   <a href={link.url} target="_blank" rel="noopener noreferrer">
    //     {link.image ? (
    //       <img
    //         src={link.image}
    //         alt={link.title}
    //         className="w-full h-40 object-cover rounded mb-3"
    //       />
    //     ) : (
    //       <h2 className="text-xl font-semibold text-blue-600 hover:underline dark:text-blue-400 mb-2">
    //         {link.title}
    //       </h2>
    //     )}
    //     {link.description && (
    //       <p className="text-gray-700 dark:text-gray-300 text-sm">
    //         {link.description}
    //       </p>
    //     )}
    //   </a>
    // </div>

    <div className="border dark:border-gray-700 p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-blue-50 dark:bg-sky-950 relative">
      <span className="absolute top-2 right-2 z-20 text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full">
        External
      </span>

      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {link.image && (
          <div className="w-full flex justify-center items-center mb-3">
            <img
              src={link.image}
              alt={link.title}
              className="max-h-44 w-full object-contain rounded-lg border border-blue-100 dark:border-blue-800 transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Favicon + Title */}
        <div className="flex items-center gap-2 mb-1">
          {link.favicon && (
            <img
              src={link.favicon}
              alt={`${link.title} icon`}
              className="w-5 h-5 rounded"
            />
          )}
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 hover:underline">
            {link.title}
          </h3>
        </div>

        {link.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {link.description}
          </p>
        )}
      </a>
    </div>
  );
};

export default ExternalLinkCard;
