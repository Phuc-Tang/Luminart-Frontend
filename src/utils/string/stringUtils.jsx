import CryptoJS from 'crypto-js';

export const toFriendlyUrl = (str) => {
    if (!str || typeof str !== 'string') {
        return ''; // Trả về chuỗi rỗng nếu đầu vào không hợp lệ
    }

    return str
        .toLowerCase() // Chuyển chữ thường
        .normalize('NFD') // Chuẩn hóa chuỗi để tách dấu
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
        .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
        .trim() // Loại bỏ khoảng trắng đầu và cuối
        .replace(/\s+/g, ''); // Thay khoảng trắng bằng dấu gạch ngang
};

export const hashArtworkId = (artID) => {
    return CryptoJS.MD5(artID).toString(CryptoJS.enc.Base64);
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};
