import api from "./api";

export const findMatches = async (userId) => {
  const { data } = await api.get(`/matches/find/${userId}`);
  return data;
};

export const requestMatch = async (requesterId, recipientId) => {
  const { data } = await api.post("/matches/request", { requesterId, recipientId });
  return data;
};

export const getMatches = async (userId) => {
  const { data } = await api.get(`/matches/${userId}`);
  return data;
};

export const acceptMatch = async (matchId) => {
  const { data } = await api.put(`/matches/accept/${matchId}`);
  return data;
};
