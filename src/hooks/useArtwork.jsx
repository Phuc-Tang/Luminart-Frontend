import {
    createArtwork,
    getAllArtwork,
    getDetailArtwork,
    getPaginationArtwork,
    likeArtwork,
    unlikeArtwork,
    isLikedArtwork
} from '../api/artworks';
import { useUser } from './useUserInfo';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validateArtwork } from '../utils/validators/artworkValidation';

export const useCreateArtwork = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [creErrors, setCreErrors] = useState(null);
    const [creArtworkValue, setCreArtworkValue] = useState({
        userID: user?.user?.userID || '',
        title: '',
        files: [],
        description: '',
        link: '',
        taglist: [],
        subject: [],
        status: 1
    });
    const totalImages = images.length;

    useEffect(() => {
        if (user?.user?.userID) {
            setCreArtworkValue((prev) => ({ ...prev, userID: user.user.userID }));
        }
    }, [user]);

    const handleImageChange = (e) => {
        const filesImage = Array.from(e.target.files);
        // Kiểm tra tổng số ảnh sau khi thêm
        if (images.length + filesImage.length > 10) {
            toast.error('You can only choose up to 10 images!', {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            });
            return; // Dừng lại nếu tổng số ảnh vượt quá 10
        }
        const newImages = filesImage.map((files) => URL.createObjectURL(files));
        setImages((prevImages) => [...prevImages, ...newImages]);

        // Lưu file thật vào creArtworkValue
        setCreArtworkValue((prev) => ({
            ...prev,
            files: [...prev.files, ...filesImage] // Thêm các file vào mảng file
        }));

        if (images > 10) {
            // Hiển thị thông báo lỗi nếu tổng số ảnh vượt quá 10
            toast.error('You can only choose up to 10 images!', {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            });
            return;
        }

        if (newImages.length > 0 && !selectedImage) {
            setSelectedImage(newImages[0]);
            setSelectedIndex(0);
        }
    };

    const handleSelectImage = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    const handleRemoveImage = () => {
        if (!selectedImage) return;

        // Tìm file thật trong creArtworkValue.files dựa vào URL
        const selectedFileIndex = creArtworkValue.files.findIndex(
            (files) => URL.createObjectURL(files) === selectedImage
        );

        // Xóa ảnh khỏi danh sách images và cập nhật lại selectedImage
        const updatedImages = images.filter((image) => image !== selectedImage);
        setImages(updatedImages);

        URL.revokeObjectURL(selectedImage);

        // Cập nhật lại selectedImage sau khi xóa
        if (updatedImages.length > 0) {
            // Cập nhật selectedImage dựa trên chỉ số đang chọn
            if (selectedIndex < updatedImages.length) {
                setSelectedImage(updatedImages[selectedIndex]);
            } else {
                // Nếu chỉ số lớn hơn mảng còn lại, chọn ảnh cuối cùng
                setSelectedImage(updatedImages[updatedImages.length - 1]);
                setSelectedIndex(updatedImages.length - 1);
            }
        } else {
            setSelectedImage(null);
            setSelectedIndex(0);
        }

        // Cập nhật lại creArtworkValue.files, xóa ảnh bị xóa
        const newFiles = [...creArtworkValue.files];
        newFiles.splice(selectedFileIndex, 1); // Xóa ảnh khỏi mảng files
        setCreArtworkValue((prev) => ({
            ...prev,
            files: newFiles // Cập nhật lại mảng files
        }));
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Xử lý riêng cho trường hợp 'file' để hỗ trợ nhiều ảnh
        if (name === 'file') {
            const newFiles = Array.from(files); // Chuyển FileList thành mảng
            setCreArtworkValue((prev) => ({
                ...prev,
                files: newFiles // Lưu lại file mới được chọn
            }));

            // Gọi hàm uploadImages để tải ảnh lên server
            uploadImages(newFiles); // Truyền mảng file vào hàm upload
        } else {
            setCreArtworkValue((prev) => ({
                ...prev,
                [name]: value // Cập nhật cho các trường không phải mảng
            }));
        }
    };

    const handleAddItem = (type, item) => {
        const validItem = item.replace(/[^a-zA-Z0-9\s]/g, '');
        setCreArtworkValue((prev) => {
            if (prev[type].includes(validItem.trim())) return prev;
            return {
                ...prev,
                [type]: [...prev[type], validItem.trim()]
            };
        });
    };

    const handleRemoveItem = (type, indexToRemove) => {
        setCreArtworkValue((prev) => ({
            ...prev,
            [type]: prev[type].filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleStatusChange = (e) => {
        const newStatus = parseInt(e.target.value, 10);
        setCreArtworkValue((prevState) => ({
            ...prevState,
            status: newStatus
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateArtwork(
            creArtworkValue.title,
            creArtworkValue.files,
            creArtworkValue.description,
            creArtworkValue.taglist,
            creArtworkValue.subject,
            creArtworkValue.status
        );
        if (Object.keys(validationErrors).length > 0) {
            setCreErrors(validationErrors);
            toast.error(Object.values(validationErrors)[0], {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            }); // Hiển thị lỗi đầu tiên
            return;
        }
        // Nếu không có lỗi
        setCreErrors();

        try {
            const formData = new FormData();
            formData.append('userID', creArtworkValue.userID);
            formData.append('title', creArtworkValue.title);
            formData.append('description', creArtworkValue.description);
            formData.append('link', creArtworkValue.link);
            formData.append('taglist', JSON.stringify(creArtworkValue.taglist)); // Chuyển thành chuỗi nếu là mảng
            formData.append('subject', JSON.stringify(creArtworkValue.subject)); // Chuyển thành chuỗi nếu là mảng
            formData.append('status', creArtworkValue.status);

            // Duyệt qua mảng file để thêm từng tệp vào FormData
            creArtworkValue.files.forEach((file) => {
                formData.append('files', file); // Backend cần xử lý mảng file[] từ FormData
            });

            const response = await createArtwork(formData);
            if (!response.success) {
                setCreErrors(response.error || {});
                toast.error(response.message, {
                    className: 'custom-toast-error',
                    bodyClassName: 'custom-body-error',
                    progressClassName: 'custom-progress-error'
                }); // Hiển thị lỗi từ server
                setCreErrors(response.error);
            } else {
                toast.success(response.message, {
                    className: 'custom-toast-success',
                    bodyClassName: 'custom-body-success',
                    progressClassName: 'custom-progress-success'
                }); // Hiển thị thành công
                setCreArtworkValue({
                    userID: user?.user?.userID || '',
                    title: '',
                    files: [],
                    description: '',
                    link: '',
                    taglist: [],
                    subject: [],
                    status: 1
                });
                setTimeout(() => navigate('/'), 4000);
            }
        } catch (error) {
            console.error('Error creating artwork:', error);
            toast.error('Something went wrong. Please try again later.', {
                className: 'custom-toast-error',
                bodyClassName: 'custom-body-error',
                progressClassName: 'custom-progress-error'
            });
        }
    };

    return {
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
        handleRemoveImage,
        handleImageChange,
        handleSelectImage,
        handleStatusChange
    };
};

export const useAllArtwork = () => {
    const [errors, setErrors] = useState(null);
    const [artwork, setArtwork] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllArtwork = async () => {
            setLoading(true);
            setErrors(null);

            try {
                const response = await getAllArtwork();

                // Kiểm tra và xử lý khi artworks là mảng hoặc đối tượng
                if (Array.isArray(response.data.artworks)) {
                    setArtwork(response.data.artworks); // Trường hợp mảng nhiều artwork
                } else if (response.data.artworks) {
                    // Trường hợp chỉ có 1 artwork (mảng chứa 1 phần tử)
                    setArtwork([response.data.artworks]); // Chuyển thành mảng 1 phần tử
                } else {
                    setErrors('No artworks found');
                    setArtwork([]);
                }
            } catch (err) {
                console.error('Error fetching artworks:', err.message);
                setErrors(err.message);
                setArtwork([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllArtwork();
    }, []);

    return { artwork, loading, errors };
};

export const usePaginatedArtwork = () => {
    const [artworks, setArtworks] = useState([]); // Danh sách artworks
    const [page, setPage] = useState(1); // Trang hiện tại
    const [limit] = useState(14); // Số lượng artworks mỗi lần gọi
    const [hasMore, setHasMore] = useState(true); // Kiểm tra nếu còn dữ liệu
    const [loading, setLoading] = useState(false); // Trạng thái tải
    const [errors, setErrors] = useState(null); // Trạng thái lỗi

    // Hàm fetch data từ API
    const fetchPaginatedArtwork = async () => {
        if (!hasMore) return; // Dừng nếu không còn dữ liệu

        setLoading(true);
        setErrors(null);

        try {
            const response = await getPaginationArtwork({ page, limit });

            if (response.data && response.data.data.artworks.length > 0) {
                setArtworks((prevArtworks) => {
                    const seen = new Set(prevArtworks.map((art) => art.artID));
                    const uniqueArtworks = response.data.data.artworks.filter((newArt) => !seen.has(newArt.artID));
                    return [...prevArtworks, ...uniqueArtworks];
                });
                setHasMore(page < response.data.data.pagination.totalPages); // Cập nhật trạng thái hasMore
            } else {
                setHasMore(false); // Không còn dữ liệu
            }
        } catch (error) {
            console.error('Error fetching paginated artworks:', error);
            setErrors(error.message || 'An error occurred while fetching artworks.');
        } finally {
            setLoading(false);
        }
    };

    // Tăng số trang và gọi API khi trang thay đổi
    useEffect(() => {
        fetchPaginatedArtwork();
    }, [page]);

    // Hàm tải thêm dữ liệu (tăng trang)
    const loadMore = () => {
        if (hasMore) setPage((prevPage) => prevPage + 1);
    };

    return { artworks, loading, errors, hasMore, loadMore };
};

export const useDetailArtwork = (artID) => {
    const [errors, setErrors] = useState(null);
    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetailArtwork = async () => {
            if (!artID) {
                setArtwork(null);
                setErrors('ArtID is required');
                setLoading(false);
                return;
            }

            setLoading(true); // Chỉ bật loading khi ArtID hợp lệ
            setErrors(null);

            try {
                const detailArtwork = await getDetailArtwork(artID);

                if (detailArtwork?.error) {
                    setErrors(detailArtwork.error);
                    setArtwork(null);
                } else {
                    setArtwork(detailArtwork.data.artwork);
                }
            } catch (err) {
                console.error('Error fetching artwork detail:', err.message);
                setErrors(err.message);
                setArtwork(null);
            } finally {
                setLoading(false); // Đảm bảo loading kết thúc
            }
        };

        fetchDetailArtwork();
    }, [artID]);

    return { artwork, loading, errors };
};

export const useLikeArtwork = (contentID) => {
    const [likeClick, setLikeClick] = useState(false);
    const [loading, setLoading] = useState(true);
    const [likeError, setLikeError] = useState(null);

    // Kiểm tra trạng thái "đã like" ban đầu từ API
    useEffect(() => {
        const fetchInitialLikeStatus = async () => {
            if (!contentID) {
                setLikeError('ContentID is required.');
                setLoading(false);
                return;
            }

            try {
                const response = await isLikedArtwork(contentID); // API kiểm tra trạng thái like
                if (response?.success) {
                    setLikeClick(response.isLiked); // Gán trạng thái ban đầu
                } else {
                    setLikeError(response?.message || 'Failed to fetch like status.');
                }
            } catch (err) {
                setLikeError(err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialLikeStatus();
    }, [contentID]);

    // Toggle trạng thái like/unlike
    const toggleLike = async () => {
        if (!contentID) {
            setLikeError('ContentID is required.');
            return;
        }

        setLikeError(null);

        try {
            setLoading(true);
            if (likeClick) {
                // Nếu đã like -> Unlike
                const response = await unlikeArtwork(contentID);
                if (response?.error) {
                    setLikeError(response.error);
                } else {
                    setLikeClick(false); // Cập nhật trạng thái thành chưa like
                }
            } else {
                // Nếu chưa like -> Like
                const response = await likeArtwork(contentID);
                if (response?.error) {
                    setLikeError(response.error);
                } else {
                    setLikeClick(true); // Cập nhật trạng thái thành đã like
                }
            }
        } catch (err) {
            setLikeError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return { likeClick, toggleLike, likeError, loading };
};
