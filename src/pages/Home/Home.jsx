import classNames from 'classnames/bind';
import styles from '../../styles/pages/Home.module.scss';
import image from '../../assets/images/banner/images';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('frame')}>
            <div className={cx('frame-tag')}>
                <p className={cx('tag')}>All Channels</p>
            </div>
            <div className={cx('grid-artwork')}>
                <div className={cx('frame-artwork')}>
                    <div className={cx('background')}>
                        <img src={image.image6} alt="artwork" />
                        <div className={cx('overlay')}></div>
                    </div>
                    <div className={cx('hover')}>
                        <div className={cx('content')}>
                            <div className={cx('avatar')}>
                                <img src={image.image6} alt="avatar" />
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('title')}>title of artwork</p>
                                <p className={cx('author')}>author</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
