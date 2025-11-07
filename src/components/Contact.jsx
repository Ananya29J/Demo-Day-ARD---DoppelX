export default function Contact() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500 shadow-lg">
      <h2 className="text-4xl font-bold text-purple-300 mb-4 text-center">Contact Us</h2>
      <form className="max-w-lg mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className="p-3 bg-gray-800 text-white border border-purple-500 rounded-lg focus:outline-none"
        />
        <button className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-white font-semibold">
          Send Message
        </button>
      </form>
    </div>
  );
}
