import classNames from 'classnames/bind';
import styles from '../../styles/pages/Gallery.module.scss';
import { usePaginatedArtwork } from '../../hooks/useArtwork';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUser } from '../../hooks/useUserInfo';

const cx = classNames.bind(styles);

function Gallery() {
    const { user } = useUser();
    const { artworks, loading, errors, hasMore, loadMore } = usePaginatedArtwork();
    console.log(user?.user?.userID);

    return (
        <div className={cx('frame')}>
            <InfiniteScroll
                style={{ overflow: 'hidden', height: 'auto', marginTop: '20px' }}
                dataLength={artworks.length} // Số lượng artworks hiện tại
                next={loadMore} // Hàm tải thêm
                hasMore={hasMore} // Xác định còn dữ liệu hay không
                loader={loading} // Hiển thị khi đang tải
                endMessage={<p></p>} // Hiển thị khi hết dữ liệu
            >
                <div className={cx('grid-artwork')}>
                    {errors ? (
                        <div>Error: {errors}</div> // Hiển thị khi có lỗi
                    ) : artworks.length === 0 ? (
                        <div>No artworks found</div> // Hiển thị khi không có artwork
                    ) : (
                        artworks.map((art) => {
                            return user?.user?.userID === art?.user?.userID ? (
                                <a href={`/artwork/${art.artID}`} key={art.artID}>
                                    <div className={cx('frame-artwork')}>
                                        <div className={cx('background')}>
                                            <img loading="lazy" src={`${art.art[0]}`} alt={art.title} />
                                            <div className={cx('overlay')}></div>
                                        </div>
                                        <div className={cx('hover')}>
                                            <div className={cx('content')}>
                                                <div className={cx('avatar')}>
                                                    <img src={`${art.user.avatar}`} alt="avatar" />
                                                </div>
                                                <div className={cx('info')}>
                                                    <p className={cx('title')}>{art.title}</p>
                                                    <p className={cx('author')}>{art.user.fullName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ) : null;
                        })
                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Gallery;
