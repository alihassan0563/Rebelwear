// Admin API Helper for REBELWEAR

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:3001/api";
    }
  }
  return "https://rebelwear.onrender.com/api";
};

const getAuthToken = () => {
  return localStorage.getItem("rw_admin_token") || "";
};

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("rw_admin_token", token);
  } else {
    localStorage.removeItem("rw_admin_token");
  }
};

const adminFetch = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const token = getAuthToken();

  const headers = {
    ...(options.headers || {}),
  };

  // Add auth token if present
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Do not set Content-Type for FormData (multipart)
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: "Network error or invalid server response",
  }));

  if (response.status === 401) {
    // Session expired or invalid
    setAuthToken("");
  }

  return { ok: response.ok, status: response.status, data };
};

export const adminApi = {
  getApiBaseUrl,
  getAuthToken,
  setAuthToken,

  // Auth
  async login(password) {
    const res = await adminFetch("/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res.data;
  },

  async verify() {
    const res = await adminFetch("/admin/verify");
    return res.data;
  },

  logout() {
    setAuthToken("");
  },

  // Stats
  async getStats() {
    const res = await adminFetch("/admin/stats");
    return res.data;
  },

  async getDbStatus() {
    const res = await adminFetch("/admin/db-status");
    return res.data;
  },

  // Orders
  async getOrders(params = {}) {
    const query = new URLSearchParams();
    if (params.status && params.status !== "all") query.append("status", params.status);
    if (params.search) query.append("search", params.search);
    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await adminFetch(`/admin/orders${qs}`);
    return res.data;
  },

  async updateOrderStatus(id, statusData) {
    const res = await adminFetch(`/admin/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(statusData),
    });
    return res.data;
  },

  async deleteOrder(id) {
    const res = await adminFetch(`/admin/orders/${id}`, {
      method: "DELETE",
    });
    return res.data;
  },

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== "all") query.append("category", params.category);
    if (params.status && params.status !== "all") query.append("status", params.status);
    if (params.search) query.append("search", params.search);
    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await adminFetch(`/admin/products${qs}`);
    return res.data;
  },

  async createProduct(productData) {
    const res = await adminFetch("/admin/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return res.data;
  },

  async updateProduct(id, productData) {
    const res = await adminFetch(`/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
    return res.data;
  },

  async updateProductStatus(id, status) {
    const res = await adminFetch(`/admin/products/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  async deleteProduct(id) {
    const res = await adminFetch(`/admin/products/${id}`, {
      method: "DELETE",
    });
    return res.data;
  },

  // Categories
  async getCategories() {
    const res = await adminFetch("/admin/categories");
    return res.data;
  },

  async createCategory(categoryData) {
    const res = await adminFetch("/admin/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
    return res.data;
  },

  async updateCategory(id, categoryData) {
    const res = await adminFetch(`/admin/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
    return res.data;
  },

  async updateCategoryStatus(id, status) {
    const res = await adminFetch(`/admin/categories/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  async deleteCategory(id) {
    const res = await adminFetch(`/admin/categories/${id}`, {
      method: "DELETE",
    });
    return res.data;
  },

  // Image Upload to Cloudinary
  async uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    const res = await adminFetch("/admin/upload", {
      method: "POST",
      body: formData,
    });
    return res.data;
  },
};
