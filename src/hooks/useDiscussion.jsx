import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    createDiscussion,
    getAllDiscussion,
    getDetailDiscussion,
    getDiscussionsByTopic,
    isLikedDiscussion,
    likeDiscussion,
    unlikeDiscussion
} from '../api/discussion';
import { validateDiscussion } from '../utils/validators/discussionValidation';
import { toast } from 'react-toastify';
import { useUser } from './useUserInfo';
import { useNavigate } from 'react-router-dom';
import { useSocket } from './useSocket';
import { unlikeArtwork } from '../api/artworks';

// Tạo Context
const DiscussionContext = createContext();

// Provider Component
export const DiscussionProvider = ({ children }) => {
    const { user } = useUser();

    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [cover, setCover] = useState(null);
    const [selectedCover, setSelectedCover] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [creationErrors, setCreationErrors] = useState(null);

    const [detailDiscussion, setDetailDiscussion] = useState(null);

    const [likeClick, setLikeClick] = useState(false);

    const [discussionForm, setDiscussionForm] = useState({
        userID: user?.user?.userID || '',
        title: '',
        topic: '',
        content: '',
        category: '',
        thumbnail: null
    });

    useEffect(() => {
        if (user?.user?.userID) {
            setDiscussionForm((prev) => ({ ...prev, userID: user.user.userID }));
        }
    }, [user]);

    const fetchAllDiscussions = useCallback(async () => {
        setLoading(true);
        setErrors(null);

        try {
            const response = await getAllDiscussion();
            if (response?.data || Array.isArray(response)) {
                setDiscussions(response.data);
            } else {
                throw new Error('No discussions found');
            }
        } catch (err) {
            console.error('Error fetching discussions:', err.message);
            setErrors(err.message);
            setDiscussions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDetailDiscussion = useCallback(async (discussionID) => {
        setLoading(true);
        setErrors(null);

        try {
            const response = await getDetailDiscussion(discussionID);

            if (response.discussion || Array.isArray(response)) {
                setDetailDiscussion(response.discussion);
            } else {
                throw new Error('No discussion found');
            }
        } catch (error) {
            console.error(error.message);
            setErrors(error.message);
            setDetailDiscussion([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDiscussionsByTopic = useCallback(async (topic) => {
        setLoading(true);
        setErrors(null);

        try {
            const response = await getDiscussionsByTopic(topic);
            if (response?.discussions || Array.isArray(response)) {
                setDiscussions(response.discussions);
            } else {
                throw new Error('No discussions found for this topic');
            }
        } catch (err) {
            console.error('Error fetching discussions:', err.message);
            setErrors(err.message);
            setDiscussions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCoverChange = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newCover = URL.createObjectURL(file);
        setCover(newCover);
        setSelectedCover(newCover);

        setDiscussionForm((prev) => ({
            ...prev,
            thumbnail: file
        }));
    }, []);

    const handleRemoveCover = useCallback(() => {
        if (selectedCover) {
            URL.revokeObjectURL(selectedCover);
            setCover(null);
            setSelectedCover(null);

            setDiscussionForm((prev) => ({
                ...prev,
                thumbnail: null
            }));
        }
    }, [selectedCover]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setDiscussionForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleEditorChange = useCallback((content) => {
        setDiscussionForm((prev) => ({
            ...prev,
            content // Cập nhật nội dung của TinyMCE vào `discussionForm.content`
        }));
    }, []);

    const handleSubmit = useCallback(
        async (e, onClose) => {
            e.preventDefault();
            setIsSubmitting(true);

            const validationErrors = validateDiscussion(
                discussionForm.content,
                discussionForm.title,
                discussionForm.topic,
                discussionForm.category,
                discussionForm.thumbnail
            );

            if (Object.keys(validationErrors).length > 0) {
                setCreationErrors(validationErrors);
                toast.error(Object.values(validationErrors)[0]);
                setIsSubmitting(false);
                return;
            }

            console.log('Content to send:', discussionForm.content);

            setCreationErrors(null);

            try {
                const formData = new FormData();
                Object.entries(discussionForm).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const response = await createDiscussion(formData);
                console.log('custom hook', response.data);

                if (response.success) {
                    toast.success(response.message, {
                        className: 'custom-toast-success',
                        bodyClassName: 'custom-body-success',
                        progressClassName: 'custom-progress-success'
                    });

                    setDiscussionForm({
                        userID: user?.user?.userID || '',
                        title: '',
                        topic: '',
                        content: '',
                        category: '',
                        thumbnail: null
                    });
                    setCover(null);
                    setSelectedCover(null);
                    const newDiscussion = response.data;
                    setDiscussions((prevDiscussions) =>
                        [newDiscussion, ...prevDiscussions].sort(
                            (a, b) => new Date(b.create_time) - new Date(a.create_time)
                        )
                    );
                    if (onClose) onClose();
                } else {
                    throw new Error(response.message || 'Failed to create discussion');
                }
            } catch (err) {
                console.error('Error creating discussion:', err.message);
                toast.error(err.message || 'Something went wrong', {
                    className: 'custom-toast-error',
                    bodyClassName: 'custom-body-error',
                    progressClassName: 'custom-progress-error'
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        [discussionForm, user]
    );

    return (
        <DiscussionContext.Provider
            value={{
                discussions,
                detailDiscussion,
                loading,
                errors,
                discussionForm,
                creationErrors,
                cover,
                selectedCover,
                isSubmitting,
                fetchAllDiscussions,
                fetchDetailDiscussion,
                fetchDiscussionsByTopic,
                handleCoverChange,
                handleRemoveCover,
                handleChange,
                handleEditorChange,
                handleSubmit
            }}
        >
            {children}
        </DiscussionContext.Provider>
    );
};

// Custom Hook to use the Discussion context
export const useDiscussion = () => {
    return useContext(DiscussionContext);
};

export const useLikeDiscussion = (contentID) => {
    const { socket } = useSocket();
    const [likeClick, setLikeClick] = useState(false);
    const [loading, setLoading] = useState(true);
    const [likeError, setLikeError] = useState(null);

    // Kiểm tra trạng thái "đã like" ban đầu từ API
    useEffect(() => {
        const fetchInitialLikeStatus = async () => {
            if (!contentID) {
                setLikeError('ContentID is required.');
                setLoading(false);
                return;
            }

            try {
                const response = await isLikedDiscussion(contentID);
                if (response?.success) {
                    setLikeClick(response.isLiked); // Gán trạng thái ban đầu
                } else {
                    setLikeError(response?.message || 'Failed to fetch like status.');
                }
            } catch (err) {
                setLikeError(err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialLikeStatus();
    }, [contentID]);

    // Toggle trạng thái like/unlike
    const toggleLike = async (userID) => {
        if (!contentID) {
            setLikeError('ContentID is required.');
            return;
        }

        setLikeError(null);

        try {
            setLoading(true);
            if (likeClick) {
                // Nếu đã like -> Unlike
                const response = await unlikeDiscussion(contentID);
                if (response?.error) {
                    setLikeError(response.error);
                } else {
                    setLikeClick(false); // Cập nhật trạng thái thành chưa like
                }
            } else {
                // // Nếu chưa like -> Like
                const response = await likeDiscussion(contentID);

                if (response?.error) {
                    setLikeError(response.error);
                } else {
                    setLikeClick(true); // Cập nhật trạng thái thành đã like
                }

                socket.emit('sendNotification', {
                    targetUserID: userID,
                    contentID: contentID,
                    type: 'like-discussion',
                    link_url: `/discussion/${contentID}`
                });
            }
        } catch (err) {
            setLikeError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return { likeClick, toggleLike, likeError, loading };
};
