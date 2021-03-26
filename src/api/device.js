import request from "@/util/request.js";
import qs from "qs";

export const $deviceApi = {
  page: param => request.get(`/device/page`, qs.stringify(param)),
  detail: param => request.get(`/device/${param}`),
  edit: (id, param) => request.put(`/device/${id}`, param),
  add: (param) => request.post(`/device`, param),
  delete: (id) => request.delete(`/device/${id}`),
};
