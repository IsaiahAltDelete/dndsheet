import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Spells() {
  const [spells, setSpells] = useLocalStorage('spells', []);
  const [newSpell, setNewSpell] = useState('');
  const [slots, setSlots] = useLocalStorage('spellSlots', {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });

  const addSpell = () => {
    if (!newSpell) return;
    setSpells([...spells, { name: newSpell, prepared: false }]);
    setNewSpell('');
  };

  const togglePrepared = (index) => {
    const updated = [...spells];
    updated[index].prepared = !updated[index].prepared;
    setSpells(updated);
  };

  const updateSlot = (level, value) => {
    setSlots({ ...slots, [level]: parseInt(value, 10) || 0 });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Spells</h1>

      <h2 className="font-semibold mb-2">Spell Slots</h2>
      <table className="mb-4 text-center">
        <thead>
          <tr className="border-b">
            <th>Level</th>
            <th>Slots</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(slots).map((lvl) => (
            <tr key={lvl} className="border-b">
              <td className="p-2">{lvl}</td>
              <td className="p-2">
                <input
                  type="number"
                  className="w-20 text-center"
                  value={slots[lvl]}
                  onChange={(e) => updateSlot(lvl, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="font-semibold mb-2">Prepared Spells</h2>
      <div className="mb-2">
        <input
          className="border p-1 mr-2 dark:bg-gray-800"
          value={newSpell}
          onChange={(e) => setNewSpell(e.target.value)}
          placeholder="Spell name"
        />
        <button
          onClick={addSpell}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          Add Spell
        </button>
      </div>
      <ul className="list-disc pl-6">
        {spells.map((sp, idx) => (
          <li key={idx} className="mb-1">
            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={sp.prepared}
                onChange={() => togglePrepared(idx)}
              />
              {sp.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
