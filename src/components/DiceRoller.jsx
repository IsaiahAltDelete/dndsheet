import React, { useState } from 'react';
import { rollDice } from '../utils/dnd';

export default function DiceRoller({ formula = '', label = 'Roll' }) {
  const [expr, setExpr] = useState(formula);
  const [result, setResult] = useState(null);

  const handleRoll = () => {
    const res = rollDice(expr);
    setResult(res);
  };

  return (
    <div className="my-1">
      {!formula && (
        <input
          className="border p-1 w-32 mr-2 dark:bg-gray-800"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="2d6+3"
        />
      )}
      <button
        onClick={handleRoll}
        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {label}
      </button>
      {result && (
        <div className="mt-1 text-sm">
          <span className="mr-2">Rolls: {result.detail.join(' + ')}</span>
          <span>Total: {result.total}</span>
        </div>
      )}
    </div>
  );
}
