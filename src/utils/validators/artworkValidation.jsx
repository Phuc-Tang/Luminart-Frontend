export const imagesBlank = (images) => {
    return images && images.length > 0;
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

export const descBlank = (desc) => {
    return desc && desc.length > 0;
};

export const validateArtwork = (images, title, subject, taglist, desc) => {
    const errors = {};

    if (!images || !imagesBlank(images)) {
        errors.images = 'Images is required.';
    } else if (!title || !titleBlank(title)) {
        errors.title = 'Title is required.';
    } else if (!subject || !subjectBlank(subject)) {
        errors.subject = 'Subject is required.';
    } else if (!taglist || !taglistBlank(taglist)) {
        errors.taglist = 'Tags is required.';
    } else if (!desc || !descBlank(desc)) {
        errors.desc = 'Description is required.';
    }

    return errors; // Trả về object chứa lỗi
};
