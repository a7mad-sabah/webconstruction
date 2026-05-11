import { useEffect, useState } from "react";

const Agadari = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/get_notifications.php",
      );

      const data = await res.json();

      if (data.success) {
        setUsers(data.users || []);
        setCompanies(data.companies || []);
        setFeedbacks(data.feedbacks || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const updateStatus = async (id, type, status) => {
    try {
      const res = await fetch(
        "http://localhost/goldenhand/my-project/backend/api/update_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, type, status }),
        },
      );

      const data = await res.json();

      if (data.success) {
        fetchNotifications();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Card = ({ title, email, phone, children }) => {
    return (
      <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>

        <div className="flex gap-2">{children}</div>
      </div>
    );
  };

  const ActionBtn = ({ color, children, ...props }) => (
    <button
      {...props}
      className={`px-3 py-1 rounded-lg text-white text-sm transition ${
        color === "green"
          ? "bg-green-500 hover:bg-green-600"
          : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {children}
    </button>
  );

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border">
      <h2 className="text-lg font-bold mb-4 text-gray-700">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">ئاگادارییەکان</h1>

        {loading ? (
          <div className="text-center text-gray-500">چاوەڕێ بکە...</div>
        ) : (
          <>
            {/* USERS */}
            <Section title="کارمەندان">
              {users.length === 0 ? (
                <p className="text-gray-400 text-sm">هیچ داواکاریەک نییە</p>
              ) : (
                users.map((u) => (
                  <Card
                    key={u.id}
                    title={`${u.firstName} ${u.lastName}`}
                    email={u.email}
                    phone={u.phone}
                  >
                    <ActionBtn
                      color="red"
                      onClick={() => updateStatus(u.id, "user", "rejected")}
                    >
                      ڕەت
                    </ActionBtn>
                    <ActionBtn
                      color="green"
                      onClick={() => updateStatus(u.id, "user", "approved")}
                    >
                      قبوڵ
                    </ActionBtn>
                  </Card>
                ))
              )}
            </Section>

            {/* COMPANIES */}
            <Section title="کۆمپانیاکان">
              {companies.length === 0 ? (
                <p className="text-gray-400 text-sm">هیچ کۆمپانیایەک نییە</p>
              ) : (
                companies.map((c) => (
                  <Card
                    key={c.id}
                    title={c.karganame}
                    email={c.email}
                    phone={c.phone}
                  >
                    <ActionBtn
                      color="red"
                      onClick={() => updateStatus(c.id, "company", "rejected")}
                    >
                      ڕەت
                    </ActionBtn>
                    <ActionBtn
                      color="green"
                      onClick={() => updateStatus(c.id, "company", "approved")}
                    >
                      قبوڵ
                    </ActionBtn>
                  </Card>
                ))
              )}
            </Section>

            {/* FEEDBACK */}
            <Section title="فیدباک">
              {feedbacks.length === 0 ? (
                <p className="text-gray-400 text-sm">هیچ فیدباکێک نییە</p>
              ) : (
                feedbacks.map((f) => (
                  <div key={f.id} className="border rounded-xl p-4 bg-slate-50">
                    <div className="flex justify-between">
                      <p className="font-bold text-gray-800">{f.name}</p>
                      <p className="text-yellow-500">⭐ {f.rating}</p>
                    </div>

                    <p className="text-sm text-gray-500">{f.email}</p>
                    <p className="mt-2 text-gray-700">{f.feedback}</p>

                    <div className="flex gap-2 mt-3">
                      <ActionBtn
                        color="green"
                        onClick={() =>
                          updateStatus(f.id, "feedback", "approved")
                        }
                      >
                        قبوڵ
                      </ActionBtn>
                      <ActionBtn
                        color="red"
                        onClick={() =>
                          updateStatus(f.id, "feedback", "rejected")
                        }
                      >
                        ڕەت
                      </ActionBtn>
                    </div>
                  </div>
                ))
              )}
            </Section>
          </>
        )}
      </div>
    </div>
  );
};

export default Agadari;
