import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useEffect } from "react";

function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const navLinkClass = (path) => (location.pathname === path ? "active" : "");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      {/* Inline CSS for simplicity */}
      <style>{`
        .auth-header {
          background: #234871;
          color: #fff;
          padding: 16px;
          text-align: center;
          font-weight: bold;
          font-size: 28px;
          letter-spacing: 1px;
        }

        .auth-nav {
          background: #234871;
          display: flex;
          justify-content: flex-end;
          padding: 10px 36px;
        }

        .auth-nav a,
        .auth-nav button {
          color: #fff;
          text-decoration: none;
          font-size: 18px;
          padding: 8px 14px;
          cursor: pointer;
          border: none;
          background: transparent;
        }

        .auth-nav a.active {
          text-decoration: underline;
        }

        .auth-main {
          padding: 20px;
        }

        .quick-actions {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .quick-actions a {
          background: #234871;
          color: #fff;
          padding: 10px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .quick-actions a:hover {
          background: #1a3555;
          transform: translateY(-2px);
        }
      `}</style>

      <header className="auth-header">Admin Area</header>

      <nav className="auth-nav">
        <Link to="/admin/user" className={navLinkClass("/admin/user")}>
          Users
        </Link>
        <Link to="/admin/book" className={navLinkClass("/admin/book")}>
          Books
        </Link>
        <Link to="/admin/member" className={navLinkClass("/admin/member")}>
          Members
        </Link>
        <Link to="/admin/profile" className={navLinkClass("/admin/profile")}>
          Profile
        </Link>
        <Link
          to="/admin/transactions"
          className={navLinkClass("/admin/transactions")}
        >
          Transactions
        </Link>
        <button onClick={logout}>Logout</button>
      </nav>

      <main className="auth-main">
        {/* Quick action buttons */}
        <div className="quick-actions">
          <Link to="/admin/add-member">➕ Add New Member</Link>
          <Link to="/admin/add-book">📚 Add New Book</Link>
        </div>

        {/* Nested routes */}
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
