import React, { useState } from 'react';
import AbilityScores from './pages/AbilityScores';
import Skills from './pages/Skills';
import Spells from './pages/Spells';
import Inventory from './pages/Inventory';
import ReadmePage from './pages/Readme';

const tabs = [
  { id: 'abilities', label: 'Ability Scores' },
  { id: 'skills', label: 'Skills & Saves' },
  { id: 'spells', label: 'Spells' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'readme', label: 'README' },
];

export default function App() {
  const [tab, setTab] = useState('abilities');

  const renderTab = () => {
    switch (tab) {
      case 'skills':
        return <Skills />;
      case 'spells':
        return <Spells />;
      case 'inventory':
        return <Inventory />;
      case 'readme':
        return <ReadmePage />;
      case 'abilities':
      default:
        return <AbilityScores />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <nav className="w-40 bg-gray-100 dark:bg-gray-900 p-4">
        <ul className="space-y-2">
          {tabs.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => setTab(t.id)}
                className={`w-full text-left py-2 px-3 rounded ${
                  tab === t.id ? 'bg-gray-300 dark:bg-gray-700' : ''
                }`}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-4">{renderTab()}</main>
    </div>
  );
}
