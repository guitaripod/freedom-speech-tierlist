import React from 'react';
import CountryCard from './CountryCard';

const TierRow = ({ tier, countries, isDraggingOver, onDragOver, onDragLeave, onDrop, onDragStart, onRemoveFromTier }) => {
    const tieredCountries = countries.filter(country => country.tier === tier.id);

    return (
        <div
            className={`tier-row ${isDraggingOver === tier.id ? 'drag-over' : ''}`}
            onDragOver={(e) => onDragOver(e, tier.id)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, tier.id)}
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
                {tieredCountries.map(country => (
                    <CountryCard
                        key={country.id}
                        country={country}
                        isRanked={true}
                        onDragStart={onDragStart}
                        onClick={() => onRemoveFromTier(country.id)}
                    />
                ))}
                {tieredCountries.length === 0 && (
                    <div className="tier-empty-message">
                        Drop countries here
                    </div>
                )}
            </div>
        </div>
    );
};

export default TierRow;

