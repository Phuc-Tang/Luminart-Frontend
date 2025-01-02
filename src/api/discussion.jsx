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
