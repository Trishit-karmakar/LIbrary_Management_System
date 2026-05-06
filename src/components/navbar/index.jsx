import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        background: "#234871",
        padding: "16px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: "22px",
          marginLeft: "32px",
          letterSpacing: "1px",
        }}
      >
        Library
      </div>
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginRight: "36px",
        }}
      >
        <Link
          to="/login"
          style={{
            color: "#fff",
            textDecoration:
              location.pathname === "/login" ? "underline" : "none",
            fontSize: "18px",
            padding: "8px 14px",
          }}
        >
          Login
        </Link>
        <Link
          to="/registration"
          style={{
            color: "#fff",
            textDecoration:
              location.pathname === "/registration" ? "underline" : "none",
            fontSize: "18px",
            padding: "8px 14px",
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
