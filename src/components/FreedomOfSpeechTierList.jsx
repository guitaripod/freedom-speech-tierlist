import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './tierlist-styles.css';

import Header from './Header';
import TierRow from './TierRow';
import CountriesSection from './CountriesSection';
import Footer from './Footer';
import { initialCountries } from './countriesData';
import { tiers } from './tiersData';

const FreedomOfSpeechTierList = () => {
    // State for countries
    const [countries, setCountries] = useState(initialCountries);

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
            <Header stats={stats} />

            <main className="tierlist-main">
                {/* Tier rows with improved styling */}
                <div className="tier-container">
                    {tiers.map(tier => (
                        <TierRow
                            key={tier.id}
                            tier={tier}
                            countries={countries}
                            isDraggingOver={isDraggingOver}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onDragStart={handleDragStart}
                            onRemoveFromTier={handleRemoveFromTier}
                        />
                    ))}
                </div>

                <CountriesSection
                    countries={countries}
                    selectedRegion={selectedRegion}
                    regions={regions}
                    onRegionChange={setSelectedRegion}
                    onDragStart={handleDragStart}
                />
            </main>

            <Footer onReset={handleReset} onExport={handleExport} />
        </div>
    );
};

export default FreedomOfSpeechTierList;

