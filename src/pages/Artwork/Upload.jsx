import classNames from 'classnames/bind';
import styles from '../../styles/pages/Artwork.module.scss';

const cx = classNames.bind(styles);

function ArtworkUpload() {
    return (
        <div className={cx('frame')}>
            <div className={cx('left')}></div>
            <div className={cx('right')}></div>
        </div>
    );
}

export default ArtworkUpload;
