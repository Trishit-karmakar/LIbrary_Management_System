import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import PaymentModal from "./PaymentModal";

function TransactionList() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://library-api.local/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTransactions(res.data.data || []);
      })
      .catch((err) => {
        setError("Failed to load transactions.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleReturnBook = async (transactionId, memberId, bookId) => {
    try {
      const res = await axios.post(
        "https://library-api.local/api/transactions/return",
        { member_id: memberId, book_id: bookId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("✅ Book returned! Complete payment below.");
      // Refresh list and open payment modal
      window.location.reload(); // Simple refresh
      setSelectedPayment(res.data.data.payment);
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Error"));
    }
  };

  const containerStyle = { padding: "2rem" };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  };
  const thStyle = {
    backgroundColor: "#f0f4f8",
    padding: "12px",
    border: "1px solid #ddd",
    fontWeight: "600",
  };
  const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  };
  const btnStyle = {
    padding: "6px 12px",
    margin: "2px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    color: "white",
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <h3
        style={{ marginBottom: "1rem", color: "#234871", textAlign: "center" }}
      >
        📊 Transaction History & Payments
      </h3>

      {transactions.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No transactions found.
        </p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Member ID</th>
              <th style={thStyle}>Book ID</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Due Date</th>
              <th style={thStyle}>Fine</th>
              <th style={thStyle}>Payment Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td style={tdStyle}>{tx.member_id}</td>
                <td style={tdStyle}>{tx.book_id}</td>
                <td style={tdStyle}>{tx.transaction_type}</td>
                <td style={tdStyle}>{tx.due_date || "-"}</td>
                <td style={tdStyle}>₹{tx.fine || 0}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      color:
                        tx.payment?.status === "completed"
                          ? "#10b981"
                          : "#f59e0b",
                      fontWeight: "bold",
                    }}
                  >
                    {tx.payment?.status || "No Payment"}
                  </span>
                </td>
                <td style={tdStyle}>
                  {tx.transaction_type === "borrow" && !tx.returned_at && (
                    <button
                      style={{ ...btnStyle, backgroundColor: "#28a745" }}
                      onClick={() =>
                        handleReturnBook(tx.id, tx.member_id, tx.book_id)
                      }
                    >
                      📚 Return & Pay
                    </button>
                  )}
                  {tx.payment?.status === "pending" && (
                    <button
                      style={{ ...btnStyle, backgroundColor: "#3b82f6" }}
                      onClick={() => setSelectedPayment(tx.payment)}
                    >
                      💳 Pay ₹{tx.payment.amount}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedPayment && (
        <PaymentModal
          payment={selectedPayment}
          token={token}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
}

export default TransactionList;
