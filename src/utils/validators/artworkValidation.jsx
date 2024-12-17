export const imagesBlank = (files) => {
    return files && files.length > 0;
};

export const titleBlank = (title) => {
    return title && title.length > 0;
};

export const subjectBlank = (subject) => {
    return subject && subject.length > 0;
};

export const taglistBlank = (taglist) => {
    return taglist && taglist.length > 0;
};

export const descBlank = (description) => {
    return description && description.length > 0;
};

export const validateArtwork = (files, title, subject, taglist, description) => {
    const errors = {};

    if (!files || !imagesBlank(files)) {
        errors.files = 'Images is required.';
    } else if (!title || !titleBlank(title)) {
        errors.title = 'Title is required.';
    } else if (!subject || !subjectBlank(subject)) {
        errors.subject = 'Subject is required.';
    } else if (!taglist || !taglistBlank(taglist)) {
        errors.taglist = 'Tags is required.';
    } else if (!description || !descBlank(description)) {
        errors.description = 'Description is required.';
    }

    return errors; // Trả về object chứa lỗi
};
