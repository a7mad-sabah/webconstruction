import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

export default function CompanyRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    karganame: "",
    mawadtype: "",
    phone: "",
    bio: "",
    availableWorkers: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  /* 🧠 handle input */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🚀 submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      /* ✅ CLEAN DATA */
      const cleanForm = {
        ...form,
        availableWorkers: form.availableWorkers || null,
        phone: form.phone || null,
        bio: form.bio || null,
        city: form.city || null,
        mawadtype: form.mawadtype || null,
      };

      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/company_register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanForm),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("✅ کارگە بە سەرکەوتوویی تۆمارکرا");

        navigate("/login");
      } else {
        alert("❌ هەڵە: " + data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("❌ هەڵە لە پەیوەندی بە سێرڤەر");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 mt-5 mb-5"
      dir="rtl"
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 overflow-hidden text-right">
        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-center">
              دروستکردنی هەژمار
            </h1>

            <p className="text-indigo-100 text-sm text-center mt-5">
              بەشداری بکە لە پلاتفۆرمەکەمان و دەست بکە بە دروستکردنی پڕۆفایلی
              پیشەیی.
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-indigo-100 mb-3">
              من توانای کارکردنم هەیە و بەدوای دەرفەتەکاندا دەگەڕێم
            </p>

            <Link
              to="/Register"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 transition"
            >
              دروستکردنی هەژمار
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          <InputField
            label="ناوی کۆگا"
            name="karganame"
            onChange={handleChange}
          />

          <InputField label="ئیمەیڵ" name="email" onChange={handleChange} />

          <InputField
            label="وشەی نهێنی"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-sm text-gray-600">شار</label>

              <select
                name="city"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl"
              >
                <option value="">شار هەڵبژێرە</option>
                <option value="سلێمانی">سلێمانی</option>
                <option value="هەڵەبجە">هەڵەبجە</option>
                <option value="دهۆک">دهۆک</option>
                <option value="کەرکوک">کەرکوک</option>
                <option value="هەولێر">هەولێر</option>
              </select>
            </div>

            <InputField
              label="جۆری مەواد"
              name="mawadtype"
              onChange={handleChange}
            />
          </div>

          <InputField
            label="کارمەندی بەردەست"
            name="availableWorkers"
            type="number"
            onChange={handleChange}
          />

          <InputField
            label="ژمارەی مۆبایل"
            name="phone"
            onChange={handleChange}
          />

          <textarea
            name="bio"
            onChange={handleChange}
            placeholder="کورتە دەربارەی کارگە"
            className="w-full p-3 border border-gray-300 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
          >
            {loading ? "چاوەڕوان بە..." : "دروستکردنی هەژماری کارگە"}
          </button>

          <p className="text-center text-sm text-gray-600">
            هەژمارت هەیە؟{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              چوونەژوورەوە
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
