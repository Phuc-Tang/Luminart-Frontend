import classNames from 'classnames/bind';
import styles from '../styles/components/Header.module.scss';
import { IoIosNotifications, IoIosChatbubbles } from 'react-icons/io';
import { ImUpload } from 'react-icons/im';
import { BiStreetView } from 'react-icons/bi';
import { GrUpgrade } from 'react-icons/gr';
import { FaSignOutAlt, FaImages, FaUserCircle } from 'react-icons/fa';
import { TbLogin2, TbLogin } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';
import { MdLanguage, MdEdit, MdAdminPanelSettings } from 'react-icons/md';
import { RiColorFilterFill } from 'react-icons/ri';
import { useUser } from '../hooks/useUserInfo';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchArtwork } from '../hooks/useSearch';
import Home from '../pages/Home/Home';

const cx = classNames.bind(styles);

function Header() {
    const HOSTING_URL = import.meta.env.VITE_HOSTING_URL;
    const navigate = useNavigate();
    const [isDropdownActive, setDropdownActive] = useState(false); // Trạng thái dropdown
    const { user, signOut } = useUser();
    const [keyword, setKeyword] = useState('');
    const { isSuggest, searchResult, isSearchLoading, isSearchError } = useSearchArtwork(keyword);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const handleToggleDropdown = () => {
        setDropdownActive((prev) => !prev); // Toggle trạng thái
    };

    const handleSearchChange = (e) => {
        setKeyword(e.target.value); // Cập nhật keyword khi người dùng nhập
    };

    // Điều hướng đến trang Search khi người dùng ấn Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`, {
                state: { searchResult } // Truyền kết quả tìm kiếm qua state
            });
        }
    };

    // Điều hướng đến trang Search khi người dùng click vào suggest
    const handleClickSuggest = (keyword) => {
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`, {
            state: { searchResult } // Truyền kết quả tìm kiếm qua state
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownActive(false);
            }
        };

        const handleScroll = () => {
            setDropdownActive(false); // Đóng dropdown khi cuộn
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={cx('frame')}>
            <div className={cx('header-box')}>
                <div className={cx('left')}>
                    <a href={`${HOSTING_URL}`}>
                        <div className={cx('logo-frame')}></div>
                    </a>
                    <a href={`${HOSTING_URL}`}>
                        <div className={cx('app-name')}>LUMINART</div>
                    </a>
                </div>
                <div className={cx('search-frame')}>
                    <input
                        type="text"
                        value={keyword}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        className={cx('search-bar')}
                        placeholder="Search..."
                    />
                    {isSuggest && (
                        <div className={cx('search-box')}>
                            {isSuggest.length === 0 ? null : (
                                <ul>
                                    {isSuggest.map((suggest, index) => (
                                        <p key={index} onClick={() => handleClickSuggest(suggest)}>
                                            {suggest}
                                        </p>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {user && user.user ? (
                    <div className={cx('right')}>
                        <a href={`${HOSTING_URL}/artwork/upload/`} className={cx('icons')}>
                            <ImUpload />
                        </a>
                        <p className={cx('icons')}>
                            <IoIosChatbubbles />
                        </p>
                        <p className={cx('icons')}>
                            <IoIosNotifications />
                        </p>
                        <div className={cx('avatar-frame')} ref={dropdownRef}>
                            <img src={user && user.user.profile.avatar} alt="avatar" onClick={handleToggleDropdown} />
                            <div className={cx('avatar-dropdown', { active: isDropdownActive })}>
                                <div className={cx('dropdown-table')}>
                                    <div className={cx('username')}>
                                        <FaUserCircle />
                                        <p>
                                            {user?.user?.username === user?.user?.profile?.fullName
                                                ? user?.user?.username
                                                : user?.user?.profile?.fullName}
                                        </p>
                                    </div>
                                    <div className={cx('position')}>
                                        <p>{user.user.profile.position}</p>
                                    </div>
                                    <hr />
                                    <div className={cx('tab')}>
                                        <p>
                                            <GrUpgrade />
                                        </p>
                                        <p>Upgrade</p>
                                    </div>
                                    {user?.user?.role === 0 ? (
                                        <a href={`${HOSTING_URL}/admin/dashboard`} className={cx('tab')}>
                                            <p>
                                                <MdAdminPanelSettings />
                                            </p>
                                            <p>Admin</p>
                                        </a>
                                    ) : null}
                                    <hr />
                                    <a
                                        href={`${HOSTING_URL}/profile/${user && user.user.username}`}
                                        className={cx('tab')}
                                    >
                                        <p>
                                            <BiStreetView />
                                        </p>
                                        <p>My Profile</p>
                                    </a>
                                    <a href={`${HOSTING_URL}/profile/update`} className={cx('tab')}>
                                        <p>
                                            <MdEdit />
                                        </p>
                                        <p>Edit Profile</p>
                                    </a>
                                    <div className={cx('tab')}>
                                        <p>
                                            <FaImages />
                                        </p>
                                        <p>My Gallery</p>
                                    </div>
                                    <hr />
                                    <div className={cx('tab')}>
                                        <p>
                                            <RiColorFilterFill />
                                        </p>
                                        <p>Theme</p>
                                    </div>
                                    <div className={cx('tab')}>
                                        <p>
                                            <MdLanguage />
                                        </p>
                                        <p>Language</p>
                                    </div>
                                    <hr />
                                    <div className={cx('tab')}>
                                        <p>
                                            <IoMdSettings />
                                        </p>
                                        <p>Setting</p>
                                    </div>
                                    <div className={cx('tab')} onClick={handleLogout}>
                                        <p>
                                            <FaSignOutAlt />
                                        </p>
                                        <p>Sign Out</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('right')}>
                        <a href="/signin">
                            <div className={cx('sign-btn', 'sign-in')}>
                                <TbLogin2 />
                                <p>Sign In</p>
                            </div>
                        </a>
                        <a href="/signup">
                            <div className={cx('sign-btn', 'sign-up')}>
                                <TbLogin />
                                <p>Sign Up</p>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
