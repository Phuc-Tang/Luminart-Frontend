import classNames from 'classnames/bind';
import styles from '../../styles/pages/Favorites.module.scss';

const cx = classNames.bind(styles);

function Favorites() {
    return <div className={cx('frame')}>Favorites</div>;
}

export default Favorites;
