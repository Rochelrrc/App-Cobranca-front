import axios from "axios";

export default axios.create({
  baseURL: "https://successful-bear-purse.cyclic.app/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
