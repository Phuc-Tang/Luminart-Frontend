import classNames from 'classnames/bind';
import styles from '../styles/pages/Discussions/Discussion.module.scss';
import image from '../assets/images/banner/images';

const typeMenu = [
    { id: 1, type: 'Learning', thumbnail: `${image.learning}` },
    { id: 2, type: 'News', thumbnail: `${image.news}` },
    { id: 3, type: 'Blog', thumbnail: `${image.blog}` },
    { id: 4, type: 'Q&A', thumbnail: `${image.qna}` },
    { id: 5, type: 'Tutorial', thumbnail: `${image.tutorial}` }
];

const cx = classNames.bind(styles);

function BannerDiscussion() {
    return (
        <div className={cx('discussion-cover')}>
            <img src={image.discussion} alt="discussion-cover" loading="lazy" />
            <div className={cx('overlay')}></div>
            <div className={cx('discussion-title')}>
                <p>Discussion</p>
            </div>
            <div className={cx('discussion-type')}>
                {typeMenu.map((type) => {
                    return (
                        <div className={cx('menu-type')} key={type.id}>
                            <img src={type.thumbnail} alt={type.type} />
                            <div className={cx('overlay-type')}></div>
                            <p>{type.type} </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BannerDiscussion;
