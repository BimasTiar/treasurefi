// src/lib/apiClient.ts

import { useAuth } from "@/src/contexts/AuthContext";

export function useApi() {
  const { token } = useAuth();

  async function get(url: string) {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw new Error(`API GET Error: ${res.status}`);
    }

    return res.json();
  }

  async function post(url: string, body: any) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`API POST Error: ${res.status}`);
    }

    return res.json();
  }

  return { get, post };
}