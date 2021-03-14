import http from "../http-common";

const getAll = () => {
  return http.get("/documents");
};

const create = (data) => {
  return http.post("/documents", data);
};

const update = (id, data) => {
  return http.post(`/documents/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/documents/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
