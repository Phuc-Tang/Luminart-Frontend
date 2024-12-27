import classNames from 'classnames/bind';
import styles from '../../styles/pages/Sections/ListSection.module.scss';

//icons
import { IoIosImage, IoIosImages, IoIosPaper } from 'react-icons/io';

const cx = classNames.bind(styles);

export const TableSectionLeft = ({ handleCreateSection }) => {
    // thêm vị trí hiển thị cho mỗi section
    return (
        <div className={cx('frame-left')}>
            <div className={cx('grid-section-left')}>
                <div
                    className={cx('section')}
                    onClick={() => handleCreateSection('Artwork Spotlight', 'SpotlightArtwork', 'left')}
                >
                    <div className={cx('content')}>
                        <div className={cx('icon')}>
                            <IoIosImage />
                        </div>
                        <p className={cx('name')}>Artwork Spotlight</p>
                    </div>
                </div>
                <div
                    className={cx('section')}
                    onClick={() => handleCreateSection('Featured Gallery', 'FeaturedGallery', 'left')}
                >
                    <div className={cx('content')}>
                        <div className={cx('icon')}>
                            <IoIosImages />
                        </div>
                        <p className={cx('name')}>Featured Gallery</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TableSectionRight = ({ handleCreateSection }) => {
    return (
        <div className={cx('frame-right')}>
            <div className={cx('grid-section-right')}>
                <div
                    className={cx('section')}
                    onClick={() => handleCreateSection('Post Spotlight', 'SpotlightPost', 'right')}
                >
                    <div className={cx('content')}>
                        <div className={cx('icon')}>
                            <IoIosPaper />
                        </div>
                        <p className={cx('name')}>Post Spotlight</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
