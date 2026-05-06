import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

function GuestLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <div
          style={{
            textAlign: "center",
            fontSize: "30px",
          }}
        >
          Guest Layout
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default GuestLayout;
