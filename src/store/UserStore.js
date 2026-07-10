import { create } from "zustand";
import { useAuthStore } from './AuthStore';
import APIEndpoint from "../router/APIEndpoint";

export const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  fetchUsers: async () => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/user`);
      set({ users: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  searchUsers: async (query) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(
        `${APIEndpoint}/user/search?ques=${query}`
      );
      set({ users: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchUserById: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/user/${id}`);
      set({ selectedUser: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createUser: async (userData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/user`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      set((state) => ({
        users: [...state.users, data],
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  replaceUser: async (id, userData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? data : user
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  updateUser: async (id, partialData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify(partialData),
      });

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? data : user
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  deleteUser: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      await fetchWithAuth(`${APIEndpoint}/user/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
