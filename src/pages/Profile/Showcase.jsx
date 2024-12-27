import classNames from 'classnames/bind';
import styles from '../../styles/pages/Sections/Showcase.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCustomSection } from '../../hooks/useProfile';
import { useSectionContext } from '../../hooks/useSection';
import { TableSectionLeft, TableSectionRight } from '../Sections/ListSection';
import SectionRenderer from '../Sections/SectionRenderer';

const cx = classNames.bind(styles);

function Showcase() {
    const { username } = useParams();
    const { customSection } = useCustomSection();
    const [showLeftOptions, setShowLeftOptions] = useState(false);
    const [showRightOptions, setShowRightOptions] = useState(false);
    const { sectionLoading, sectionError, sections, handleCreateSection } = useSectionContext();

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
                {showLeftOptions ? <TableSectionLeft handleCreateSection={handleCreateSection} /> : null}

                {sectionLoading ? (
                    <p>Loading...</p>
                ) : sectionError ? (
                    <p>Error: {sectionError?.error || sectionError?.message}</p>
                ) : sections?.length > 0 ? (
                    sections.map(
                        (section) =>
                            section.section_location === 'left' && (
                                <SectionRenderer key={section.sectionID} section={section} />
                            )
                    )
                ) : (
                    <p>No sections available</p> // Thông báo nếu không có section nào
                )}
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
                {showRightOptions ? <TableSectionRight handleCreateSection={handleCreateSection} /> : null}

                {sectionLoading ? (
                    <p>Loading...</p>
                ) : sectionError ? (
                    <p>Error: {sectionError?.error || sectionError?.message}</p>
                ) : sections?.length > 0 ? (
                    sections.map(
                        (section) =>
                            section.section_location === 'right' && (
                                <SectionRenderer key={section?.sectionID} section={section} />
                            )
                    )
                ) : (
                    <p>No sections available</p> // Thông báo nếu không có section nào
                )}
            </div>
        </div>
    );
}

export default Showcase;
