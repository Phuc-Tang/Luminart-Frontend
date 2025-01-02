import classNames from 'classnames/bind';
import styles from '../../styles/pages/Discussions/Detail.module.scss';
import { useParams } from 'react-router-dom';

//custom hook
import { useDiscussion } from '../../hooks/useDiscussion';
import { useEffect } from 'react';

//untils
import { formatDate } from '../../utils/string/stringUtils';

const cx = classNames.bind(styles);

function DetailDiscussion() {
    const { discussionID } = useParams();
    const { detailDiscussion, loading, errors, fetchDetailDiscussion } = useDiscussion();
    useEffect(() => {
        fetchDetailDiscussion(discussionID);
    }, [fetchDetailDiscussion]);

    return (
        <div className={cx('detail-frame')}>
            <div className={cx('detail-grid')}>
                <div></div>
                <div className={cx('detail-discussion')}>
                    <div className={cx('detail-header')}>
                        <a href="#">
                            <div className={cx('detail-user')}>
                                <div className={cx('avatar')}>
                                    <img src={detailDiscussion?.user?.avatar} alt="avatar" />
                                </div>
                                <div className={cx('detail-info')}>
                                    <div className={cx('fullname')}>{detailDiscussion?.user?.fullName}</div>
                                    <div className={cx('create_time')}>
                                        {formatDate(detailDiscussion?.metadata?.create_time)} - Today
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div className={cx('detail-discussion-content')}>
                            <p className={cx('detail-title')}>{detailDiscussion?.title}</p>
                            <div className={cx('detail-content')}>
                                <div
                                    className={cx('detail-content')}
                                    dangerouslySetInnerHTML={{ __html: detailDiscussion?.content }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default DetailDiscussion;
