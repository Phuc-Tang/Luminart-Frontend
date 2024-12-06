import classNames from 'classnames/bind';
import styles from '../../../styles/pages/Sections/Sections.module.scss';

const cx = classNames.bind(styles);

function SpotlightArtwork() {
    return (
        <div className={cx('frame-spotlight-artwork')}>
            <div className={cx('title')}>
                <p>Spotlight Artwork</p>
            </div>
            <div className={cx('spotligh-artwork')}></div>
        </div>
    );
}

export default SpotlightArtwork;
