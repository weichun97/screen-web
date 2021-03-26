import request from "@/util/request.js";
import qs from "qs";

export const $loginApi = {
  login: param => request.post("/login", qs.stringify(param))
};
