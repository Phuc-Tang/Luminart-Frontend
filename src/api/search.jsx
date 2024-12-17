import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const searchArtwork = async (keyword) => {
    try {
        const response = await api.get(`/artwork/search-artwork`, {
            params: { keyword }
        });

        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while searching artwork.' };
    }
};
