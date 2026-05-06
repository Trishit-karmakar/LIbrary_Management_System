import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#234871",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.4rem", margin: "18px 0" }}>Page Not Found</p>
      <Link
        to="/"
        style={{
          background: "#234871",
          color: "#fff",
          textDecoration: "none",
          padding: "10px 22px",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
