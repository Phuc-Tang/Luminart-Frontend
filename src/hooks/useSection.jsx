// SectionContext.js
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { addArtworkToSection, createSections, getSections } from '../api/sections';
import { useUser } from './useUserInfo';
import { useParams } from 'react-router-dom';

// Tạo context
const SectionContext = createContext();

// Provider cho context
export const SectionProvider = ({ children }) => {
    const { user } = useUser();
    const { username } = useParams();
    const [sectionLoading, setSectionLoading] = useState(false);
    const [sectionError, setSectionError] = useState(null);
    const [sections, setSections] = useState([]);

    // Hàm lấy danh sách Section từ API
    const fetchSections = useCallback(async () => {
        if (!username) {
            setSectionError('Username is required.');
            return;
        }

        setSectionLoading(true);
        setSectionError(null);

        try {
            const result = await getSections(username);

            if (result.error) {
                setSectionError(result.error);
            } else {
                setSections(Array.isArray(result.sections) ? result.sections : [result.sections]);
            }
        } catch (err) {
            setSectionError('An unexpected error occurred while fetching sections.');
        } finally {
            setSectionLoading(false);
        }
    }, [username]);

    // Hàm tạo Section
    const handleCreateSection = useCallback(
        async (name, type, section_location) => {
            setSectionLoading(true);
            setSectionError(null);

            try {
                const newSectionData = {
                    userID: user?.user?.userID,
                    name,
                    type,
                    section_location,
                    section_order: sections.length + 1,
                    config: {}
                };

                const result = await createSections(newSectionData);
                if (result.error) {
                    setSectionError(result.error);
                } else {
                    const newSection = {
                        sectionID: result.sectionID,
                        ...newSectionData
                    };

                    setSections((prevSections) => {
                        return Array.isArray(prevSections) ? [...prevSections, newSection] : [newSection];
                    });
                }
            } catch (err) {
                setSectionError('An unexpected error occurred.');
            } finally {
                setSectionLoading(false);
            }
        },
        [sections, user]
    );

    // Hàm thêm artwork vào Section
    const handleAddArtworkToSection = useCallback(
        async (sectionID, artID, userID) => {
            setSectionLoading(true);
            setSectionError(null);

            try {
                const addArtworkData = {
                    sectionID,
                    artID: [artID],
                    userID
                };
                const result = await addArtworkToSection(addArtworkData);

                const artworks = result.section.artworks.map((artwork) => ({
                    ...artwork,
                    art: JSON.parse(artwork.art),
                    subject: JSON.parse(artwork.subject),
                    taglist: JSON.parse(artwork.taglist)
                }));

                if (result.error) {
                    setSectionError(result.error);
                } else {
                    setSections((prevSections) =>
                        prevSections.map((section) =>
                            section.sectionID === sectionID
                                ? {
                                      ...section,
                                      artworks: [...(section.artworks || []), ...artworks]
                                  }
                                : section
                        )
                    );
                }
            } catch (error) {
                setSectionError('An unexpected error occurred.');
            } finally {
                setSectionLoading(false);
            }
        },
        [sections]
    );

    useEffect(() => {
        fetchSections();
    }, [username, fetchSections]);

    return (
        <SectionContext.Provider
            value={{
                sectionLoading,
                sectionError,
                sections,
                handleCreateSection,
                handleAddArtworkToSection
            }}
        >
            {children}
        </SectionContext.Provider>
    );
};

// Custom hook để sử dụng SectionContext
export const useSectionContext = () => {
    const context = useContext(SectionContext);
    if (!context) {
        throw new Error('useSectionContext must be used within a SectionProvider');
    }
    return context;
};
