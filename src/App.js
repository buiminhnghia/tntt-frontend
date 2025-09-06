import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./login";
function App() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [telephone, setTelephone] = useState("");
  const [managerName, setManagerName] = useState("");
  const API_BASE = "https://tntt-web.onrender.com"; // backend Render API
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Lấy dữ liệu ban đầu
  const fetchData = () => {
    axios
      .get(`${API_BASE}/`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRows(res.data);
          setError(null);
        } else {
          setError("Dữ liệu trả về không đúng định dạng");
        }
      })
      .catch((err) => {
        console.error("Lỗi gọi API:", err);
        setError("Không thể kết nối backend");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // Thêm dữ liệu mới
  const handleAdd = () => {
  if (!newName.trim() || !date.trim() || !telephone.trim() || !managerName.trim()) {
    setError("Vui lòng nhập đầy đủ tên, ngày và số điện thoại");
    return;
  }

  setLoading(true);
  axios
    .post(`${API_BASE}/`, {
      name: newName,
      date: date,
      telephone: telephone,
      manager_name: managerName,
    })
    .then((res) => {
      const newRow = res.data; // backend trả về cả row {id, name, date, telephone, qr_code_img}
      setRows((prev) => [...prev, newRow]);

      // reset form
      setNewName("");
      setDate("");
      setTelephone("");
      setManagerName("");
      setError(null);
    })
    .catch((err) => {
      console.error("Lỗi insert:", err);
      setError("Không thể thêm dữ liệu");
    })
    .finally(() => setLoading(false));
};


  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "800px",
        margin: "40px auto",
        background: "#f4f6fb",
        borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        fontFamily: "Segoe UI, Arial, sans-serif",
        width: "100%", // Thêm dòng này
        boxSizing: "border-box", // Thêm dòng này
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#1976d2",
          marginBottom: "32px",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        Quản Lý Thiếu Nhi & QR Code
      </h2>

      {error && (
        <p
          style={{
            color: "#d32f2f",
            background: "#ffebee",
            padding: "10px 16px",
            borderRadius: "8px",
            marginBottom: "18px",
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(211,47,47,0.08)",
          }}
        >
          {error}
        </p>
      )}

      <form
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "32px",
          flexWrap: "wrap",
          alignItems: "center",
          background: "#fff",
          padding: "18px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(25,118,210,0.04)",
          width: "100%", // Thêm dòng này
          boxSizing: "border-box", // Thêm dòng này
        }}
        onSubmit={e => { e.preventDefault(); handleAdd(); }}
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Tên thiếu nhi"
          style={{
            flex: "2 1 180px",
            minWidth: "120px", // Thêm dòng này
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #bdbdbd",
            fontSize: "16px",
            background: "#f8fafc",
            transition: "border 0.2s",
            width: "100%", // Thêm dòng này
            boxSizing: "border-box", // Thêm dòng này
          }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            flex: "1 1 120px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #bdbdbd",
            fontSize: "16px",
            background: "#f8fafc",
            width: "100%", // Thêm dòng này
            boxSizing: "border-box", // Thêm dòng này
          }}
        />
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Số điện thoại"
          style={{
            flex: "1 1 140px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #bdbdbd",
            fontSize: "16px",
            background: "#f8fafc",
            width: "100%", // Thêm dòng này
            boxSizing: "border-box", // Thêm dòng này
          }}
        />
        <input
          type="text"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
          placeholder="Tên Giáo Lý Viên"
          style={{
            flex: "1 1 140px",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #bdbdbd",
            fontSize: "16px",
            background: "#f8fafc",
            width: "100%", // Thêm dòng này
            boxSizing: "border-box", // Thêm dòng này
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 28px",
            borderRadius: "6px",
            border: "none",
            background: loading ? "#90caf9" : "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            boxShadow: "0 2px 8px rgba(25,118,210,0.08)",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>

      {rows.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(25,118,210,0.04)",
              minWidth: "600px", // Thêm dòng này để bảng không bị vỡ trên mobile
            }}
          >
            <thead>
              <tr style={{ background: "#1976d2", color: "#fff" }}>
                <th style={{ padding: "14px", fontWeight: 600 }}>ID</th>
                <th style={{ padding: "14px", fontWeight: 600 }}>Tên</th>
                <th style={{ padding: "14px", fontWeight: 600 }}>Ngày sinh</th>
                <th style={{ padding: "14px", fontWeight: 600 }}>SĐT</th>
                <th style={{ padding: "14px", fontWeight: 600 }}>Giáo Lý Viên</th>
                <th style={{ padding: "14px", fontWeight: 600 }}>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    background: "#f8fafc",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e3f2fd"}
                  onMouseLeave={e => e.currentTarget.style.background = "#f8fafc"}
                >
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.id}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.date}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.telephone}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{row.manager_name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {row.qr_code_img && (
                      <img
                        src={row.qr_code_img}
                        alt="QR"
                        width="80"
                        style={{
                          border: "1px solid #e0e0e0",
                          borderRadius: "4px",
                          background: "#fff",
                          padding: "4px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && (
          <p style={{ textAlign: "center", color: "#757575", marginTop: "32px" }}>
            Đang tải dữ liệu...
          </p>
        )
      )}
    </div>
  );
}

export default App;
