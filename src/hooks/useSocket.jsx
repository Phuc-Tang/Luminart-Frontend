import { useEffect, useState, createContext, useContext } from 'react';

import io from 'socket.io-client';

// Tạo context cho socket
const SocketContext = createContext();

// Cấu hình URL của server Socket.IO
const SOCKET_SERVER_URL = 'http://localhost:7000';

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Kết nối tới server khi component được mount
        const newSocket = io(SOCKET_SERVER_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000
        });
        setSocket(newSocket);

        // Cleanup: Ngắt kết nối khi component bị hủy
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
