import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getNotificationOfUser } from '../api/notification';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm fetch thông báo
    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getNotificationOfUser();
            if (response.success) {
                setNotifications(response.notifications);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Cập nhật thông báo định kỳ
    useEffect(() => {
        fetchNotifications(); // Gọi ngay lần đầu
        const interval = setInterval(fetchNotifications, 5000); // Cập nhật mỗi 5 giây
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                loading,
                error,
                refetch: fetchNotifications // Hàm để refetch khi cần
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
