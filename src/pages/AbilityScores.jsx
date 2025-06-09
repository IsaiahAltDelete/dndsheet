import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import DiceRoller from '../components/DiceRoller';
import { abilityModifier } from '../utils/dnd';

const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

export default function AbilityScores() {
  const [scores, setScores] = useLocalStorage('abilityScores', {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  });

  const updateScore = (ability, val) => {
    setScores({ ...scores, [ability]: parseInt(val, 10) || 0 });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ability Scores</h1>
      <table className="min-w-full text-center">
        <thead>
          <tr className="border-b">
            <th>Ability</th>
            <th>Score</th>
            <th>Modifier</th>
            <th>Roll</th>
          </tr>
        </thead>
        <tbody>
          {abilities.map((ab) => (
            <tr key={ab} className="border-b">
              <td className="p-2 font-semibold">{ab}</td>
              <td>
                <input
                  type="number"
                  className="w-20 text-center"
                  value={scores[ab]}
                  onChange={(e) => updateScore(ab, e.target.value)}
                />
              </td>
              <td>{abilityModifier(scores[ab]) >= 0 ? '+' : ''}{abilityModifier(scores[ab])}</td>
              <td>
                <DiceRoller formula={`1d20+${abilityModifier(scores[ab])}`} label="Roll" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Custom Roll</h2>
        <DiceRoller />
        <p className="text-sm text-gray-600 dark:text-gray-400">Use format like "2d6+3" or "4d6dl1" (drop lowest).</p>
      </div>
    </div>
  );
}
