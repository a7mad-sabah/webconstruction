// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaEdit, FaPlus } from "react-icons/fa";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [openUser, setOpenUser] = useState(null);
//   const [openCompany, setOpenCompany] = useState(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch("http://localhost/goldenhand/my-project/backend/api/get_users.php")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data.users || []);
//         setCompanies(data.companies || []);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredUsers = users.filter((user) => {
//     const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
//     return fullName.includes(search.toLowerCase());
//   });

//   const cardStyle =
//     "w-full bg-white rounded-2xl shadow-md p-4 mb-4 cursor-pointer transition hover:shadow-lg active:scale-[0.99]";

//   return (
//     <div dir="rtl" className="min-h-screen flex justify-center">
//       {/* 📱 MOBILE-FIRST CONTAINER */}
//       <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 py-6">
//         {/* 🧾 TITLE + ADD BUTTON */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             لیستی هەموو بەکارهێنەران
//           </h1>

//           <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition active:scale-95">
//             <FaPlus />
//           </button>
//         </div>

//         {/* 🔍 SEARCH */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="🔍 گەڕان بە ناو..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-right text-base"
//           />
//         </div>

//         {/* 👤 USERS */}
//         <h2 className="text-xl sm:text-2xl font-bold mb-4 text-right">
//           بەکارهێنەران
//         </h2>

//         {filteredUsers.map((user) => (
//           <div key={user.id} className={cardStyle}>
//             {/* HEADER */}
//             <div
//               className="flex items-center justify-between"
//               onClick={() => setOpenUser(openUser === user.id ? null : user.id)}
//             >
//               {/* ICON LEFT */}
//               <FaEdit className="text-blue-500 text-lg" />

//               {/* TEXT RIGHT */}
//               <p className="font-semibold text-right flex-1 mr-3 text-base sm:text-lg">
//                 👤 {user.first_name} {user.last_name}
//               </p>
//             </div>

//             {/* DROPDOWN */}
//             <AnimatePresence>
//               {openUser === user.id && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   className="overflow-hidden mt-3 text-sm text-gray-600 text-right space-y-1"
//                 >
//                   <p>📧 ئیمەیل: {user.email}</p>
//                   <p>📱 تەلەفون: {user.phone}</p>
//                   <p>💼 جۆری کار: {user.job_type}</p>
//                   <p>📝 باسکردن: {user.bio}</p>
//                   <p>🧑‍💼 ڕۆڵ: {user.role}</p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}

//         {/* 🏢 COMPANIES */}
//         <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-right">
//           کۆمپانیاکان
//         </h2>

//         {companies.map((c) => (
//           <div key={c.id} className={cardStyle}>
//             {/* HEADER */}
//             <div
//               className="flex items-center justify-between"
//               onClick={() => setOpenCompany(openCompany === c.id ? null : c.id)}
//             >
//               <FaEdit className="text-green-500 text-lg" />

//               <p className="font-semibold text-right flex-1 mr-3 text-base sm:text-lg">
//                 🏢 {c.karganame}
//               </p>
//             </div>

//             {/* DROPDOWN */}
//             <AnimatePresence>
//               {openCompany === c.id && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   className="overflow-hidden mt-3 text-sm text-gray-600 text-right space-y-1"
//                 >
//                   <p>📧 ئیمەیل: {c.email}</p>
//                   <p>📱 تەلەفون: {c.phone}</p>
//                   <p>🧾 ناونیشان: {c.title}</p>
//                   <p>📦 جۆری کار: {c.mawadtype}</p>
//                   <p>📝 باسکردن: {c.bio}</p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Users;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [openUser, setOpenUser] = useState(null);
  const [openCompany, setOpenCompany] = useState(null);
  const [search, setSearch] = useState("");

  // ✏️ EDIT STATE
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("http://localhost/goldenhand/my-project/backend/api/get_users.php")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setCompanies(data.companies || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔥 ADD USER API
  const addUser = async (newUser) => {
    try {
      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/add_user.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        },
      );
      const data = await res.json();
      if (data.success) {
        setUsers([...users, data.user]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 UPDATE USER API
  const updateUser = async (updatedUser) => {
    try {
      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/update_user.php",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        },
      );
      const data = await res.json();
      if (data.success) {
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 DELETE USER API
  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/delete_user.php",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const cardStyle =
    "w-full bg-white rounded-2xl shadow-md p-4 mb-4 cursor-pointer transition hover:shadow-lg active:scale-[0.99]";

  return (
    <div dir="rtl" className="min-h-screen flex justify-center">
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 py-6">
        {/* 🧾 TITLE + ADD */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            لیستی هەموو بەکارهێنەران
          </h1>

          <button
            onClick={() => addUser({})}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition active:scale-95"
          >
            <FaPlus />
          </button>
        </div>

        {/* 🔍 SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 گەڕان بە ناو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-right text-base"
          />
        </div>

        {/* 👤 USERS */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-right">
          بەکارهێنەران
        </h2>

        {filteredUsers.map((user) => (
          <div key={user.id} className={cardStyle}>
            {/* HEADER */}
            <div
              className="flex items-center justify-between"
              onClick={() => setOpenUser(openUser === user.id ? null : user.id)}
            >
              <FaEdit className="text-blue-500 text-lg" />

              <p className="font-semibold text-right flex-1 mr-3 text-base sm:text-lg">
                👤 {user.first_name} {user.last_name}
              </p>
            </div>

            {/* DROPDOWN */}
            <AnimatePresence>
              {openUser === user.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-3 text-sm text-gray-600 text-right space-y-2"
                >
                  {editingUser === user.id ? (
                    <>
                      <input
                        name="first_name"
                        defaultValue={user.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        name="last_name"
                        defaultValue={user.last_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        name="email"
                        defaultValue={user.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        name="phone"
                        defaultValue={user.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />

                      <button
                        onClick={() => {
                          updateUser({ ...user, ...formData });
                           setEditingUser(null);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p>📧 ئیمەیل: {user.email}</p>
                      <p>📱 تەلەفون: {user.phone}</p>
                      <p>💼 جۆری کار: {user.job_type}</p>
                      <p>📝 باسکردن: {user.bio}</p>
                      <p>🧑‍💼 ڕۆڵ: {user.role}</p>

                      {/* ACTIONS */}
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => {
                            setEditingUser(user.id);
                            setFormData(user);
                          }}
                          className="flex items-center gap-2 bg-yellow-400 text-white px-3 py-2 rounded-lg"
                        >
                          <FaEdit /> Edit
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* 🏢 COMPANIES (UNCHANGED) */}
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-right">
          کۆمپانیاکان
        </h2>

        {companies.map((c) => (
          <div key={c.id} className={cardStyle}>
            <div
              className="flex items-center justify-between"
              onClick={() => setOpenCompany(openCompany === c.id ? null : c.id)}
            >
              <FaEdit className="text-green-500 text-lg" />
              <p className="font-semibold text-right flex-1 mr-3 text-base sm:text-lg">
                🏢 {c.karganame}
              </p>
            </div>

            <AnimatePresence>
              {openCompany === c.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-3 text-sm text-gray-600 text-right space-y-1"
                >
                  <p>📧 ئیمەیل: {c.email}</p>
                  <p>📱 تەلەفون: {c.phone}</p>
                  <p>🧾 ناونیشان: {c.title}</p>
                  <p>📦 جۆری کار: {c.mawadtype}</p>
                  <p>📝 باسکردن: {c.bio}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;