import API from "./api";

export const getHomepage = () => {
  return API.get("/homepage");
};