import classNames from 'classnames/bind';
import styles from '../styles/components/Sidebar.module.scss';

//icons
import { MdDashboard, MdManageAccounts } from 'react-icons/md';
import { FaImages } from 'react-icons/fa';
import { RiDiscussFill } from 'react-icons/ri';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('frame-sidebar')}>
            <div className={cx('side')}>
                <p className={cx('header')}>Overview</p>
                <div className={cx('frame-manage')}>
                    <a href="#">
                        <div className={cx('tab')}>
                            <p>
                                <MdDashboard /> Dashboard
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div className={cx('side')}>
                <p className={cx('header')}>Management</p>
                <div className={cx('frame-manage')}>
                    <a href="/admin/user-management">
                        <div className={cx('tab')}>
                            <p>
                                <MdManageAccounts /> User
                            </p>
                        </div>
                    </a>
                    <a href="#">
                        <div className={cx('tab')}>
                            <p>
                                <FaImages /> Artwork
                            </p>
                        </div>
                    </a>
                    <a href="#">
                        <div className={cx('tab')}>
                            <p>
                                <RiDiscussFill /> Discusstion
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div className={cx('side')}>
                <p className={cx('header')}>other</p>
            </div>
        </div>
    );
}

export default Sidebar;
