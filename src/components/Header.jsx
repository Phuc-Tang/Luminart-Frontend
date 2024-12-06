import classNames from 'classnames/bind';
import styles from '../styles/components/Header.module.scss';
import { IoIosNotifications, IoIosChatbubbles } from 'react-icons/io';
import image from '../assets/images/banner/images';
import { ImUpload } from 'react-icons/im';
import { BiStreetView } from 'react-icons/bi';
import { GrUpgrade } from 'react-icons/gr';
import { FaSignOutAlt, FaImages, FaUserCircle } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdLanguage } from 'react-icons/md';
import { RiColorFilterFill } from 'react-icons/ri';
import { useUser } from '../hooks/useUserInfo';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [isDropdownActive, setDropdownActive] = useState(false); // Trạng thái dropdown
    const { user, loading, error } = useUser();

    useEffect(() => {
        // Đây là ví dụ cách kiểm tra và xử lý sau khi user có giá trị mới
        if (user) {
            console.log('User info has changed:', user);
            // Có thể thực hiện các hành động sau khi user được cập nhật
        }
    }, [user]);

    console.log(user);

    const handleToggleDropdown = () => {
        setDropdownActive((prev) => !prev); // Toggle trạng thái
    };
    return (
        <div className={cx('frame')}>
            <div className={cx('header-box')}>
                <div className={cx('left')}>
                    <div className={cx('logo-frame')}></div>
                    <div className={cx('app-name')}>LUMINART</div>
                </div>
                <input type="text" className={cx('search-bar')} />

                {loading ? (
                    <div className={cx('right')}>Loading...</div> // Hiển thị loading khi đang tải thông tin
                ) : user && user.user ? (
                    <div className={cx('right')}>
                        <ImUpload />
                        <IoIosChatbubbles />
                        <IoIosNotifications />
                        <div className={cx('avatar-frame')}>
                            <img src={image.image6} alt="avatar" onClick={handleToggleDropdown} />
                            <div className={cx('avatar-dropdown', { active: isDropdownActive })}>
                                <div className={cx('dropdown-table')}>
                                    <div className={cx('username')}>
                                        <FaUserCircle />
                                        <p>{user.user.username}</p>
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
                                    <a href={`http://localhost:5173/profile/${user.user.userID}`} className={cx('tab')}>
                                        <p>
                                            <BiStreetView />
                                        </p>
                                        <p>My Profile</p>
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
                                    <div className={cx('tab')}>
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
                        <div>Sign In</div>
                        <div>Sign Up</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
