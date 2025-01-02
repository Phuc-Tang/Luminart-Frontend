import classNames from 'classnames/bind';
import styles from '../../styles/pages/Auth.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import { Slide, ToastContainer } from 'react-toastify';
import { useSignInForm, useSignInGoogle } from '../../hooks/useAuth';

const cx = classNames.bind(styles);

function SignIn() {
    const HOSTING_URL = import.meta.env.VITE_HOSTING_URL;
    const { formValues, errors, handleChange, handleSubmit } = useSignInForm();

    return (
        <div className={cx('frame-left')}>
            <div className={cx('box')}>
                <p className={cx('title')}>Sign in account</p>
                <p className={cx('sub-title')}>Enter your personal data to login your account</p>
                <div className={cx('social')}>
                    <a href="">
                        <div className={cx('facebook')}>
                            <FaFacebook />
                        </div>
                    </a>

                    <a href="http://localhost:7000/api/auth/google">
                        <div className={cx('google')}>
                            <FaGoogle />
                        </div>
                    </a>
                    <a href="">
                        <div className={cx('github')}>
                            <FaGithub />
                        </div>
                    </a>
                </div>
                <p className={cx('or')}>Or</p>
                <form className={cx('form')} onSubmit={handleSubmit}>
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
                        <p className={cx('signin-submit')}>Sign in</p>
                    </button>
                </form>
                <div className={cx('other')}>
                    <p className={cx('have-account')}>Don't have an account?</p>
                    <a href={`${HOSTING_URL}/signup`}>
                        <div className={cx('sign-up')}>Sign Up</div>
                    </a>
                </div>
                <a className={cx('forgot')} href="#">
                    forgot password?
                </a>
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

export default SignIn;
