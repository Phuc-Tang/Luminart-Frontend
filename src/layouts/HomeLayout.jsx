import { Header, HorizontalMenu, Overview } from '../components';
import classNames from 'classnames/bind';
import styles from '../styles/layouts/HomeLayout.module.scss';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
    return (
        <div className={cx('frame')}>
            <Header />
            <Overview />
            <HorizontalMenu />
            <div>{children}</div>
        </div>
    );
}

export default HomeLayout;
