import classNames from 'classnames/bind';
import styles from '../../styles/pages/Dashboard.module.scss';

const cx = classNames.bind(styles);
function Dashboard() {
    return (
        <div className={cx('frame-dashboard')}>
            <div className={cx('dashboard')}></div>
        </div>
    );
}

export default Dashboard;
