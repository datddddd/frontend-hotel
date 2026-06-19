import api from "./api";


const createBooking = (bookingData) => api.post("/bookings", bookingData);

const getBookings = (config) => api.get("/bookings", config);

const getMyBookings = (config) => api.get("/bookings/my-bookings", config);

const updateStatus = (id, data) => api.put(`/bookings/${id}/status`, data);

const payFull = (id, data) => api.post(`/bookings/${id}/pay-full`, data);

const deleteBooking = (id) => api.delete(`/bookings/${id}`);

export const bookingService = {
    createBooking,
    getBookings,
    getMyBookings,
    updateStatus,
    payFull,
    deleteBooking,
};