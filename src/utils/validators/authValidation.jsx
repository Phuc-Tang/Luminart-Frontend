// Kiểm tra email có hợp lệ không
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const usernameBlank = (username) => {
    return username && username.length > 0;
};

export const emailBlank = (email) => {
    return email && email.length > 0;
};

export const passwordBlank = (password) => {
    return password && password.length > 0;
};

// Kiểm tra tất cả trường đăng ký
export const validateSignUp = (username, email, password) => {
    const errors = {};

    if (!username || !usernameBlank(username)) {
        errors.username = 'Username is required.';
    }

    if (!email || !emailBlank(email)) {
        errors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
        errors.email = 'Invalid email.';
    }

    if (!password || !passwordBlank(password)) {
        errors.password = 'Password is required.';
    }

    return errors; // Trả về object chứa lỗi
};

// Kiểm tra tất cả trường đăng nhập
export const validateSignIn = (email, password) => {
    const errors = {};

    if (!email || !emailBlank(email)) {
        errors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
        errors.email = 'Invalid email.';
    }

    if (!password || !passwordBlank(password)) {
        errors.password = 'Password is required.';
    }

    return errors; // Trả về object lỗi
};
