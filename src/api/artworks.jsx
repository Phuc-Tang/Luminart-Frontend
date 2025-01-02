import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const createArtwork = async (formData) => {
    try {
        const response = await api.post(`/artwork/create-new-artwork`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Đặt header cho FormData
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while creating artwork.' };
    }
};

export const updateArtwork = async (formData) => {
    try {
        const response = await api.patch(`/artwork/update-artwork`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Đặt header cho FormData
            }
        });
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while update artwork.' };
};

export const deleteArtwork = async (artID) => {
    try {
        const response = await api.delete(`/artwork/delete-artwork/${artID}`, {
            params: { artID }
        });
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while delete artwork.' };
};

export const getAllArtwork = async () => {
    try {
        const response = await api.get('/artwork/all-artwork');

        return response;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while get all artwork.' };
};

export const getPaginationArtwork = async ({ page, limit, userID }) => {
    try {
        const response = await api.get('/artwork/paginate-artwork', {
            params: { page, limit, userID }
        });

        return response;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
};

export const getDetailArtwork = async (artID) => {
    try {
        const response = await api.get(`/artwork/detai-artwork/${artID}`);
        return response;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while get artwork.' };
};

export const changeStatusArtwork = async (artID, status) => {
    try {
        const response = await api.patch(`/artwork/change-status-artwork/${artID}`, {
            status
        });
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while update status artwork.' };
};

export const likeArtwork = async (contentID) => {
    try {
        const response = await api.post('/like/like-artwork', null, {
            params: { contentID }
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while liking artwork.' };
    }
};

export const unlikeArtwork = async (contentID) => {
    try {
        const response = await api.delete('/like/unlike-artwork', {
            params: { contentID }
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while unliking artwork.' };
    }
};

export const isLikedArtwork = async (contentID) => {
    try {
        const response = await api.get(`/like/is-liked-artwork`, {
            params: { contentID }
        });

        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while checking is like artwork.' };
    }
};

export const getSubjectArtwork = async () => {
    try {
        const response = await api.get(`/artwork/get-artwork-subject`);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while render subjects artwork.' };
};

export const getTagArtwork = async () => {
    try {
        const response = await api.get(`/artwork/get-tag-list`);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while render tags artwork.' };
};

export const getArtworkById = async ({ page, limit, userID }) => {
    try {
        const response = await api.get(`/artwork/all-artwork-of-user/${userID}`, {
            params: { page, limit, userID }
        });

        return response;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
};
