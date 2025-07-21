import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoCreate } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const devToken = localStorage.getItem("developerToken");
    if (adminToken) navigate("/admin/dashboard");
    else if (devToken) navigate("/developer/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-[#3B82F6]/10">
        <motion.div
          className="w-full md:w-1/2 mb-10 md:mb-0"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, duration: 1.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#3B82F6] mb-6">
            Stay Organized, <br /> Stay Ahead 🚀
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Boost your productivity with smart task tracking and deadline
            reminders.
          </p>
          <Link to="/developerLogin">
            <button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md">
              Get Started
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            duration: 1.2,
            delay: 0.2,
          }}
        >
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5953/5953763.png"
              alt="task"
              style={{ marginTop: "40px", width: "150px", height: "150px" }}
            />
            <p className="mt-4 italic text-sm text-gray-500">
              "I like work; it fascinates me. I can sit and look at it for
              hours."
            </p>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3B82F6] mb-12">
          What You Can Do
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3 text-[#3B82F6] text-2xl mb-4">
              <IoCreate />
              <h3 className="font-semibold text-lg">Create Tasks</h3>
            </div>
            <p className="text-gray-600">
              Add tasks quickly and stay organized throughout the day.
            </p>
          </motion.div>

          <motion.div
            className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3 text-[#3B82F6] text-2xl mb-4">
              <MdOutlineAccessTimeFilled />
              <h3 className="font-semibold text-lg">Set Deadlines</h3>
            </div>
            <p className="text-gray-600">
              Never miss a task with timely reminders and alerts.
            </p>
          </motion.div>

          <motion.div
            className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3 text-[#3B82F6] text-2xl mb-4">
              <FaChartLine />
              <h3 className="font-semibold text-lg">Track Progress</h3>
            </div>
            <p className="text-gray-600">
              See what’s done and what’s pending with visual cues.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-[#3B82F6]/10 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-[#3B82F6] mb-10">
          Our Impact 🌍
        </h2>
        <div className="grid md:grid-cols-3 text-center gap-6">
          <div>
            <h3 className="text-4xl font-bold text-[#3B82F6]">500+</h3>
            <p className="text-gray-600">Registered Developers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#3B82F6]">2,000+</h3>
            <p className="text-gray-600">Tasks Created</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#3B82F6]">98%</h3>
            <p className="text-gray-600">On-time Completion Rate</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-[#3B82F6] mb-10">
          What Our Users Say 💬
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow rounded-xl p-6 border">
            <p className="text-gray-600 italic">
              “This app made my workflow so smooth. Love the design and
              features!”
            </p>
            <h4 className="mt-4 font-semibold text-[#3B82F6]">- Aayush Jain</h4>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <p className="text-gray-600 italic">
              “Reminders and task tracking helped me deliver projects on time.”
            </p>
            <h4 className="mt-4 font-semibold text-[#3B82F6]">- Sneha Patel</h4>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <p className="text-gray-600 italic">
              “Highly recommend this to every developer out there.”
            </p>
            <h4 className="mt-4 font-semibold text-[#3B82F6]">- Rohan Gupta</h4>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <section className="bg-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-[#3B82F6] mb-6">
          Stay Updated 📬
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to get updates on new features and tips!
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300"
          />
          <button
            type="submit"
            className="bg-[#3B82F6] text-white px-6 py-2 rounded-full"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
