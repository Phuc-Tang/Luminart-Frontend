import { AuthLayout, HomeLayout, VerifyLayout } from '../layouts';

import Home from '../pages/Home/Home';
import Search from '../pages/Home/Search';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Profile from '../pages/Profile/Profile';
import Verify from '../pages/Auth/Verify';
import { Update } from '../pages/Profile';

// Artwork
import { Detail, Upload } from '../pages/Artwork';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout, protect: false },
    { path: '/search', component: Search, layout: HomeLayout, protect: false },
    { path: '/signin', component: SignIn, layout: AuthLayout, protect: false },
    { path: '/signup', component: SignUp, layout: AuthLayout, protect: false },
    { path: '/verify-email', component: Verify, layout: VerifyLayout, protect: false },
    //Artwork routes
    { path: '/artwork/:artID', component: Detail, protect: false },
    { path: '/artwork/upload/', component: Upload, protect: true },
    //User routes
    { path: '/profile/:username', component: Profile, protect: false },
    { path: '/profile/update/', component: Update, protect: true }
];

export { publicRoutes };
