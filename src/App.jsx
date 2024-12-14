import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { publicRoutes } from './routes';
import { MainLayout } from './layouts';
import { useUser } from './hooks/useUserInfo';

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
        return <div>Loading...</div>;
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
