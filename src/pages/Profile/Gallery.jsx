import classNames from 'classnames/bind';
import styles from '../../styles/pages/Gallery.module.scss';

const cx = classNames.bind(styles);

function Gallery() {
    return <div className={cx('frame')}>Gallery</div>;
}

export default Gallery;
