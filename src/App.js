import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const FreedomOfSpeechTierList = () => {
    // Define tiers
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

    // Handle the start of a drag operation
    const handleDragStart = (e, country) => {
        setDragging(country);
        // Create a custom drag image (optional)
        const dragImg = new Image();
        dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent 1x1 pixel
        e.dataTransfer.setDragImage(dragImg, 0, 0);

        // Set the country name as the data being dragged
        e.dataTransfer.setData('text/plain', country.id);
    };

    // Handle the drag over event (needed to allow dropping)
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Handle dropping a country into a tier
    const handleDrop = (e, targetTier) => {
        e.preventDefault();
        if (!dragging) return;

        // Update the country's tier
        setCountries(prevCountries =>
            prevCountries.map(country =>
                country.id === dragging.id ? { ...country, tier: targetTier } : country
            )
        );

        setDragging(null);
    };

    // Handle removing a country from a tier (dropping it back to the pool)
    const handleRemoveFromTier = (countryId) => {
        setCountries(prevCountries =>
            prevCountries.map(country =>
                country.id === countryId ? { ...country, tier: null } : country
            )
        );
    };

    // Reset all countries to their initial state (no tier)
    const handleReset = () => {
        setCountries(prevCountries =>
            prevCountries.map(country => ({ ...country, tier: null }))
        );
    };

    // Export the tier list (in a real app, this would save to a file or database)
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold text-center">Freedom of Speech Tier List</h1>
                <p className="text-center mt-2">Drag and drop countries to rank them based on freedom of speech</p>
            </header>

            <main className="flex-grow p-4">
                {/* Tier rows */}
                <div className="mb-8">
                    {tiers.map(tier => (
                        <div
                            key={tier.id}
                            className="flex mb-2 border border-gray-300 rounded"
                            style={{ backgroundColor: tier.color }}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, tier.id)}
                        >
                            <div className="flex items-center justify-center w-16 bg-gray-800 text-white font-bold text-2xl">
                                {tier.id}
                            </div>
                            <div className="flex flex-wrap p-2 min-h-16 flex-grow">
                                {countries
                                    .filter(country => country.tier === tier.id)
                                    .map(country => (
                                        <div
                                            key={country.id}
                                            className="m-1 p-2 bg-white rounded shadow flex items-center cursor-move"
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, country)}
                                            onClick={() => handleRemoveFromTier(country.id)}
                                            title={`${country.name} (Click to remove)`}
                                        >
                                            <span className="text-2xl mr-2">{country.flag}</span>
                                            <span className="text-sm">{country.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* Country pool */}
                <div className="border border-gray-300 rounded bg-white p-4">
                    <h2 className="text-xl font-bold mb-4">Countries</h2>
                    <div className="flex flex-wrap">
                        {countries
                            .filter(country => country.tier === null)
                            .map(country => (
                                <div
                                    key={country.id}
                                    className="m-1 p-2 bg-gray-100 rounded shadow flex items-center cursor-move"
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, country)}
                                    title={country.name}
                                >
                                    <span className="text-2xl mr-2">{country.flag}</span>
                                    <span className="text-sm">{country.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>

            <footer className="bg-gray-200 p-4">
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleReset}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Export
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default FreedomOfSpeechTierList;
