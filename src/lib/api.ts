const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface MissionData {
  title?: string;
  description?: string;
  reward?: number;
  type?: string;
  targetAmount?: number;

}

interface ProgressData {
  missionId: string;
  progress: number;
  userId?: string;
}

interface Reward {
  id: string;
  amount: number;
  type: string;

}
export async function createMission(data: MissionData, token: string) {
  try {
    const response = await fetch(`${API_BASE}/missions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating mission:", error);
    throw error;
  }
}

export async function updateMissionProgress(data: ProgressData, token: string) {
  try {
    const response = await fetch(`${API_BASE}/missions/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating mission progress:", error);
    throw error;
  }
}

export async function getRewards(token: string): Promise<Reward[]> {
  try {
    const response = await fetch(`${API_BASE}/rewards`, {
      headers: { 
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
}