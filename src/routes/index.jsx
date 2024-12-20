import { AuthLayout, HomeLayout, VerifyLayout, AdminLayout } from '../layouts';

import Home from '../pages/Home/Home';
import Search from '../pages/Home/Search';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Profile from '../pages/Profile/Profile';
import Verify from '../pages/Auth/Verify';
import { Update } from '../pages/Profile';

// Artwork
import { Detail, Upload } from '../pages/Artwork';

// Admin
import Dashboard from '../pages/Admin/Dashboard';
import { Manage } from '../pages/Admin/Manage';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout, protect: false, role: 1 },
    { path: '/search', component: Search, layout: HomeLayout, protect: false, role: 1 },
    { path: '/signin', component: SignIn, layout: AuthLayout, protect: false, role: 1 },
    { path: '/signup', component: SignUp, layout: AuthLayout, protect: false, role: 1 },
    { path: '/verify-email', component: Verify, layout: VerifyLayout, protect: false, role: 1 },

    //Artwork routes
    { path: '/artwork/:artID', component: Detail, protect: false, role: 1 },
    { path: '/artwork/upload/', component: Upload, protect: true, role: 1 },

    //User routes
    { path: '/profile/:username', component: Profile, protect: false, role: 1 },
    { path: '/profile/update/', component: Update, protect: true, role: 1 },

    //Admin routes
    { path: '/admin/dashboard/', component: Dashboard, layout: AdminLayout, protect: true, role: 0 },
    { path: '/admin/user-management/', component: Manage, layout: AdminLayout, protect: true, role: 0 }
];

export { publicRoutes };
