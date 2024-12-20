import { Sidebar, Header } from '../components';
import classNames from 'classnames/bind';
import styles from '../styles/layouts/AdminLayout.module.scss';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('frame')}>
            <Header />
            <div className={cx('frame-admin')}>
                <Sidebar className={cx('sidebar')} />
                <div className={cx('children')}>{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout;
