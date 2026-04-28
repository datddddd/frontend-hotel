import api from "./api";

export const roomService = {
    getRoomTypes: () => api.get("/room-types"),
    getAvailableRooms: (checkIn, checkOut, typeId) =>
        api.get(`/bookings/available-rooms?check_in=${checkIn}&check_out=${checkOut}&room_type_id=${typeId}`),
};

const createBooking = (bookingData) => api.post("/bookings", bookingData);

const getBookings = (config) => api.get("/bookings", config);

const updateStatus = (id, data) => api.put(`/bookings/${id}/status`, data);

const payFull = (id, data) => api.post(`/bookings/${id}/pay-full`, data);

const deleteBooking = (id) => api.delete(`/bookings/${id}`);

export const bookingService = {
    createBooking,
    getBookings,
    updateStatus,
    payFull,
    deleteBooking,
};