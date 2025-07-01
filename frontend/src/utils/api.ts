import { Level } from "../types";

const API_BASE_URL = "http://localhost:3000";

export async function fetchLevels(): Promise<Level[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/levels`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching levels:", error);
    throw new Error("Failed to fetch levels");
  }
}

export async function fetchLevel(id: number): Promise<Level> {
  try {
    const response = await fetch(`${API_BASE_URL}/levels/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching level:", error);
    throw new Error("Failed to fetch level");
  }
}
