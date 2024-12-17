import classNames from 'classnames/bind';
import styles from '../styles/components/Overview.module.scss';
import image from '../assets/images/banner/images.jsx';
import svg from '../assets/svg/index.jsx';
import { useUser } from '../hooks/useUserInfo.jsx';
import { RevealDiscussion, RevealRank } from '../motion/Reveal.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const cx = classNames.bind(styles);

const blogs = [
    { id: 1, type: 'news', title: 'Title for blog number 1', author: 'Name', alt: '1', cover: `${image.image1}` },
    { id: 2, type: 'news', title: 'Title for blog number 2', author: 'Name', alt: '2', cover: `${image.image2}` },
    { id: 3, type: 'news', title: 'Title for blog number 3', author: 'Name', alt: '3', cover: `${image.image3}` },
    { id: 4, type: 'news', title: 'Title for blog number 4', author: 'Name', alt: '4', cover: `${image.image4}` },
    { id: 5, type: 'news', title: 'Title for blog number 5', author: 'Name', alt: '5', cover: `${image.image5}` }
];

const ranking = [
    { id: 1, color: '#ffd6ff', classOne: 'rank-1' },
    { id: 2, color: '#e7c6ff', classOne: 'rank-2' },
    { id: 3, color: '#c8b6ff', classOne: 'rank-3' },
    { id: 4, color: '#b8c0ff', classOne: 'rank-4' },
    { id: 5, color: '#bbd0ff', classOne: 'rank-5' },
    { id: 6, color: '#d6baff', classOne: 'rank-6' },
    { id: 7, color: '#f1b6ff', classOne: 'rank-7' }
];

function Overview() {
    const { user } = useUser();

    return (
        <div className={cx('frame-overview')}>
            <div className={cx('frame-blog')}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    navigation={false}
                    modules={[Autoplay]}
                    className={cx('swiper')}
                >
                    {blogs.map((blg) => {
                        return (
                            <SwiperSlide key={blg.id}>
                                <a href="#">
                                    <div className={cx('blog')}>
                                        <img className={cx('cover')} src={blg.cover} alt="1" />
                                        <div className={cx('type')}>{blg.type}</div>
                                        <p className={cx('title')}>{blg.title}</p>
                                        <p className={cx('author')}>By {blg.author}</p>
                                    </div>
                                </a>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className={cx('frame-rank')}>
                <img src={svg.threeDWhitefeatureArtist} />
                <div className={cx('raking-chart')}>
                    {ranking.map((rank) => {
                        return (
                            <RevealRank key={rank.id} color={rank.color}>
                                <div className={cx(`${rank.classOne}`)}></div>
                            </RevealRank>
                        );
                    })}
                </div>
            </div>
            <div className={cx('frame-discussion')}>
                <div className={cx('grid-container')}>
                    {[...Array(200)].map((_, index) => (
                        <div key={index} className={cx('dot')}></div>
                    ))}
                </div>
                <RevealDiscussion className={cx('reveal-text')}>
                    <p className={cx('greet')}>Hey, {user?.user?.profile?.fullName}</p>
                </RevealDiscussion>
                <RevealDiscussion className={cx('reveal-text')}>
                    <p className={cx('discussion')}>
                        I'm a <span className={cx('luminart')}>LuminArt</span>
                    </p>
                </RevealDiscussion>
                <RevealDiscussion className={cx('reveal-text')}>
                    <p className={cx('text')}>
                        Join our digital art community, where you can explore, learn, and create alongside art
                        enthusiasts. Stay updated with the latest trends, engage in meaningful discussions, and share
                        inspiration every day – it's all waiting for you!
                    </p>
                </RevealDiscussion>
                <RevealDiscussion className={cx('reveal-text')}>
                    <a href="#">
                        <div className={cx('discussion-button')}>Explore</div>
                    </a>
                </RevealDiscussion>
            </div>
        </div>
    );
}

export default Overview;
