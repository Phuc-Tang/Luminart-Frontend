import { toast } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';
import {
    createCommentArtwork,
    getCommentArtwork,
    deleteCommentArtwork,
    updateCommentArtwork,
    replyCommentArtwork
} from '../api/comments';

export const useArtworkComments = (artID, userID, commentID) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    const [replying, setReplying] = useState(false);
    const [replyError, setReplyError] = useState(null);

    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const updateNestedComments = (comments, commentID, updatedContent) => {
        return comments.map((comment) => {
            if (comment.commentID === commentID) {
                // Nếu tìm thấy comment cần cập nhật
                return {
                    ...comment,
                    content: updatedContent
                };
            }
            // Kiểm tra nếu comment có replies
            if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: updateNestedComments(comment.replies, commentID, updatedContent)
                };
            }
            return comment; // Trả về comment không thay đổi
        });
    };

    const repliesNestedComments = (comments, parentCommentID, newReply) => {
        return comments.map((comment) => {
            if (comment.commentID === parentCommentID) {
                // Nếu comment có replies, kiểm tra nếu replies là mảng, nếu không thì khởi tạo thành mảng rỗng
                const replies = Array.isArray(comment.replies) ? comment.replies : [];
                return {
                    ...comment,
                    replies: [...replies, newReply] // Thêm reply mới vào replies
                };
            }

            // Nếu comment có replies và là mảng, đệ quy để thêm reply
            if (Array.isArray(comment.replies) && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: repliesNestedComments(comment.replies, parentCommentID, newReply) // Đệ quy
                };
            }

            return comment; // Trả về comment không thay đổi nếu không tìm thấy comment cha
        });
    };

    const deleteNestedComments = (comments, commentID) => {
        return comments
            .map((comment) => {
                // Nếu comment chính trùng với commentID, trả về null (để loại bỏ comment này)
                if (comment.commentID === commentID) {
                    return null;
                }

                // Kiểm tra xem comment có replies, nếu có thì đệ quy xóa trong replies
                if (comment.replies && comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: deleteNestedComments(comment.replies, commentID)
                    };
                }

                // Trả về comment không thay đổi nếu không có gì cần thay đổi
                return comment;
            })
            .filter(Boolean); // Loại bỏ các comment bị đánh dấu là null
    };

    // Create a comment
    const createComment = useCallback(
        async (content) => {
            if (!userID || !artID) {
                setCreateError('UserID and ArtID are required.');
                return;
            }
            if (!content.trim()) {
                setCreateError('Content cannot be empty.');
                return;
            }

            setCreating(true);
            setCreateError(null);

            try {
                const response = await createCommentArtwork(userID, artID, content);
                if (response.error) {
                    setCreateError(response.error);
                } else {
                    setComments((prev) => [response.data, ...prev]); // Thêm comment vào danh sách
                    toast.success(response.message, {
                        className: 'custom-toast-success',
                        bodyClassName: 'custom-body-success',
                        progressClassName: 'custom-progress-success'
                    });
                }
            } catch (err) {
                setCreateError(err.message || 'An error occurred while creating a comment.');
            } finally {
                setCreating(false);
            }
        },
        [userID, artID]
    );

    // Fetch comments
    const fetchComments = useCallback(async () => {
        if (!artID) {
            setError('ArtID is required.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getCommentArtwork(artID);
            if (response.error) {
                setError(response.error);
                setComments([]);
            } else {
                setComments(response.data.data || []); // Giả sử comments nằm trong `data.data`
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching comments.');
        } finally {
            setLoading(false);
        }
    }, [artID]);

    // Update a comment
    const updateComment = useCallback(
        async (commentID, content) => {
            if (!userID || !artID) {
                setCreateError('UserID and ArtID are required.');
                return;
            }
            if (!content.trim()) {
                setCreateError('Content cannot be empty.');
                return;
            }

            setCreating(true);
            setCreateError(null);
            try {
                const response = await updateCommentArtwork(commentID, content);
                if (response.error) {
                    setCreateError(response.error);
                } else {
                    // Cập nhật lại nội dung comment trong state bằng hàm đệ quy
                    setComments((prevComments) => updateNestedComments(prevComments, commentID, response.data.content));
                    toast.success(response.message, {
                        className: 'custom-toast-success',
                        bodyClassName: 'custom-body-success',
                        progressClassName: 'custom-progress-success'
                    });
                }
            } catch (error) {
                setCreateError(error.message || 'An error occurred while updating the comment.');
            } finally {
                setCreating(false);
            }
        },
        [userID, artID]
    );

    // Reply to a comment
    const replyComment = useCallback(
        async (parentCommentID, content) => {
            if (!userID || !artID || !parentCommentID) {
                setReplyError('UserID, ArtID, and ParentCommentID are required.');
                return;
            }
            if (!content.trim()) {
                setReplyError('Content cannot be empty.');
                return;
            }

            setReplying(true);
            setReplyError(null);

            try {
                const response = await replyCommentArtwork(parentCommentID, artID, userID, content);
                if (response.error) {
                    setReplyError(response.error);
                } else {
                    // Cập nhật lại state comments với reply mới
                    setComments((prevComments) => {
                        return repliesNestedComments(prevComments, parentCommentID, response.data);
                    });
                    toast.success(response.message, {
                        className: 'custom-toast-success',
                        bodyClassName: 'custom-body-success',
                        progressClassName: 'custom-progress-success'
                    });
                }
            } catch (err) {
                setReplyError(err.message || 'An error occurred while replying to the comment.');
            } finally {
                setReplying(false);
            }
        },
        [userID, artID]
    );

    // Delete a comment
    const deleteComment = useCallback(async (commentID) => {
        setDeleting(true);
        setDeleteError(null);
        try {
            const response = await deleteCommentArtwork(commentID);
            if (response?.error) {
                setDeleteError(response.error);
            } else {
                setComments((prevComments) => {
                    const updatedComments = deleteNestedComments(prevComments, commentID);

                    console.log('Updated comments after delete:', updatedComments); // Log kết quả sau khi xóa
                    return updatedComments;
                });
                toast.success(response.message, {
                    className: 'custom-toast-success',
                    bodyClassName: 'custom-body-success',
                    progressClassName: 'custom-progress-success'
                });
            }
        } catch (err) {
            setDeleteError(err?.response?.data || 'An unknown error occurred');
        } finally {
            setDeleting(false);
        }
    }, []);

    // Fetch comments on mount or artID change
    useEffect(() => {
        fetchComments();
    }, [artID, fetchComments]);

    return {
        comments,
        loading,
        error,
        creating,
        createError,
        replying,
        replyError,
        createComment,
        updateComment,
        replyComment,
        deleting,
        deleteError,
        deleteComment,
        refreshComments: fetchComments // Expose fetch function for manual refresh
    };
};
