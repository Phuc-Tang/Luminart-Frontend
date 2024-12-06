import { useState, useEffect } from 'react';
import { getProfile } from '../api/users';

export const useProfileUser = (id) => {
    // Thêm id như một tham số cho hook
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!id) return; // Kiểm tra xem id có hợp lệ không

            try {
                const userInfo = await getProfile(id);
                if (userInfo?.error) {
                    setError(userInfo.error); // Cập nhật lỗi nếu có
                    setProfileUser(null);
                } else {
                    setProfileUser(userInfo); // Cập nhật thông tin người dùng
                }
            } catch (error) {
                console.error('Error fetching user info:', error.message);
                setError(error.message);
                setProfileUser(null); // Đặt lại profileUser nếu có lỗi
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };

        fetchProfile();
    }, [id]); // Chạy lại mỗi khi id thay đổi

    return { profileUser, loading, error };
};
