import React, { useEffect, useRef, useState } from 'react';

export const useStickyActive = (triggerTop) => {
    const menuRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                const menuTop = menuRef.current.getBoundingClientRect().top;
                setIsVisible(menuTop <= triggerTop); // Kiểm tra nếu top đạt đúng triggerTop
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [triggerTop]);

    return { menuRef, isVisible };
};
