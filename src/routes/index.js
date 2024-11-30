import { AuthLayout } from '../layouts';

import Home from '../pages/Home/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn, layout: AuthLayout },
    { path: '/signup', component: SignUp, layout: AuthLayout }
];

export { publicRoutes };
