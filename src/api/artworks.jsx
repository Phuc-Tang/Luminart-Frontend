import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const createArtwork = async (userID, title, file, description, link, taglist, subject) => {
    try {
        const response = await api.post(`/artwork/create-new-artwork`, {
            userID,
            title,
            file,
            description,
            link,
            taglist,
            subject
        });
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while create artwork.' };
};

export const updateArtwork = async (userID, artID, title, file, description, link, taglist, subject) => {
    try {
        const response = await api.patch(`/artwork/update-artwork`, {
            userID,
            artID,
            title,
            file,
            description,
            link,
            taglist,
            subject
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
        const response = await api.patch(`/artwork/update-artwork`, {
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

export const getPaginationArtwork = async ({ page, limit }) => {
    try {
        const response = await api.get('/artwork/paginate-artwork', {
            params: { page, limit }
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
        const response = await api.get(`/like/is-liked`, {
            params: { contentID }
        });

        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while checking is like artwork.' };
    }
};
