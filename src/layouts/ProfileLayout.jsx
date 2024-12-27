import classNames from 'classnames/bind';
import styles from '../styles/layouts/ProfileLayout.module.scss';

//component
import { Header, Profile, MenuProfile } from '../components';
import { CustomSectionProvider } from '../hooks/useProfile';

//custom hook
import { SectionProvider } from '../hooks/useSection';

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
    return (
        <div className={cx('frame')}>
            <CustomSectionProvider>
                <Header />
                <Profile />
                <MenuProfile />
                <SectionProvider>
                    <div>{children}</div>
                </SectionProvider>
            </CustomSectionProvider>
        </div>
    );
}

export default ProfileLayout;
