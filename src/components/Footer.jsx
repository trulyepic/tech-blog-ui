const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 bg-neutral-100 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-8 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Tech Tutorials Hub. All rights
          reserved.
        </p>
        <p className="mt-1">
          Built with 💻 using React, TailwindCSS, and FastAPI.
        </p>
        <div className="mt-4 space-x-4 text-sm">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
