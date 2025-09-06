import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
    const res = await axios.post("https://tntt-web.onrender.com/login", {
        username: username,
        password: password,
        });
   
      if (res.status === 200) {
        onLogin && onLogin();
      } else {
        setError("Sai tài khoản hoặc mật khẩu");
      }
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div style={{
      maxWidth: 350,
      margin: "80px auto",
      padding: 32,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", color: "#1976d2", marginBottom: 24 }}>Đăng nhập</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: 12, borderRadius: 6, border: "1px solid #bdbdbd" }}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 12, borderRadius: 6, border: "1px solid #bdbdbd" }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 0",
            borderRadius: 6,
            border: "none",
            background: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Đăng nhập
        </button>
        {error && <div style={{ color: "#d32f2f", textAlign: "center" }}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;