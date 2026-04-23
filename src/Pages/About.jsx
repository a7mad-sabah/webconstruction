

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Example() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

      `}</style>

      <div
        dir="rtl"
        className="min-h-screen overflow-y-auto text-right"
      >
        {/* SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-10 px-4 sm:px-6 lg:px-10 py-10 w-[92%] max-w-5xl mx-auto"
        >
          {/* IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md lg:max-w-lg mx-auto"
          >
            <div className="shadow-2xl shadow-indigo-600/30 rounded-2xl overflow-hidden">
              <img
                className="w-full h-[260px] sm:h-[320px] lg:h-[420px] object-cover"
                src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=600&auto=format&fit=crop"
                alt=""
              />
            </div>

            {/* FLOAT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3 absolute bottom-4 right-1/2 translate-x-1/2 lg:right-6 lg:translate-x-0 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg w-[92%] sm:max-w-sm"
            >
              <div className="flex -space-x-3 shrink-0">
                {[
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white"
                    alt=""
                  />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                بەشداری تیمەکەمان بکە، داهاتت زیاد بکە و کار لەسەر پرۆژەی
                ڕاستەقینە بکە.
              </p>

              <button
                onClick={() => navigate("/Register")}
                className="mr-auto flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 text-white rounded-full bg-indigo-600 active:scale-95 transition"
              >
                +
              </button>
            </motion.div>
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-slate-600 w-full max-w-xl mx-auto text-right"
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800">
              ئێمە کێین؟
            </h1>

            <div className="w-20 sm:w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF] mt-2 mr-0 ml-auto"></div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed"
            >
              {[
                "دەستی زێڕین تیمێکی مۆدێرنە بۆ پەرەپێدانی وێب و مۆبایل کە بیرۆکەکان دەگۆڕێت بۆ بەرهەمە دیجیتاڵەکان.",
                "ئێمە فریلانسەر، ستارتاپ و کڕیاران دەبەستین بە پسپۆڕانی شارەزا.",
                "پلاتفۆرمەکەمان یارمەتی بەڕێوەبردنی پرۆژە و پەیوەندی دەدات.",
                "ئامانجمان چارەسەرکردنی کێشە ڕاستەقینەکانە بە بەکارهێنانی تەکنەلۆجیا.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-6 rounded-full text-white text-sm sm:text-base transition"
            >
              زیاتر فێربە 
            </motion.button>
          </motion.div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 w-[92%] max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 relative text-right">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  با شتێکی ناوازە دروست بکەین
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-2">
                  بیرۆکەت بۆمان بنێرە و زوو وەڵامت دەدەینەوە.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="ناوی تۆ"
                  className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition"
                />
                <input
                  type="email"
                  placeholder="ئیمەیڵ"
                  className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <input
                type="text"
                placeholder="بابەت"
                className="mt-4 w-full p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition"
              />

              <textarea
                placeholder="نامەکەت بنووسە..."
                className="mt-4 w-full h-36 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition resize-none"
              />

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:scale-[1.02] active:scale-95 transition">
                  ناردنی نامە
                </button>

                <button className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                  چات لە واتساپ
                </button>
              </div>

              <p className="text-xs text-center text-slate-400 mt-6">
                زۆرجار لە ماوەی ٢٤ کاتژمێر وەڵام دەدەینەوە
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}