import axios from "axios";
import qs from "qs";

export const $loginApi = {
  login: param => axios.post("/api/login", qs.stringify(param))
};
