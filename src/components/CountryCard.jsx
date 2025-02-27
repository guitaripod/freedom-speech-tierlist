import React from 'react';

const CountryCard = ({ country, isRanked, onDragStart, onClick }) => {
    return (
        <div
            className={`country-card ${isRanked ? 'ranked-country' : 'unranked-country'}`}
            draggable="true"
            onDragStart={(e) => onDragStart(e, country)}
            onClick={onClick}
            title={isRanked ? `${country.name} (Click to remove)` : country.name}
        >
            <span className="country-flag">{country.flag}</span>
            {isRanked ? (
                <>
                    <div className="remove-button">✕</div>
                    <div className="country-tooltip">{country.name}</div>
                </>
            ) : (
                <>
                    <span className="country-name">{country.name}</span>
                    <span className="country-region">{country.region}</span>
                </>
            )}
        </div>
    );
};

export default CountryCard;

