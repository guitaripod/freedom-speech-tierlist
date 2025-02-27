import React from 'react';
import CountryCard from './CountryCard';
import RegionFilter from './RegionFilter';

const CountriesSection = ({
    countries,
    selectedRegion,
    regions,
    onRegionChange,
    onDragStart
}) => {
    const filteredCountries = countries
        .filter(country => country.tier === null)
        .filter(country => selectedRegion === 'All' || country.region === selectedRegion);

    return (
        <div className="countries-section">
            <div className="countries-header">
                <h2 className="countries-title">Countries</h2>
                <RegionFilter
                    regions={regions}
                    selectedRegion={selectedRegion}
                    onRegionChange={onRegionChange}
                />
            </div>

            <div className="countries-grid">
                {filteredCountries.map(country => (
                    <CountryCard
                        key={country.id}
                        country={country}
                        isRanked={false}
                        onDragStart={onDragStart}
                    />
                ))}

                {filteredCountries.length === 0 && (
                    <div className="empty-countries-message">
                        No countries available in this region or all countries have been ranked.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountriesSection;

