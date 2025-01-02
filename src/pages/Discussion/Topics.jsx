import classNames from 'classnames/bind';
import styles from '../../styles/pages/Discussions/Topics.module.scss';
import { ToastContainer, Slide } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//data - images
import { categoryMenu } from '../../../data/data';
import image from '../../assets/images/banner/images';

//components
import { Breadcrumb } from '../../components';
import { DiscussionModal } from '../../components/Modal';

//custom hooks
import { useDiscussion } from '../../hooks/useDiscussion';
import { useUser } from '../../hooks/useUserInfo';

//until
import { formatDate } from '../../utils/string/stringUtils';

const cx = classNames.bind(styles);

function Topics() {
    const { topic } = useParams();
    const { user } = useUser();
    const { discussions, discussLoading, isSubmitting, fetchDiscussionsByTopic } = useDiscussion();
    const [isDiscussion, setDiscussion] = useState(false);

    useEffect(() => {
        fetchDiscussionsByTopic(topic);
    }, [fetchDiscussionsByTopic, topic]);

    if (discussLoading) return <p>Loading discussions...</p>;

    const findCategoryAndTopicBySlug = (slug) => {
        for (const category of categoryMenu) {
            const topicFound = category.topics.find((t) => t.slug === slug);
            if (topicFound) {
                return { category, topic: topicFound }; // Trả về cả category và topic
            }
        }
        return null; // Nếu không tìm thấy
    };
    const categoryAndTopic = findCategoryAndTopicBySlug(topic);

    if (!categoryAndTopic) {
        return <div>Topic not found.</div>;
    }

    const { category, topic: topicData } = categoryAndTopic;
    const cate = category.category;

    const handleOpenModal = () => {
        setDiscussion(true);
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Discussion', link: '/discussion' },
        { label: `${topicData.topic}`, link: '#' }
    ];

    return (
        <div className={cx('topic-frame')}>
            <div className={cx('topic-cover')}>
                <img src={image.topicBackground} alt={topic} />
                <div className={cx('topic-overlay')}></div>
                <div className={cx('cover-content')}>
                    <Breadcrumb items={breadcrumbItems} />
                    <div className={cx('cover-handle')}>
                        <div className={cx('search')}>
                            <div className={cx('button')}>Search</div>
                            <input type="text" placeholder="Search this discussion" />
                        </div>
                        {user?.user?.userID ? (
                            <div className={cx('create-topic')} onClick={handleOpenModal}>
                                Create Topic
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={cx('topic-grid')}>
                <div className={cx('topic-content')}>
                    <div className={cx('thead')}>
                        <p className={cx('cate')}>{topicData ? topicData.topic : topic}</p>
                        <p>Create Day</p>
                        <p>Favorites</p>
                        <p>Started By</p>
                    </div>
                    {discussions.map((dis, index) => {
                        return (
                            <a href={`/discussion/detail/${dis.discussionID}`} key={index}>
                                <div className={cx('tbody')}>
                                    <div className={cx('topics')}>
                                        <div className={cx('topic')}>
                                            <p className={cx('title')}>{dis.title}</p>
                                            <p className={cx('create-time')}>
                                                {formatDate(dis?.metadata?.create_time)}
                                            </p>
                                            <p className={cx('like-count')}>
                                                {dis?.like_count + dis?.comment_count || 0}
                                            </p>
                                            <p className={cx('fullname')}>
                                                {dis?.userID === user?.user?.userID
                                                    ? user?.user?.profile?.fullName
                                                    : dis?.user?.fullName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
                <div className={cx('topic-popular')}></div>
            </div>
            <DiscussionModal
                className={cx('modal')}
                isDiscussion={isDiscussion}
                setDiscussion={setDiscussion}
                topic={topic}
                cate={cate}
            />
            <ToastContainer
                toastClassName={cx('custom-toast')}
                bodyClassName={cx('custom-body')}
                progressClassName={cx('custom-progress')}
                position="top-left"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </div>
    );
}

export default Topics;
