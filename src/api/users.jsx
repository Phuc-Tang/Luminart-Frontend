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
        return { error: 'An error occurred while login.' };
    }
};

export const signInGoogle = async () => {
    try {
        const response = await api.get(`/auth/google/callback`);
        return response.data; // Trả về dữ liệu khi đăng nhập thành công
    } catch (error) {
        if (error.response) {
            // Nếu có response từ server
            return { error: error.response.data };
        } else if (error.request) {
            // Nếu không nhận được response
            return { error: 'No response from server.' };
        } else {
            // Nếu có lỗi trong quá trình cấu hình request
            return { error: 'An error occurred while login by Google.' };
        }
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

export const signOut = async () => {
    try {
        const response = await api.get(`/logout`);

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while logout.' };
    }
};

export const getUserInfo = async () => {
    try {
        const response = await api.get(`/auth/profile`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while registering.' };
    }
};

export const getProfile = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/user/profile/${username}`, {});

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while registering.' };
    }
};

export const updateProfile = async (formData) => {
    try {
        const response = api.patch(`/user/update-profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Đặt header cho FormData
            }
        });
        console.log(response);

        return { message: 'Profile updated successfully!' };
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while update profile.' };
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

export const followUser = async (followerID, followingID) => {
    try {
        const response = await api.post(`/user/follow`, {
            followerID,
            followingID
        });

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while follow user.' };
    }
};
