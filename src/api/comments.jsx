import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const createCommentArtwork = async (userID, artID, content) => {
    try {
        const response = await api.post(`/comment/art/new-comment`, {
            userID,
            artID,
            content
        });
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while comments of artwork.' };
};

export const getCommentArtwork = async (artID) => {
    try {
        const response = await api.get(`/comment/art/all-comment/${artID}`);
        return response;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while get all comments of artwork.' };
};

export const updateCommentArtwork = async (commentID, content) => {
    try {
        const response = await api.patch(`/comment/art/update-comment/`, {
            commentID,
            content
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while update comments of artwork.' };
};

export const replyCommentArtwork = async (parentCommentID, artID, userID, content) => {
    try {
        const response = await api.post(`/comment/art/${parentCommentID}/reply-comment`, {
            userID,
            artID,
            content
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while reply comment of artwork.' };
};

export const deleteCommentArtwork = async (commentID) => {
    try {
        const response = await api.delete(`/comment/art/delete-comment/${commentID}`);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while delete comment of artwork.' };
};

export const createCommentDiscussion = async (userID, discussionID, content) => {
    try {
        const response = await api.post(`/comment/discussion/new-comment`, {
            userID,
            discussionID,
            content
        });
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while comments of discussion.' };
};

export const getCommentDiscussion = async (discussionID) => {
    try {
        const response = await api.get(`/comment/discussion/all-comment/${discussionID}`);
        return response;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while get all comments of discussion.' };
};

export const updateCommentDiscussion = async (commentID, content) => {
    try {
        const response = await api.patch(`/comment/discussion/update-comment/`, {
            commentID,
            content
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while update comments of discussion.' };
};

export const replyCommentDiscussion = async (parentCommentID, discussionID, userID, content) => {
    try {
        const response = await api.post(`/comment/discussion/${parentCommentID}/reply-comment`, {
            userID,
            discussionID,
            content
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while reply comment of discussion.' };
};

export const deleteCommentDiscussion = async (commentID) => {
    try {
        const response = await api.delete(`/comment/discussion/delete-comment/${commentID}`);
        return response.data;
    } catch (error) {
        if (error) {
            return { error: error.response.data };
        }
    }
    return { error: 'An error occurred while delete comment of discussion.' };
};
