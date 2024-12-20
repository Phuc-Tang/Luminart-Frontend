import classNames from 'classnames/bind';
import styles from '../../styles/pages/Manage.module.scss';
import { formatDate } from '../../utils/string/stringUtils';

// Breadcrumb
import { Breadcrumb } from '../../components';

// Custom hook
import { useGetAllUser } from '../../hooks/useAdmin';

const cx = classNames.bind(styles);
const breadcrumbItems = [
    { label: 'Dashboard', link: '/admin/dashboard' },
    { label: 'User Management', link: '/admin/user-management' }
];

export const Manage = () => {
    //custom hook
    const { isUsers, isUsersLoading, isUsersError } = useGetAllUser();
    console.log(isUsers);

    return (
        <div className={cx('frame-manage')}>
            <Breadcrumb items={breadcrumbItems} />
            <div className={cx('frame-user')}>
                <p className={cx('header')}>User Management</p>
                <div className={cx('table', 'fixed')}>
                    <div className={cx('columns')}>
                        <p style={{ width: '2%' }}>#</p>
                        <p style={{ width: '50%' }}>User</p>
                        <p style={{ width: '15%' }}>Positon</p>
                        <p style={{ width: '15%' }}>Joined</p>
                        <p>Option</p>
                    </div>
                </div>
                <div className={cx('table', 'scroll')}>
                    {isUsers &&
                        isUsers.map((user, index) => {
                            return (
                                <div className={cx('content')} key={user.userID}>
                                    <div className={cx('index')} style={{ width: '2%' }}>
                                        {index + 1}
                                    </div>
                                    <div className={cx('user')} style={{ width: '50%' }}>
                                        <div className={cx('avatar')}>
                                            <img src={user?.profile?.avatar} alt="" />
                                        </div>
                                        <div className={cx('info')}>
                                            <p className={cx('fullname')}>{user?.profile?.fullName}</p>
                                            <p className={cx('email')}>{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className={cx('position')} style={{ width: '15%' }}>
                                        {user?.profile?.position}
                                    </div>
                                    <div className={cx('joined')} style={{ width: '15%' }}>
                                        {formatDate(user?.metadata?.create_time)}
                                    </div>
                                    <div className={cx('option')}>Edit</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
