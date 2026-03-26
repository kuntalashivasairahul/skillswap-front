import api from "./api";

/**
 * Fetches recommended skills for a user from AI module.
 */
export const getRecommendedSkills = async (userId) => {
  const { data } = await api.get(`/ai/recommend-skills/${userId}`);
  return data;
};

/**
 * Sends user chat message to AI assistant endpoint.
 */
export const sendChatMessage = async (message) => {
  const { data } = await api.post("/ai/chat", { message });
  return data;
};
