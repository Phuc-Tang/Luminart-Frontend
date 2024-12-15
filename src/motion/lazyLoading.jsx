import React from 'react';
import { motion } from 'framer-motion';

const gridVariants = {
    hidden: { opacity: 0 }, // Toàn bộ grid ban đầu mờ đi
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3, // Trễ trước khi bắt đầu hiệu ứng
            staggerChildren: 0.2 // Khoảng cách giữa các phần tử
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Mờ và lệch xuống dưới
    visible: { opacity: 1, y: 0 } // Hiện lên và trượt vào vị trí
};

const StaggeredGrid = ({ items }) => {
    return (
        <motion.div
            className="grid-container"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px'
            }}
        >
            {items.map((item, index) => (
                <motion.div
                    className="grid-item"
                    key={index}
                    variants={cardVariants}
                    style={{
                        width: '100%',
                        height: '200px',
                        background: '#ddd',
                        borderRadius: '10px'
                    }}
                >
                    <img src={item.src} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StaggeredGrid;
