import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Loader from "../loader";
import { useAuth } from "../../contexts/auth-context";

function Book() {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    if (!token) {
      setError("Authentication token missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://library-api.local/api/books", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const rawBooks = response.data?.data || [];

      const grouped = {};
      rawBooks.forEach((book) => {
        const key = `${book.name}|${book.book_category}|${book.author}|${book.price}`;
        if (grouped[key]) {
          grouped[key].count += 1;
        } else {
          grouped[key] = {
            name: book.name,
            book_category: book.book_category,
            author: book.author,
            price: book.price,
            count: 1,
          };
        }
      });

      setBooks(Object.values(grouped));
    } catch (err) {
      console.error("Error fetching books:", err.response || err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch books. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px", fontSize: "24px", color: "#234871" }}>
        Books:
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#f0f4f8" }}>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Author</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Count</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                <Loader />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "red" }}>
                {error}
              </td>
            </tr>
          ) : books.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No books available.
              </td>
            </tr>
          ) : (
            books?.map((book, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{book.name}</td>
                <td style={tdStyle}>{book.book_category}</td>
                <td style={tdStyle}>{book.author}</td>
                <td style={tdStyle}>{book.price}</td>
                <td style={tdStyle}>{book.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ccc",
  fontWeight: "bold",
  textAlign: "center",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default Book;
