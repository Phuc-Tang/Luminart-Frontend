import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import styles from '../../styles/pages/Artwork.module.scss';
import { useDetailArtwork } from '../../hooks/useArtwork';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/string/stringUtils';
import { MdFavoriteBorder, MdFavorite, MdFullscreen, MdDelete, MdEdit, MdCancel } from 'react-icons/md';
import { BiSolidComment, BiComment } from 'react-icons/bi';
import { BsThreeDotsVertical, BsThreeDots } from 'react-icons/bs';
import { IoMdDownload, IoMdSend } from 'react-icons/io';
import { useUser } from '../../hooks/useUserInfo';
import { useLikeArtwork } from '../../hooks/useArtwork';
import { useArtworkComments } from '../../hooks/useComment';
import { handleFullScreen } from '../../utils/fullscreen/fullscreen';

const cx = classNames.bind(styles);
const HOSTING_URL = import.meta.env.VITE_HOSTING_URL;

function DetailArtwork() {
    const { enterFullscreen, exitFullscreen, elementRef } = handleFullScreen();
    const [activeCmtOption, setActiveCmtOption] = useState(null);
    const [activeDelCmt, setActiveDelCmt] = useState(null);
    const [activeRepCmt, setActiveRepCmt] = useState(null);
    const [editCmtOption, setEditCmtOption] = useState(null);
    const { artID } = useParams();
    const { user } = useUser();
    const { artwork, loading, errors } = useDetailArtwork(artID);
    const userID = user && user.user.userID;
    const contentID = artwork && artwork.artID;
    const { likeClick, toggleLike, likeError } = useLikeArtwork(contentID);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [replyComments, setReplyComments] = useState('');
    const { comments, createComment, deleteComment, updateComment, replyComment, refreshComments } = useArtworkComments(
        artID,
        userID
    );

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            alert('Comment cannot be empty.');
            return;
        }
        createComment(newComment);
        setNewComment('');

        const textField = document.getElementById('userTextField'); // Lấy bằng id
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
        if (textField) {
            textField.textContent = ''; // Xóa nội dung
        }
    };

    console.log('reply ', replyComments);

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

    const renderComments = (comments) => {
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
                    setActiveRepCmt(commentID === activeRepCmt ? null : cmt.commentID);
                };

                const handleCloseModal = () => {
                    setActiveDelCmt(null);
                    setActiveCmtOption(null);
                    setActiveRepCmt(null);
                };

                const handleEditComment = (commentID, currentContent) => {
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
                            <p className={cx('confirm-text')}>Are you sure you want to delete this comment?</p>
                            <div className={cx('confirm-del')}>
                                <button className={cx('yes-btn')} onClick={() => deleteComment(cmt.commentID)}>
                                    <span>Yes</span>
                                </button>
                                <button className={cx('no-btn')} onClick={handleCloseModal}>
                                    <span>No</span>
                                </button>
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
                                            {artwork && cmt && artwork.user.userID === cmt.userID ? (
                                                <div className={cx('tag-author')}>
                                                    <p>author</p>
                                                </div>
                                            ) : null}

                                            <p className={cx('cmt-time')}>{cmt.created_time}</p>
                                        </div>
                                        {user && cmt && user.user.userID !== cmt.userID ? null : (
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
                                    <a href={`${HOSTING_URL}profile/${user && user.user.username}`}>
                                        <div className={cx('user-avatar')}>
                                            <img src={user && user.user.profile.avatar} alt="avatar" />
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
                        {cmt.replies && cmt.replies.length > 0 && (
                            <div className={cx('replies')}>{renderComments(cmt.replies)}</div>
                        )}
                    </div>
                );
            })
        );
    };

    return (
        <div className={cx('frame')}>
            <div className={cx('detail-left')}>
                <div className={cx('detail-artwork')} ref={elementRef}>
                    <div className={cx('artwork')}>
                        {loading ? null : <img src={artwork && artwork.art} alt={artwork && artwork.title} />}
                    </div>
                </div>
                <div className={cx('detail-favorite')}>
                    <div className={cx('options')}>
                        <div className={cx('option-1')}>
                            <div className={cx('favorite')} onClick={toggleLike}>
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
                            <div className={cx('comment')}>
                                <BiComment />
                                <p>Add to comments</p>
                            </div>
                        </div>
                        <div className={cx('option-2')}>
                            <div className={cx('download')}>
                                <IoMdDownload />
                            </div>
                            <div className={cx('fullscreen')} onClick={enterFullscreen}>
                                <MdFullscreen />
                            </div>
                            <div className={cx('other')}>
                                <BsThreeDotsVertical />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('detail-author')}>
                    <div className={cx('interact')}>
                        <div className={cx('author')}>
                            <div className={cx('info')}>
                                {loading ? null : (
                                    <a href={`${HOSTING_URL}profile/${artwork && artwork.user.username}`}>
                                        <div className={cx('avatar')}>
                                            <img src={artwork && artwork.user.avatar} alt="avatar" />
                                        </div>
                                    </a>
                                )}

                                <div className={cx('title-user')}>
                                    <div className={cx('title')}>
                                        <p>{loading ? null : artwork && artwork.title}</p>
                                    </div>
                                    <div className={cx('user')}>
                                        {loading ? null : (
                                            <a href={`${HOSTING_URL}profile/${artwork && artwork.user.username}`}>
                                                <p>
                                                    by <span>{artwork && artwork.user.username}</span>
                                                </p>
                                            </a>
                                        )}

                                        {artwork && user && artwork.user.userID !== user.user.userID ? (
                                            <div className={cx('follow-btn')}>
                                                <p>Follow</p>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('status')}>
                                <div className={cx('create')}>
                                    <p>
                                        Create:{' '}
                                        {artwork && artwork.metadata.create_time
                                            ? formatDate(artwork.metadata.create_time)
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div className={cx('update')}>
                                    <p>
                                        Update:{' '}
                                        {artwork && artwork.metadata.update_time
                                            ? formatDate(artwork.metadata.update_time)
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn')}>
                            <div className={cx('btn-interact')}>
                                {artwork && artwork.like_count === 0 ? (
                                    <div className={cx('favorites-count')}>
                                        <MdFavorite />
                                        <p>0 Favorites</p>
                                    </div>
                                ) : (
                                    <div className={cx('favorites-count')}>
                                        <MdFavorite />
                                        <p>{artwork && artwork.like_count} Favorites</p>
                                    </div>
                                )}
                                {artwork && artwork.comment_count === 0 ? (
                                    <div className={cx('comment-count')}>
                                        <BiSolidComment />
                                        <p>0 Comments</p>
                                    </div>
                                ) : (
                                    <div className={cx('comment-count')}>
                                        <BiSolidComment />
                                        <p>{artwork && artwork.comment_count} Comments</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('detail-desc')}>
                    <div className={cx('desc')}>{artwork && artwork.description}</div>
                </div>
                <div className={cx('detail-comments')}>
                    <div className={cx('comments')}>
                        <p>All comments</p>
                        <div className={cx('user-comment')}>
                            <a href={`${HOSTING_URL}profile/${user && user.user.username}`}>
                                <div className={cx('user-avatar')}>
                                    <img src={user && user.user.profile.avatar} alt="avatar" />
                                </div>
                            </a>
                            <form className={cx('comment-form', 'textbox-comment')} onSubmit={handleCreateSubmit}>
                                <div
                                    id="userTextField"
                                    className={cx('user-textfield')}
                                    contentEditable="true"
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

                        <div className={cx('comments-container')}>{comments && renderComments(comments)}</div>
                    </div>
                </div>
            </div>
            <div className={cx('detail-right')}></div>
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

export default DetailArtwork;
