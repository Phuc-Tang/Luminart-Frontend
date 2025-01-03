import classNames from 'classnames/bind';
import styles from '../../styles/pages/Discussions/Detail.module.scss';
import { useParams } from 'react-router-dom';

//library
import { Slide, ToastContainer } from 'react-toastify';

//custom hook
import { useDiscussion, useLikeDiscussion } from '../../hooks/useDiscussion';
import { useEffect, useRef, useState } from 'react';
import { useDiscussionComments } from '../../hooks/useComment';

//icons
import { MdFavoriteBorder, MdFavorite, MdFullscreen, MdDelete, MdEdit, MdCancel } from 'react-icons/md';
import { BiSolidComment, BiComment } from 'react-icons/bi';
import { IoMdDownload, IoMdSend } from 'react-icons/io';
import { BsThreeDotsVertical, BsThreeDots } from 'react-icons/bs';

//untils
import { formatDate } from '../../utils/string/stringUtils';
import { useUser } from '../../hooks/useUserInfo';

const cx = classNames.bind(styles);
const HOSTING_URL = import.meta.env.VITE_HOSTING_URL;

function DetailDiscussion() {
    const { user } = useUser();
    const userID = user?.user?.userID;
    const inputRef = useRef(null);
    const [activeCmtOption, setActiveCmtOption] = useState(null);
    const [activeDelCmt, setActiveDelCmt] = useState(null);
    const [activeRepCmt, setActiveRepCmt] = useState(null);
    const [editCmtOption, setEditCmtOption] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [replyComments, setReplyComments] = useState('');
    const [delDiscussionDetail, setDelDiscussionDetail] = useState(null);
    const { discussionID } = useParams();
    const { detailDiscussion, loading, errors, fetchDetailDiscussion } = useDiscussion();
    const { likeClick, toggleLike, likeError } = useLikeDiscussion(discussionID);
    const TargetUserIDOfDiscussion = detailDiscussion?.user?.userID;
    const { comments, createComment, deleteComment, updateComment, replyComment, refreshComments } =
        useDiscussionComments(discussionID, userID, TargetUserIDOfDiscussion);

    useEffect(() => {
        fetchDetailDiscussion(discussionID);
    }, [fetchDetailDiscussion]);

    const sendNotifications = () => {
        toggleLike(TargetUserIDOfDiscussion);
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            alert('Comment cannot be empty.');
            return;
        }
        createComment(newComment);
        setNewComment('');

        const textField = document.getElementById('userTextField'); // Lấy bằng id
        textField.focus();
        if (textField) {
            textField.textContent = ''; // Xóa nội dung
        }
    };

    const handleReplySubmit = (e, parentCommentID) => {
        e.preventDefault();
        if (!replyComments.trim()) {
            alert('Comment cannot be empty.');
            return;
        }
        replyComment(parentCommentID, replyComments);
        setReplyComments('');

        const textField = document.getElementById('userTextFieldReply'); // Lấy bằng id
        textField.focus();
        if (textField) {
            textField.textContent = ''; // Xóa nội dung
        }
    };

    const handleEditSubmit = (e, commentID) => {
        e.preventDefault();
        updateComment(commentID, editComment); // Gọi API để cập nhật bình luận
        setEditCmtOption(null); // Đóng chế độ chỉnh sửa
        setEditComment(''); // Xóa nội dung tạm thời

        const textField = document.getElementById('userTextField'); // Lấy bằng id
        if (textField) {
            textField.textContent = ''; // Xóa nội dung
        }
    };

    const handleCloseModal = () => {
        setActiveDelCmt(null);
        setActiveCmtOption(null);
        setActiveRepCmt(null);
        setDelDiscussionDetail(null);
    };

    const renderComments = (comments, depth = 0) => {
        return (
            comments &&
            comments.map((cmt) => {
                const handleThreeDotsClick = (commentID) => {
                    setActiveCmtOption(commentID === activeCmtOption ? null : cmt.commentID); // Toggle active state
                };

                const handleDelComment = (commentID) => {
                    setActiveDelCmt(commentID === activeDelCmt ? null : cmt.commentID);
                };

                const handleRepComment = (commentID) => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                    setActiveRepCmt(commentID === activeRepCmt ? null : cmt.commentID);
                };

                const handleEditComment = (commentID, currentContent) => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                    setEditCmtOption(commentID === editCmtOption ? null : commentID);
                    setEditComment(currentContent || ''); // Khi mở chế độ chỉnh sửa, set nội dung comment hiện tại vào editComment
                };
                return (
                    <div className={cx('handle-comment')} key={cmt.commentID}>
                        <div
                            className={cx('three-dot-option', {
                                active: activeCmtOption === cmt.commentID
                            })}
                        >
                            <div
                                className={cx('edit-comment')}
                                onClick={() => handleEditComment(cmt.commentID, cmt.content)}
                            >
                                {editCmtOption === cmt.commentID ? (
                                    <div className={cx('cancel-btn')} onClick={handleCloseModal}>
                                        <MdCancel />
                                        <p>Cancel</p>
                                    </div>
                                ) : (
                                    <div className={cx('edit-btn')}>
                                        <MdEdit />
                                        <p>Edit</p>
                                    </div>
                                )}
                            </div>
                            <div className={cx('del-comment')} onClick={() => handleDelComment(cmt.commentID)}>
                                <MdDelete />
                                <p>Delete</p>
                            </div>
                        </div>
                        <div
                            className={cx('del-modal', {
                                active: activeDelCmt === cmt.commentID
                            })}
                        >
                            <div className={cx('frame-modal')}>
                                <div className={cx('frame-tag-modal')}>
                                    <div className={cx('tag-confirm-modal')}></div>
                                </div>
                                <div className={cx('confirm-modal')}>
                                    <p className={cx('confirm-user')}>
                                        Hey, <span>{cmt.fullName}</span>
                                    </p>
                                    <p className={cx('confirm-text')}>
                                        🚫 Are you sure you want to delete this comment? 🚫
                                    </p>
                                    <div className={cx('confirm-del')}>
                                        <button className={cx('yes-btn')} onClick={() => deleteComment(cmt.commentID)}>
                                            <span>Yes</span>
                                        </button>
                                        <button className={cx('no-btn')} onClick={handleCloseModal}>
                                            <span>No</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('list-comment')}>
                            <a href={`${HOSTING_URL}profile/${cmt && cmt.username}`}>
                                <div className={cx('user-avatar')}>
                                    <img src={cmt && cmt.avatarUser} alt="avatar" />
                                </div>
                            </a>
                            <div className={cx('frame-comment')}>
                                <div className={cx('comment-form')}>
                                    <div className={cx('create-cmt')}>
                                        <div className={cx('name-time')}>
                                            <a href={`${HOSTING_URL}profile/${cmt && cmt.username}`}>
                                                <p className={cx('full-name')}>{cmt.fullName}</p>
                                            </a>
                                            {detailDiscussion && cmt && detailDiscussion.user.userID === cmt.userID ? (
                                                <div className={cx('tag-author')}>
                                                    <p>author</p>
                                                </div>
                                            ) : null}

                                            <p className={cx('cmt-time')}>{cmt.created_time}</p>
                                        </div>
                                        {user && cmt && user?.user?.userID !== cmt?.userID ? null : (
                                            <div
                                                className={cx('three-dot')}
                                                onClick={() => handleThreeDotsClick(cmt.commentID)}
                                            >
                                                <BsThreeDots />
                                            </div>
                                        )}
                                    </div>

                                    {editCmtOption === cmt.commentID ? (
                                        <form onSubmit={(e) => handleEditSubmit(e, cmt.commentID)}>
                                            <div
                                                aria-label="Edit comment"
                                                role="textbox"
                                                spellCheck="false"
                                                contentEditable="true"
                                                suppressContentEditableWarning={true}
                                                ref={(el) => {
                                                    if (el && !el.textContent) {
                                                        el.textContent = editComment; // Chỉ thiết lập nội dung ban đầu
                                                    }
                                                    // Gán inputRef cho thẻ div
                                                }}
                                                className={cx('user-textfield')}
                                                onInput={(e) => setEditComment(e.target.textContent)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleEditSubmit(e, cmt.commentID);
                                                        handleCloseModal();
                                                    }
                                                }}
                                            />
                                            <div className={cx('choose')}>
                                                <div></div>
                                                <button
                                                    className={cx('submit-button')}
                                                    type="submit"
                                                    onClick={handleCloseModal}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className={cx('user-textfield')}>{cmt.content}</div>
                                    )}
                                </div>
                                <div className={cx('comment-interaction')}>
                                    <div className={cx('like-btn')}>
                                        <MdFavoriteBorder />
                                    </div>
                                    <div className={cx('reply-btn')} onClick={() => handleRepComment(cmt.commentID)}>
                                        <BiSolidComment />
                                        <p>Reply</p>
                                    </div>
                                </div>
                                <div
                                    className={cx('user-comment', 'reply-comment', {
                                        active: activeRepCmt === cmt.commentID
                                    })}
                                >
                                    <a href={`${HOSTING_URL}profile/${user && user?.user?.username}`}>
                                        <div className={cx('user-avatar')}>
                                            <img src={user && user?.user?.profile?.avatar} alt="avatar" />
                                        </div>
                                    </a>
                                    <form
                                        className={cx('comment-form')}
                                        onSubmit={(e) => handleReplySubmit(e, cmt.commentID)}
                                    >
                                        <div
                                            id="userTextFieldReply"
                                            className={cx('user-textfield')}
                                            contentEditable="true"
                                            ref={inputRef}
                                            tabIndex={-1}
                                            onInput={(e) => setReplyComments(e.target.textContent)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleReplySubmit(e, cmt.commentID);
                                                    handleCloseModal();
                                                }
                                            }}
                                        ></div>
                                        <div className={cx('choose')}>
                                            <div></div>
                                            <button type="submit" className={cx('submit-button')}>
                                                <IoMdSend />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {cmt.replies && cmt.replies.length > 0 && depth < 2 && (
                            <div className={cx('replies-0')}>{renderComments(cmt.replies, depth + 2)}</div>
                        )}
                        {cmt.replies && cmt.replies.length > 0 && depth == 2 && (
                            <div className={cx('replies-1')}>{renderComments(cmt.replies, depth + 2)}</div>
                        )}
                        {cmt.replies && cmt.replies.length > 0 && depth > 2 && (
                            <div className={cx('replies-2')}>{renderComments(cmt.replies, 3)}</div>
                        )}
                    </div>
                );
            })
        );
    };

    return (
        <div className={cx('detail-frame')}>
            <div className={cx('detail-grid')}>
                <div></div>
                <div className={cx('detail-discussion')}>
                    <div className={cx('detail-header')}>
                        <a href="#">
                            <div className={cx('detail-user')}>
                                <div className={cx('avatar')}>
                                    <img src={detailDiscussion?.user?.avatar} alt="avatar" />
                                </div>
                                <div className={cx('detail-info')}>
                                    <div className={cx('fullname')}>{detailDiscussion?.user?.fullName}</div>
                                    <div className={cx('create_time')}>
                                        {formatDate(detailDiscussion?.metadata?.create_time)} - Today
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div className={cx('detail-discussion-content')}>
                            <p className={cx('detail-title')}>{detailDiscussion?.title}</p>
                            <div className={cx('detail-content')}>
                                <div
                                    className={cx('detail-content')}
                                    dangerouslySetInnerHTML={{ __html: detailDiscussion?.content }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('handle-discussion')}>
                        <div className={cx('option-discussion')}>
                            {!user?.user?.userID ? (
                                <div className={cx('favorite')}>
                                    <a href={`${HOSTING_URL}/signin`}>
                                        <div className={cx('no')}>
                                            <MdFavoriteBorder />
                                            <p>Add to favorites</p>
                                        </div>
                                    </a>
                                </div>
                            ) : (
                                <div className={cx('favorite')} onClick={sendNotifications}>
                                    {likeClick ? (
                                        <div className={cx('yes')}>
                                            <MdFavorite />
                                            <p>Favorited</p>
                                        </div>
                                    ) : (
                                        <div className={cx('no')}>
                                            <MdFavoriteBorder />
                                            <p>Add to favorites</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    const target = document.getElementById('target');
                                    if (target) {
                                        target.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                <div className={cx('comment')}>
                                    <BiComment />
                                    <p>Add to comments</p>
                                </div>
                            </a>
                            <div className={cx('option-comments')}></div>
                        </div>
                        <div className={cx('detail-comments')} id="target">
                            <div className={cx('comments')}>
                                <p>All comments</p>
                                {user && user?.user?.userID ? (
                                    <div className={cx('user-comment')}>
                                        <a href={`${HOSTING_URL}/profile/${user && user.user.username}`}>
                                            <div className={cx('user-avatar')}>
                                                <img src={user && user.user.profile.avatar} alt="avatar" />
                                            </div>
                                        </a>
                                        <form
                                            className={cx('comment-form', 'textbox-comment')}
                                            onSubmit={handleCreateSubmit}
                                        >
                                            <div
                                                id="userTextField"
                                                className={cx('user-textfield')}
                                                contentEditable="true"
                                                ref={inputRef}
                                                onInput={(e) => setNewComment(e.target.textContent)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        // Nếu nhấn Enter mà không giữ Shift
                                                        e.preventDefault(); // Ngăn xuống dòng
                                                        handleCreateSubmit(e); // Gửi form
                                                    }
                                                }} // Lấy nội dung từ contentEditable
                                            ></div>
                                            <div className={cx('choose')}>
                                                <div></div>
                                                <button type="submit" className={cx('submit-button')}>
                                                    <IoMdSend />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <div className={cx('check-login')}>
                                        <p>Please sign in to comment</p>
                                    </div>
                                )}

                                <div className={cx('comments-container')}>{comments && renderComments(comments)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <ToastContainer
                toastClassName={cx('custom-toast')}
                bodyClassName={cx('custom-body')}
                progressClassName={cx('custom-progress')}
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </div>
    );
}

export default DetailDiscussion;
