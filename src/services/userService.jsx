import api from "./api";

export const userService = {
    // Lấy danh sách user có phân trang
    getUsers: (page = 1, limit = 6) => {
        return api.get(`/users?page=${page}&limit=${limit}`);
    },

    // Tạo user (Admin)
    createUser: (data) => {
        return api.post("/users", data);
    },

    // Cập nhật user (Admin)
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

    // Cập nhật mật khẩu
    updatePassword: (id, newPassword) => {
        return api.put(`/users/${id}/reset-password`, {
            newPassword
        });
    },

    // Quên mật khẩu
    forgotPassword: (email) => {
        return api.post("/forgot-password", { email });
    },

    // Đặt lại mật khẩu (Public)
    resetPassword: (data) => {
        return api.post("/reset-password", data);
    },

    // Lấy thông tin cá nhân
    getProfile: () => {
        return api.get("/profile");
    },

    // Cập nhật thông tin cá nhân
    updateProfile: (data) => {
        return api.put("/profile", data);
    },
};

export const authService = {
    register: (data) => api.post("/register", data),
    login: (data) => api.post("/login", data),
};
