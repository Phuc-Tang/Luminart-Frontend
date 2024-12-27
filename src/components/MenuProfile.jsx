import classNames from 'classnames/bind';
import image from '../assets/images/banner/images';
import styles from '../styles/components/Profile.module.scss';
import { useCustomSection, useProfileUser } from '../hooks/useProfile';
import { useUser } from '../hooks/useUserInfo';
import { useEffect, useState } from 'react';
import { useStickyActive } from '../hooks/useStickyActive';
import { useParams } from 'react-router-dom';
import { FaPalette } from 'react-icons/fa';
import { Showcase } from '../pages/Profile';

const cx = classNames.bind(styles);

function MenuProfile() {
    const { user } = useUser();
    const { menuRef, isVisible } = useStickyActive(90);
    const { customSection, setCustomSection } = useCustomSection();
    const { username } = useParams();

    const tabMenu = [
        { id: 1, tab: 'Showcase', url: `/profile/${username}`, component: <Showcase customSection={customSection} /> },
        { id: 2, tab: 'Gallery', url: `/profile/${username}/gallery` },
        { id: 3, tab: 'Favorites', url: '' },
        { id: 4, tab: 'Posts', url: '' },
        { id: 5, tab: 'About', url: '' }
    ];

    return (
        <div className={cx('tab-table')}>
            <div className={cx('menu')} ref={menuRef}>
                <div className={cx('tab-button')}>
                    <div className={cx('mini-avatar', { active: isVisible })}>
                        <img src={user?.user?.profile?.avatar} />
                        <p>{user?.user?.profile?.fullName}</p>
                    </div>
                    <div className={cx('mini-avatar', { active: isVisible })}>
                        <p>|</p>
                    </div>
                    {tabMenu.map((menu) => {
                        return (
                            <a href={menu.url} key={menu.id}>
                                <div className={cx('tab-name')}>
                                    <p>{menu.tab}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {user?.user?.username !== username ? null : (
                    <div
                        className={cx('edit-button', { active: customSection })}
                        onClick={() => setCustomSection((prev) => !prev)}
                    >
                        <FaPalette />
                        <p>Custom profile</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MenuProfile;
