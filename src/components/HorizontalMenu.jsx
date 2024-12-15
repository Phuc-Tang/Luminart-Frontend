import classNames from 'classnames/bind';
import styles from '../styles/components/HorizontalMenu.module.scss';
import { subjectData } from '../../data/data';
import { useSubjectArtwork } from '../hooks/useArtwork';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const cx = classNames.bind(styles);

function HorizontalMenu() {
    const { subject, subjectLoading, subjectError } = useSubjectArtwork();
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
                {subject.map((subj) => {
                    return (
                        <SwiperSlide key={subj.subjectID}>
                            <div className={cx('frame-subj')}>
                                <div className={cx('avatar')}>
                                    <img src={subj.thumbnail} alt={subj.label} />
                                </div>
                                <p className={cx('subject')}>{subj.label}</p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default HorizontalMenu;
