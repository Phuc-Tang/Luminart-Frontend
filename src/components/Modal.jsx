import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUserInfo';
import classNames from 'classnames/bind';
import styles from '../styles/components/Modal.module.scss';

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
