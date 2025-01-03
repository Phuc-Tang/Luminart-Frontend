import classNames from 'classnames/bind';
import React, { useContext } from 'react';
import styles from '../styles/components/Notification.module.scss';
import { NotificationContext } from '../hooks/useNotification';

const cx = classNames.bind(styles);

function Notification({ className }) {
    const { notifications, loading, error, refetch } = useContext(NotificationContext);

    return (
        <div className={className}>
            <div className={cx('noti-box')}>
                {notifications?.length <= 0 ? (
                    'No have notification'
                ) : (
                    <div className={cx('box')}>
                        {notifications?.map((noti, index) => {
                            return (
                                <a href={noti.link} key={index}>
                                    <div className={cx('noti-tab')}>
                                        <img src={noti.sender.avatar} alt="avatar" />
                                        <div className={cx('noti-content')}>
                                            <p>{noti.sender.senderName} </p>
                                            <p>{noti.content}</p>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notification;
