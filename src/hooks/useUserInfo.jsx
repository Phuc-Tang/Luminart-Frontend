import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserInfo } from '../api/users'; // Hàm API để lấy thông tin người dùng

// Tạo context
const UserContext = createContext();

// Tạo Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log('data user', user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userInfo = await getUserInfo();
                console.log('data info', userInfo);
                setUser(userInfo); // Chỉ gọi setUser khi fetch dữ liệu từ API
            } catch (err) {
                console.error('Error fetching user info:', err.message);
                setUser(null);
            } finally {
                setLoading(false); // Luôn đặt loading là false ở cuối
            }
        };

        if (!user) {
            // Nếu chưa có user, mới gọi fetchUser để lấy thông tin người dùng
            fetchUser();
        } else {
            setLoading(false); // Nếu đã có user, không cần gọi lại API
        }
    }, [user]); // Chạy lại effect khi user thay đổi
    // Lấy dữ liệu khi component mount

    return <UserContext.Provider value={{ user, setUser, loading, error }}>{children}</UserContext.Provider>;
};

// Hook để sử dụng UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
