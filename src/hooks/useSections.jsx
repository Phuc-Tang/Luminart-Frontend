import { useState } from 'react';
import { SpotlightArtwork, FeaturedGallery, About, Posts } from '../pages/Profile/Sections/index';

// Custom hook để quản lý các section
export const useSections = () => {
    // Quản lý section cho left và right
    const [leftSections, setLeftSections] = useState([]);
    const [rightSections, setRightSections] = useState([]);

    // Hàm thêm section vào left
    const addSectionLeft = (sectionType) => {
        let newComponent;
        if (sectionType === 'SpotlightArtwork') {
            newComponent = <SpotlightArtwork key={leftSections.length} />;
        } else if (sectionType === 'FeaturedGallery') {
            newComponent = <FeaturedGallery key={leftSections.length} />;
        }
        setLeftSections([...leftSections, { id: leftSections.length, component: newComponent }]);
    };

    // Hàm thêm section vào right
    const addSectionRight = (sectionType) => {
        let newComponent;
        if (sectionType === 'About') {
            newComponent = <About key={leftSections.length} />;
        } else if (sectionType === 'Posts') {
            newComponent = <Posts key={leftSections.length} />;
        }
        setRightSections([...rightSections, { id: rightSections.length, component: newComponent }]);
    };

    // Hàm xóa section
    const removeSection = (id, side) => {
        if (side === 'left') {
            setLeftSections(leftSections.filter((section) => section.id !== id));
        } else {
            setRightSections(rightSections.filter((section) => section.id !== id));
        }
    };

    // Hàm di chuyển section lên
    const moveSectionUp = (id, side) => {
        const sections = side === 'left' ? leftSections : rightSections;
        const setSections = side === 'left' ? setLeftSections : setRightSections;

        const index = sections.findIndex((section) => section.id === id);
        if (index > 0) {
            const newSections = [...sections];
            const [removed] = newSections.splice(index, 1);
            newSections.splice(index - 1, 0, removed);
            setSections(newSections);
        }
    };

    // Hàm di chuyển section xuống
    const moveSectionDown = (id, side) => {
        const sections = side === 'left' ? leftSections : rightSections;
        const setSections = side === 'left' ? setLeftSections : setRightSections;

        const index = sections.findIndex((section) => section.id === id);
        if (index < sections.length - 1) {
            const newSections = [...sections];
            const [removed] = newSections.splice(index, 1);
            newSections.splice(index + 1, 0, removed);
            setSections(newSections);
        }
    };

    return {
        leftSections,
        rightSections,
        addSectionLeft,
        addSectionRight,
        removeSection,
        moveSectionUp,
        moveSectionDown
    };
};
