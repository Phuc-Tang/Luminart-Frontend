import { motion } from 'motion/react';

export const RevealText = ({ children }) => {
    return (
        <div>
            <motion.div
                style={{ willChange: 'opacity, transform' }}
                variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.5, ease: 'anticipate' }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const RevealImage = ({ children }) => {
    return (
        <motion.div
            style={{ willChange: 'opacity, transform' }}
            variants={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 1, ease: 'anticipate' }}
        >
            {children}
        </motion.div>
    );
};

export const RevealDiscussion = ({ children }) => {
    return (
        <div
            style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', top: '20%', margin: '0 10px' }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: 4,
                    left: 0,
                    bottom: 4,
                    right: 0,
                    zIndex: 1,
                    display: 'inline-block',
                    backgroundColor: '#9a00ff'
                }}
                variants={{
                    hidden: { right: 0 },
                    visible: { right: '100%' }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeIn' }}
            />
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.75 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const RevealRank = ({ children, color }) => {
    return (
        <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', margin: '0 10px' }}>
            <motion.div
                style={{
                    position: 'absolute',
                    top: 4,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'inline-block',
                    backgroundColor: color
                }}
                variants={{
                    hidden: { top: '100%' },
                    visible: { top: 0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeIn' }}
            />
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.75 }}
            >
                {children}
            </motion.div>
        </div>
    );
};
