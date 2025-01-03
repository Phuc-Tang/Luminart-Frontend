import classNames from 'classnames/bind';
import styles from '../styles/components/Profile.module.scss';
import { useChangeCover, useProfileUser } from '../hooks/useProfile';
import { useUser } from '../hooks/useUserInfo';
import { useEffect, useState } from 'react';
import { useStickyActive } from '../hooks/useStickyActive';
import { useParams } from 'react-router-dom';
import { RiImageAddFill } from 'react-icons/ri';
import { CiCircleRemove } from 'react-icons/ci';

const cx = classNames.bind(styles);

function Profile() {
    const { username } = useParams();
    const { user } = useUser();
    const { menuRef, isVisible } = useStickyActive(90);
    const [activeTab, setActiveTab] = useState('Overview');
    const [customSection, setCustomSection] = useState(false);
    const { profileUser, loading, error } = useProfileUser(username);
    const {
        isChanging,
        isCoverError,
        isCoverPreview,
        isCoverValue,
        handleChangeCover,
        handleCancelCover,
        handleCoverPreview,
        handleSubmit
    } = useChangeCover();

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
                        </div>
                    </div>
                </div>

                <form className={cx('form-change-cover')} onSubmit={handleSubmit}>
                    {isCoverPreview === null ? null : (
                        <label className={cx('cancel-change-cover-button')} onClick={handleCancelCover}>
                            <CiCircleRemove />
                        </label>
                    )}
                    {isCoverPreview !== null ? (
                        <button type="submit" className={cx('change-cover-button')}>
                            <p>{isChanging ? 'Submitting' : 'Submit'}</p>
                        </button>
                    ) : cover === null ? (
                        <label className={cx('change-cover-button')}>
                            <RiImageAddFill />
                            <p>Add Cover Image</p>
                            <input
                                name="cover"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleChangeCover}
                            />
                        </label>
                    ) : (
                        <label className={cx('change-cover-button')}>
                            <RiImageAddFill />
                            <p>Change Cover Image</p>
                            <input
                                name="cover"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleChangeCover}
                            />
                        </label>
                    )}
                </form>

                {cover === null && isCoverPreview === null ? (
                    <div>Cover</div>
                ) : (
                    <img
                        src={`${isCoverPreview === null ? (!cover ? 'No have cover' : cover) : isCoverPreview}`}
                        alt="cover"
                    />
                )}

                <div className={cx('overlay')}></div>
            </div>
        </div>
    );
}

export default Profile;
