import classNames from 'classnames/bind';
import styles from '../../styles/pages/Update.module.scss';
import { useUpdateProfile } from '../../hooks/useProfile';

const cx = classNames.bind(styles);

function Update() {
    const { isSubmitting, updateError, updateValue, handleChange, handleSubmit } = useUpdateProfile();
    return (
        <div className={cx('frame')}>
            <div className={cx('update-frame-left')}>
                <p className={cx('title')}>Account</p>
                <div className={cx('content')}>
                    <p className={cx('sub-title')}>🔹 Username</p>
                    <p className={cx('sub-title')}>🔹 Avatar</p>
                    <p className={cx('sub-title')}>🔹 Position</p>
                </div>
                <p className={cx('title')}>Personal</p>
                <div className={cx('content')}>
                    <p className={cx('sub-title')}>🔹 Fullname</p>
                    <p className={cx('sub-title')}>🔹 Gender</p>
                    <p className={cx('sub-title')}>🔹 Birthday</p>
                    <p className={cx('sub-title')}>🔹 Bio</p>
                </div>
                <p className={cx('title')}>Contact</p>
                <div className={cx('content')}>
                    <p className={cx('sub-title')}>🔹 Address</p>
                    <p className={cx('sub-title')}>🔹 Phone</p>
                    <p className={cx('sub-title')}>🔹 Link</p>
                </div>
            </div>
            <div className={cx('update-frame-right')}>
                <form className={cx('form-update-frame')} onSubmit={handleSubmit}>
                    <p className={cx('header')}>Professional Profile</p>
                    <div className={cx('update-form')}>
                        <label>Username</label>
                        <input type="text" name="username" value={updateValue.username} onChange={handleChange} />
                        <div className={cx('note')}>
                            <p></p>
                        </div>
                    </div>
                    <div className={cx('update-form')}>
                        <label>Avatar</label>
                        <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                    </div>
                    <div className={cx('update-form')}>
                        <label>Position</label>
                        <input type="text" name="position" value={updateValue.position} onChange={handleChange} />
                    </div>
                    <hr />
                    <div className={cx('update-form')}>
                        <label>Fullname</label>
                        <input type="text" name="fullName" value={updateValue.fullName} onChange={handleChange} />
                    </div>
                    <div className={cx('update-form')}>
                        <label>Gender</label>
                        <input type="text" name="gender" value={updateValue.gender} onChange={handleChange} />
                    </div>
                    <div className={cx('update-form')}>
                        <label>Birthday</label>
                        <input type="text" name="birth" value={updateValue.birth} onChange={handleChange} />
                    </div>
                    <div className={cx('update-form')}>
                        <label>Bio</label>
                        <textarea type="text" name="bio" value={updateValue.bio} onChange={handleChange} />
                    </div>
                    <hr />
                    <div className={cx('update-form')}>
                        <label>Address</label>
                        <input type="text" name="address" value={updateValue.address} onChange={handleChange} />
                    </div>
                    <div className={cx('update-form')}>
                        <label>Phone</label>
                        <input type="text" name="phone" value={updateValue.phone} onChange={handleChange} />
                    </div>
                    <div className={cx('update-form')}>
                        <label>Link</label>
                        <input type="text" name="link" value={updateValue.link} onChange={handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
