import React from 'react';
import StatsDisplay from './StatsDisplay';

const Header = ({ stats }) => {
    return (
        <header className="tierlist-header">
            <h1 className="tierlist-title">Freedom of Speech Tier List</h1>
            <p className="tierlist-subtitle">Drag and drop countries to rank them based on freedom of speech</p>
            <StatsDisplay ranked={stats.ranked} unranked={stats.unranked} />
        </header>
    );
};

export default Header;

