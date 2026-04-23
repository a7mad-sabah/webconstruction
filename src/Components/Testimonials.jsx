import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost/goldenhand/my-project/backend/api/getAllTestimonials.php",
        );

        const data = await res.json();

        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsToShow = isMobile ? 1 : 3;

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= testimonials.length ? 0 : prev + itemsToShow,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsToShow < 0
        ? Math.max(testimonials.length - itemsToShow, 0)
        : prev - itemsToShow,
    );
  };

  const visible = testimonials.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <section
      className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 border-t border-gray-200"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center">
          فیدباکی بەکارهێنەران
        </h2>

        <p className="text-center text-gray-500 mt-3">
          هەموو فیدباکەکان لە کارمەند و کارگەکانەوە
        </p>

        {/* NAV */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-white shadow hover:scale-110 transition flex items-center justify-center"
          >
            →
          </button>

          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-white shadow hover:scale-110 transition flex items-center justify-center"
          >
            ←
          </button>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <AnimatePresence mode="wait">
            {visible.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-right"
              >
                {/* ⭐ STARS */}
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={
                        idx < (t.rating || 0)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* TEXT */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t.text}
                </p>

                {/* NAME */}
                <div className="flex items-center gap-3 mt-6">
                  <img
                    src={t.img}
                    className="w-11 h-11 rounded-full object-cover border"
                    alt={t.name}
                  />
                  <div>
                    <p className="text-gray-900 text-sm font-semibold">
                      {t.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
