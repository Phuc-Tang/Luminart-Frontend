import classNames from 'classnames/bind';
import styles from '../../styles/pages/Home.module.scss';
import { usePaginatedArtwork } from '../../hooks/useArtwork';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import { ImSpinner10 } from 'react-icons/im';
import { useSignInGoogle } from '../../hooks/useAuth';

const cx = classNames.bind(styles);

function Home({}) {
    const { artworks, artLoading, errors, hasMore, loadMore } = usePaginatedArtwork();

    return (
        <div className={cx('frame')}>
            <div className={cx('frame-tag')}>
                <p className={cx('tag')}>All Channels</p>
            </div>

            <InfiniteScroll
                style={{ overflow: 'hidden', height: 'auto' }}
                dataLength={artworks.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                    <div className={cx('splash')}>
                        <div className={cx('splash-content')}>
                            <ImSpinner10 className={cx('spinner')} />
                            <p>Loading artworks...</p>
                        </div>
                    </div>
                }
                endMessage={<p></p>}
            >
                <div className={cx('grid-artwork')}>
                    {errors ? (
                        <div>Error: {errors}</div>
                    ) : artworks.length === 0 ? (
                        <div>No artworks found</div>
                    ) : (
                        artworks.map((art, index) => {
                            return art?.status === 1 ? (
                                <a href={`/artwork/${art.artID}`} key={art.artID}>
                                    <motion.div
                                        className={cx('frame-artwork')}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: 'easeOut',
                                            delay: index * 0.1
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
        </div>
    );
}

export default Home;
