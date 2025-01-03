import classNames from 'classnames/bind';
import styles from '../../styles/pages/Home.module.scss';
import { usePaginatedArtwork } from '../../hooks/useArtwork';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import { ImSpinner10 } from 'react-icons/im';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const { artworks, artLoading, errors, hasMore, loadMore } = usePaginatedArtwork();
    const location = useLocation();
    const { searchResult } = location.state || {};
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');

    return (
        <div className={cx('frame')}>
            <div className={cx('frame-tag')}>
                <p className={cx('tag')}>All Channels</p>
            </div>
            {artLoading ? (
                <div className={cx('splash')}>
                    <div className={cx('splash-content')}>
                        <ImSpinner10 className={cx('spinner')} />
                        <p>Loading artworks...</p>
                    </div>
                </div>
            ) : (
                <InfiniteScroll
                    style={{ overflow: 'hidden', height: 'auto' }}
                    dataLength={artworks.length} // Số lượng artworks hiện tại
                    next={loadMore} // Hàm tải thêm
                    hasMore={hasMore} // Xác định còn dữ liệu hay không
                    loader={artLoading} // Hiển thị khi đang tải
                    endMessage={<p></p>} // Hiển thị khi hết dữ liệu
                >
                    <div className={cx('grid-artwork')}>
                        {errors ? (
                            <div>Error: {errors}</div> // Hiển thị khi có lỗi
                        ) : artworks.length === 0 ? (
                            <div>No artworks found</div> // Hiển thị khi không có artwork
                        ) : (
                            searchResult.map((art, index) => {
                                return art?.status === 1 ? (
                                    <a href={`/artwork/${art.artID}`} key={art.artID}>
                                        <motion.div
                                            className={cx('frame-artwork')}
                                            initial={{ opacity: 0 }} // Bắt đầu với độ mờ
                                            animate={{ opacity: 1 }} // Dần dần xuất hiện
                                            transition={{
                                                duration: 0.6, // Thời gian hiệu ứng
                                                ease: 'easeOut', // Hiệu ứng ease-out
                                                delay: index * 0.1 // Độ trễ để các phần tử xuất hiện từ trái sang phải
                                            }}
                                        >
                                            <div className={cx('background')}>
                                                <img
                                                    className={cx('img')}
                                                    effect="blur"
                                                    loading="lazy"
                                                    src={`${art.art[0]}`}
                                                    alt={art.title}
                                                />
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
                                        </motion.div>
                                    </a>
                                ) : null;
                            })
                        )}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Search;
