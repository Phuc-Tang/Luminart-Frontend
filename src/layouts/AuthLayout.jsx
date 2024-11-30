import BannerAuth from '../components/BannerAuth';
import classNames from 'classnames/bind';
import styles from '../styles/layouts/AuthLayout.module.scss';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    return (
        <div className={cx('container')}>
            <div>{children}</div>
            <BannerAuth />
        </div>
    );
}

export default AuthLayout;
