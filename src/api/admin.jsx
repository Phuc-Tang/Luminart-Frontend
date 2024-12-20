import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true // Đảm bảo cookie được gửi cùng với yêu cầu
});

export const getAllUser = async () => {
    try {
        const response = await api.get(`/admin/get-all-user`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while get all users.' };
    }
};
