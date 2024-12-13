import { AuthLayout, HomeLayout, VerifyLayout } from '../layouts';

import Home from '../pages/Home/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Profile from '../pages/Profile/Profile';
import Verify from '../pages/Auth/Verify';

// Artwork
import { Detail, Upload } from '../pages/Artwork';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/signin', component: SignIn, layout: AuthLayout },
    { path: '/signup', component: SignUp, layout: AuthLayout },
    { path: '/profile/:username', component: Profile },
    { path: '/verify-email', component: Verify, layout: VerifyLayout },
    //Artwork routes
    { path: '/artwork/:artID', component: Detail },
    { path: '/artwork/upload/', component: Upload }
];

export { publicRoutes };
