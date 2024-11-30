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
