

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar, FaWhatsapp, FaSearch } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Factories() {
  const [factories, setFactories] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("هەموو");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const res = await fetch(
          "http://localhost/goldenhand/my-project/backend/api/get_companies.php",
        );

        const data = await res.json();

        if (data.success) {
          setFactories(data.data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactories();
  }, []);

  const types = [
    "هەموو",
    "کارگەی سیمەنت",
    "کارگەی کارەبا",
    "کارگەی بۆیە",
    "کارگەی ئاسن",
  ];

  const filteredFactories = factories.filter((f) => {
    const matchName = f.name?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "هەموو" || f.type === typeFilter;
    return matchName && matchType;
  });

  return (
    <div dir="rtl" className="min-h-screen py-6 text-right">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 w-[92%] max-w-5xl mx-auto px-2"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          دۆزینەوەی باشترین کارگەکان
        </h1>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="گەڕان لە کارگە..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-2xl bg-white/70 border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <FaSearch />
            </span>
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none px-4 py-2 pl-10 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition"
            >
              {types.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none">
              ▼
            </span>
          </div>
        </div>
      </motion.div>

      {loading && <p className="text-center text-gray-500">چاوەڕوان بە...</p>}

      <div className="w-[92%] max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
        {filteredFactories.map((factory, index) => (
          <GlowCard key={factory.id} factory={factory} index={index} />
        ))}
      </div>
    </div>
  );
}

function GlowCard({ factory, index }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  const myNumber = "9647715598683";

  const message = `سڵاو 
من دەمەوێت پەیوەندیت پێوە بکەم.

ناوی کارگە: ${factory.name}
جۆری کار: ${factory.type}`;

  const whatsappLink = `https://wa.me/${myNumber}?text=${encodeURIComponent(
    message,
  )}`;

  const handleSubmit = async () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "ناو پڕ بکەوە";
    if (!email.trim()) newErrors.email = "ئیمەیڵ پڕ بکەوە";
    if (!feedback.trim()) newErrors.feedback = "فیدباک پڕ بکەوە";
    if (rating === 0) newErrors.rating = "تکایە ئەستێرە هەڵبژێرە";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/addFactoryFeedback.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            factory_id: factory.id,
            name,
            email,
            feedback,
            rating,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("فیدباک نێردرا ✅");
        setShowModal(false);
        setName("");
        setEmail("");
        setFeedback("");
        setRating(0);
        setErrors({});
      } else {
        alert("هەڵەیەک هەیە ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative rounded-3xl p-[1px] bg-white shadow-lg overflow-hidden"
      >
        {visible && (
          <div
            className="pointer-events-none blur-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-60 absolute z-0 opacity-70"
            style={{
              top: position.y - 120,
              left: position.x - 120,
            }}
          />
        )}

        <div className="relative z-10 bg-white/80 backdrop-blur-xl p-5 rounded-3xl flex flex-col items-center text-center">
          <img
            src={
              factory.image
                ? `http://localhost/goldenhand/my-project/uploads/${factory.image}`
                : "https://i.pravatar.cc/150"
            }
            className="w-20 h-20 rounded-full shadow-md mb-3"
            alt="factory"
          />

          <h2 className="text-lg font-bold text-gray-800">{factory.name}</h2>

          <p className="text-indigo-500 font-medium text-sm">{factory.type}</p>

          <div className="flex items-center gap-1 mt-2 text-yellow-500">
            <FaStar />
            <span className="font-semibold text-gray-700">
              {factory.rating || 0}
            </span>
            <span className="text-gray-400 text-sm">/ 5</span>
          </div>

          <p className="text-gray-500 text-xs mt-3 px-2">
            {factory.description || "بەردەست نییە"}
          </p>

          <div className="w-full mt-4 flex flex-col gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-2 rounded-2xl bg-gradient-to-r from-black to-gray-800 text-white hover:scale-105 transition"
            >
              ناردنی فیدباک
            </button>

            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-2xl border border-green-500 text-green-600 hover:bg-green-50 transition">
                <FaWhatsapp />
                واتساپ
              </button>
            </a>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-6 w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-extrabold text-gray-800 mb-5 text-center">
              ناردنی فیدباک
            </h2>

            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="ناوت"
                  className="w-full p-3 rounded-xl bg-white/70 border border-gray-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="ئیمەیڵ"
                  className="w-full p-3 rounded-xl bg-white/70 border border-gray-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="فیدباکەکەت"
                  rows="3"
                  className="w-full p-3 rounded-xl bg-white/70 border border-gray-200 resize-none"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                {errors.feedback && (
                  <p className="text-red-500 text-xs mt-1">{errors.feedback}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-2 my-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl cursor-pointer ${
                    star <= rating
                      ? "text-yellow-400 scale-110"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>

            {errors.rating && (
              <p className="text-red-500 text-xs text-center">
                {errors.rating}
              </p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 py-2 rounded-xl bg-gray-200"
              >
                داخستن
              </button>

              <button
                onClick={handleSubmit}
                className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                ناردن
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}