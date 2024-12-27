import React from 'react';
import { useEffect } from 'react';
import SpotlightArtwork from './SpotlightArtwork';
import FeaturedGallery from './FeaturedGallery';
import Posts from './Posts';

import classNames from 'classnames/bind';
import styles from '../../styles/pages/Sections/Showcase.module.scss';

// Bản ánh xạ type -> component
const sectionComponents = {
    SpotlightArtwork: SpotlightArtwork,
    FeaturedGallery: FeaturedGallery,
    SpotlightPost: Posts
    // Featured: FeaturedComponent,
};

const cx = classNames.bind(styles);

function SectionRenderer({ section }) {
    // Kiểm tra nếu section.type có giá trị hợp lệ
    if (!section || !section.type) {
        return <p>No section type available</p>; // Hiển thị thông báo nếu không có type
    }

    const SectionComponent = sectionComponents[section.type]; // Lấy component từ type

    if (!SectionComponent) {
        return <p>Unknown section type: {section.type}</p>; // Xử lý khi không tìm thấy component phù hợp
    }

    return (
        <div className={cx('frame-section')}>
            <SectionComponent {...section} />
        </div>
    );
}

export default SectionRenderer;
