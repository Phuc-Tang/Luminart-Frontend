import classNames from 'classnames/bind';
import styles from '../../styles/pages/Update.module.scss';
import { useUpdateProfile } from '../../hooks/useProfile';
import { FaUserCircle } from 'react-icons/fa';
import { ToastContainer, Slide } from 'react-toastify';
import { ImSpinner10 } from 'react-icons/im';
import { IoMdCheckmark } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';

const cx = classNames.bind(styles);

function Update() {
    const { isSubmitting, updateError, updateValue, avatarPreview, handleChange, handleSubmit, handleCancelAvatar } =
        useUpdateProfile();
    console.log(updateValue.bio);

    return (
        <div className={cx('frame')}>
            <div className={cx('update-frame-left')}>
                {isSubmitting && (
                    <div className={cx('splash')}>
                        <div className={cx('splash-content')}>
                            <ImSpinner10 className={cx('spinner')} /> {/* Spinner cho loading */}
                            <p>Updating your profile...</p>
                        </div>
                    </div>
                )}
                <p className={cx('title')}>Account</p>
                <div className={cx('content')}>
                    <a href="#username" className={cx('sub-title', { active: updateError?.username })}>
                        🔹 Username
                    </a>
                    <a href="#avatar" className={cx('sub-title')}>
                        🔹 Avatar
                    </a>
                    <a href="#position" className={cx('sub-title', { active: updateError?.position })}>
                        🔹 Position
                    </a>
                </div>
                <p className={cx('title')}>Personal</p>
                <div className={cx('content')}>
                    <a href="#fullname" className={cx('sub-title', { active: updateError?.fullName })}>
                        🔹 Fullname
                    </a>
                    <a href="#gender" className={cx('sub-title', { active: updateError?.gender })}>
                        🔹 Gender
                    </a>
                    <a href="#birthday" className={cx('sub-title', { active: updateError?.birth })}>
                        🔹 Birthday
                    </a>
                    <a href="#bio" className={cx('sub-title', { active: updateError?.bio })}>
                        🔹 Bio
                    </a>
                </div>
                <p className={cx('title')}>Contact</p>
                <div className={cx('content')}>
                    <a href="#address" className={cx('sub-title')}>
                        🔹 Address
                    </a>
                    <a href="#phone" className={cx('sub-title')}>
                        🔹 Phone
                    </a>
                    <a href="#link" className={cx('sub-title')}>
                        🔹 Platform
                    </a>
                </div>
            </div>
            <div className={cx('update-frame-right')}>
                <form className={cx('form-update-frame')} onSubmit={handleSubmit}>
                    <p className={cx('header')}>Professional Profile</p>
                    <div className={cx('update-form')}>
                        <label id="username">Username 😤</label>
                        <p>
                            Your username will be visible publicly. <span>*</span>
                        </p>
                        <input
                            className={cx({ active: updateError?.username })}
                            type="text"
                            name="username"
                            value={updateValue.username}
                            onChange={handleChange}
                        />
                        <div className={cx('note')}>
                            <div>
                                <p>
                                    <span>
                                        <IoMdCheckmark />
                                    </span>
                                    Must be between 3 and 63 characters
                                </p>
                                <p>
                                    <span>
                                        <IoMdCheckmark />
                                    </span>
                                    Cannot start or end with a '-' or '_'
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span>
                                        <IoMdCheckmark />
                                    </span>
                                    Only contains letters, numbers, hyphens and underscores
                                </p>
                                <p>
                                    <span>
                                        <IoMdCheckmark />
                                    </span>
                                    Usernames that are obscene or inappropriate are not allowed.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('update-form')}>
                        <label id="avatar">Avatar 😲</label>
                        <p>Display your profile avatar.</p>
                        <input
                            id="upload-avatar"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <label className={cx('update-frame')} htmlFor="upload-avatar">
                            {!avatarPreview && !updateValue.avatar ? (
                                <div className={cx('avatar-input')}>
                                    <span>
                                        <FaUserCircle />
                                    </span>
                                    <p>Select or drag your avatar here.</p>
                                </div>
                            ) : (
                                <div>
                                    <img src={avatarPreview || updateValue.avatar} alt="Avatar" />
                                </div>
                            )}
                        </label>
                        {!avatarPreview && updateValue.avatar ? null : (
                            <div className={cx('cancel-change-button')}>
                                <MdCancel className={cx('cancel-change-avatar')} onClick={handleCancelAvatar} />
                            </div>
                        )}
                    </div>
                    <div className={cx('update-form')}>
                        <label id="position">Position 🤗</label>
                        <p>
                            What is your occupation, position, or field of expertise? <span>*</span>
                        </p>
                        <input
                            className={cx({ active: updateError?.position })}
                            type="text"
                            name="position"
                            value={updateValue.position}
                            onChange={handleChange}
                        />
                        <div className={cx('note')}>
                            <div>
                                <p>
                                    Add your skills, positions you can take on, and the field you are pursuing so
                                    recruiters can see: 2D Artist, Illustration, Photoshop, Software Engineer,etc.
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={cx('update-form')}>
                        <label id="fullname">Fullname 🤣</label>
                        <p>Please share your full name so other users can know.</p>
                        <input
                            className={cx({ active: updateError?.fullName })}
                            type="text"
                            name="fullName"
                            value={updateValue.fullName}
                            onChange={handleChange}
                        />
                        <div className={cx('note')}>
                            <div>
                                <p>This field is optional if you do not wish to share your real name.</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('update-form')}>
                        <label id="gender">Gender 🤔</label>
                        <p>
                            Let everyone know your gender if you want them to address you accordingly. <span>*</span>
                        </p>
                        <input
                            className={cx({ active: updateError?.gender })}
                            type="text"
                            name="gender"
                            value={updateValue.gender}
                            onChange={handleChange}
                        />
                        <div className={cx('note')}>
                            <div>
                                <p>Male, Female, third gender, or your own gender identity, etc.</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('update-form')}>
                        <label id="birthday">Birthday 🥳</label>
                        <p>
                            Share your birthday so everyone can celebrate with you. <span>*</span>
                        </p>
                        <input
                            className={cx({ active: updateError?.birth })}
                            type="date"
                            name="birth"
                            value={updateValue.birth}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('update-form')}>
                        <label id="bio">Bio 😉</label>
                        <p>
                            Introduce yourself, describe what kind of person you are, your hobbies, your personal story,
                            etc. <span>*</span>
                        </p>
                        <textarea
                            className={cx({ active: updateError?.bio })}
                            type="text"
                            name="bio"
                            value={updateValue.bio}
                            onChange={handleChange}
                        />
                        <div className={cx('note')}>
                            <div>
                                <p>
                                    The benefit of describing yourself is that it allows others to receive information
                                    about you, whether they are recruiters, partners, colleagues, or people with similar
                                    passions, etc. This helps you connect with others more quickly.
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p className={cx('header')}>Contract Information</p>
                    <p className={cx('sub')}>
                        These are sensitive details, so make sure that the contact information you want to display is
                        something that can be publicly shared without affecting your privacy. We are not responsible for
                        any information you choose to disclose.
                    </p>
                    <div className={cx('update-form')}>
                        <label id="address">Email 😳</label>
                        <p>Publicly share your email address so others can contact you for work-related matters.</p>
                        <input type="text" name="address" value={updateValue.address} onChange={handleChange} />
                        <div className={cx('note')}>
                            <div>
                                <p>
                                    We encourage you to use a different email from the one you used to register your
                                    account, such as an email used for work purposes.
                                </p>
                            </div>
                        </div>
                        <div className={cx('check-private')}>
                            <input type="checkbox" />
                            <p>Don't show email address</p>
                        </div>
                    </div>
                    <div className={cx('update-form')}>
                        <label id="phone">Phone 😧</label>
                        <p>If you want people to contact you by phone, make it public.</p>
                        <input type="text" name="phone" value={updateValue.phone} onChange={handleChange} />
                        <div className={cx('note')}>
                            <div>
                                <p>
                                    This is the most sensitive information. We do not encourage you to make your phone
                                    number public as it may lead to harassment. Make sure this phone number is used for
                                    business or work purposes and does not affect your privacy.
                                </p>
                            </div>
                        </div>
                        <div className={cx('check-private')}>
                            <input type="checkbox" />
                            <p>Don't show phone number</p>
                        </div>
                    </div>
                    <div className={cx('update-form')}>
                        <label id="link">Link 🤗</label>
                        <p>
                            Share your social media or personal pages if you want to give people more options to contact
                            you.
                        </p>
                        <input type="text" name="link" value={updateValue.link} onChange={handleChange} />
                        <div className={cx('note')}>
                            <div>
                                <p>
                                    It could be the link to your personal or business Facebook, Instagram, or other
                                    social media platforms you are using, or it could be your personal page
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('update-form', 'button-options')}>
                        <a href="/">
                            <button className={cx('cancel-update')} type="button">
                                Cancel
                            </button>
                        </a>
                        <button className={cx('submit-update')} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer
                    toastClassName={cx('custom-toast')}
                    bodyClassName={cx('custom-body')}
                    progressClassName={cx('custom-progress')}
                    position="top-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Slide}
                />
            </div>
        </div>
    );
}

export default Update;
