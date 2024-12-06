import classNames from 'classnames/bind';
import styles from '../../styles/pages/Overview.module.scss';
import { useState } from 'react';
import { useSections } from '../../hooks/useSections';
import { MdArticle, MdDelete } from 'react-icons/md';
import { FaImage, FaImages, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaAddressCard } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function Overview({ customSection }) {
    const {
        leftSections,
        rightSections,
        addSectionLeft,
        addSectionRight,
        removeSection,
        moveSectionUp,
        moveSectionDown
    } = useSections();

    // Trạng thái để điều khiển hiển thị các tùy chọn section
    const [showLeftOptions, setShowLeftOptions] = useState(false);
    const [showRightOptions, setShowRightOptions] = useState(false);

    return (
        <div className={cx('frame')}>
            <div className={cx('left')}>
                <div className={cx('frame-add-section', { active: customSection })}>
                    <button
                        onClick={() => setShowLeftOptions(!showLeftOptions)}
                        className={cx('add-section-btn', { active: customSection })}
                    >
                        {showLeftOptions ? 'Close Options' : 'Add Sections'}
                    </button>
                </div>
                {showLeftOptions && (
                    <div className={cx('option-table', { active: customSection })}>
                        <div className={cx('section-btn')}>
                            <button onClick={() => addSectionLeft('SpotlightArtwork')}>
                                <div className={cx('icon')}>
                                    <FaImage className={cx('icon-size')} />
                                </div>
                                <p className={cx('title-1')}>Spotlight Artwork</p>
                                <p className={cx('title-2')}>Showcase your Spotlight Artwork from your Gallery.</p>
                            </button>
                        </div>
                        <div className={cx('section-btn')}>
                            <button onClick={() => addSectionLeft('FeaturedGallery')}>
                                <div className={cx('icon')}>
                                    <FaImages className={cx('icon-size')} />
                                </div>
                                <p className={cx('title-1')}>Featured Gallery</p>
                                <p className={cx('title-2')}>Showcase the favorites in your Collections.</p>
                            </button>
                        </div>
                    </div>
                )}

                {leftSections.map((section, index) => (
                    <div key={section.id} className={cx('section')}>
                        <div className={cx('section-handle')}>
                            {index > 0 && (
                                <button onClick={() => moveSectionUp(section.id, 'left')}>
                                    <FaChevronUp />
                                </button>
                            )}

                            {index < leftSections.length - 1 && (
                                <button onClick={() => moveSectionDown(section.id, 'left')}>
                                    <FaChevronDown />
                                </button>
                            )}

                            <button onClick={() => removeSection(section.id, 'left')}>
                                <MdDelete />
                            </button>
                        </div>
                        {section.component}
                    </div>
                ))}
            </div>

            <div className={cx('right')}>
                <div className={cx('frame-add-section', { active: customSection })}>
                    <button
                        onClick={() => setShowRightOptions(!showRightOptions)}
                        className={cx('add-section-btn', { active: customSection })}
                    >
                        {showRightOptions ? 'Close Options' : 'Add Sections'}
                    </button>
                </div>
                {showRightOptions && (
                    <div className={cx('option-table', { active: customSection })}>
                        <div className={cx('section-btn')}>
                            <button onClick={() => addSectionRight('About')}>
                                <div className={cx('icon')}>
                                    <FaAddressCard className={cx('icon-size')} />
                                </div>
                                <p className={cx('title-1')}>About</p>
                                <p className={cx('title-2')}>Display information about yourself for everyone to see.</p>
                            </button>
                        </div>
                        <div className={cx('section-btn')}>
                            <button onClick={() => addSectionRight('Posts')}>
                                <div className={cx('icon')}>
                                    <MdArticle className={cx('icon-size')} />
                                </div>
                                <p className={cx('title-1')}>Post</p>
                                <p className={cx('title-2')}>Share your feelings, discussions, or journey.</p>
                            </button>
                        </div>
                    </div>
                )}
                {/* Các section bên phải */}
                {rightSections.map((section, index) => (
                    <div key={section.id} className={cx('section')}>
                        <div className={cx('section-handle')}>
                            {index > 0 && (
                                <button onClick={() => moveSectionUp(section.id, 'right')}>
                                    <FaChevronUp />
                                </button>
                            )}

                            {index < rightSections.length - 1 && (
                                <button onClick={() => moveSectionDown(section.id, 'right')}>
                                    <FaChevronDown />
                                </button>
                            )}

                            <button onClick={() => removeSection(section.id, 'right')}>
                                <MdDelete />
                            </button>
                        </div>
                        {section.component}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Overview;
