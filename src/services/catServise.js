const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = "https://api.thecatapi.com/v1/images/search";

export const fetchCatImages = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}?limit=10&breed_ids=beng&api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cats");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cat Fetch Error:", error);
    return [];
  }
};
