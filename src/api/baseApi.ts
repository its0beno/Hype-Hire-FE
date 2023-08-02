import axios from "axios";

const instance = axios.create({
  baseURL: " http://localhost:3000", // Replace with your API base URL
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const api = {
  getCartItems: () => instance.get("/api/books"),

  // post: (url: string, data: any) => instance.post(url, data),
};
