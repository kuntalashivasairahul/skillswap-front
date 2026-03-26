import api from "./api";

export const bookSession = async (matchId, sessionDate) => {
  const { data } = await api.post("/sessions/book", { matchId, sessionDate });
  return data;
};

export const getSessions = async (userId) => {
  const { data } = await api.get(`/sessions/${userId}`);
  return data;
};
