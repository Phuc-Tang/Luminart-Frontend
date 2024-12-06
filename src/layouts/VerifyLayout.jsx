import classNames from 'classnames/bind';
import styles from '../styles/layouts/AuthLayout.module.scss';

const cx = classNames.bind(styles);

function VerifyLayout({ children }) {
    return (
        <div className={cx('container')}>
            <div>{children}</div>
        </div>
    );
}

export default VerifyLayout;
