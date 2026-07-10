import { create } from "zustand";
import APIEndpoint from "../router/APIEndpoint";
import { useAuthStore } from './AuthStore';

export const useMenuItemStore = create((set, get) => ({
  menuItems: [],
  selectedItem: null,
  loading: false,
  error: null,

  fetchMenuItems: async () => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/menu`);
      set({ menuItems: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  searchMenuItems: async (query) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(
        `${APIEndpoint}/menu/search?ques=${query}`
      );
      set({ menuItems: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchMenuItemById: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/menu/${id}`);
      set({ selectedItem: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createMenuItem: async (itemData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/menu`, {
        method: "POST",
        body: JSON.stringify(itemData),
      });

      // Add new item to list
      set((state) => ({
        menuItems: [...state.menuItems, data],
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  replaceMenuItem: async (id, itemData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/menu/${id}`, {
        method: "PUT",
        body: JSON.stringify(itemData),
      });

      set((state) => ({
        menuItems: state.menuItems.map((item) =>
          item._id === id ? data : item
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  updateMenuItem: async (id, partialData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/menu/${id}`, {
        method: "PATCH",
        body: JSON.stringify(partialData),
      });

      set((state) => ({
        menuItems: state.menuItems.map((item) =>
          item._id === id ? data : item
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  deleteMenuItem: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      await fetchWithAuth(`${APIEndpoint}/menu/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        menuItems: state.menuItems.filter((item) => item._id !== id),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));