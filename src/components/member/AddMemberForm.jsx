import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import "./AddMemberForm.css";

const countries = [
  "India",
  "USA",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "Russia",
  "UAE",
  "Singapore",
  "Other",
];

export default function AddMemberForm({ onMemberAdded }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_no: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pin_code: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name required";
    if (!/^\d{10}$/.test(formData.contact_no))
      newErrors.contact_no = "Enter valid 10-digit phone";
    ["address", "country", "state", "city", "pin_code"].forEach((field) => {
      if (!formData[field].trim())
        newErrors[field] = `${field.replace("_", " ").toUpperCase()} required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        contact_no: formData.contact_no,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pin_code: formData.pin_code,
      };

      await axios.post("https://library-api.local/api/members", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFormData({
        first_name: "",
        last_name: "",
        contact_no: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pin_code: "",
      });
      setErrors({});
      if (onMemberAdded) onMemberAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-member-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-group">
          <input
            name="first_name"
            placeholder="First Name *"
            value={formData.first_name}
            onChange={handleChange}
            className={errors.first_name ? "error" : ""}
            required
          />
          {errors.first_name && (
            <span className="error-text">{errors.first_name}</span>
          )}
        </div>
        <div className="input-group">
          <input
            name="last_name"
            placeholder="Last Name *"
            value={formData.last_name}
            onChange={handleChange}
            className={errors.last_name ? "error" : ""}
            required
          />
          {errors.last_name && (
            <span className="error-text">{errors.last_name}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <input
            name="contact_no"
            placeholder="Phone (10 digits) *"
            value={formData.contact_no}
            maxLength="10"
            onChange={handleChange}
            className={errors.contact_no ? "error" : ""}
            required
          />
          {errors.contact_no && (
            <span className="error-text">{errors.contact_no}</span>
          )}
        </div>
        <div className="input-group">
          <input
            name="city"
            placeholder="City *"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "error" : ""}
            required
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <input
            name="address"
            placeholder="Full Address *"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "error" : ""}
            required
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>
        <div className="input-group">
          <input
            name="pin_code"
            placeholder="Pin Code *"
            value={formData.pin_code}
            onChange={handleChange}
            className={errors.pin_code ? "error" : ""}
            required
          />
          {errors.pin_code && (
            <span className="error-text">{errors.pin_code}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? "error" : ""}
            required
          >
            <option value="">Select Country *</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="error-text">{errors.country}</span>
          )}
        </div>
        <div className="input-group">
          <input
            name="state"
            placeholder="State *"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? "error" : ""}
            required
          />
          {errors.state && <span className="error-text">{errors.state}</span>}
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Adding..." : "Add Member"}
      </button>
    </form>
  );
}
