import api from "./api";

export const sendMessage = async (senderId, receiverId, message) => {
  const { data } = await api.post("/messages", { senderId, receiverId, message });
  return data;
};

export const getMessages = async (matchId) => {
  const { data } = await api.get(`/messages/${matchId}`);
  return data;
};
