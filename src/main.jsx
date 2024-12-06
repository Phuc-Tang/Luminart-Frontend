import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/GlobalStyles.scss';
import { UserProvider } from './hooks/useUserInfo.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </StrictMode>
);
