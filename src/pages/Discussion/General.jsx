import classNames from 'classnames/bind';
import styles from '../../styles/pages/Discussions/General.module.scss';
import { useDiscussion } from '../../hooks/useDiscussion';

const cx = classNames.bind(styles);

function General() {
    const { discussion, discussLoading, discussErrors } = useDiscussion();
    console.log(discussion);

    return <div className={cx('general-frame')}>General</div>;
}

export default General;
