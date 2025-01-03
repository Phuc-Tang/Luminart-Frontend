import classNames from 'classnames/bind';
import styles from '../src/styles/components/Splash.module.scss';
import { ImSpinner10 } from 'react-icons/im';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { publicRoutes } from './routes';
import { MainLayout } from './layouts';
import { useUser } from './hooks/useUserInfo';
import { useSocket } from './hooks/useSocket';
import { ToastContainer, toast, Slide } from 'react-toastify';

const cx = classNames.bind(styles);

function App() {
    const HOSTING_URL = import.meta.env.VITE_HOSTING_URL;
    const { user } = useUser();
    const [notification, setNotification] = useState(null);
    const { socket } = useSocket(); // Sử dụng socket từ context
    const userID = user?.user?.userID;

    useEffect(() => {
        // Lắng nghe thông báo khi có dữ liệu mới từ server
        if (socket && userID) {
            socket.emit('authenticate', userID);
            socket.on('notification', (data) => {
                console.log(data);
                toast(
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={data && data.avatarSender}
                            width={50}
                            height={50}
                            alt="Toast Icon"
                            style={{ borderRadius: '50%', marginRight: '10px' }}
                        />
                        <span>{data && data.message}</span>
                    </div>,
                    {
                        className: 'custom-toast-success',
                        bodyClassName: 'custom-body-success',
                        progressClassName: 'custom-progress-success'
                    }
                );
            });

            // Cleanup khi component bị hủy
            return () => {
                socket.off('notification');
                socket.off('authenticate');
            };
        }
    }, [socket, userID]);

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
                                    route.protect ? (
                                        !user ||
                                        user.success === false ||
                                        (route.role !== undefined &&
                                            user?.user?.role !== route.role &&
                                            user?.user?.role !== 0) ? (
                                            <Navigate to="/" replace />
                                        ) : (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        )
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
            <ToastContainer
                toastClassName={cx('custom-toast')}
                bodyClassName={cx('custom-body')}
                progressClassName={cx('custom-progress')}
                position="top-left"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </Router>
    );
}

export default App;
