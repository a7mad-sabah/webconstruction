
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const navigate = useNavigate();

  // 🔥 REAL TIME LOGIN UPDATE
  useEffect(() => {
    const handleLogin = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("user-login", handleLogin);

    return () => {
      window.removeEventListener("user-login", handleLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    // 🔥 update instantly
    window.dispatchEvent(new Event("user-login"));

    navigate("/");
  };

  return (
    <motion.nav
      dir="rtl"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between border mx-auto mt-4 w-[92%] max-w-5xl border-slate-700 px-5 py-3 rounded-xl text-white text-sm bg-black relative z-50"
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        <span className="font-bold text-sm">دەستی زێڕین</span>
      </Link>
      {/* MENU */}
      <div className="hidden md:flex items-center gap-5 absolute left-1/2 -translate-x-1/2">
        <Link to="/">سەرەکی</Link>
        <Link to="/workers">کارمەندان</Link>
        <Link to="/factories">کارگەکان</Link>
        <Link to="/about">دەربارە</Link>

        {/*  ADMIN  */}
        {user?.role === "admin" && (
          <Link to="/Users" className="text-yellow-400 font-semibold">
            بینینی بەکارهێنەران
          </Link>
        )}
      </div>
      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <GoPerson className="w-6 h-6 cursor-pointer" />
            </Link>

            {user.role === "admin" && (
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
                Admin
              </span>
            )}

            {user.role === "company" && (
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                Company
              </span>
            )}

            <button
              onClick={handleLogout}
              className="text-xs bg-red-500 px-3 py-1 rounded-full"
            >
              چوونەدەرەوە
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
              ئێستا بەشداربە
            </button>
          </Link>
        )}
      </div>
      {/* MOBILE BUTTON */}
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>
      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 w-[90%] bg-black border border-slate-700 rounded-xl flex flex-col items-center gap-4 py-6 z-50"
          >
            <Link to="/" onClick={() => setOpen(false)}>
              سەرەکی
            </Link>
            <Link to="/workers" onClick={() => setOpen(false)}>
              کارمەندان
            </Link>
            <Link to="/factories" onClick={() => setOpen(false)}>
              کارگەکان
            </Link>
            <Link to="/about" onClick={() => setOpen(false)}>
              دەربارە
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin/users"
                onClick={() => setOpen(false)}
                className="text-yellow-400"
              >
                بینینی بەکارهێنەران
              </Link>
            )}

            {user ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <GoPerson className="w-6 h-6" />
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="text-red-400"
                >
                  چوونەدەرەوە
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="bg-white text-black px-3 py-1 rounded-full">
                  ئێستا بەشداربە
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>{" "}
    </motion.nav>
  );
}