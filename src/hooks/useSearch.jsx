import { useState, useEffect } from 'react';
import { searchArtwork } from '../api/search';

export const useSearchArtwork = (keyword) => {
    const [searchResult, setSearchResult] = useState(null);
    const [isSuggest, setSuggest] = useState(null);
    const [isSearchLoading, setSearchLoading] = useState(null);
    const [isSearchError, setSearchError] = useState(null);

    useEffect(() => {
        if (!keyword.trim()) {
            setSearchResult([]);
            setSuggest([]);
            return;
        }
        const fetchSearchResults = async () => {
            if (!keyword || typeof keyword !== 'string') return; // Kiểm tra keyword

            setSearchLoading(true);
            setSearchError(null);

            try {
                const response = await searchArtwork(keyword.toLowerCase()); // Gọi API

                setSuggest(response.artworks.suggestions.slice(0, 12));
                setSearchResult(response.artworks.data.slice(0, 12));
            } catch (error) {
                setSearchError(error.error || 'An error occurred while searching artwork.');
            } finally {
                setSearchLoading(false);
            }
        };

        fetchSearchResults();
    }, [keyword]); // Mỗi khi keyword thay đổi, hook sẽ gọi lại API

    return {
        isSuggest,
        searchResult,
        isSearchLoading,
        isSearchError
    };
};
