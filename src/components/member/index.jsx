import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import "./MemberManager.css";

export default function MemberManager() {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  const fetchMembers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(
        "https://library-api.local/api/members",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setMembers(response.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (memberId) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await axios.delete(`https://library-api.local/api/members/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashMessage("Member deleted successfully! ✅");
      setTimeout(() => setFlashMessage(""), 3000);
      fetchMembers();
    } catch (err) {
      alert("Delete failed!");
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase()) ||
      m.contact_no.includes(search),
  );

  useEffect(() => {
    fetchMembers();
  }, [token]);

  return (
    <div className="member-manager">
      {/* ✅ FLASH MESSAGE */}
      {flashMessage && <div className="flash-message">{flashMessage}</div>}

      <header className="page-header">
        <h1>👥 Members ({members.length})</h1>
        <button
          className="add-member-btn"
          onClick={() => (window.location.href = "/add-member")}
        >
          ➕ Add New Member
        </button>
      </header>

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by name, city, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="stats-card">
          {filteredMembers.length} of {members.length}
        </div>
      </div>

      <div className="members-grid">
        {loading ? (
          <div className="empty-state">Loading members...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="empty-state">
            {search ? "No matching members" : "No members yet"}
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <div className="member-contact">📞 {member.contact_no}</div>
                <div className="member-location">
                  📍 {member.city}, {member.state}
                  <span className="pincode">{member.pin_code}</span>
                </div>
                <div className="member-address">{member.address}</div>
              </div>
              {/* ✅ DELETE BUTTON */}
              <button
                className="delete-btn"
                onClick={() => deleteMember(member.id)}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
