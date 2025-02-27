import React from 'react';

const RegionFilter = ({ regions, selectedRegion, onRegionChange }) => {
    return (
        <div className="region-filters">
            {regions.map(region => (
                <button
                    key={region}
                    onClick={() => onRegionChange(region)}
                    className={`region-button ${selectedRegion === region ? 'active' : ''}`}
                >
                    {region}
                </button>
            ))}
        </div>
    );
};

export default RegionFilter;

