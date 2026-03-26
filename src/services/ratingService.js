import api from "./api";

export const submitRating = async (payload) => {
  const { data } = await api.post("/ratings", payload);
  return data;
};

export const getRatings = async (userId) => {
  const { data } = await api.get(`/ratings/${userId}`);
  return data;
};
