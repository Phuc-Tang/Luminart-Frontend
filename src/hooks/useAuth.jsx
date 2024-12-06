import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { signUp, signIn, verifyEmail } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { validateSignUp, validateSignIn } from '../utils/validators/authValidation';
import { useUser } from './useUserInfo';

export const useSignUpForm = () => {
    const [errors, setErrors] = useState({});

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateSignUp(formValues.username, formValues.email, formValues.password);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error(Object.values(validationErrors)[0], {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            }); // Hiển thị lỗi đầu tiên
            return;
        }

        // Nếu không có lỗi
        setErrors({});
        try {
            const result = await signUp(formValues.username, formValues.email, formValues.password);
            if (!result.success) {
                toast.error(result.message, {
                    className: 'custom-toast-error',
                    bodyClassName: 'custom-body-error',
                    progressClassName: 'custom-progress-error'
                }); // Hiển thị lỗi từ server
            } else {
                toast.success(result.message, {
                    className: 'custom-toast-success',
                    bodyClassName: 'custom-body-success',
                    progressClassName: 'custom-progress-success'
                }); // Hiển thị thành công
                setFormValues({ username: '', email: '', password: '' }); // Reset form
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.', {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            });
        }
    };

    return {
        formValues,
        errors,
        handleChange,
        handleSubmit
    };
};

export const useSignInForm = () => {
    const { user, setUser } = useUser();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true); // Loading khi fetch dữ liệu
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Validate form
        const validationErrors = validateSignIn(formValues.email, formValues.password);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error(Object.values(validationErrors)[0], {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            }); // Hiển thị lỗi đầu tiên
            return;
        }

        // Nếu không có lỗi
        setErrors({});
        try {
            const result = await signIn(formValues.email, formValues.password);

            if (!result.success) {
                toast.error(result.message, {
                    className: 'custom-toast-error',
                    bodyClassName: 'custom-body-error',
                    progressClassName: 'custom-progress-error'
                }); // Hiển thị lỗi từ server
            } else {
                toast.success(result.message, {
                    className: 'custom-toast-success',
                    bodyClassName: 'custom-body-success',
                    progressClassName: 'custom-progress-success'
                }); // Hiển thị thành công
                setUser(result.data);
                setFormValues({ email: '', password: '' }); // Reset form
                setTimeout(() => navigate('/'), 3000);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.', {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            });
            setLoading(false);
        }
    };

    return {
        formValues,
        errors,
        handleChange,
        handleSubmit
    };
};

export const verifyEmailForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Dùng để chuyển hướng sau khi xác thực thành công

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token'); // Lấy token từ query string trong URL

        if (token) {
            // Gọi API verifyEmail
            verifyEmail(token).then((result) => {
                setIsLoading(false); // Dừng loading
                if (result.error) {
                    setError(result.error); // Nếu có lỗi
                } else {
                    setMessage('Your email has been verified successfully!');
                    // Có thể điều hướng đến trang đăng nhập hoặc trang khác
                    setTimeout(() => navigate('/login'), 3000); // Ví dụ chuyển hướng đến trang đăng nhập sau 3 giây
                }
            });
        } else {
            setIsLoading(false); // Nếu không có token, dừng loading
            setError('Invalid verification link.');
        }
    }, [navigate]);

    return { isLoading, message, error };
};
