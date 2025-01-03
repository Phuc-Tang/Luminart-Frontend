import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/GlobalStyles.scss';
import { UserProvider } from './hooks/useUserInfo.jsx';
import { SocketProvider } from './hooks/useSocket.jsx';
import { NotificationProvider } from './hooks/useNotification.jsx';
import { ToastContainer, Slide } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SocketProvider>
            <NotificationProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </NotificationProvider>
        </SocketProvider>
    </StrictMode>
);
