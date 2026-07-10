import { create } from "zustand";
import { useAuthStore } from './AuthStore';
import APIEndpoint from "../router/APIEndpoint";

export const useTableStore = create((set, get) => ({
  tables: [],
  selectedTable: null,
  loading: false,
  error: null,

  fetchTables: async () => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/table`);
      set({ tables: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  searchTables: async (query) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(
        `${APIEndpoint}/table/search?ques=${query}`
      );
      set({ tables: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchTableById: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/table/${id}`);
      set({ selectedTable: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createTable: async (tableData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/table`, {
        method: "POST",
        body: JSON.stringify(tableData),
      });

      set((state) => ({
        tables: [...state.tables, data],
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  replaceTable: async (id, tableData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/table/${id}`, {
        method: "PUT",
        body: JSON.stringify(tableData),
      });

      set((state) => ({
        tables: state.tables.map((table) =>
          table._id === id ? data : table
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  deleteTable: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      await fetchWithAuth(`${APIEndpoint}/table/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        tables: state.tables.filter((table) => table._id !== id),
        loading: false,
      }));
            return true;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
