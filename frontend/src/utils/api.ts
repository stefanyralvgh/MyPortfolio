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
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    return false;
  }
};
