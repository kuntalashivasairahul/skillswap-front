import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getSkills, addOfferedSkill, addNeededSkill } from "../services/skillService";

const Profile = () => {
  const userId = localStorage.getItem("skillswap_user_id");
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [offeredSkillId, setOfferedSkillId] = useState("");
  const [neededSkillId, setNeededSkillId] = useState("");

  const loadData = async () => {
    if (!userId) return;
    const [profileRes, skillsRes] = await Promise.all([
      api.get(`/users/${userId}`),
      getSkills(),
    ]);
    setProfile(profileRes.data);
    setSkills(skillsRes);
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const saveProfile = async () => {
    if (!userId || !profile) return;
    const { data } = await api.put(`/users/${userId}`, {
      name: profile.name,
      bio: profile.bio,
    });
    setProfile(data);
    alert("Profile updated");
  };

  const handleAddOffered = async () => {
    if (!offeredSkillId) return;
    await addOfferedSkill(userId, Number(offeredSkillId));
    alert("Offered skill added");
  };

  const handleAddNeeded = async () => {
    if (!neededSkillId) return;
    await addNeededSkill(userId, Number(neededSkillId));
    alert("Needed skill added");
  };

  if (!profile) return <div className="container page-shell text-secondary">Loading profile...</div>;

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Update your details and manage the skills you offer and need.</p>
      </div>

      <div className="card ss-card mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Personal Information</h5>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email (read-only)</label>
            <input className="form-control" value={profile.email || ""} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              rows={3}
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card ss-card h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Add Offered Skill</h5>
              <select className="form-select mb-3" value={offeredSkillId} onChange={(e) => setOfferedSkillId(e.target.value)}>
                <option value="">Select a skill</option>
                {skills.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
              </select>
              <button className="btn btn-success" onClick={handleAddOffered}>Add Offered</button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card ss-card h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Add Needed Skill</h5>
              <select className="form-select mb-3" value={neededSkillId} onChange={(e) => setNeededSkillId(e.target.value)}>
                <option value="">Select a skill</option>
                {skills.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
              </select>
              <button className="btn btn-warning" onClick={handleAddNeeded}>Add Needed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
