import { AuthLayout, HomeLayout, VerifyLayout } from '../layouts';

import Home from '../pages/Home/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Profile from '../pages/Profile/Profile';
import Verify from '../pages/Auth/Verify';

// Artwork
import { Detail, Upload } from '../pages/Artwork';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout, protect: false },
    { path: '/signin', component: SignIn, layout: AuthLayout, protect: false },
    { path: '/signup', component: SignUp, layout: AuthLayout, protect: false },
    { path: '/profile/:username', component: Profile, protect: false },
    { path: '/verify-email', component: Verify, layout: VerifyLayout, protect: false },
    //Artwork routes
    { path: '/artwork/:artID', component: Detail, protect: false },
    { path: '/artwork/upload/', component: Upload, protect: true }
];

export { publicRoutes };
