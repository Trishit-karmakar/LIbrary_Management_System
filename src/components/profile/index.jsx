import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";

function Profile() {
  const { token } = useAuth();
  const [user, setProfile] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("https://library-api.local/api/auth/profile", { headers })
      .then(({ data }) => {
        console.log(data);
        setProfile(data.user || null);
      })
      .catch((err) => {
        console.log("Error fetching profile:", err);
      });
  }, [token]);

  return (
    <div style={containerStyle}>
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#234871" }}
      >
        Profile
      </h2>
      <div style={infoStyle}>
        <strong>Name:</strong> {user?.name || "Loading..."}
      </div>
      <div style={infoStyle}>
        <strong>Email:</strong> {user?.email || "Loading..."}
      </div>
    </div>
  );
}

const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "24px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const infoStyle = {
  marginBottom: "12px",
  fontSize: "16px",
};

export default Profile;
