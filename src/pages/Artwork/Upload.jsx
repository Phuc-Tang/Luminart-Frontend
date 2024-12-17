import classNames from 'classnames/bind';
import styles from '../../styles/pages/Artwork.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { Navigation } from 'swiper/modules';
import { useCreateArtwork, useSubjectArtwork, useTagArtwork } from '../../hooks/useArtwork';
import { MdDelete } from 'react-icons/md';
// import { subjectData } from '../../../data/data';
import { handleFullScreen } from '../../utils/fullscreen/fullscreen';
import { MdFullscreen } from 'react-icons/md';
import { ToastContainer, Slide } from 'react-toastify';
import { PositionModal } from '../../components/Modal';
import { Breadcrumb } from '../../components';
import { ImSpinner10 } from 'react-icons/im';

const cx = classNames.bind(styles);
const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Manage Category', link: '/' },
    { label: 'Create New Artwork', link: '#' }
];

function ArtworkUpload() {
    const [tagInput, setTagInput] = useState('');
    const [subjectInput, setSubjectInput] = useState('');
    const [isFormSubjectVisible, setFormSubjectVisible] = useState(false);
    const [isFormTagVisible, setFormTagVisible] = useState(false);
    const { subject, subjectLoading, subjectError } = useSubjectArtwork();
    const { tag, tagLoading, tagError } = useTagArtwork();

    const {
        creArtworkValue,
        creErrors,
        handleChange,
        handleAddItem,
        handleRemoveItem,
        handleSubmit,
        images,
        selectedImage,
        selectedIndex,
        totalImages,
        isSubmitting,
        handleRemoveImage,
        handleImageChange,
        handleSelectImage,
        handleStatusChange
    } = useCreateArtwork();

    console.log(creErrors);

    const handleInputKeyDown = (e, input, setInput, type) => {
        const forbiddenChars = /[^a-zA-Z0-9\s]/;
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();

            // Kiểm tra nếu input có chứa ký tự đặc biệt
            if (forbiddenChars.test(input)) {
                alert('Please enter only letters, numbers, and spaces!'); // Hiển thị thông báo lỗi
                return; // Ngừng thực hiện việc thêm item vào danh sách
            }

            const currentList = creArtworkValue[type]; // lấy mảng tương ứng (subject hoặc taglist)

            // Kiểm tra nếu type là 'subject', kiểm tra giá trị nhập vào với subjectData
            if (type === 'subject') {
                // Tìm subjectData có tên khớp với giá trị nhập vào (không phân biệt hoa/thường)
                const matchedSubject = subject.find(
                    (subject) => subject.subject.toLowerCase() === input.trim().toLowerCase() // So sánh không phân biệt hoa/thường
                );

                // Nếu tìm thấy, thêm vào danh sách subject
                if (matchedSubject && !currentList.includes(matchedSubject.subject) && currentList.length < 3) {
                    handleAddItem(type, matchedSubject.subject); // Thêm subject đúng vào list
                    setInput(''); // Xóa input sau khi thêm
                }
            } else {
                const matchedTag = tag.find(
                    (tag) => tag.toLowerCase() === input.trim().toLowerCase() // So sánh không phân biệt hoa/thường
                );

                if (matchedTag && !currentList.includes(matchedTag)) {
                    // Nếu tìm thấy tag khớp, thêm vào danh sách
                    handleAddItem(type, matchedTag);
                    setInput('');
                } else if (!matchedTag && input.trim() && !currentList.includes(input.trim())) {
                    // Nếu không tìm thấy tag và input hợp lệ, thêm mới tag
                    handleAddItem(type, input.trim());
                    setInput('');
                }
            }
        }
    };

    const handleFocus = (type) => {
        if (type === 'subject') {
            if (creArtworkValue.subject.length < 3) {
                setFormSubjectVisible(true);
                setFormTagVisible(false);
            }
        }

        if (type === 'taglist') {
            if (creArtworkValue.taglist) {
                setFormTagVisible(true);
                setFormSubjectVisible(false);
            }
        }
    };
    const handleBlur = (event) => {
        // Kiểm tra nếu người dùng thực sự rời khỏi toàn bộ form
        setTimeout(() => {
            const activeElement = document.activeElement;

            if (activeElement.name !== 'subject' && activeElement.name !== 'taglist') {
                setFormSubjectVisible(false);
                setFormTagVisible(false);
            }
        }, 200); // Thời gian để người dùng có thể tương tác
    };

    return (
        <form className={cx('frame', 'frame-update')} onSubmit={handleSubmit}>
            {isSubmitting && !creErrors && (
                <div className={cx('splash')}>
                    <div className={cx('splash-content')}>
                        <ImSpinner10 className={cx('spinner')} /> {/* Spinner cho loading */}
                        <p>Creating artwork...</p>
                    </div>
                </div>
            )}
            <Breadcrumb items={breadcrumbItems} />
            <div className={cx('title-display')}>
                {!creArtworkValue.title ? <p>Untitled</p> : <p>{creArtworkValue.title}</p>}
            </div>
            <div className={cx('update-form')}>
                <div className={cx('detail-left', 'frame-left-upload')}>
                    {selectedImage === null ? null : (
                        <div className={cx('image-option')}>
                            <div className={cx('image-count')}>
                                {selectedIndex + 1}/{totalImages} images
                            </div>
                            <div className={cx('image-remove')} onClick={handleRemoveImage}>
                                <MdDelete />
                                <p>remove</p>
                            </div>
                        </div>
                    )}
                    <div className={cx('detail-artwork', 'upload-artwork')}>
                        <div className={cx('artwork-review')}>
                            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                                {images.length === 0 ? (
                                    <div className={cx('image-input', { error: creErrors })}>
                                        <FaImages className={cx('drag-icon')} />
                                        <p>Select or drag images here.</p>
                                    </div>
                                ) : (
                                    <img
                                        src={selectedImage}
                                        alt="Thumbnail Selected"
                                        className={cx('selected-thumbnail')}
                                    />
                                )}
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    {selectedImage === null ? null : (
                        <div className={cx('artwork-gallery')}>
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                slidesPerView={6}
                                spaceBetween={10}
                                className={cx('swiper-container')}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index} className={cx('slide')} style={{ width: '150px' }}>
                                        <div
                                            className={cx('thumbnail-wrapper', { active: selectedImage === image })}
                                            onClick={() => handleSelectImage(image, index)}
                                        >
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={cx('thumbnail')}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                    <div className={cx('form-field')}>
                        <label>Artwork Description</label>
                        <textarea
                            className={cx('description', { error: creErrors })}
                            type="text"
                            name="description"
                            value={creArtworkValue.description || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={cx('detail-right', 'frame-right-upload')}>
                    <div className={cx('artwork-textfield')}>
                        <div className={cx('suggest')}>
                            <p className={cx('suggest-title')}>Suggest 💡</p>
                            <p className={cx('suggest-content')}>
                                If possible, please share step-by-step photos from the process of creating your artwork
                                so that other users can learn and exchange ideas more effectively.
                            </p>
                            <p className={cx('suggest-choose-up')}>Only choose up to 10 images!</p>
                        </div>
                        <div className={cx('form-field')}>
                            <label>Artwork Title</label>
                            <input
                                className={cx('title', { error: creErrors })}
                                type="text"
                                name="title"
                                value={creArtworkValue.title || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('form-field')}>
                            <label>Artwork Subject</label>
                            <div className={cx('subject-input-container', { error: creErrors })}>
                                {creArtworkValue.subject.map((subj, index) => (
                                    <span key={index} className={cx('subject')}>
                                        {subj}
                                        <button
                                            type="button"
                                            className={cx('remove-subject')}
                                            onClick={() => handleRemoveItem('subject', index)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}

                                <input
                                    type="text"
                                    name="subject"
                                    value={subjectInput || ''}
                                    onChange={(e) => setSubjectInput(e.target.value)}
                                    onKeyDown={(e) => handleInputKeyDown(e, subjectInput, setSubjectInput, 'subject')}
                                    onFocus={() => handleFocus('subject')}
                                    onBlur={handleBlur}
                                    className={cx('subject-input')}
                                    disabled={creArtworkValue.subject.length >= 3}
                                />
                            </div>
                            {isFormSubjectVisible && (
                                <div className={cx('choose-up')}>
                                    <p>Choose up to 3 subject for your artwork</p>
                                </div>
                            )}
                        </div>
                        {isFormSubjectVisible && (
                            <div className={cx('form-subject')}>
                                <div className={cx('form-subject-frame')}>
                                    {subject
                                        .filter((subj) => {
                                            if (subj) {
                                                // Kiểm tra dữ liệu subject
                                                return subj.label.toLowerCase().includes(subjectInput.toLowerCase());
                                            }
                                            return false;
                                        })
                                        .map((subj) => (
                                            <div
                                                key={subj.subjectID}
                                                className={cx('form-subject-item')}
                                                onMouseDown={() => {
                                                    handleAddItem('subject', subj.label);
                                                    setSubjectInput(''); // Reset input sau khi chọn
                                                    setFormSubjectVisible(false); // Ẩn danh sách sau khi chọn
                                                }}
                                            >
                                                <div className={cx('subject-item')}>
                                                    <img src={subj.thumbnail} alt={subj.label} />
                                                    <p>{subj.label}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                        <div className={cx('form-field')}>
                            <label>Artwork Taglist</label>
                            <div className={cx('tag-input-container', { error: creErrors })}>
                                {creArtworkValue.taglist.map((tag, id) => (
                                    <span key={id} className={cx('tag')}>
                                        {tag}
                                        <button
                                            type="button"
                                            className={cx('remove-tag')}
                                            onClick={() => handleRemoveItem('taglist', id)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    name="taglist"
                                    value={tagInput}
                                    onFocus={() => handleFocus('taglist')}
                                    onBlur={handleBlur}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => handleInputKeyDown(e, tagInput, setTagInput, 'taglist')}
                                    className={cx('tag-input')}
                                />
                            </div>
                        </div>
                        {isFormTagVisible && tagInput && (
                            <div className={cx('form-tag')}>
                                <div className={cx('form-tag-frame')}>
                                    {tag.filter((tag) => {
                                        if (tag) {
                                            // Kiểm tra dữ liệu tag
                                            return tag.toLowerCase().includes(tagInput.toLowerCase());
                                        }
                                        return false;
                                    }).length > 0 ? (
                                        tag
                                            .filter((tag) => {
                                                if (tag) {
                                                    return tag.toLowerCase().includes(tagInput.toLowerCase());
                                                }
                                                return false;
                                            })
                                            .map((tag, index) => (
                                                <div
                                                    key={index}
                                                    className={cx('form-tag-item')}
                                                    onMouseDown={() => {
                                                        handleAddItem('taglist', tag);
                                                        setTagInput(''); // Reset input sau khi chọn
                                                        setFormTagVisible(false); // Ẩn danh sách sau khi chọn
                                                    }}
                                                >
                                                    <div className={cx('tag-item')}>
                                                        <p>{tag}</p>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className={cx('form-tag-item')}>
                                            <div className={cx('tag-item')}>
                                                <p>No Result</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className={cx('form-field')}>
                            <label>Artwork link</label>
                            <input
                                className={cx('link')}
                                type="text"
                                name="link"
                                value={creArtworkValue.link || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('form-field')}>
                            <label>Artwork status</label>
                            <select
                                className={cx('status')}
                                name="status"
                                value={creArtworkValue.status.toString()}
                                onChange={handleStatusChange}
                            >
                                <option value="1">Public Artwork</option>
                                <option value="0">Hidden Artwork</option>
                            </select>
                        </div>
                        <div className={cx('handle-btn')}>
                            <button className={cx('review')} type="button">
                                <p>Review</p>
                            </button>
                            <button className={cx('submit')} type="submit">
                                <p>Submit</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <PositionModal className={cx('modal')} />
            <ToastContainer
                toastClassName={cx('custom-toast')}
                bodyClassName={cx('custom-body')}
                progressClassName={cx('custom-progress')}
                position="top-left"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </form>
    );
}

export default ArtworkUpload;
