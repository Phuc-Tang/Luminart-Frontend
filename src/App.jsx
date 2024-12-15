import classNames from 'classnames/bind';
import styles from '../src/styles/components/Splash.module.scss';
import { ImSpinner10 } from 'react-icons/im';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { publicRoutes } from './routes';
import { MainLayout } from './layouts';
import { useUser } from './hooks/useUserInfo';

const cx = classNames.bind(styles);

function App() {
    const HOSTING_URL = import.meta.env.VITE_HOSTING_URL;
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className={cx('splash')}>
                <div className={cx('splash-content')}>
                    <ImSpinner10 className={cx('spinner')} />
                    <p className={cx('luminart')}>LUMINART</p>
                </div>
            </div>
        );
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = MainLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.protect && (!user || user.success === false) ? (
                                        <Navigate to="/signin" replace />
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
