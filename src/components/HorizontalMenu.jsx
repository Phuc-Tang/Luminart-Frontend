import classNames from 'classnames/bind';
import styles from '../styles/components/HorizontalMenu.module.scss';
import { subjectData } from '../../data/data';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const cx = classNames.bind(styles);

const subject = [
    { id: 1, subject: 'Textures & Materials' },
    { id: 2, subject: 'Comic Art' },
    { id: 3, subject: 'Sketches' },
    { id: 4, subject: 'Fantasy' },
    { id: 5, subject: 'Environmental Concept Art & Design' },
    { id: 6, subject: 'Charater Design' },
    { id: 7, subject: 'Pixel & Voxel' },
    { id: 8, subject: 'Matte Painting' }
];

function HorizontalMenu() {
    return (
        <div className={cx('frame-subject')}>
            <div className={cx('all-channels')}>
                <div className={cx('icon')}></div>
                <p className={cx('all-channels-text')}>All Channels</p>
            </div>

            <Swiper
                spaceBetween={10}
                slidesPerView={6}
                loop={false}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                navigation={false}
            >
                {subjectData.map((subj) => {
                    return (
                        <SwiperSlide key={subj.id}>
                            <div className={cx('frame-subj')}>
                                <div className={cx('avatar')}>
                                    <img src={subj.subjectImg} alt={subj.subject} />
                                </div>
                                <p className={cx('subject')}>{subj.subject}</p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default HorizontalMenu;
