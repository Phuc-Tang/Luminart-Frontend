import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true // Đảm bảo cookie được gửi cùng với yêu cầu
});

export const createSections = async (sectionData) => {
    try {
        const response = await api.post(`/user/add-sections`, sectionData);

        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        console.error('Error creating section:', error);
        return { error: 'An error occurred while creating the section.' };
    }
};

export const getSections = async (username) => {
    try {
        const response = await api.get(`/user/get-sections/${username}`, {
            params: { username }
        });
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while creating the section.' };
};

export const addArtworkToSection = async (artworkData) => {
    try {
        const response = await api.patch(`/user/add-artwork-spotlight`, artworkData);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
        console.error('Error adding artwork:', error);
        return { error: 'An error occurred while adding the artwork to section.' };
    }
};
