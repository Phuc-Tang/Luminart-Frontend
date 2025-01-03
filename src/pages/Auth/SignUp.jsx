import classNames from 'classnames/bind';
import styles from '../../styles/pages/Auth.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useSignUpForm } from '../../hooks/useAuth';

const cx = classNames.bind(styles);

function SignUp() {
    const HOSTING_URL = import.meta.env.VITE_HOSTING_URL;
    const { formValues, errors, handleChange, handleSubmit } = useSignUpForm();
    return (
        <div className={cx('frame-left')}>
            <div className={cx('box')}>
                <p className={cx('title')}>Sign Up account</p>
                <p className={cx('sub-title')}>Enter your personal data to create your account</p>
                <div className={cx('social')}>
                    <div className={cx('facebook')}>
                        <FaFacebook />
                    </div>
                    <div className={cx('google')}>
                        <FaGoogle />
                    </div>
                    <div className={cx('github')}>
                        <FaGithub />
                    </div>
                </div>
                <p className={cx('or')}>Or</p>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <input
                        name="username"
                        className={cx('email', { 'input-error': errors.username })}
                        type="text"
                        placeholder="Username"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        className={cx('email', { 'input-error': errors.email })}
                        type="text"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        className={cx('password', { 'input-error': errors.password })}
                        type="password"
                        placeholder="Password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <button className={cx('sign-in')} type="submit">
                        <p className={cx('signin-submit')}>Sign up</p>
                    </button>
                </form>
                <div className={cx('other')}>
                    <p className={cx('have-account')}>Already have an account?</p>
                    <a href={`${HOSTING_URL}/signin`}>
                        <div className={cx('sign-up')}>Sign In</div>
                    </a>
                </div>
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

export default SignUp;
