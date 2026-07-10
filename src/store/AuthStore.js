import { create } from "zustand";
import APIEndpoint from "../router/APIEndpoint";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  apiOnline: true,
  lastError: null,

  checkApiStatus: async () => {
    try {
      // await fetch(`${APIEndpoint}/auth`); // or any lightweight endpoint
      await fetch(`${APIEndpoint}/health`);


      set({
        apiOnline: true,
        lastError: null,
      });
    } catch (err) {
      set({
        apiOnline: false,
        lastError: err.message,
      });
    }
  },


  login: async (username, password) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${APIEndpoint}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 0) {
        set({ apiOnline: false, loading: false });
        return { ok: false, reason: "offline" };
      }

      // const data = await res.json();
      const data = await res.json().catch(() => null);

      if (res.status === 401) {
        set({ loading: false, apiOnline: true });
        return { ok: false, reason: "invalid" };
      }

      if (!res.ok) {
        set({ loading: false, apiOnline: true });
        return { ok: false, reason: "server", message: data?.message };
      }

      set({
        user: data.user,
        token: data.token,
        loading: false,
        apiOnline: true,
      });

      return data.user;

    } catch (err) {
      set({ apiOnline: false, loading: false });
      return { ok: false, reason: "offline" };
    }
  },


  logout: () => {
    set({ user: null, token: null });
  },

  // Helper for protected API calls
  fetchWithAuth: async (url, options = {}) => {
    try {
      const token = get().token;

      const res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      set({ apiOnline: true, lastError: null });
      return res.json();
    }
    catch (err) {
      set({ apiOnline: false, lastError: err.message });
      throw err;
    }
  },
}));
