import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* 🔥 Input Component */
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

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobType: "",
    phone: "",
    bio: "",
    experienceYears: "",
    city: "",
    cvFile: "",
  });

  const [loading, setLoading] = useState(false);

  /* 🧠 handle input */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 📁 FILE */
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm({
          ...form,
          cvFile: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  /* 🚀 submit to PHP */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      /* ✅ CLEAN DATA */
      const cleanForm = {
        ...form,
        experienceYears: form.experienceYears || null,
        phone: form.phone || null,
        bio: form.bio || null,
        city: form.city || null,
        cvFile: form.cvFile || null,
        jobType: form.jobType || null,
      };

      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/register.php",
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
        alert("✅ ئەکاونت بە سەرکەوتوویی دروستکرا");

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
              پڕۆفایلی پیشەیی دروست بکە و بەشداری بکە
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/companyregister"
              className="inline-block px-4 py-2 text-sm bg-indigo-500 rounded-lg hover:bg-indigo-400 transition"
            >
              تۆمارکردنی کۆگا
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="ناوی یەکەم"
              name="firstName"
              onChange={handleChange}
            />

            <InputField
              label="ناوی دووەم"
              name="lastName"
              onChange={handleChange}
            />
          </div>

          <InputField label="ئیمەیڵ" name="email" onChange={handleChange} />

          <InputField
            label="وشەی نهێنی"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <InputField label="جۆری کار" name="jobType" onChange={handleChange} />

          <InputField
            label="ژمارەی مۆبایل"
            name="phone"
            onChange={handleChange}
          />

          {/* EXPERIENCE + CITY */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="ساڵەکانی ئەزموون"
              name="experienceYears"
              type="number"
              onChange={handleChange}
            />

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
          </div>

          {/* FILE */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              فایل ئەپڵۆد بکە
            </label>

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              کورتە دەربارەی خۆت
            </label>

            <textarea
              name="bio"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white
              focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
          >
            {loading ? "چاوەڕوان بە..." : "دروستکردنی هەژمار"}
          </button>

          {/* LOGIN */}
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
