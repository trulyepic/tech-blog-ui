const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        By accessing or using Tech Tutorials Hub, you agree to be bound by these
        Terms and all applicable laws.
      </p>
      <h2 className="text-xl font-semibold mt-6">Use of Content</h2>
      <p className="mb-4">
        All tutorials and code are for educational use only. You may not
        redistribute or resell our content without permission.
      </p>
      <h2 className="text-xl font-semibold mt-6">Limitation of Liability</h2>
      <p className="mb-4">
        We do our best to provide accurate information, but we make no
        guarantees. We are not liable for any damages or issues arising from
        using our content.
      </p>
      <h2 className="text-xl font-semibold mt-6">Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms from time to time. Continued use of the site
        means you accept the changes.
      </p>
      <p className="mt-6 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Terms;
