import axios from "axios";
import { API_URL } from "../../utils/consts";

export const globalApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
