import classNames from 'classnames/bind';
import styles from '../styles/components/BannerAuth.module.scss';
import { FaCaretDown } from 'react-icons/fa';
import image from '../assets/images/banner/images.jsx';
import { RevealText, RevealImage } from '../motion/Reveal.jsx';
import LazyLoad from 'react-lazyload';

const cx = classNames.bind(styles);

const images = [
    { id: 1, classOne: 'frame-img', classTwo: '', src: `${image.image1}`, alt: '1' },
    { id: 2, classOne: 'frame-img', classTwo: '', src: `${image.image2}`, alt: '2' },
    { id: 3, classOne: 'frame-img', classTwo: '', src: `${image.image3}`, alt: '3' },
    { id: 4, classOne: 'frame-img', classTwo: '', src: `${image.image4}`, alt: '4' },
    { id: 5, classOne: 'frame-img', classTwo: '', src: `${image.image5}`, alt: '5' },
    { id: 6, classOne: 'frame-img', classTwo: '', src: `${image.image6}`, alt: '6' },
    { id: 7, classOne: 'frame-img', classTwo: '', src: `${image.image7}`, alt: '7' },
    { id: 8, classOne: 'frame-img', classTwo: '', src: `${image.image8}`, alt: '8' },
    { id: 9, classOne: 'frame-img', classTwo: '', src: `${image.image9}`, alt: '9' },
    { id: 10, classOne: 'frame-img', classTwo: '', src: `${image.image10}`, alt: '10' },
    { id: 11, classOne: 'frame-img', classTwo: '', src: `${image.image11}`, alt: '11' },
    { id: 12, classOne: 'frame-img', classTwo: '', src: `${image.image12}`, alt: '12' },
    {
        id: 13,
        classOne: 'frame-img',
        classTwo: 'frame-text',
        src: '',
        alt: '13',
        slogan: 'Unleash Your Vision, Inspire the World.',
        welcome: 'Welcome to the platform that connects creative minds.',
        icon: <FaCaretDown className={cx('icon')} />
    },
    {
        id: 14,
        classOne: 'frame-img',
        classTwo: 'frame-text',
        src: '',
        alt: '14',
        dash: <hr className={cx('dash')}></hr>,
        welcome: 'Here, you can share your artwork, discover unique ideas, and inspire fellow art enthusiasts.'
    },
    { id: 15, classOne: 'frame-img', classTwo: 'frame-text', src: '', alt: '15' },
    { id: 16, classOne: 'frame-img', classTwo: '', src: `${image.image16}`, alt: '16' },
    { id: 17, classOne: 'frame-img', classTwo: '', src: `${image.image17}`, alt: '17' },
    { id: 18, classOne: 'frame-img', classTwo: '', src: `${image.image18}`, alt: '18' },
    { id: 19, classOne: 'frame-img', classTwo: '', src: `${image.image19}`, alt: '19' },
    { id: 20, classOne: 'frame-img', classTwo: '', src: `${image.image20}`, alt: '20' }
];

function BannerAuth() {
    return (
        <div className={cx('frame')}>
            <div className={cx('frame-box')}>
                {images.map((item) => {
                    return item.src === '' ? (
                        <div key={item.id} className={cx(`${item.classTwo}`)}>
                            <RevealText>
                                <p className={cx('slogan')}>{item.slogan}</p>
                            </RevealText>
                            {item.dash}
                            <RevealText>
                                <p className={cx('welcome')}>{item.welcome}</p>
                            </RevealText>
                            <RevealText>
                                <div className={cx('frame-icon')}>{item.icon}</div>
                            </RevealText>
                        </div>
                    ) : (
                        <div key={item.id} className={cx(`${item.classOne}`)}>
                            <LazyLoad height={260} offset={100}>
                                <RevealImage>
                                    <img
                                        src={item.src}
                                        loading="lazy"
                                        alt={item.alt}
                                        style={{
                                            transition: `opacity 0.5s ease-in-out ${item.id * 0.2}s` // Delay cho mỗi ảnh
                                        }}
                                    />
                                </RevealImage>
                            </LazyLoad>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BannerAuth;
