import {
    getAllArtwork,
    getDetailArtwork,
    getPaginationArtwork,
    likeArtwork,
    unlikeArtwork,
    isLikedArtwork
} from '../api/artworks';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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
