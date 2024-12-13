import { useEffect, useState, createContext, useContext } from 'react';
import { getUserInfo, signOut as signOutAPI } from '../api/users';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Xử lý trạng thái tải dữ liệu

    const login = (userInfo) => setUser(userInfo);
    const signOut = async () => {
        try {
            // Gọi API signOut để logout người dùng từ backend
            const result = await signOutAPI();
            if (result.error) {
                console.error('Logout failed:', result.error);
            } else {
                // Nếu đăng xuất thành công, xóa thông tin người dùng trong context
                setUser(null);
            }
        } catch (error) {
            console.error('An error occurred while signing out:', error);
        }
    };

    // Lấy thông tin người dùng khi ứng dụng tải
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(); // API gọi bằng cookie
                setUser(userInfo);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                setUser(null); // Đặt lại trạng thái nếu không thành công
            } finally {
                setLoading(false); // Hoàn tất việc tải dữ liệu
            }
        };

        fetchUserInfo();
    }, []);

    return <UserContext.Provider value={{ user, login, signOut, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
