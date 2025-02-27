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

    const [countries, setCountries] = useState([
        // Existing countries
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
        { id: 'north-korea', name: 'North Korea', tier: null, flag: '🇰🇵', region: 'Asia' },

        // Additional African countries
        { id: 'algeria', name: 'Algeria', tier: null, flag: '🇩🇿', region: 'Africa' },
        { id: 'angola', name: 'Angola', tier: null, flag: '🇦🇴', region: 'Africa' },
        { id: 'benin', name: 'Benin', tier: null, flag: '🇧🇯', region: 'Africa' },
        { id: 'botswana', name: 'Botswana', tier: null, flag: '🇧🇼', region: 'Africa' },
        { id: 'burkina-faso', name: 'Burkina Faso', tier: null, flag: '🇧🇫', region: 'Africa' },
        { id: 'burundi', name: 'Burundi', tier: null, flag: '🇧🇮', region: 'Africa' },
        { id: 'cabo-verde', name: 'Cabo Verde', tier: null, flag: '🇨🇻', region: 'Africa' },
        { id: 'cameroon', name: 'Cameroon', tier: null, flag: '🇨🇲', region: 'Africa' },
        { id: 'central-african-republic', name: 'Central African Republic', tier: null, flag: '🇨🇫', region: 'Africa' },
        { id: 'chad', name: 'Chad', tier: null, flag: '🇹🇩', region: 'Africa' },
        { id: 'comoros', name: 'Comoros', tier: null, flag: '🇰🇲', region: 'Africa' },
        { id: 'congo-republic', name: 'Congo, Republic of the', tier: null, flag: '🇨🇬', region: 'Africa' },
        { id: 'congo-drc', name: 'Congo, Democratic Republic of the', tier: null, flag: '🇨🇩', region: 'Africa' },
        { id: 'djibouti', name: 'Djibouti', tier: null, flag: '🇩🇯', region: 'Africa' },
        { id: 'equatorial-guinea', name: 'Equatorial Guinea', tier: null, flag: '🇬🇶', region: 'Africa' },
        { id: 'eritrea', name: 'Eritrea', tier: null, flag: '🇪🇷', region: 'Africa' },
        { id: 'eswatini', name: 'Eswatini', tier: null, flag: '🇸🇿', region: 'Africa' },
        { id: 'ethiopia', name: 'Ethiopia', tier: null, flag: '🇪🇹', region: 'Africa' },
        { id: 'gabon', name: 'Gabon', tier: null, flag: '🇬🇦', region: 'Africa' },
        { id: 'gambia', name: 'Gambia', tier: null, flag: '🇬🇲', region: 'Africa' },
        { id: 'ghana', name: 'Ghana', tier: null, flag: '🇬🇭', region: 'Africa' },
        { id: 'guinea', name: 'Guinea', tier: null, flag: '🇬🇳', region: 'Africa' },
        { id: 'guinea-bissau', name: 'Guinea-Bissau', tier: null, flag: '🇬🇼', region: 'Africa' },
        { id: 'ivory-coast', name: 'Côte d\'Ivoire', tier: null, flag: '🇨🇮', region: 'Africa' },
        { id: 'kenya', name: 'Kenya', tier: null, flag: '🇰🇪', region: 'Africa' },
        { id: 'lesotho', name: 'Lesotho', tier: null, flag: '🇱🇸', region: 'Africa' },
        { id: 'liberia', name: 'Liberia', tier: null, flag: '🇱🇷', region: 'Africa' },
        { id: 'libya', name: 'Libya', tier: null, flag: '🇱🇾', region: 'Africa' },
        { id: 'madagascar', name: 'Madagascar', tier: null, flag: '🇲🇬', region: 'Africa' },
        { id: 'malawi', name: 'Malawi', tier: null, flag: '🇲🇼', region: 'Africa' },
        { id: 'mali', name: 'Mali', tier: null, flag: '🇲🇱', region: 'Africa' },
        { id: 'mauritania', name: 'Mauritania', tier: null, flag: '🇲🇷', region: 'Africa' },
        { id: 'mauritius', name: 'Mauritius', tier: null, flag: '🇲🇺', region: 'Africa' },
        { id: 'morocco', name: 'Morocco', tier: null, flag: '🇲🇦', region: 'Africa' },
        { id: 'mozambique', name: 'Mozambique', tier: null, flag: '🇲🇿', region: 'Africa' },
        { id: 'namibia', name: 'Namibia', tier: null, flag: '🇳🇦', region: 'Africa' },
        { id: 'niger', name: 'Niger', tier: null, flag: '🇳🇪', region: 'Africa' },
        { id: 'nigeria', name: 'Nigeria', tier: null, flag: '🇳🇬', region: 'Africa' },
        { id: 'rwanda', name: 'Rwanda', tier: null, flag: '🇷🇼', region: 'Africa' },
        { id: 'sao-tome', name: 'São Tomé and Príncipe', tier: null, flag: '🇸🇹', region: 'Africa' },
        { id: 'senegal', name: 'Senegal', tier: null, flag: '🇸🇳', region: 'Africa' },
        { id: 'seychelles', name: 'Seychelles', tier: null, flag: '🇸🇨', region: 'Africa' },
        { id: 'sierra-leone', name: 'Sierra Leone', tier: null, flag: '🇸🇱', region: 'Africa' },
        { id: 'somalia', name: 'Somalia', tier: null, flag: '🇸🇴', region: 'Africa' },
        { id: 'south-sudan', name: 'South Sudan', tier: null, flag: '🇸🇸', region: 'Africa' },
        { id: 'sudan', name: 'Sudan', tier: null, flag: '🇸🇩', region: 'Africa' },
        { id: 'tanzania', name: 'Tanzania', tier: null, flag: '🇹🇿', region: 'Africa' },
        { id: 'togo', name: 'Togo', tier: null, flag: '🇹🇬', region: 'Africa' },
        { id: 'tunisia', name: 'Tunisia', tier: null, flag: '🇹🇳', region: 'Africa' },
        { id: 'uganda', name: 'Uganda', tier: null, flag: '🇺🇬', region: 'Africa' },
        { id: 'zambia', name: 'Zambia', tier: null, flag: '🇿🇲', region: 'Africa' },
        { id: 'zimbabwe', name: 'Zimbabwe', tier: null, flag: '🇿🇼', region: 'Africa' },

        // Additional Asian countries
        { id: 'afghanistan', name: 'Afghanistan', tier: null, flag: '🇦🇫', region: 'Asia' },
        { id: 'armenia', name: 'Armenia', tier: null, flag: '🇦🇲', region: 'Asia' },
        { id: 'azerbaijan', name: 'Azerbaijan', tier: null, flag: '🇦🇿', region: 'Asia' },
        { id: 'bahrain', name: 'Bahrain', tier: null, flag: '🇧🇭', region: 'Asia' },
        { id: 'bangladesh', name: 'Bangladesh', tier: null, flag: '🇧🇩', region: 'Asia' },
        { id: 'bhutan', name: 'Bhutan', tier: null, flag: '🇧🇹', region: 'Asia' },
        { id: 'brunei', name: 'Brunei', tier: null, flag: '🇧🇳', region: 'Asia' },
        { id: 'cambodia', name: 'Cambodia', tier: null, flag: '🇰🇭', region: 'Asia' },
        { id: 'cyprus', name: 'Cyprus', tier: null, flag: '🇨🇾', region: 'Asia' },
        { id: 'georgia', name: 'Georgia', tier: null, flag: '🇬🇪', region: 'Asia' },
        { id: 'indonesia', name: 'Indonesia', tier: null, flag: '🇮🇩', region: 'Asia' },
        { id: 'iraq', name: 'Iraq', tier: null, flag: '🇮🇶', region: 'Asia' },
        { id: 'jordan', name: 'Jordan', tier: null, flag: '🇯🇴', region: 'Asia' },
        { id: 'kazakhstan', name: 'Kazakhstan', tier: null, flag: '🇰🇿', region: 'Asia' },
        { id: 'kuwait', name: 'Kuwait', tier: null, flag: '🇰🇼', region: 'Asia' },
        { id: 'kyrgyzstan', name: 'Kyrgyzstan', tier: null, flag: '🇰🇬', region: 'Asia' },
        { id: 'laos', name: 'Laos', tier: null, flag: '🇱🇦', region: 'Asia' },
        { id: 'lebanon', name: 'Lebanon', tier: null, flag: '🇱🇧', region: 'Asia' },
        { id: 'malaysia', name: 'Malaysia', tier: null, flag: '🇲🇾', region: 'Asia' },
        { id: 'maldives', name: 'Maldives', tier: null, flag: '🇲🇻', region: 'Asia' },
        { id: 'mongolia', name: 'Mongolia', tier: null, flag: '🇲🇳', region: 'Asia' },
        { id: 'myanmar', name: 'Myanmar', tier: null, flag: '🇲🇲', region: 'Asia' },
        { id: 'nepal', name: 'Nepal', tier: null, flag: '🇳🇵', region: 'Asia' },
        { id: 'oman', name: 'Oman', tier: null, flag: '🇴🇲', region: 'Asia' },
        { id: 'pakistan', name: 'Pakistan', tier: null, flag: '🇵🇰', region: 'Asia' },
        { id: 'palestine', name: 'Palestine', tier: null, flag: '🇵🇸', region: 'Asia' },
        { id: 'philippines', name: 'Philippines', tier: null, flag: '🇵🇭', region: 'Asia' },
        { id: 'qatar', name: 'Qatar', tier: null, flag: '🇶🇦', region: 'Asia' },
        { id: 'sri-lanka', name: 'Sri Lanka', tier: null, flag: '🇱🇰', region: 'Asia' },
        { id: 'syria', name: 'Syria', tier: null, flag: '🇸🇾', region: 'Asia' },
        { id: 'tajikistan', name: 'Tajikistan', tier: null, flag: '🇹🇯', region: 'Asia' },
        { id: 'thailand', name: 'Thailand', tier: null, flag: '🇹🇭', region: 'Asia' },
        { id: 'timor-leste', name: 'Timor-Leste', tier: null, flag: '🇹🇱', region: 'Asia' },
        { id: 'turkmenistan', name: 'Turkmenistan', tier: null, flag: '🇹🇲', region: 'Asia' },
        { id: 'united-arab-emirates', name: 'United Arab Emirates', tier: null, flag: '🇦🇪', region: 'Asia' },
        { id: 'uzbekistan', name: 'Uzbekistan', tier: null, flag: '🇺🇿', region: 'Asia' },
        { id: 'vietnam', name: 'Vietnam', tier: null, flag: '🇻🇳', region: 'Asia' },
        { id: 'yemen', name: 'Yemen', tier: null, flag: '🇾🇪', region: 'Asia' },

        // Additional European countries
        { id: 'albania', name: 'Albania', tier: null, flag: '🇦🇱', region: 'Europe' },
        { id: 'andorra', name: 'Andorra', tier: null, flag: '🇦🇩', region: 'Europe' },
        { id: 'belarus', name: 'Belarus', tier: null, flag: '🇧🇾', region: 'Europe' },
        { id: 'bosnia', name: 'Bosnia and Herzegovina', tier: null, flag: '🇧🇦', region: 'Europe' },
        { id: 'bulgaria', name: 'Bulgaria', tier: null, flag: '🇧🇬', region: 'Europe' },
        { id: 'croatia', name: 'Croatia', tier: null, flag: '🇭🇷', region: 'Europe' },
        { id: 'hungary', name: 'Hungary', tier: null, flag: '🇭🇺', region: 'Europe' },
        { id: 'iceland', name: 'Iceland', tier: null, flag: '🇮🇸', region: 'Europe' },
        { id: 'kosovo', name: 'Kosovo', tier: null, flag: '🇽🇰', region: 'Europe' },
        { id: 'latvia', name: 'Latvia', tier: null, flag: '🇱🇻', region: 'Europe' },
        { id: 'liechtenstein', name: 'Liechtenstein', tier: null, flag: '🇱🇮', region: 'Europe' },
        { id: 'lithuania', name: 'Lithuania', tier: null, flag: '🇱🇹', region: 'Europe' },
        { id: 'luxembourg', name: 'Luxembourg', tier: null, flag: '🇱🇺', region: 'Europe' },
        { id: 'malta', name: 'Malta', tier: null, flag: '🇲🇹', region: 'Europe' },
        { id: 'moldova', name: 'Moldova', tier: null, flag: '🇲🇩', region: 'Europe' },
        { id: 'monaco', name: 'Monaco', tier: null, flag: '🇲🇨', region: 'Europe' },
        { id: 'montenegro', name: 'Montenegro', tier: null, flag: '🇲🇪', region: 'Europe' },
        { id: 'north-macedonia', name: 'North Macedonia', tier: null, flag: '🇲🇰', region: 'Europe' },
        { id: 'norway', name: 'Norway', tier: null, flag: '🇳🇴', region: 'Europe' },
        { id: 'romania', name: 'Romania', tier: null, flag: '🇷🇴', region: 'Europe' },
        { id: 'san-marino', name: 'San Marino', tier: null, flag: '🇸🇲', region: 'Europe' },
        { id: 'serbia', name: 'Serbia', tier: null, flag: '🇷🇸', region: 'Europe' },
        { id: 'slovakia', name: 'Slovakia', tier: null, flag: '🇸🇰', region: 'Europe' },
        { id: 'slovenia', name: 'Slovenia', tier: null, flag: '🇸🇮', region: 'Europe' },
        { id: 'ukraine', name: 'Ukraine', tier: null, flag: '🇺🇦', region: 'Europe' },
        { id: 'vatican-city', name: 'Vatican City', tier: null, flag: '🇻🇦', region: 'Europe' },

        // Additional Americas countries
        { id: 'antigua', name: 'Antigua and Barbuda', tier: null, flag: '🇦🇬', region: 'Americas' },
        { id: 'bahamas', name: 'Bahamas', tier: null, flag: '🇧🇸', region: 'Americas' },
        { id: 'barbados', name: 'Barbados', tier: null, flag: '🇧🇧', region: 'Americas' },
        { id: 'belize', name: 'Belize', tier: null, flag: '🇧🇿', region: 'Americas' },
        { id: 'bolivia', name: 'Bolivia', tier: null, flag: '🇧🇴', region: 'Americas' },
        { id: 'colombia', name: 'Colombia', tier: null, flag: '🇨🇴', region: 'Americas' },
        { id: 'cuba', name: 'Cuba', tier: null, flag: '🇨🇺', region: 'Americas' },
        { id: 'dominica', name: 'Dominica', tier: null, flag: '🇩🇲', region: 'Americas' },
        { id: 'dominican-republic', name: 'Dominican Republic', tier: null, flag: '🇩🇴', region: 'Americas' },
        { id: 'ecuador', name: 'Ecuador', tier: null, flag: '🇪🇨', region: 'Americas' },
        { id: 'el-salvador', name: 'El Salvador', tier: null, flag: '🇸🇻', region: 'Americas' },
        { id: 'grenada', name: 'Grenada', tier: null, flag: '🇬🇩', region: 'Americas' },
        { id: 'guatemala', name: 'Guatemala', tier: null, flag: '🇬🇹', region: 'Americas' },
        { id: 'guyana', name: 'Guyana', tier: null, flag: '🇬🇾', region: 'Americas' },
        { id: 'haiti', name: 'Haiti', tier: null, flag: '🇭🇹', region: 'Americas' },
        { id: 'honduras', name: 'Honduras', tier: null, flag: '🇭🇳', region: 'Americas' },
        { id: 'nicaragua', name: 'Nicaragua', tier: null, flag: '🇳🇮', region: 'Americas' },
        { id: 'panama', name: 'Panama', tier: null, flag: '🇵🇦', region: 'Americas' },
        { id: 'paraguay', name: 'Paraguay', tier: null, flag: '🇵🇾', region: 'Americas' },
        { id: 'peru', name: 'Peru', tier: null, flag: '🇵🇪', region: 'Americas' },
        { id: 'saint-kitts', name: 'Saint Kitts and Nevis', tier: null, flag: '🇰🇳', region: 'Americas' },
        { id: 'saint-lucia', name: 'Saint Lucia', tier: null, flag: '🇱🇨', region: 'Americas' },
        { id: 'saint-vincent', name: 'Saint Vincent and the Grenadines', tier: null, flag: '🇻🇨', region: 'Americas' },
        { id: 'suriname', name: 'Suriname', tier: null, flag: '🇸🇷', region: 'Americas' },
        { id: 'trinidad', name: 'Trinidad and Tobago', tier: null, flag: '🇹🇹', region: 'Americas' },
        { id: 'venezuela', name: 'Venezuela', tier: null, flag: '🇻🇪', region: 'Americas' },

        // Additional Oceania countries
        { id: 'fiji', name: 'Fiji', tier: null, flag: '🇫🇯', region: 'Oceania' },
        { id: 'kiribati', name: 'Kiribati', tier: null, flag: '🇰🇮', region: 'Oceania' },
        { id: 'marshall-islands', name: 'Marshall Islands', tier: null, flag: '🇲🇭', region: 'Oceania' },
        { id: 'micronesia', name: 'Micronesia', tier: null, flag: '🇫🇲', region: 'Oceania' },
        { id: 'nauru', name: 'Nauru', tier: null, flag: '🇳🇷', region: 'Oceania' },
        { id: 'palau', name: 'Palau', tier: null, flag: '🇵🇼', region: 'Oceania' },
        { id: 'papua-new-guinea', name: 'Papua New Guinea', tier: null, flag: '🇵🇬', region: 'Oceania' },
        { id: 'samoa', name: 'Samoa', tier: null, flag: '🇼🇸', region: 'Oceania' },
        { id: 'solomon-islands', name: 'Solomon Islands', tier: null, flag: '🇸🇧', region: 'Oceania' },
        { id: 'tonga', name: 'Tonga', tier: null, flag: '🇹🇴', region: 'Oceania' },
        { id: 'tuvalu', name: 'Tuvalu', tier: null, flag: '🇹🇻', region: 'Oceania' },
        { id: 'vanuatu', name: 'Vanuatu', tier: null, flag: '🇻🇺', region: 'Oceania' }
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
