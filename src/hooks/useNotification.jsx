import { getNotificationOfUser } from '../api/notification';
import { useEffect, useState } from 'react';

export const useAllNotification = () => {
    const [isNotification, setIsNotification] = useState(null);
    const [isNotificationLoading, setNotificationLoading] = useState(true);
    const [isNotificationError, setNotificationError] = useState(null);
    // const [totalNotifications, setTotalNotifications] = useState(0)
    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await getNotificationOfUser();
                console.log(response);
                if (!response.success) {
                    setNotificationError(response.error);
                } else {
                    setIsNotification(response.notifications);
                    // setTotalNotifications((response.notifications).length);
                }
            } catch (error) {
                setNotificationError(error);
            } finally {
                setNotificationLoading(false);
            }
        };

        fetchAllUser();
    }, []);
    return { isNotification, isNotificationLoading, isNotificationError };
};
