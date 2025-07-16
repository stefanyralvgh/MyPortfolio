import { Level } from "../interfaces/levelInterfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const fetchLevels = async (
  language: string = "es"
): Promise<Level[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/levels?language=${language}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching levels:", error);
    throw error;
  }
};

export const fetchLevel = async (
  id: number,
  language: string = "es"
): Promise<Level> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/levels/${id}?language=${language}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching level:", error);
    throw error;
  }
};

export const pingApi = async () => {
  try {
    // Simple ping to wake up the API
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add a timeout to prevent hanging
      signal: AbortSignal.timeout(5000),
    });

    return response.ok;
  } catch (error) {
    console.log("API ping failed, backend might be sleeping:", error);
    return false;
  }
};
