import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader";

function User() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    axios
      .get("https://library-api.local/api/users", { headers })
      .then(({ data }) => {
        setUsers(data?.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching users:",
          err.response?.data || err.message
        );
        setLoading(false);
        setError("No Users Found");
      });
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>User List</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3}>
                <Loader />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={3}>{error}</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} style={rowStyle}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const containerStyle = { padding: "24px" };
const titleStyle = { fontSize: "24px", color: "#234871", marginBottom: "16px" };
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
};
const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ccc",
  fontWeight: "bold",
  textAlign: "left",
  backgroundColor: "#f0f4f8",
  color: "#234871",
};
const tdStyle = { padding: "10px", borderBottom: "1px solid #eee" };
const rowStyle = { textAlign: "left" };

export default User;
