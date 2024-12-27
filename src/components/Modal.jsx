import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUserInfo';
import classNames from 'classnames/bind';
import styles from '../styles/components/Modal.module.scss';
import { useArtworkById } from '../hooks/useArtwork';
import { IoMdCloseCircle } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import { ImSpinner10 } from 'react-icons/im';
import { useSectionContext } from '../hooks/useSection';

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
