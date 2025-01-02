import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/GlobalStyles.scss';
import { UserProvider } from './hooks/useUserInfo.jsx';
import { SocketProvider } from './hooks/useSocket.jsx';
import { ToastContainer, Slide } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SocketProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </SocketProvider>
    </StrictMode>
);
