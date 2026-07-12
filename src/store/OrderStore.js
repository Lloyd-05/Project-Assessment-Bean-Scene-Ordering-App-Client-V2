import { create } from "zustand";
import { useAuthStore } from './AuthStore';
import APIEndpoint from "../router/APIEndpoint";

export const useOrderStore = create((set, get) => ({
  currentOrderItems: [],
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,

  addItemToOrder: (menuItem, quantity) => {
    if (!menuItem || !menuItem._id) {
      console.log("ERROR: menuItem is undefined:", menuItem);
      return;
    }

    console.log("STORE RECEIVED:", menuItem, quantity);

    set((state) => {
      const existing = state.currentOrderItems.find(
        (i) => i.menuItem._id === menuItem._id
      );

      if (existing) {
        return {
          currentOrderItems: state.currentOrderItems.map((i) =>
            i.menuItem._id === menuItem._id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }

      return {
        currentOrderItems: [
          ...state.currentOrderItems,
          { menuItem, quantity },
        ],
      };
    });
  },

  updateItemQuantity: (menuItemId, quantity) => {
    set((state) => ({
      currentOrderItems: state.currentOrderItems.map((i) =>
        i.menuItem._id === menuItemId ? { ...i, quantity } : i
      ),
    }));
  },

  removeItemFromOrder: (menuItemId) => {
    set((state) => ({
      currentOrderItems: state.currentOrderItems.filter(
        (i) => i.menuItem._id !== menuItemId
      ),
    }));
  },

  fetchOrders: async () => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/orders`);

      const ordersArray =
        Array.isArray(data) ? data :
          Array.isArray(data.orders) ? data.orders :
            [];

      set({ orders: ordersArray, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCompletedOrders: async () => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;
    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/orders`);
      const ordersArray = Array.isArray(data) ? data : data.orders || [];

      // Filter only completed orders
      const completed = ordersArray.filter(o => o.status === "completed");
      set({ orders: completed, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },


  searchOrders: async (query) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(
        `${APIEndpoint}/orders/search?query=${query}`
      );
      set({ orders: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchOrderById: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/orders/${id}`);
      set({ selectedOrder: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createOrder: async (orderData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const payload = {
        ...orderData,
        menuItems: get().currentOrderItems.map((i) => ({
          // menuItem: i.menuItem._id,
          menuItemId: i.menuItem._id,
          quantity: i.quantity,
        })),
      };

      console.log("FINAL ORDER PAYLOAD:", payload);

      const data = await fetchWithAuth(`${APIEndpoint}/orders`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // set((state) => ({
      //   orders: [...state.orders, data],
      //   currentOrderItems: [],   // clear cart
      //   loading: false,
      // }));

      if (data && !data.error) {
        set((state) => ({
          orders: [...state.orders, data],
          currentOrderItems: [], // clear only when successful
          loading: false,
        }));
      }
      else {
        set({ loading: false });
      }

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  replaceOrder: async (id, orderData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(orderData),
      });

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id ? data : order
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  updateOrder: async (id, partialData) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      const data = await fetchWithAuth(`${APIEndpoint}/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(partialData),
      });

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id ? data : order
        ),
        loading: false,
      }));

      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  deleteOrder: async (id) => {
    const fetchWithAuth = useAuthStore.getState().fetchWithAuth;

    set({ loading: true, error: null });

    try {
      await fetchWithAuth(`${APIEndpoint}/orders/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        orders: state.orders.filter((order) => order._id !== id),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
