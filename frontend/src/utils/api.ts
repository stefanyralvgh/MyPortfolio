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
    // Try the optimized ping endpoint first
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add a timeout to prevent hanging
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      console.log("API ping successful");
      return true;
    }

    // Fallback to health check if ping fails
    const healthResponse = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });

    return healthResponse.ok;
  } catch (error) {
    console.log("API ping failed, backend might be sleeping:", error);
    return false;
  }
};

// Enhanced ping with retry logic
export const wakeUpApi = async (maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const isAlive = await pingApi();
      if (isAlive) {
        console.log(`API woke up after ${i + 1} attempts`);
        return true;
      }

      // Wait before retry (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    } catch (error) {
      console.log(`Ping attempt ${i + 1} failed:`, error);
    }
  }

  console.log("Failed to wake up API after all retries");
  return false;
};
