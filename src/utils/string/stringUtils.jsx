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
