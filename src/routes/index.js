import { AuthLayout, HomeLayout, VerifyLayout } from '../layouts';

import Home from '../pages/Home/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Profile from '../pages/Profile/Profile';
import Verify from '../pages/Auth/Verify';

const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/signin', component: SignIn, layout: AuthLayout },
    { path: '/signup', component: SignUp, layout: AuthLayout },
    { path: '/profile/:id', component: Profile },
    { path: '/verify-email', component: Verify, layout: VerifyLayout }
];

export { publicRoutes };
