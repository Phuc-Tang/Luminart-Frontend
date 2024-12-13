import { useRef } from 'react';

export const handleFullScreen = () => {
    const elementRef = useRef(null);

    const enterFullscreen = () => {
        if (elementRef.current) {
            if (elementRef.current.requestFullscreen) {
                elementRef.current.requestFullscreen();
            } else if (elementRef.current.mozRequestFullScreen) {
                // Firefox
                elementRef.current.mozRequestFullScreen();
            } else if (elementRef.current.webkitRequestFullscreen) {
                // Chrome, Safari, Opera
                elementRef.current.webkitRequestFullscreen();
            } else if (elementRef.current.msRequestFullscreen) {
                // IE/Edge
                elementRef.current.msRequestFullscreen();
            }
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            // IE/Edge
            document.msExitFullscreen();
        }
    };

    return { enterFullscreen, exitFullscreen, elementRef };
};
