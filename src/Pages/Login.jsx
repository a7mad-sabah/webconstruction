import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* 🔥 Modern Input Component */
function InputField({ label, name, type = "text", onChange }) {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm text-gray-600">{label}</label>

      <input
        name={name}
        type={type}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-xl bg-white 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
        transition duration-200 shadow-sm"
      />
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 LOGIN FUNCTION
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("تکایە هەموو خانەکان پڕبکەوە");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (data.success) {
        // 💾 save user data
        localStorage.setItem("user", JSON.stringify(data));

        // 🚀 notify navbar instantly (IMPORTANT FIX)
        window.dispatchEvent(new Event("user-login"));

        // 🚀 redirect without refresh
        if (data.role === "user") {
          navigate("/");
        } else if (data.role === "company") {
          navigate("/");
        } else if (data.role === "admin") {
          navigate("/");
        }
      } else {
        // ❌ only error alert
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("هەڵەیەک ڕوویدا");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 mt-5 mb-5"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-right">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyFavicon.svg"
            alt="logo"
            className="w-16 h-16"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
          بەخێربێیتەوە 👋
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          تکایە زانیاریەکانت بنووسە بۆ چوونەژوورەوە
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <InputField
            label="ئیمەیڵ"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <InputField
            label="وشەی نهێنی"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>

        {/* OPTIONS */}
        <div className="flex justify-between items-center mb-5 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-600" />
            <span className="text-gray-600">بیرم بێت</span>
          </label>

          <a href="#" className="text-indigo-600 hover:underline">
            وشەی نهێنی لەبیرچووە؟
          </a>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          چوونەژوورەوە
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">یان</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* SOCIAL */}
        <button className="w-full border py-3 rounded-xl hover:bg-gray-50 transition text-gray-700">
          چوونەژوورەوە بە Google
        </button>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          هەژمارت نییە؟{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            دروستکردنی هەژمار
          </Link>
        </p>
      </div>
    </div>
  );
}
