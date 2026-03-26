import React from "react";

const SkillBadge = ({ skill }) => {
  return <span className="skill-chip">{skill?.name || skill}</span>;
};

export default SkillBadge;
