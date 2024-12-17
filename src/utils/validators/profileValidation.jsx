export const positionBlank = (position) => {
    return position && position.length > 0;
};

export const genderBlank = (gender) => {
    return gender && gender.length > 0;
};

export const birthBlank = (birth) => {
    return birth && birth.length > 0;
};

export const bioBlank = (bio) => {
    return bio && bio.length > 0;
};

export const usernameBlank = (username) => {
    return username && username.length > 0;
};

export const validateProfile = (position, gender, birth, bio, username) => {
    const errors = {};

    if (!position || !positionBlank(position)) {
        errors.position = 'Position is required.';
    } else if (!gender || !genderBlank(gender)) {
        errors.gender = 'Gender is required.';
    } else if (!birth || !birthBlank(birth)) {
        errors.birth = 'Birthday is required.';
    } else if (!bio || !bioBlank(bio)) {
        errors.bio = 'Bio is required.';
    } else if (!username || !usernameBlank(username)) {
        errors.username = 'Username is required.';
    }

    return errors;
};
