import { create } from "zustand";
import { useAuthStore } from './AuthStore';
import APIEndpoint from "../router/APIEndpoint";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/category`);
      set({ categories: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  searchCategories: async (query) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(
        `${APIEndpoint}/category/search?ques=${query}`
      );
      set({ categories: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCategoryById: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/category/${id}`);
      set({ selectedCategory: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createCategory: async (categoryData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/category`, {
        method: "POST",
        body: JSON.stringify(categoryData),
      });

      set((state) => ({
        categories: [...state.categories, data],
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  replaceCategory: async (id, categoryData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/category/${id}`, {
        method: "PUT",
        body: JSON.stringify(categoryData),
      });

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? data : cat
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  deleteCategory: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      await fetchWithAuth(`${APIEndpoint}/category/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
        loading: false,
      }));
       return true;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
