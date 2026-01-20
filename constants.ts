/**
 * @file constants.ts
 * @purpose Stores application-wide constants, including UI structures, and business logic parameters.
 */
import React from 'react';

// Pricing Constants
export const HIGH_SEASON_MONTHS = [5, 6, 7, 8]; // June, July, August, September (0-indexed)


// Generic Icon Components
// Converted all icon components from JSX to React.createElement to be valid in a .ts file.
const HomeIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
    React.createElement('polyline', { points: "9 22 9 12 15 12 15 22" })
  )
);
const UsersIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
    React.createElement('circle', { cx: "9", cy: "7", r: "4" }),
    React.createElement('path', { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
    React.createElement('path', { d: "M16 3.13a4 4 0 0 1 0 7.75" })
  )
);
const BedDoubleIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" }),
    React.createElement('path', { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }),
    React.createElement('path', { d: "M12 4v6" }),
    React.createElement('path', { d: "M2 18h20" })
  )
);
const SoupIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" }),
    React.createElement('path', { d: "M7 21h10" }),
    React.createElement('path', { d: "M12 4v.01" }),
    React.createElement('path', { d: "M16 4.01v.01" }),
    React.createElement('path', { d: "M8 4.01v.01" })
  )
);
const WifiIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M5 12.55a11 11 0 0 1 14.08 0" }),
    React.createElement('path', { d: "M1.42 9a16 16 0 0 1 21.16 0" }),
    React.createElement('path', { d: "M8.53 16.11a6 6 0 0 1 6.95 0" }),
    React.createElement('line', { x1: "12", y1: "20", x2: "12.01", y2: "20" })
  )
);
const CarIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1h2" }),
    React.createElement('circle', { cx: "7", cy: "17", r: "2" }),
    React.createElement('path', { d: "M9 17h6" }),
    React.createElement('circle', { cx: "17", cy: "17", r: "2" })
  )
);
const SunIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('circle', { cx: "12", cy: "12", r: "4" }),
    React.createElement('path', { d: "M12 2v2" }),
    React.createElement('path', { d: "M12 20v2" }),
    React.createElement('path', { d: "m4.93 4.93 1.41 1.41" }),
    React.createElement('path', { d: "m17.66 17.66 1.41 1.41" }),
    React.createElement('path', { d: "M2 12h2" }),
    React.createElement('path', { d: "M20 12h2" }),
    React.createElement('path', { d: "m6.34 17.66-1.41 1.41" }),
    React.createElement('path', { d: "m19.07 4.93-1.41 1.41" })
  )
);
const SnowflakeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('line', { x1: "2", y1: "12", x2: "22", y2: "12" }),
    React.createElement('line', { x1: "12", y1: "2", x2: "12", y2: "22" }),
    React.createElement('path', { d: "m20 16-4-4 4-4" }),
    React.createElement('path', { d: "m4 8 4 4-4 4" }),
    React.createElement('path', { d: "m16 4-4 4-4-4" }),
    React.createElement('path', { d: "m8 20 4-4 4 4" })
  )
);
const WavesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }),
    React.createElement('path', { d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }),
    React.createElement('path', { d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" })
  )
);
const WashingMachineIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M3 6h3" }),
    React.createElement('path', { d: "M18 6h3" }),
    React.createElement('path', { d: "M21 12v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9" }),
    React.createElement('path', { d: "M21 12a9 9 0 0 0-18 0" }),
    React.createElement('circle', { cx: "12", cy: "12", r: "5" }),
    React.createElement('path', { d: "M12 15a3 3 0 0 0 3-3" })
  )
);
const BathIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0L3 5" }),
    React.createElement('path', { d: "m2 2 2 2" }),
    React.createElement('path', { d: "M13 22v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v3" }),
    React.createElement('path', { d: "M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" }),
    React.createElement('path', { d: "M21 15h.01" })
  )
);
// New Icons
const TvIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('rect', { width: "20", height: "15", x: "2", y: "7", rx: "2", ry: "2" }),
    React.createElement('polyline', { points: "17 2 12 7 7 2" })
  )
);
const FlameIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.3-1.09.96-2.06 2.5-3.03V12a2.5 2.5 0 0 0-2.5 2.5z" })
  )
);
const GridIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('rect', { width: "18", height: "18", x: "3", y: "3", rx: "2" }),
    React.createElement('path', { d: "M3 9h18" }),
    React.createElement('path', { d: "M3 15h18" }),
    React.createElement('path', { d: "M9 3v18" }),
    React.createElement('path', { d: "M15 3v18" })
  )
);
const ShowerIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M4 4v5" }),
    React.createElement('path', { d: "M8 4v6" }),
    React.createElement('path', { d: "M12 4v3" }),
    React.createElement('path', { d: "M20 16a4 4 0 1 1-8 0" }),
    React.createElement('path', { d: "M16 16v5" }),
    React.createElement('path', { d: "M16 4v5" })
  )
);
const SheetsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('rect', { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
    React.createElement('line', { x1: "3", y1: "9", x2: "21", y2: "9" })
  )
);
const SparklesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" })
  )
);
const CoffeeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M17 8h1a4 4 0 1 1 0 8h-1" }),
    React.createElement('path', { d: "M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" }),
    React.createElement('line', { x1: "6", y1: "1", x2: "6", y2: "4" }),
    React.createElement('line', { x1: "10", y1: "1", x2: "10", y2: "4" }),
    React.createElement('line', { x1: "14", y1: "1", x2: "14", y2: "4" })
  )
);
const DropletIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className },
    React.createElement('path', { d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" })
  )
);


export const ERR_MSG = "Something went wrong";


// --- STATIC STRUCTURES WITH ICONS ---

export const PROPERTY_INFO_CARDS_STRUCTURE = [
  { id: 'card1', icon: React.createElement(UsersIcon, { className: "w-8 h-8 text-teal-600" }) },
  { id: 'card2', icon: React.createElement(BedDoubleIcon, { className: "w-8 h-8 text-teal-600" }) },
  { id: 'card3', icon: React.createElement(BathIcon, { className: "w-8 h-8 text-teal-600" }) },
  { id: 'card4', icon: React.createElement(HomeIcon, { className: "w-8 h-8 text-teal-600" }) },
  { id: 'card5', icon: React.createElement(SnowflakeIcon, { className: "w-8 h-8 text-teal-600" }) },
  { id: 'card6', icon: React.createElement(SunIcon, { className: "w-8 h-8 text-teal-600" }) },
];

export const SERVICES_LIST_STRUCTURE = [
  { id: 'service1', icon: React.createElement(TvIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Wifi & Smart TV
  { id: 'service2', icon: React.createElement(SnowflakeIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Aria Condizionata
  { id: 'service3', icon: React.createElement(WashingMachineIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Lavatrice
  { id: 'service4', icon: React.createElement(SoupIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Cucina a Induzione
  { id: 'service5', icon: React.createElement(FlameIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Barbecue
  { id: 'service6', icon: React.createElement(CarIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Posto Auto
  { id: 'service7', icon: React.createElement(GridIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Zanzariere
  { id: 'service8', icon: React.createElement(ShowerIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Doccia Esterna
  { id: 'service9', icon: React.createElement(SheetsIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Biancheria
  { id: 'service10', icon: React.createElement(SparklesIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Pulizie
  { id: 'service11', icon: React.createElement(CoffeeIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Microonde & Moka
  { id: 'service12', icon: React.createElement(DropletIcon, { className: "w-10 h-10 mx-auto text-teal-600" }) }, // Acqua Cisterna
];
