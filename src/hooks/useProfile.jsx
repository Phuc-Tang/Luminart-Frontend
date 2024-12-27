import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/users';
import { useUser } from './useUserInfo';
import { useNavigate } from 'react-router-dom';
import { validateProfile } from '../utils/validators/profileValidation';
import { toast } from 'react-toastify';

export const useProfileUser = (username) => {
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(false); // Đặt mặc định là false
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!username) {
                setProfileUser(null);
                setError('Username is required');
                setLoading(false);
                return;
            }

            setLoading(true); // Chỉ bật loading khi username hợp lệ
            setError(null);

            try {
                const userInfo = await getProfile(username);
                if (userInfo?.error) {
                    setError(userInfo.error);
                    setProfileUser(null);
                } else {
                    setProfileUser(userInfo);
                }
            } catch (err) {
                console.error('Error fetching user info:', err.message);
                setError(err.message);
                setProfileUser(null);
            } finally {
                setLoading(false); // Đảm bảo loading kết thúc
            }
        };

        fetchProfile();
    }, [username]);

    return { profileUser, loading, error };
};

export const useUpdateProfile = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [updateValue, setupdateValue] = useState({
        userID: user?.user?.userID || '',
        position: user?.user?.profile?.position || '',
        gender: user?.user?.profile?.gender || '',
        birth: user?.user?.profile?.birth || '',
        address: user?.user?.profile?.address || '',
        phone: user?.user?.profile?.phone || '',
        link: user?.user?.profile?.link || [],
        bio: user?.user?.profile?.bio || '',
        avatar: user?.user?.profile?.avatar || null,
        username: user?.user?.username || '',
        fullName: user?.user?.profile?.fullName || ''
    });
    console.log(updateValue);

    useEffect(() => {
        if (user?.user?.userID) {
            setupdateValue((prev) => ({ ...prev, userID: user.user.userID }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];
            setupdateValue((prev) => ({
                ...prev,
                [name]: file
            }));
            handleAvatarPreview(file);
        } else {
            setupdateValue((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAvatarPreview = (file) => {
        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);
    };

    const handleCancelAvatar = () => {
        setupdateValue((prev) => ({
            ...prev,
            avatar: user?.user?.profile?.avatar || null
        }));
        setAvatarPreview(null); // Xóa URL preview
        setUpdateError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validateProfile(
            updateValue.position,
            updateValue.gender,
            updateValue.birth,
            updateValue.bio,
            updateValue.username
        );

        if (Object.keys(validationErrors).length > 0) {
            setUpdateError(validationErrors);
            toast.error(Object.values(validationErrors)[0], {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('userID', updateValue.userID);
            formData.append('position', updateValue.position);
            formData.append('gender', updateValue.gender);
            formData.append('birth', updateValue.birth);
            formData.append('address', updateValue.address);
            formData.append('phone', updateValue.phone);
            formData.append('link', JSON.stringify(updateValue.link));
            formData.append('bio', updateValue.bio);
            formData.append('username', updateValue.username);
            formData.append('fullName', updateValue.fullName);

            if (updateValue.avatar) {
                formData.append('avatar', updateValue.avatar);
            }

            const response = await updateProfile(formData);
            if (response.error) {
                toast.error(response.error, {
                    className: 'custom-toast-success',
                    bodyClassName: 'custom-body-success',
                    progressClassName: 'custom-progress-success'
                });
                setUpdateError(response.error);
                return;
            }

            toast.success(response.message, {
                className: 'custom-toast-success',
                bodyClassName: 'custom-body-success',
                progressClassName: 'custom-progress-success'
            });
            setTimeout(() => navigate(`/profile/${user?.user?.username}`), 3000);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Please try again later.', {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        updateError,
        updateValue,
        avatarPreview,
        handleChange,
        handleAvatarPreview,
        handleCancelAvatar,
        handleSubmit
    };
};

const CustomSectionContext = createContext();

export function CustomSectionProvider({ children }) {
    const [customSection, setCustomSection] = useState(false);

    return (
        <CustomSectionContext.Provider value={{ customSection, setCustomSection }}>
            {children}
        </CustomSectionContext.Provider>
    );
}

export function useCustomSection() {
    return useContext(CustomSectionContext);
}
