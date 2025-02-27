import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const FreedomOfSpeechTierList = () => {
    // Define tiers with their colors matching the reference image
    const tiers = [
        { id: 'S', color: '#FF7F7F' },  // Light red
        { id: 'A', color: '#FFBF7F' },  // Light orange
        { id: 'B', color: '#FFFF7F' },  // Light yellow
        { id: 'C', color: '#7FFF7F' },  // Light green
        { id: 'D', color: '#7FBFFF' },  // Light blue
        { id: 'F', color: '#FF7FFF' }   // Light purple
    ];

    // Countries data with flags
    const [countries, setCountries] = useState([
        { id: 'norway', name: 'Norway', tier: null, flag: '🇳🇴' },
        { id: 'finland', name: 'Finland', tier: null, flag: '🇫🇮' },
        { id: 'sweden', name: 'Sweden', tier: null, flag: '🇸🇪' },
        { id: 'denmark', name: 'Denmark', tier: null, flag: '🇩🇰' },
        { id: 'netherlands', name: 'Netherlands', tier: null, flag: '🇳🇱' },
        { id: 'jamaica', name: 'Jamaica', tier: null, flag: '🇯🇲' },
        { id: 'switzerland', name: 'Switzerland', tier: null, flag: '🇨🇭' },
        { id: 'new-zealand', name: 'New Zealand', tier: null, flag: '🇳🇿' },
        { id: 'portugal', name: 'Portugal', tier: null, flag: '🇵🇹' },
        { id: 'canada', name: 'Canada', tier: null, flag: '🇨🇦' },
        { id: 'germany', name: 'Germany', tier: null, flag: '🇩🇪' },
        { id: 'uruguay', name: 'Uruguay', tier: null, flag: '🇺🇾' },
        { id: 'estonia', name: 'Estonia', tier: null, flag: '🇪🇪' },
        { id: 'ireland', name: 'Ireland', tier: null, flag: '🇮🇪' },
        { id: 'belgium', name: 'Belgium', tier: null, flag: '🇧🇪' },
        { id: 'austria', name: 'Austria', tier: null, flag: '🇦🇹' },
        { id: 'australia', name: 'Australia', tier: null, flag: '🇦🇺' },
        { id: 'france', name: 'France', tier: null, flag: '🇫🇷' },
        { id: 'uk', name: 'United Kingdom', tier: null, flag: '🇬🇧' },
        { id: 'usa', name: 'United States', tier: null, flag: '🇺🇸' },
        { id: 'japan', name: 'Japan', tier: null, flag: '🇯🇵' },
        { id: 'south-korea', name: 'South Korea', tier: null, flag: '🇰🇷' },
        { id: 'spain', name: 'Spain', tier: null, flag: '🇪🇸' },
        { id: 'italy', name: 'Italy', tier: null, flag: '🇮🇹' },
        { id: 'czech-republic', name: 'Czech Republic', tier: null, flag: '🇨🇿' },
        { id: 'taiwan', name: 'Taiwan', tier: null, flag: '🇹🇼' },
        { id: 'chile', name: 'Chile', tier: null, flag: '🇨🇱' },
        { id: 'costa-rica', name: 'Costa Rica', tier: null, flag: '🇨🇷' },
        { id: 'south-africa', name: 'South Africa', tier: null, flag: '🇿🇦' },
        { id: 'argentina', name: 'Argentina', tier: null, flag: '🇦🇷' },
        { id: 'brazil', name: 'Brazil', tier: null, flag: '🇧🇷' },
        { id: 'india', name: 'India', tier: null, flag: '🇮🇳' },
        { id: 'mexico', name: 'Mexico', tier: null, flag: '🇲🇽' },
        { id: 'greece', name: 'Greece', tier: null, flag: '🇬🇷' },
        { id: 'poland', name: 'Poland', tier: null, flag: '🇵🇱' },
        { id: 'singapore', name: 'Singapore', tier: null, flag: '🇸🇬' },
        { id: 'israel', name: 'Israel', tier: null, flag: '🇮🇱' },
        { id: 'turkey', name: 'Turkey', tier: null, flag: '🇹🇷' },
        { id: 'russia', name: 'Russia', tier: null, flag: '🇷🇺' },
        { id: 'china', name: 'China', tier: null, flag: '🇨🇳' },
        { id: 'iran', name: 'Iran', tier: null, flag: '🇮🇷' },
        { id: 'saudi-arabia', name: 'Saudi Arabia', tier: null, flag: '🇸🇦' },
        { id: 'egypt', name: 'Egypt', tier: null, flag: '🇪🇬' },
        { id: 'north-korea', name: 'North Korea', tier: null, flag: '🇰🇵' }
    ]);

    // State for drag and drop
    const [dragging, setDragging] = useState(null);

    // State for tracking mouse position during drag
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Add event listeners for tracking mouse position
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Handle the start of a drag operation
    const handleDragStart = (e, country) => {
        setDragging(country);
        e.dataTransfer.setData('text/plain', country.id);

        // Create a custom drag image that follows the mouse
        const dragPreview = document.createElement('div');
        dragPreview.className = 'drag-preview';
        dragPreview.innerHTML = `<span style="font-size: 24px;">${country.flag}</span>`;
        dragPreview.style.position = 'absolute';
        dragPreview.style.top = '-1000px'; // Initially hidden
        dragPreview.style.backgroundColor = 'white';
        dragPreview.style.padding = '8px';
        dragPreview.style.border = '1px solid #ccc';
        dragPreview.style.borderRadius = '4px';
        dragPreview.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        document.body.appendChild(dragPreview);

        e.dataTransfer.setDragImage(dragPreview, 10, 10);

        // Clean up the element after drag ends
        setTimeout(() => {
            document.body.removeChild(dragPreview);
        }, 0);
    };

    // Handle the drag over event (needed to allow dropping)
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Handle dropping a country into a tier
    const handleDrop = (e, targetTier) => {
        e.preventDefault();
        if (!dragging) return;

        setCountries(prevCountries =>
            prevCountries.map(country =>
                country.id === dragging.id ? { ...country, tier: targetTier } : country
            )
        );

        setDragging(null);
    };

    // Handle removing a country from a tier
    const handleRemoveFromTier = (countryId) => {
        setCountries(prevCountries =>
            prevCountries.map(country =>
                country.id === countryId ? { ...country, tier: null } : country
            )
        );
    };

    // Reset all countries to their initial state
    const handleReset = () => {
        setCountries(prevCountries =>
            prevCountries.map(country => ({ ...country, tier: null }))
        );
    };

    // Export the tier list
    const handleExport = () => {
        const tierData = {};
        tiers.forEach(tier => {
            tierData[tier.id] = countries
                .filter(country => country.tier === tier.id)
                .map(country => country.name);
        });

        const dataStr = JSON.stringify(tierData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportLink = document.createElement('a');
        exportLink.setAttribute('href', dataUri);
        exportLink.setAttribute('download', 'freedom_of_speech_tier_list.json');
        document.body.appendChild(exportLink);
        exportLink.click();
        document.body.removeChild(exportLink);
    };

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto bg-white p-4">
            <header className="py-4 border-b border-gray-200 mb-6">
                <h1 className="text-3xl font-bold text-center">Freedom of Speech Tier List</h1>
                <p className="text-center mt-2 text-gray-600">Drag and drop countries to rank them based on freedom of speech</p>
            </header>

            <main className="flex-grow">
                {/* Tier rows - styled like the reference image */}
                <div className="w-full">
                    {tiers.map(tier => (
                        <div
                            key={tier.id}
                            className="flex w-full mb-0.5"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, tier.id)}
                        >
                            <div
                                className="flex items-center justify-center w-16 h-16 text-black font-bold text-4xl"
                                style={{ backgroundColor: tier.color }}
                            >
                                {tier.id}
                            </div>
                            <div
                                className="flex flex-wrap min-h-16 flex-grow pl-2 h-16 bg-black"
                            >
                                {countries
                                    .filter(country => country.tier === tier.id)
                                    .map(country => (
                                        <div
                                            key={country.id}
                                            className="m-1 flex items-center justify-center cursor-move h-14 w-14 bg-white hover:bg-gray-50 transition-colors"
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, country)}
                                            onClick={() => handleRemoveFromTier(country.id)}
                                            title={`${country.name} (Click to remove)`}
                                        >
                                            <span className="text-2xl">{country.flag}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* Country pool - horizontal grid layout */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h2 className="text-2xl font-bold mb-4">Countries</h2>
                    <p className="text-sm text-gray-600 mb-4">Drag countries from below and drop them into tiers above</p>
                    <div className="flex flex-wrap">
                        {countries
                            .filter(country => country.tier === null)
                            .map(country => (
                                <div
                                    key={country.id}
                                    className="py-2 px-3 m-1 flex items-center cursor-move hover:bg-gray-100 border border-gray-200 rounded transition-colors"
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, country)}
                                    title={country.name}
                                >
                                    <span className="text-lg mr-2">{country.flag}</span>
                                    <span className="text-sm">{country.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>

            <footer className="py-4 mt-6 flex justify-center space-x-4">
                <div className="flex flex-col items-center">
                    <button
                        onClick={handleReset}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors"
                    >
                        Reset
                    </button>
                    <span className="text-xs mt-1 text-gray-600">Clear all tiers</span>
                </div>
                <div className="flex flex-col items-center">
                    <button
                        onClick={handleExport}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors"
                    >
                        Export
                    </button>
                    <span className="text-xs mt-1 text-gray-600">Save your tier list as JSON</span>
                </div>
            </footer>
        </div>
    );
};

export default FreedomOfSpeechTierList;
