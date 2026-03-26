import api from "./api";

export const createSkill = async (payload) => {
  const { data } = await api.post("/skills", payload);
  return data;
};

export const getSkills = async () => {
  const { data } = await api.get("/skills");
  return data;
};

export const addOfferedSkill = async (userId, skillId) => {
  await api.post(`/users/${userId}/offered-skills`, null, { params: { skillId } });
};

export const addNeededSkill = async (userId, skillId) => {
  await api.post(`/users/${userId}/needed-skills`, null, { params: { skillId } });
};
