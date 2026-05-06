import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";

function generateISBN() {
  return "978-" + Math.floor(100000000000 + Math.random() * 900000000000);
}

function AddBookForm() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    book_category: "",
    author: "",
    count: "",
    price: "",
    isbn: generateISBN(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not authenticated. Please log in again.");
      return;
    }

    try {
      const payload = {
        id: formData.id,
        name: formData.name,
        book_category: formData.book_category,
        author: formData.author,
        count: formData.count ? parseInt(formData.count) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        isbn: formData.isbn,
      };

      const response = await axios.post(
        "https://library-api.local/api/books",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Book added:", response.data);
      alert(response.data.message || "Book added successfully!");

      setFormData({
        id: Date.now(),
        name: "",
        book_category: "",
        author: "",
        count: "",
        price: "",
        isbn: generateISBN(),
      });
    } catch (err) {
      console.error("Error:", err);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <style>
        {`
          .book-form-wrapper {
            max-width: 500px;
            margin: 40px auto;
            padding: 24px 20px;
            background: #ffffff;
            border-radius: 10px;
            border: 1px solid #d5deea;
            box-shadow: 0 8px 20px rgba(0,0,0,0.06);
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .book-form-wrapper h2 {
            margin-bottom: 16px;
            font-size: 20px;
            color: #234871;
          }

          .book-form {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .book-form input {
            padding: 10px 12px;
            border: 1px solid #d0d7e2;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }

          .book-form input:focus {
            outline: none;
            border-color: #234871;
            box-shadow: 0 0 0 2px rgba(35,72,113,0.15);
          }

          .book-form button {
            background: #234871;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s ease, transform 0.05s ease;
          }

          .book-form button:hover {
            background: #1a3554;
          }

          .book-form button:active {
            transform: scale(0.98);
          }
        `}
      </style>

      <div className="book-form-wrapper">
        <h2>📚 Add New Book</h2>
        <form className="book-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Book Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="book_category"
            placeholder="Category"
            value={formData.book_category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
          />
          <input
            type="number"
            name="count"
            placeholder="Count"
            value={formData.count}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN (auto-generated)"
            value={formData.isbn}
            readOnly
          />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </>
  );
}

export default AddBookForm;
