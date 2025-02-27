import React from 'react';

const StatsDisplay = ({ ranked, unranked }) => {
    return (
        <div className="stats-container">
            <div className="stat-item">
                <span className="stat-count ranked">{ranked}</span> Ranked
            </div>
            <div className="stat-item">
                <span className="stat-count unranked">{unranked}</span> Unranked
            </div>
        </div>
    );
};

export default StatsDisplay;

