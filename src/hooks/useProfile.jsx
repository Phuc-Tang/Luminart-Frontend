import { useState, useEffect } from 'react';
import { getProfile } from '../api/users';

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
