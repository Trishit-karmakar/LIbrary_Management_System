import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BorrowBookForm() {
  const [form, setForm] = useState({
    member_id: "",
    book_id: "",
    transaction_type: "borrow",
    borrowed_at: "",
    due_date: "",
    fine: "0.00",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/transactions", form);
      alert("Book borrowed successfully!");
    } catch (err) {
      console.error(err);
      alert("Error borrowing book");
    }
  };

  const containerStyle = {
    background: "#fff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
  };

  const borrowButton = {
    ...buttonStyle,
    backgroundColor: "#0077cc",
    color: "#fff",
  };

  const smallButton = {
    padding: "8px 16px",
    fontSize: "14px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff",
  };

  const buttonRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "10px",
  };

  const returnButton = {
    ...smallButton,
    backgroundColor: "#28a745",
    flex: 1,
  };

  const historyButton = {
    ...smallButton,
    backgroundColor: "#6f42c1",
    flex: 1,
  };

  return (
    <form style={containerStyle} onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Borrow Book
      </h3>

      <input
        style={inputStyle}
        name="member_id"
        placeholder="Member ID"
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="book_id"
        placeholder="Book ID"
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        type="date"
        name="borrowed_at"
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        type="date"
        name="due_date"
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="fine"
        type="number"
        step="0.01"
        placeholder="Fine (if any)"
        onChange={handleChange}
      />

      <button type="submit" style={borrowButton}>
        Borrow
      </button>

      <div style={buttonRowStyle}>
        <button
          type="button"
          style={returnButton}
          onClick={() => navigate("/admin/transactions/return")}
        >
          Return Book
        </button>
        <button
          type="button"
          style={historyButton}
          onClick={() => navigate("/admin/transactions/history")}
        >
          Transaction History
        </button>
      </div>
    </form>
  );
}

export default BorrowBookForm;
