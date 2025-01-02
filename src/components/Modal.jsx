import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

//library
import { motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../styles/components/Modal.module.scss';

//custom hook
import { useUser } from '../hooks/useUserInfo';
import { useArtworkById } from '../hooks/useArtwork';
import { useSectionContext } from '../hooks/useSection';
import { useDiscussion } from '../hooks/useDiscussion';

//icon
import { FaImages } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';

//until
import { formatDate } from '../utils/string/stringUtils';

const cx = classNames.bind(styles);

export const PositionModal = ({ className }) => {
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Kiểm tra nếu position là null
    useEffect(() => {
        if (user && user?.user?.profile?.position === null) {
            setShowModal(true); // Render modal
            const timeout = setTimeout(() => setIsVisible(true), 500);

            return () => clearTimeout(timeout); // Dọn dẹp timeout
        }
    }, [user]);

    const handleAgree = () => {
        setShowModal(false);
        navigate(`/profile/update`);
    };

    const handleReject = () => {
        setShowModal(false);
        navigate(`/`);
    };

    return (
        <>
            {showModal && (
                <div className={className}>
                    <div className={cx('modal', { active: isVisible })}>
                        <div className={cx('card-modal')}>
                            <div className={cx('tag-modal')}></div>
                            <div className={cx('border-modal')}>
                                <p className={cx('user-modal')}>
                                    ✨ Hello <span>{user?.user?.profile?.fullName}</span> ✨
                                </p>
                                <p className={cx('content-modal')}>
                                    Please update the information in your profile before you can share your artwork.
                                </p>
                                <button className={cx('yes-modal')} onClick={handleAgree}>
                                    Yes
                                </button>
                                <button className={cx('no-modal')} onClick={handleReject}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const GalleryModal = ({ className, isGallery, setGallery, sectionID, userID }) => {
    const { artworks, artLoading, errors, hasMore, loadMore } = useArtworkById();
    const { sectionLoading, sectionError, handleAddArtworkToSection } = useSectionContext();

    //State
    const [showModal, setShowModal] = useState(false);
    const [isSelect, setSelect] = useState(null);

    const handleClose = () => {
        setGallery(false);
    };
    useEffect(() => {
        setShowModal(isGallery);

        if (isGallery) {
            // Thêm lớp no-scroll khi mở modal
            document.body.classList.add('no-scroll');
        } else {
            // Gỡ lớp no-scroll khi đóng modal
            document.body.classList.remove('no-scroll');
        }

        // Cleanup khi component bị unmount
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isGallery]);

    return (
        showModal && (
            <div className={className}>
                <div className={cx('gallery-modal')}>
                    <div className={cx('gallery')}>
                        <div className={cx('gallery-left')}>
                            <div className={cx('h2')}>Your Gallery</div>
                            <div className={cx('fields')}>
                                <label>Title</label>
                                <div className={cx('art-info')}>
                                    <p>{isSelect?.title}</p>
                                </div>
                            </div>
                            <div className={cx('fields')}>
                                <label>Tags</label>
                                {isSelect?.taglist.map((tag, index) => (
                                    <div className={cx('art-taglist')} key={index}>
                                        <div className={cx('tag')}>
                                            <p>{tag}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('fields')}>
                                <label>Source</label>
                                <div className={cx('art-info')}>
                                    <p>{isSelect?.link}</p>
                                </div>
                            </div>
                            <div className={cx('fields')}>
                                <label>Description</label>
                                <div className={cx('art-info', 'art-desc')}>
                                    <div>{isSelect?.description}</div>
                                </div>
                            </div>
                            <div className={cx('fields')}>
                                <label>Status</label>
                                <div className={cx('art-info')}>
                                    <p>{isSelect?.status === 1 ? 'Public' : 'Private'}</p>
                                </div>
                            </div>
                            <div className={cx('buttons')}>
                                <div className={cx('cancel')} onClick={handleClose}>
                                    Cancel
                                </div>
                                <div
                                    className={cx('submit')}
                                    onClick={() => {
                                        handleAddArtworkToSection(sectionID, isSelect?.artID, userID);
                                        setShowModal(false);
                                    }}
                                >
                                    Submit
                                </div>
                            </div>
                        </div>
                        <div className={cx('gallery-right')}>
                            <div className={cx('gallery-bar')}>
                                <div className={cx('gallery-search')}></div>
                            </div>

                            <div className={cx('grid-artwork')} id="grid-artwork">
                                <InfiniteScroll
                                    dataLength={artworks.length}
                                    next={loadMore}
                                    hasMore={hasMore}
                                    loader={
                                        <div className={cx('splash')}>
                                            <div className={cx('splash-content')}>
                                                <ImSpinner10 className={cx('spinner')} />
                                                <p>Loading artworks...</p>
                                            </div>
                                        </div>
                                    }
                                    endMessage={<p></p>}
                                    scrollableTarget="grid-artwork"
                                    className={cx('grid')}
                                >
                                    {errors ? (
                                        <div>Error: {errors}</div>
                                    ) : artworks.length === 0 ? (
                                        <div>No artworks found</div>
                                    ) : (
                                        artworks.map((art, index) => {
                                            return !artLoading ? (
                                                <motion.div
                                                    className={cx('frame-artwork', {
                                                        select: isSelect?.artID === art.artID
                                                    })}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: 'easeOut',
                                                        delay: index * 0.1
                                                    }}
                                                    key={art.artID}
                                                    onClick={() => setSelect(art)}
                                                >
                                                    <div className={cx('background')}>
                                                        <img
                                                            className={cx('img')}
                                                            effect="blur"
                                                            loading="lazy"
                                                            src={`${art.art[0]}`}
                                                            alt={art.title}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ) : null;
                                        })
                                    )}
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export const DiscussionModal = ({ className, isDiscussion, setDiscussion, topic, cate }) => {
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const userData = user?.user;
    const currentDate = new Date();
    const {
        cover,
        isSubmitting,
        selectedCover,
        isDiscussionErrors,
        discussionForm,
        handleCoverChange,
        handleRemoveCover,
        handleChange,
        handleEditorChange,
        handleSubmit
    } = useDiscussion();
    useEffect(() => {
        setShowModal(isDiscussion);

        if (isDiscussion) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isDiscussion]);
    const handleCloseModal = () => {
        setDiscussion(false);
    };

    discussionForm.topic = topic;
    discussionForm.category = cate;

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, false] }], // Header
            ['bold', 'italic', 'underline', 'strike'], // Định dạng văn bản
            [{ align: [] }], // Căn lề: trái, phải, giữa, đều
            [{ list: 'ordered' }, { list: 'bullet' }], // Danh sách
            ['link', 'image'], // Link và ảnh
            ['clean'] // Xóa định dạng
        ]
    };

    return (
        showModal && (
            <div className={className}>
                {isSubmitting && !isDiscussionErrors && (
                    <div className={cx('splash')}>
                        <div className={cx('splash-content')}>
                            <ImSpinner10 className={cx('spinner')} />
                            <p>Creating discussion...</p>
                        </div>
                    </div>
                )}
                <div className={cx('discussion-modal')}>
                    <form className={cx('discussion-form')} onSubmit={(e) => handleSubmit(e, handleCloseModal, topic)}>
                        <div className={cx('title-modal')}>
                            <p>New Your Thread</p>
                        </div>
                        <div className={cx('form-fields', 'input-content')}>
                            <label>
                                Title<span>*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={discussionForm.title || ''}
                                onChange={handleChange}
                                maxLength={100}
                            />
                            <p className={cx('sub-input')}>Please title your thread, up to 100 characters</p>
                        </div>
                        <div className={cx('form-fields', 'input-content')}>
                            <label>
                                Content<span>*</span>
                            </label>
                            <ReactQuill
                                className={cx('editor')}
                                modules={modules}
                                value={discussionForm.content} // Nội dung hiện tại
                                onChange={handleEditorChange} // Gọi hàm từ custom hook
                                theme="snow" // Hoặc 'bubble' cho giao diện khác
                            />
                        </div>
                        <div className={cx('form-button', 'handle-button')}>
                            <div
                                type="button"
                                disabled={isSubmitting}
                                className={cx('cancel')}
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </div>
                            <button type="submit" disabled={isSubmitting} className={cx('submit')}>
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className={cx('preview-frame', 'discussion-form')}>
                        <div className={cx('title-modal')}>
                            <p>Preview</p>
                        </div>
                        <div className={cx('detail-discussion')}>
                            <div className={cx('detail-header')}>
                                <a href="#">
                                    <div className={cx('detail-user')}>
                                        <div className={cx('avatar')}>
                                            <img src={userData?.profile?.avatar} alt="avatar" />
                                        </div>
                                        <div className={cx('detail-info')}>
                                            <div className={cx('fullname')}>{userData?.profile?.fullName}</div>
                                            <div className={cx('create_time')}>{formatDate(currentDate)} - Today</div>
                                        </div>
                                    </div>
                                </a>
                                <div className={cx('detail-discussion-content')}>
                                    <p className={cx('detail-title')}>
                                        {discussionForm.title !== '' ? discussionForm.title : 'This is your new title'}
                                    </p>
                                    {/* Thay đổi lại cách thức hiển thị */}
                                    <div className={cx('detail-content')}>
                                        {discussionForm.content !== '' ? (
                                            <div
                                                className={cx('detail-content')}
                                                dangerouslySetInnerHTML={{ __html: discussionForm.content }}
                                            />
                                        ) : (
                                            <p>This is your new content</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
