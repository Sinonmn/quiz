import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = "https://api.thecatapi.com/v1/images/search";

export const fetchCatImages = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        limit: 10,
        breed_ids: "beng",
      },
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Cat Fetch Error:", error.response?.data || error.message);
    return [];
  }
};
