import React from 'react';

const Footer = ({ onReset, onExport }) => {
    return (
        <footer className="tierlist-footer">
            <div className="action-button-container">
                <button
                    onClick={onReset}
                    className="action-button reset-button"
                >
                    Reset
                </button>
                <span className="button-description">Clear all tiers</span>
            </div>
            <div className="action-button-container">
                <button
                    onClick={onExport}
                    className="action-button export-button"
                >
                    Export
                </button>
                <span className="button-description">Save your tier list as JSON</span>
            </div>
        </footer>
    );
};

export default Footer;

