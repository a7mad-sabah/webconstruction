
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [openUser, setOpenUser] = useState(null);
  const [openCompany, setOpenCompany] = useState(null);

  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);

  const [formData, setFormData] = useState({});
  const [companyForm, setCompanyForm] = useState({});

  // 🔥 FETCH DATA
  useEffect(() => {
    fetch("http://localhost/goldenhand/my-project/backend/api/get_users.php")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setCompanies(data.companies || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // ================= USER =================

  useEffect(() => {
    if (editingUser) {
      const user = users.find((u) => u.id === editingUser);
      if (user) setFormData(user);
    }
  }, [editingUser, users]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    const res = await fetch(
      "http://localhost/goldenhand/my-project/backend/api/update_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      },
    );

    const data = await res.json();

    if (data.success) {
      setUsers(users.map((u) => (u.id === formData.id ? formData : u)));
      setEditingUser(null);
      setFormData({});
    }
  };

  const deleteUser = async (id) => {
    const res = await fetch(
      "http://localhost/goldenhand/my-project/backend/api/delete_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "user" }),
      },
    );

    const data = await res.json();

    if (data.success) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // ================= COMPANY =================

  useEffect(() => {
    if (editingCompany) {
      const c = companies.find((x) => x.id === editingCompany);
      if (c) setCompanyForm(c);
    }
  }, [editingCompany, companies]);

  const handleCompanyChange = (e) => {
    setCompanyForm({
      ...companyForm,
      [e.target.name]: e.target.value,
    });
  };

  const updateCompany = async () => {
    const res = await fetch(
      "http://localhost/goldenhand/my-project/backend/api/update_company.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyForm),
      },
    );

    const data = await res.json();

    if (data.success) {
      setCompanies(
        companies.map((c) => (c.id === companyForm.id ? companyForm : c)),
      );
      setEditingCompany(null);
      setCompanyForm({});
    }
  };

  const deleteCompany = async (id) => {
    const res = await fetch(
      "http://localhost/goldenhand/my-project/backend/api/delete_company.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "company" }),
      },
    );

    const data = await res.json();

    if (data.success) {
      setCompanies(companies.filter((c) => c.id !== id));
    }
  };

  // ================= FILTER =================

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const filteredCompanies = companies.filter((c) =>
    (c.karganame || "").toLowerCase().includes(search.toLowerCase()),
  );

  const cardStyle =
    "w-full bg-white rounded-2xl shadow-md p-4 mb-4 cursor-pointer";

  return (
    <div dir="rtl" className="min-h-screen flex justify-center">
      <div className="w-full max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">بەکارهێنەران</h1>

        <input
          type="text"
          placeholder="گەڕان..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6"
        />

        {/* ================= USERS ================= */}
        {filteredUsers.map((user) => (
          <div key={user.id} className={cardStyle}>
            <div
              className="flex justify-between"
              onClick={() => setOpenUser(openUser === user.id ? null : user.id)}
            >
              <p>
                👤 {user.first_name} {user.last_name}
              </p>
              <FaEdit />
            </div>

            <AnimatePresence>
              {openUser === user.id && (
                <motion.div className="mt-3 space-y-2">
                  {editingUser === user.id ? (
                    <>
                      {[
                        "first_name",
                        "last_name",
                        "email",
                        "phone",
                        "job_type",
                        "bio",
                        "role",
                      ].map((f) => (
                        <input
                          key={f}
                          name={f}
                          value={formData[f] || ""}
                          onChange={handleChange}
                          className="w-full p-2 border"
                        />
                      ))}

                      <button
                        onClick={updateUser}
                        className="bg-green-500 text-white px-3 py-2 rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p>📧 {user.email}</p>
                      <p>📱 {user.phone}</p>
                      <p>💼 {user.job_type}</p>
                      <p>📝 {user.bio}</p>
                      <p>🧑‍💼 {user.role}</p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditingUser(user.id)}
                          className="bg-yellow-400 px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* ================= COMPANIES ================= */}
        <h2 className="text-xl font-bold mt-8">کۆگاکان</h2>

        {filteredCompanies.map((c) => (
          <div key={c.id} className={cardStyle}>
            <div
              className="flex justify-between"
              onClick={() => setOpenCompany(openCompany === c.id ? null : c.id)}
            >
              <p>🏢 {c.karganame}</p>
              <FaEdit />
            </div>

            <AnimatePresence>
              {openCompany === c.id && (
                <motion.div className="mt-3 space-y-2">
                  {editingCompany === c.id ? (
                    <>
                      {[
                        "karganame",
                        "email",
                        "phone",
                        "title",
                        "mawadtype",
                        "bio",
                      ].map((f) => (
                        <input
                          key={f}
                          name={f}
                          value={companyForm[f] || ""}
                          onChange={handleCompanyChange}
                          className="w-full p-2 border"
                        />
                      ))}

                      <button
                        onClick={updateCompany}
                        className="bg-green-500 text-white px-3 py-2 rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p>📧 {c.email}</p>
                      <p>📱 {c.phone}</p>
                      <p>🏷 {c.title}</p>
                      <p>📦 {c.mawadtype}</p>
                      <p>📝 {c.bio}</p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditingCompany(c.id)}
                          className="bg-yellow-400 px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCompany(c.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </>
                  )}
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