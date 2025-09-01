import { motion } from 'framer-motion';
import cryptoGlass from '../../assets/Futuristic_Glass_Cube.png'; // update path as needed

const Contact = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center relative px-4">

      {/* Blurred Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 opacity-30 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 blur-3xl rounded-full -z-10"></div>

      {/* Floating Glass Cubes */}
      <img
        src={cryptoGlass}
        alt="glass cube"
        className="absolute bottom-4 right-4 w-20 opacity-60 pointer-events-none"
      />

      {/* Contact Form */}
      <div className="w-full max-w-xl p-8 bg-white  rounded-2xl z-10">
        <h2 className="text-center text-2xl font-semibold text-black mb-6">Get in Touch with Us</h2>
        <form className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full flex-1 py-3 px-4 border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full flex-1 py-3 px-4 border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full py-3 px-4 border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full py-3 px-4 border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full py-3 px-4 border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full h-12 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-medium"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Floating Illustration */}
      <div className="absolute bottom-4 right-4 w-48 opacity-70 pointer-events-none">
        <motion.img
          src={cryptoGlass}
          alt="floating glass"
          className="w-full h-auto"
          animate={{ y: [0, -30, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Contact;
