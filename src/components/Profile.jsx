import classNames from 'classnames/bind';
import styles from '../styles/components/Profile.module.scss';
import { useProfileUser } from '../hooks/useProfile';
import { useUser } from '../hooks/useUserInfo';
import { useEffect, useState } from 'react';
import { useStickyActive } from '../hooks/useStickyActive';
import { useParams } from 'react-router-dom';
import { RiImageAddFill } from 'react-icons/ri';
import { FaPalette } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Profile() {
    const { username } = useParams();
    const { user } = useUser();
    const { menuRef, isVisible } = useStickyActive(90);
    const [activeTab, setActiveTab] = useState('Overview');
    const [customSection, setCustomSection] = useState(false);
    const { profileUser, loading, error } = useProfileUser(username);
    const userInfo = profileUser && profileUser.user;
    const cover = userInfo && userInfo.profile.cover;
    const avatar = userInfo && userInfo.profile.avatar;
    const fullName = userInfo && userInfo.profile.fullName;
    const position = userInfo && userInfo.profile.position;
    const follower = userInfo && userInfo.profile.followers_count;
    const following = userInfo && userInfo.profile.following_count;
    const userID = userInfo?.userID;

    return (
        <div className={cx('frame')}>
            <div className={cx('cover')}>
                <div className={cx('infomation')}>
                    <div className={cx('avatar')}>
                        <img src={`${avatar}`} alt="avatar" />
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('user-follow')}>
                            <p className={cx('username')}>{username === fullName ? username : fullName}</p>
                            {!user || !user.user ? null : profileUser &&
                              user?.user?.userID === profileUser?.user?.userID ? null : (
                                <div className={cx('follow-btn')}>
                                    <p>Follow</p>
                                </div>
                            )}
                        </div>
                        <p className={cx('position')}>{position}</p>
                        <div className={cx('parameter')}>
                            <p className={cx('follower')}>{follower} Follower</p>
                            <p className={cx('following')}>{following} Following</p>
                            <p className={cx('artwork')}>15 Artworks</p>
                            <p className={cx('discussion')}>2 Discussions</p>
                        </div>
                    </div>
                </div>
                <div className={cx('change-cover-button')}>
                    <RiImageAddFill />
                    <p>Edit Cover Image</p>
                </div>
                <img src={`${cover}`} alt="cover" />
                <div className={cx('overlay')}></div>
            </div>
        </div>
    );
}

export default Profile;
