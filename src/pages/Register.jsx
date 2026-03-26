import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", bio: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await register(form);
      localStorage.setItem("skillswap_token", res.token);
      localStorage.setItem("skillswap_user_id", String(res.userId));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div className="container page-shell auth-shell auth-shell-lg">
      <div className="card ss-card">
        <div className="card-body">
          <div className="mb-4">
            <h1 className="page-title mb-1">Create Account</h1>
            <p className="page-subtitle">Join SkillSwap and start exchanging skills.</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Bio</label>
              <textarea className="form-control" name="bio" value={form.bio} onChange={handleChange} rows={3} />
            </div>
            <button className="btn btn-primary w-100" type="submit">Create Account</button>
          </form>
          <p className="mt-4 mb-0 text-secondary">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
