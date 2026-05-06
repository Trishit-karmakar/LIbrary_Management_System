import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import AddMemberForm from "./AddMemberForm";
import "./MemberManager.css";

export default function MemberManager() {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  const handleMemberAdded = () => {
    setShowForm(false);
    fetchMembers();
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
      <div className="manager-header">
        <h1>👥 Members ({members.length})</h1>
        <button
          className="toggle-form-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close Form" : "➕ Add New Member"}
        </button>
      </div>

      {showForm && <AddMemberForm onMemberAdded={handleMemberAdded} />}

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by name, city, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="member-count">
          {filteredMembers.length} of {members.length}
        </span>
      </div>

      <div className="members-grid">
        {loading ? (
          <div className="loading-state">Loading members...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="empty-state">
            {search ? "No matching members" : "No members yet"}
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <div className="member-contact">{member.contact_no}</div>
                <div className="member-location">
                  {member.city}, {member.state}
                  <span className="pincode">{member.pin_code}</span>
                </div>
                <div className="member-address">{member.address}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
