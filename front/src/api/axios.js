import axios from "axios";

const url = "http://localhost:8080";

export default axios.create({
  baseURL: url,
});
