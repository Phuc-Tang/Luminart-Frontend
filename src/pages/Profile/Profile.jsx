import classNames from 'classnames/bind';
import styles from '../../styles/pages/Profile.module.scss';
import image from '../../assets/images/banner/images';
import { RiImageAddFill } from 'react-icons/ri';
import { FaPalette } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useStickyActive } from '../../hooks/useStickyActive';
import { useProfileUser } from '../../hooks/useProfile';
import { useUser } from '../../hooks/useUserInfo';
import { useState } from 'react';
import { Overview, Gallery, Favorites, Posts, About } from './index';

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

    const tabMenu = [
        { id: 1, tab: 'Overview', component: <Overview customSection={customSection} /> },
        { id: 2, tab: 'Gallery', component: <Gallery /> },
        { id: 3, tab: 'Favorites', component: <Favorites /> },
        { id: 4, tab: 'Posts', component: <Posts /> },
        { id: 5, tab: 'About', component: <About /> }
    ];
    return (
        <div className={cx('frame')}>
            <div className={cx('cover')}>
                <div className={cx('infomation')}>
                    <div className={cx('avatar')}>
                        <img src={`${avatar}`} alt="avatar" style={{ width: '200px', height: '200px' }} />
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('user-follow')}>
                            <p className={cx('username')}>{fullName === null ? username : fullName}</p>
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
            <div className={cx('tab-table')}>
                <div className={cx('menu')} ref={menuRef}>
                    <div className={cx('tab-button')}>
                        <div className={cx('mini-avatar', { active: isVisible })}>
                            <img src={image.image6} />
                            <p>Gwyn3vere</p>
                        </div>
                        <div className={cx('mini-avatar', { active: isVisible })}>
                            <p>|</p>
                        </div>
                        {tabMenu.map((menu) => {
                            return (
                                <div
                                    className={cx('tab-name', { active: activeTab === menu.tab })}
                                    onClick={() => setActiveTab(menu.tab)}
                                    key={menu.id}
                                >
                                    <p>{menu.tab}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        className={cx('edit-button', { active: customSection })}
                        onClick={() => setCustomSection((prev) => !prev)}
                    >
                        <FaPalette />
                        <p>Custom profile</p>
                    </div>
                </div>
            </div>
            <div className={cx('tab-content')}>
                {tabMenu.find((menu) => menu.tab === activeTab)?.component || <p>No content available</p>}
            </div>
        </div>
    );
}

export default Profile;
