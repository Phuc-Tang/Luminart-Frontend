import classNames from 'classnames/bind';
import styles from '../../styles/pages/Posts.module.scss';

const cx = classNames.bind(styles);

function Posts() {
    return <div className={cx('frame')}>Posts</div>;
}

export default Posts;
