import React from 'react';
import DiceRoller from '../components/DiceRoller';
import useLocalStorage from '../hooks/useLocalStorage';
import { abilityModifier } from '../utils/dnd';

const skills = [
  { name: 'Acrobatics', ability: 'DEX' },
  { name: 'Animal Handling', ability: 'WIS' },
  { name: 'Arcana', ability: 'INT' },
  { name: 'Athletics', ability: 'STR' },
  { name: 'Deception', ability: 'CHA' },
  { name: 'History', ability: 'INT' },
  { name: 'Insight', ability: 'WIS' },
  { name: 'Intimidation', ability: 'CHA' },
  { name: 'Investigation', ability: 'INT' },
  { name: 'Medicine', ability: 'WIS' },
  { name: 'Nature', ability: 'INT' },
  { name: 'Perception', ability: 'WIS' },
  { name: 'Performance', ability: 'CHA' },
  { name: 'Persuasion', ability: 'CHA' },
  { name: 'Religion', ability: 'INT' },
  { name: 'Sleight of Hand', ability: 'DEX' },
  { name: 'Stealth', ability: 'DEX' },
  { name: 'Survival', ability: 'WIS' },
];

export default function Skills() {
  const [scores] = useLocalStorage('abilityScores', {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Skills & Saves</h1>
      <h2 className="font-semibold mt-4 mb-2">Saving Throws</h2>
      <table className="mb-4 text-center">
        <tbody>
          {Object.keys(scores).map((ab) => (
            <tr key={ab} className="border-b">
              <td className="p-2 font-semibold">{ab} Save</td>
              <td className="p-2">{abilityModifier(scores[ab]) >= 0 ? '+' : ''}{abilityModifier(scores[ab])}</td>
              <td className="p-2">
                <DiceRoller formula={`1d20+${abilityModifier(scores[ab])}`} label="Roll" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="font-semibold mt-4 mb-2">Skills</h2>
      <table className="min-w-full text-center">
        <thead>
          <tr className="border-b">
            <th>Skill</th>
            <th>Modifier</th>
            <th>Roll</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((sk) => (
            <tr key={sk.name} className="border-b">
              <td className="p-2">{sk.name}</td>
              <td className="p-2">{abilityModifier(scores[sk.ability]) >= 0 ? '+' : ''}{abilityModifier(scores[sk.ability])}</td>
              <td className="p-2">
                <DiceRoller formula={`1d20+${abilityModifier(scores[sk.ability])}`} label="Roll" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
