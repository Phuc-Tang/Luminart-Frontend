import classNames from 'classnames/bind';
import styles from '../../styles/pages/Sections/SpotlightArtwork.module.scss';
import { useState, useEffect } from 'react';

//custom hook
import { useUser } from '../../hooks/useUserInfo';

//icons
import { IoIosImage, IoIosImages, IoIosPaper } from 'react-icons/io';

//components
import { GalleryModal } from '../../components/Modal';

const cx = classNames.bind(styles);

function SpotlightArtwork({ name, artworks, userID, sectionID }) {
    const { user } = useUser();
    const [isGallery, setGallery] = useState(false);

    const handleClick = () => {
        setGallery(true);
    };

    return (
        <div className={cx('frame-spotlight-artwork')}>
            {artworks?.length > 0 && user?.user?.userID !== userID ? null : (
                <div className={cx('title')}>
                    <p>{name}</p>
                </div>
            )}
            <div className={cx('spotlight-artwork')}>
                {artworks?.length > 0 ? (
                    artworks.map((art) => {
                        return (
                            <div className={cx('frame-artwork')} key={art.artID}>
                                <img src={art.art[0]} alt={art.title} />
                            </div>
                        );
                    })
                ) : user?.user?.userID === userID ? (
                    <div className={cx('frame-spotlight')}>
                        <div className={cx('spotlight-input')} onClick={handleClick}>
                            <div className={cx('icon')}>
                                <IoIosImage />
                            </div>
                            <h3>Artwork spotlight</h3>
                            <p>Showcase your most impressive artwork here.</p>
                        </div>
                    </div>
                ) : null}
            </div>
            <GalleryModal
                className={cx('modal')}
                isGallery={isGallery}
                setGallery={setGallery}
                sectionID={sectionID}
                userID={userID}
            />
        </div>
    );
}

export default SpotlightArtwork;
