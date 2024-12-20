import { getAllUser } from '../api/admin';
import { useEffect, useState } from 'react';

export const useGetAllUser = () => {
    const [isUsers, setUsers] = useState(null);
    const [isUsersLoading, setUsersLoading] = useState(true);
    const [isUsersError, setUsersError] = useState(null);

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await getAllUser();
                if (!response) {
                    setUsersError(response.error);
                } else {
                    setUsers(response.users);
                }
            } catch (error) {
                setUsersError(error);
            } finally {
                setUsersLoading(false);
            }
        };

        fetchAllUser();
    }, []);
    return { isUsers, isUsersLoading, isUsersError };
};
