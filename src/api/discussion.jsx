import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const getAllDiscussion = async () => {
    try {
        const response = await api.get(`/discussion/all-discussion`);

        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while get all discussions.' };
    }
};

export const getDiscussionsByTopic = async (topic) => {
    try {
        const response = await api.get(`/discussion/${topic}`);

        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while get discussions by topic.' };
    }
};

export const getDetailDiscussion = async (discussionID) => {
    try {
        const response = await api.get(`/discussion/detail-discussion/${discussionID}`, {
            params: { discussionID }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: 'An error occurred while get Detail discussion' };
    }
};

export const createDiscussion = async (formData) => {
    try {
        const response = await api.post(`/discussion/create-new-discussion`, formData, {
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
        return { error: 'An error occurred while creating discussion.' };
    }
};

export const likeDiscussion = async (contentID) => {
    try {
        const response = await api.post('/like/like-discussion', null, {
            params: { contentID }
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while liking discussion.' };
    }
};

export const unlikeDiscussion = async (contentID) => {
    try {
        const response = await api.delete('/like/unlike-discussion', {
            params: { contentID }
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while unliking discussion.' };
    }
};

export const isLikedDiscussion = async (contentID) => {
    try {
        const response = await api.get(`/like/is-liked-discussion`, {
            params: { contentID }
        });

        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'An error occurred while checking is like discussion.' };
    }
};
