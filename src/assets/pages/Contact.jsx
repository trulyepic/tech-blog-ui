const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">
        Got questions, feedback, or partnership ideas? Reach out below or email
        us at:
      </p>
      <p className="mb-6">
        <strong>Email:</strong> support@techtutorialshub.com
      </p>
      <form className="space-y-4">
        <input
          className="w-full border p-2 bg-white dark:bg-neutral-800 dark:border-gray-600"
          type="text"
          placeholder="Your Name"
          required
        />
        <input
          className="w-full border p-2 bg-white dark:bg-neutral-800 dark:border-gray-600"
          type="email"
          placeholder="Your Email"
          required
        />
        <textarea
          className="w-full border p-2 h-32 bg-white dark:bg-neutral-800 dark:border-gray-600"
          placeholder="Your Message"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
