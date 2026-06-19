import api from "./api";

const getRoomTypes = () => api.get("/room-types");
const getRoomTypesSearch = (keyword) => api.get("/room-types/search", { params: { keyword } });

const getAvailableRooms = (checkIn, checkOut, typeId) =>
    api.get(`/bookings/available-rooms?check_in=${checkIn}&check_out=${checkOut}&room_type_id=${typeId}`);

export const roomService = {
    getRoomTypes,
    getAvailableRooms,
    getRoomTypesSearch,
};