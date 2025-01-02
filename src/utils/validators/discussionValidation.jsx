export const titleBlank = (title) => {
    return title && title.length > 0;
};

export const contentBlank = (content) => {
    return content && content.length > 0;
};

export const validateDiscussion = (title, content) => {
    const errors = {};

    if (!title || !titleBlank(title)) {
        errors.title = 'Title is required.';
    } else if (!content || !contentBlank(content)) {
        errors.content = 'Content is required.';
    }

    return errors;
};
