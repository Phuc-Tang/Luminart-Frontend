import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true // Đảm bảo cookie được gửi cùng với yêu cầu
});

export const signIn = async (email, password) => {
    try {
        const response = await api.post(`/auth/login`, {
            email,
            password
        });

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while registering.' };
    }
};

export const signUp = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            email,
            password
        });

        console.log('response', response);

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while registering.' };
    }
};

export const getUserInfo = async () => {
    try {
        const response = await api.get(`/auth/profile`);

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while registering.' };
    }
};

// lấy của người khác (để sau)
export const getProfile = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/user/profile/${id}`, {});

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while registering.' };
    }
};

export const verifyEmail = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/auth/verify-email?token=${token}`, {
            token
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.message };
        }
        return { error };
    }
};
