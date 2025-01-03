import { useState } from 'react';
import { followUser } from '../api/users';
import { useUser } from './useUserInfo';

export const useFollowUser = () => {
    const { user, login } = useUser(); // Lấy thông tin user từ context
    const [isFollowloading, setFollowLoading] = useState(false); // Trạng thái loading
    const [isFollowError, setFollowError] = useState(null); // Trạng thái lỗi
    const followerID = user?.user?.userID;

    const followUser = async (followingID) => {
        if (!user) {
            setFollowError('You must be logged in to follow users.');
            return;
        }

        setFollowLoading(true);
        setFollowError(null);

        try {
            const response = await followUser(followerID, followingID); // `user.id` là `followerID`
            if (response.error) {
                setFollowError(response.error);
            } else {
                // Nếu API trả về trạng thái thành công, cập nhật thông tin người dùng
                const updatedUser = {
                    ...user,
                    following: [...user.following, followingID] // Thêm user vào danh sách following
                };
                login(updatedUser); // Cập nhật thông tin trong context
            }
        } catch (err) {
            setFollowError('An error occurred while trying to follow the user.');
            console.error(err);
        } finally {
            setFollowLoading(false);
        }
    };

    return { followUser, loading, error };
};
