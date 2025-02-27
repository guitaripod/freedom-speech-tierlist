import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FreedomOfSpeechTierList from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <FreedomOfSpeechTierList />
    </React.StrictMode>
);

reportWebVitals();
