import classNames from 'classnames/bind';
import styles from '../../styles/pages/Auth.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { validateSignUp } from '../../utils/validators/authValidation';

const cx = classNames.bind(styles);

function SignUp() {
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(errors);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gọi hàm validateSignUp để kiểm tra các trường
        const validationErrors = validateSignUp(username, email, password);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set lỗi vào state
            toast.error(Object.values(validationErrors)[0]);
            return;
        }

        // Nếu không có lỗi
        setErrors({});
        toast.success('Sign up successful!');
    };
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        <p className={cx('signin-submit')}>Sign up</p>
                    </button>
                </form>
                <div className={cx('other')}>
                    <p className={cx('have-account')}>Already have an account?</p>
                    <a href="http://localhost:5173/signin">
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
