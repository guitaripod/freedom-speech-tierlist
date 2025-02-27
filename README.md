# Freedom of Speech Tier List

A drag-and-drop interactive tool for creating, sharing and discussing freedom of speech rankings across countries worldwide.

![Freedom of Speech Tier List Screenshot](https://via.placeholder.com/800x450?text=Freedom+of+Speech+Tier+List)

## Overview

This application allows users to create customized tier lists ranking countries based on their freedom of speech status. Using a simple drag-and-drop interface, users can categorize countries from S-tier (Exceptional) to F-tier (Poor) based on their own assessment or available data.

## Features

- **Interactive Drag-and-Drop Interface**: Easily move countries between tiers with intuitive controls
- **200+ Countries**: Comprehensive list of countries from all regions of the world
- **Regional Filtering**: Filter unranked countries by continent (Europe, Americas, Asia, Africa, Oceania)
- **Progress Tracking**: See how many countries you've ranked and how many remain
- **Data Export**: Save your tier list as a JSON file for sharing or future reference
- **Reset Functionality**: Clear your rankings and start fresh with a single click
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. Browse the list of countries in the bottom section
2. Drag countries to the appropriate tier rankings (S-F)
3. Click any ranked country to remove it from a tier
4. Use the regional filters to find specific countries more easily
5. Export your completed tier list when finished
6. Share your rankings and discuss with others

## Tier Definitions

- **S Tier** (Exceptional): Countries with outstanding freedom of speech protections
- **A Tier** (Excellent): Strong legal and cultural support for free expression
- **B Tier** (Good): Generally positive environment for free speech with some limitations
- **C Tier** (Average): Mixed record with both protections and restrictions
- **D Tier** (Below Average): Significant restrictions on free expression
- **F Tier** (Poor): Severe limitations on freedom of speech

## Educational Purpose

This tool is designed for educational discussions about freedom of speech around the world. Users are encouraged to:

- Research country-specific laws and practices
- Compare different freedom indexes and methodologies
- Discuss the various factors that influence free expression
- Consider both legal protections and practical realities

## Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/freedom-speech-tierlist.git
   cd freedom-speech-tierlist
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   # or
   yarn start
   ```

4. Open http://localhost:3000 in your browser

### Building for Production

```
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── App.js                        # Main app component
├── components/                   # Component directory
│   ├── CountryCard.jsx           # Individual country component
│   ├── CountriesSection.jsx      # Countries selection area
│   ├── Footer.jsx                # App footer with actions
│   ├── FreedomOfSpeechTierList.jsx # Main component
│   ├── Header.jsx                # App header
│   ├── RegionFilter.jsx          # Region filtering component
│   ├── StatsDisplay.jsx          # Statistics display
│   ├── TierRow.jsx               # Tier row component
│   ├── countriesData.js          # Countries database
│   ├── tiersData.js              # Tier definitions
│   └── tierlist-styles.css       # Component styles
```

## Contributing

Contributions are welcome! If you'd like to improve the application:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Roadmap

- [ ] Add data import functionality
- [ ] Implement image export of completed tier lists
- [ ] Add customizable tier colors and labels
- [ ] Include freedom indices from various organizations
- [ ] Create sharing functionality directly to social media
