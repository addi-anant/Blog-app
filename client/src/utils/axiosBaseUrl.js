import axios from "axios";

export const axiosBaseURL = axios.create({
  baseURL: "https://aadiblogs.azurewebsites.net/api/",
});