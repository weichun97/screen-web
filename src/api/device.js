import axios from "axios";
import qs from "qs";

export const $deviceApi = {
  page: param => axios.get(`/api/device/page`, qs.stringify(param)),
  detail: param => axios.get(`/api/device/${param}`),
};
