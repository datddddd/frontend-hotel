import api from "./api";

export const userService = {
// Lấy danh sách user có phân trang
getUsers: (page = 1, limit = 6) => {
return api.get(`/users?page=${page}&limit=${limit}`);
},

// Tạo user
createUser: (data) => {
return api.post("/users", data);
},

// Cập nhật user
updateUser: (id, data) => {
return api.put(`/users/${id}`, data);
},

// Xóa mềm
deleteUser: (id) => {
return api.delete(`/users/${id}`);
},

// Xóa cứng
forceDeleteUser: (id) => {
return api.delete(`/users/${id}/force`);
},

// Reset password
resetPassword: (id, newPassword) => {
return api.put(`/users/${id}/reset-password`, {
newPassword
});
}
};
