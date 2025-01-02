import classNames from 'classnames/bind';
import styles from '../../styles/pages/Discussions/Discussion.module.scss';

//data
import { categoryMenu } from '../../../data/data';
import { BannerDiscussion } from '../../components';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('frame-discussion')}>
            <BannerDiscussion />
            <div className={cx('discussion-content')}>
                <div className={cx('discussion-bar')}></div>
                <div className={cx('discussion-forum')}>
                    <div className={cx('discussion-left')}>
                        <div className={cx('overview')}>
                            <div className={cx('thead')}>
                                <p className={cx('cate')}>Oveview</p>
                                <p>Topics</p>
                                <p>Interactions</p>
                                <p>Latest</p>
                            </div>
                            <a href="/discussion/general">
                                <div className={cx('tbody')}>
                                    <div className={cx('topics')}>
                                        <div className={cx('topic')}>
                                            <p>General</p>
                                            <p className={cx('sub')}>
                                                General compilation of various discussion topics.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className={cx('tbody')}>
                                <div className={cx('topics')}>
                                    <div className={cx('topic')}>
                                        <p>New Discussions</p>
                                        <p className={cx('sub')}>Recently created discussion posts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {categoryMenu.map((cate) => {
                            return (
                                <div className={cx('category')} key={cate.id}>
                                    <div className={cx('thead')}>
                                        <p className={cx('cate')}>{cate.category}</p>
                                        <p>Threads</p>
                                        <p>Interactions</p>
                                        <p>Latest</p>
                                    </div>
                                    {cate?.topics?.map((topic) => {
                                        return (
                                            <a href={`/discussion/${topic.slug}`} key={topic.id}>
                                                <div className={cx('tbody')}>
                                                    <div className={cx('topics')}>
                                                        <div className={cx('topic')}>
                                                            <p>{topic.topic}</p>
                                                            <p className={cx('sub')}>{topic.sub}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('discussion-right')}>
                        <p className={cx('popular')}>Popular Posts</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
