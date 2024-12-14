import classNames from 'classnames/bind';
import styles from '../../styles/pages/Home.module.scss';
import { useAllArtwork } from '../../hooks/useArtwork';
import { usePaginatedArtwork } from '../../hooks/useArtwork';
import InfiniteScroll from 'react-infinite-scroll-component';

const cx = classNames.bind(styles);

function Home() {
    // const { artwork, loading, errors } = useAllArtwork();
    const { artworks, loading, errors, hasMore, loadMore } = usePaginatedArtwork();

    return (
        <div className={cx('frame')}>
            <div className={cx('frame-tag')}>
                <p className={cx('tag')}>All Channels</p>
            </div>
            <InfiniteScroll
                style={{ overflow: 'hidden', height: 'auto' }}
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
                            return art?.status === 1 ? (
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

export default Home;
