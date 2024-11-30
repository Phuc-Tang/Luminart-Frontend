import classNames from 'classnames/bind';
import styles from '../../styles/pages/Auth.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { validateSignIn } from '../../utils/validators/authValidation';

const cx = classNames.bind(styles);

function SignIn() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(errors);

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateSignIn(email, password);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set lỗi vào state
            toast.error(Object.values(validationErrors)[0]); // Hiển thị lỗi đầu tiên
            return;
        }

        // Nếu không có lỗi
        setErrors({});
        toast.success('Login successful!');
    };

    return (
        <div className={cx('frame-left')}>
            <div className={cx('box')}>
                <p className={cx('title')}>Sign in account</p>
                <p className={cx('sub-title')}>Enter your personal data to login your account</p>
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
                        name="email"
                        className={cx('email', { 'input-error': errors.email })}
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        name="password"
                        className={cx('password', { 'input-error': errors.password })}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={cx('sign-in')} type="submit">
                        <p className={cx('signin-submit')}>Sign in</p>
                    </button>
                </form>
                <div className={cx('other')}>
                    <p className={cx('have-account')}>Don't have an account?</p>
                    <a href="http://localhost:5173/signup">
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
