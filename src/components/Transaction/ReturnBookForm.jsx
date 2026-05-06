import React, { useState } from "react";
import axios from "axios";

function ReturnBookForm() {
  const [form, setForm] = useState({
    member_id: "",
    book_id: "",
    transaction_type: "return",
    returned_at: "",
    fine: "0.00",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/transactions", form);
      alert("Book returned successfully!");
    } catch (err) {
      console.error(err);
      alert("Error returning book");
    }
  };

  const formStyle = {
    background: "#f9f9f9",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "2rem auto",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        Return Book
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
        name="returned_at"
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
      <button style={buttonStyle} type="submit">
        Return
      </button>
    </form>
  );
}

export default ReturnBookForm;
