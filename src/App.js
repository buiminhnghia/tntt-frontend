import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://tntt-web.onrender.com"; // backend Render API

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

  // Thêm dữ liệu mới
  const handleAdd = () => {
    if (!newName.trim()) {
      setError("Tên không được rỗng");
      return;
    }

    setLoading(true);
    axios
      .post(`${API_BASE}/`, { name: newName })
      .then((res) => {
        // Backend trả về trực tiếp { id, name, qr_code_img }
        const newRow = {
          id: res.data.id,
          name: res.data.name,
          qr_code_img: res.data.qr_code_img,
        };

        setRows((prev) => [...prev, newRow]);
        setNewName("");
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
        maxWidth: "600px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#1976d2",
          marginBottom: "24px",
        }}
      >
        Dữ liệu + QR Code
      </h2>

      {error && (
        <p
          style={{
            color: "#d32f2f",
            background: "#ffebee",
            padding: "8px",
            borderRadius: "6px",
          }}
        >
          {error}
        </p>
      )}

      <div style={{ marginBottom: "24px", display: "flex", gap: "12px" }}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nhập tên mới..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #bdbdbd",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            background: loading ? "#90caf9" : "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </div>

      {rows.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fafafa",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <thead>
            <tr style={{ background: "#1976d2", color: "#fff" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Tên</th>
              <th style={{ padding: "12px" }}>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {row.id}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {row.name}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
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
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && (
          <p style={{ textAlign: "center", color: "#757575" }}>
            Đang tải dữ liệu...
          </p>
        )
      )}
    </div>
  );
}

export default App;
