import api from "./api";

export const customerService = {
    createCustomer: (customerData) => api.post("/customers", customerData),
    getCustomers: (params) => api.get("/customers", { params }),
    updateCustomer: (id, data) => api.put(`/customers/${id}`, data),
    deleteCustomer: (id) => api.delete(`/customers/${id}`)
};