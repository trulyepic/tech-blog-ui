const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Tech Tutorials Hub, we value your privacy. This Privacy Policy
        explains how we collect, use, and protect your personal information.
      </p>
      <h2 className="text-xl font-semibold mt-6">Information We Collect</h2>
      <p className="mb-4">
        We may collect non-personal data like browser type, time spent, pages
        visited, etc. If you fill out a contact form or subscribe to updates, we
        may collect your email address.
      </p>
      <h2 className="text-xl font-semibold mt-6">How We Use Information</h2>
      <p className="mb-4">
        We use your data to improve our content, analyze traffic, and
        communicate updates if you opt-in.
      </p>
      <h2 className="text-xl font-semibold mt-6">Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party tools such as Google Analytics or Google AdSense.
        These services may use cookies to track behavior anonymously.
      </p>
      <h2 className="text-xl font-semibold mt-6">Your Choices</h2>
      <p className="mb-4">
        You can disable cookies in your browser settings. You may also contact
        us to delete your personal data.
      </p>
      <p className="mt-6 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
