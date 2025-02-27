import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './tierlist-styles.css';

const FreedomOfSpeechTierList = () => {
    // Define tiers with their colors
    const tiers = [
        { id: 'S', color: '#FF7F7F', label: 'Exceptional' },
        { id: 'A', color: '#FFBF7F', label: 'Excellent' },
        { id: 'B', color: '#FFFF7F', label: 'Good' },
        { id: 'C', color: '#7FFF7F', label: 'Average' },
        { id: 'D', color: '#7FBFFF', label: 'Below Average' },
        { id: 'F', color: '#FF7FFF', label: 'Poor' }
    ];

    // Countries data with flags
    const [countries, setCountries] = useState([
        { id: 'norway', name: 'Norway', tier: null, flag: '🇳🇴', region: 'Europe' },
        { id: 'finland', name: 'Finland', tier: null, flag: '🇫🇮', region: 'Europe' },
        { id: 'sweden', name: 'Sweden', tier: null, flag: '🇸🇪', region: 'Europe' },
        { id: 'denmark', name: 'Denmark', tier: null, flag: '🇩🇰', region: 'Europe' },
        { id: 'netherlands', name: 'Netherlands', tier: null, flag: '🇳🇱', region: 'Europe' },
        { id: 'jamaica', name: 'Jamaica', tier: null, flag: '🇯🇲', region: 'Americas' },
        { id: 'switzerland', name: 'Switzerland', tier: null, flag: '🇨🇭', region: 'Europe' },
        { id: 'new-zealand', name: 'New Zealand', tier: null, flag: '🇳🇿', region: 'Oceania' },
        { id: 'portugal', name: 'Portugal', tier: null, flag: '🇵🇹', region: 'Europe' },
        { id: 'canada', name: 'Canada', tier: null, flag: '🇨🇦', region: 'Americas' },
        { id: 'germany', name: 'Germany', tier: null, flag: '🇩🇪', region: 'Europe' },
        { id: 'uruguay', name: 'Uruguay', tier: null, flag: '🇺🇾', region: 'Americas' },
        { id: 'estonia', name: 'Estonia', tier: null, flag: '🇪🇪', region: 'Europe' },
        { id: 'ireland', name: 'Ireland', tier: null, flag: '🇮🇪', region: 'Europe' },
        { id: 'belgium', name: 'Belgium', tier: null, flag: '🇧🇪', region: 'Europe' },
        { id: 'austria', name: 'Austria', tier: null, flag: '🇦🇹', region: 'Europe' },
        { id: 'australia', name: 'Australia', tier: null, flag: '🇦🇺', region: 'Oceania' },
        { id: 'france', name: 'France', tier: null, flag: '🇫🇷', region: 'Europe' },
        { id: 'uk', name: 'United Kingdom', tier: null, flag: '🇬🇧', region: 'Europe' },
        { id: 'usa', name: 'United States', tier: null, flag: '🇺🇸', region: 'Americas' },
        { id: 'japan', name: 'Japan', tier: null, flag: '🇯🇵', region: 'Asia' },
        { id: 'south-korea', name: 'South Korea', tier: null, flag: '🇰🇷', region: 'Asia' },
        { id: 'spain', name: 'Spain', tier: null, flag: '🇪🇸', region: 'Europe' },
        { id: 'italy', name: 'Italy', tier: null, flag: '🇮🇹', region: 'Europe' },
        { id: 'czech-republic', name: 'Czech Republic', tier: null, flag: '🇨🇿', region: 'Europe' },
        { id: 'taiwan', name: 'Taiwan', tier: null, flag: '🇹🇼', region: 'Asia' },
        { id: 'chile', name: 'Chile', tier: null, flag: '🇨🇱', region: 'Americas' },
        { id: 'costa-rica', name: 'Costa Rica', tier: null, flag: '🇨🇷', region: 'Americas' },
        { id: 'south-africa', name: 'South Africa', tier: null, flag: '🇿🇦', region: 'Africa' },
        { id: 'argentina', name: 'Argentina', tier: null, flag: '🇦🇷', region: 'Americas' },
        { id: 'brazil', name: 'Brazil', tier: null, flag: '🇧🇷', region: 'Americas' },
        { id: 'india', name: 'India', tier: null, flag: '🇮🇳', region: 'Asia' },
        { id: 'mexico', name: 'Mexico', tier: null, flag: '🇲🇽', region: 'Americas' },
        { id: 'greece', name: 'Greece', tier: null, flag: '🇬🇷', region: 'Europe' },
        { id: 'poland', name: 'Poland', tier: null, flag: '🇵🇱', region: 'Europe' },
        { id: 'singapore', name: 'Singapore', tier: null, flag: '🇸🇬', region: 'Asia' },
        { id: 'israel', name: 'Israel', tier: null, flag: '🇮🇱', region: 'Asia' },
        { id: 'turkey', name: 'Turkey', tier: null, flag: '🇹🇷', region: 'Europe' },
        { id: 'russia', name: 'Russia', tier: null, flag: '🇷🇺', region: 'Europe' },
        { id: 'china', name: 'China', tier: null, flag: '🇨🇳', region: 'Asia' },
        { id: 'iran', name: 'Iran', tier: null, flag: '🇮🇷', region: 'Asia' },
        { id: 'saudi-arabia', name: 'Saudi Arabia', tier: null, flag: '🇸🇦', region: 'Asia' },
        { id: 'egypt', name: 'Egypt', tier: null, flag: '🇪🇬', region: 'Africa' },
        { id: 'north-korea', name: 'North Korea', tier: null, flag: '🇰🇵', region: 'Asia' }
    ]);

    // State for filterable regions
    const [selectedRegion, setSelectedRegion] = useState('All');
    const regions = ['All', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania'];

    // State for drag and drop
    const [dragging, setDragging] = useState(null);
    const [isDraggingOver, setIsDraggingOver] = useState(null);

    // Stats state
    const [stats, setStats] = useState({
        ranked: 0,
        unranked: countries.length
    });

    // Update stats whenever countries change
    useEffect(() => {
        const ranked = countries.filter(country => country.tier !== null).length;
        setStats({
            ranked,
            unranked: countries.length - ranked
        });
    }, [countries]);

    // Handle the start of a drag operation
    const handleDragStart = (e, country) => {
        setDragging(country);
        e.dataTransfer.setData('text/plain', country.id);

        // Create custom ghost image
        const dragPreview = document.createElement('div');
        dragPreview.className = 'drag-preview';
        dragPreview.innerHTML = `<span style="font-size: 40px;">${country.flag}</span>`;
        dragPreview.style.position = 'absolute';
        dragPreview.style.top = '-1000px';
        dragPreview.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        dragPreview.style.padding = '8px';
        dragPreview.style.borderRadius = '8px';
        dragPreview.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        document.body.appendChild(dragPreview);

        e.dataTransfer.setDragImage(dragPreview, 20, 20);

        // Clean up
        setTimeout(() => {
            document.body.removeChild(dragPreview);
        }, 0);
    };

    // Handle the drag over event
    const handleDragOver = (e, tierId) => {
        e.preventDefault();
        setIsDraggingOver(tierId);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(null);
    };

    // Handle dropping a country into a tier
    const handleDrop = (e, targetTier) => {
        e.preventDefault();
        setIsDraggingOver(null);

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
        if (window.confirm('Are you sure you want to reset your tier list?')) {
            setCountries(prevCountries =>
                prevCountries.map(country => ({ ...country, tier: null }))
            );
        }
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
        <div className="tierlist-container">
            <header className="tierlist-header">
                <h1 className="tierlist-title">Freedom of Speech Tier List</h1>
                <p className="tierlist-subtitle">Drag and drop countries to rank them based on freedom of speech</p>

                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-count ranked">{stats.ranked}</span> Ranked
                    </div>
                    <div className="stat-item">
                        <span className="stat-count unranked">{stats.unranked}</span> Unranked
                    </div>
                </div>
            </header>

            <main className="tierlist-main">
                {/* Tier rows with improved styling */}
                <div className="tier-container">
                    {tiers.map(tier => (
                        <div
                            key={tier.id}
                            className={`tier-row ${isDraggingOver === tier.id ? 'drag-over' : ''}`}
                            onDragOver={(e) => handleDragOver(e, tier.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, tier.id)}
                        >
                            <div
                                className="tier-label"
                                style={{ backgroundColor: tier.color }}
                            >
                                <div className="tier-label-content">
                                    <span className="tier-id">{tier.id}</span>
                                    <span className="tier-name">{tier.label}</span>
                                </div>
                            </div>
                            <div className="tier-content">
                                {countries
                                    .filter(country => country.tier === tier.id)
                                    .map(country => (
                                        <div
                                            key={country.id}
                                            className="country-card ranked-country"
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, country)}
                                            onClick={() => handleRemoveFromTier(country.id)}
                                            title={`${country.name} (Click to remove)`}
                                        >
                                            <span className="country-flag">{country.flag}</span>
                                            <div className="remove-button">✕</div>
                                            <div className="country-tooltip">{country.name}</div>
                                        </div>
                                    ))
                                }
                                {countries.filter(country => country.tier === tier.id).length === 0 && (
                                    <div className="tier-empty-message">
                                        Drop countries here
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Country selection with region filtering */}
                <div className="countries-section">
                    <div className="countries-header">
                        <h2 className="countries-title">Countries</h2>

                        <div className="region-filters">
                            {regions.map(region => (
                                <button
                                    key={region}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`region-button ${selectedRegion === region ? 'active' : ''}`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="countries-grid">
                        {countries
                            .filter(country => country.tier === null)
                            .filter(country => selectedRegion === 'All' || country.region === selectedRegion)
                            .map(country => (
                                <div
                                    key={country.id}
                                    className="country-card unranked-country"
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, country)}
                                >
                                    <span className="country-flag">{country.flag}</span>
                                    <span className="country-name">{country.name}</span>
                                    <span className="country-region">{country.region}</span>
                                </div>
                            ))
                        }

                        {countries.filter(country => country.tier === null && (selectedRegion === 'All' || country.region === selectedRegion)).length === 0 && (
                            <div className="empty-countries-message">
                                No countries available in this region or all countries have been ranked.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="tierlist-footer">
                <div className="action-button-container">
                    <button
                        onClick={handleReset}
                        className="action-button reset-button"
                    >
                        Reset
                    </button>
                    <span className="button-description">Clear all tiers</span>
                </div>
                <div className="action-button-container">
                    <button
                        onClick={handleExport}
                        className="action-button export-button"
                    >
                        Export
                    </button>
                    <span className="button-description">Save your tier list as JSON</span>
                </div>
            </footer>
        </div>
    );
};

export default FreedomOfSpeechTierList;
