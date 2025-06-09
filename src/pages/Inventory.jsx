import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Inventory() {
  const [items, setItems] = useLocalStorage('inventory', []);
  const [scores] = useLocalStorage('abilityScores', {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  });
  const weightLimit = scores.STR * 15;

  const addItem = () => {
    setItems([...items, { name: '', qty: 1, weight: 0, desc: '' }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'qty' || field === 'weight' ? parseFloat(value) || 0 : value;
    setItems(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const totalWeight = items.reduce((sum, it) => sum + it.qty * it.weight, 0);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Equipment & Inventory</h1>
      <button
        onClick={addItem}
        className="mb-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Add Item
      </button>
      <table className="min-w-full text-center">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Qty</th>
            <th>Weight</th>
            <th>Description</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-1">
                <input
                  className="border p-1 dark:bg-gray-800"
                  value={it.name}
                  onChange={(e) => updateItem(idx, 'name', e.target.value)}
                />
              </td>
              <td className="p-1 w-16">
                <input
                  type="number"
                  className="border p-1 w-full dark:bg-gray-800"
                  value={it.qty}
                  onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                />
              </td>
              <td className="p-1 w-20">
                <input
                  type="number"
                  className="border p-1 w-full dark:bg-gray-800"
                  value={it.weight}
                  onChange={(e) => updateItem(idx, 'weight', e.target.value)}
                />
              </td>
              <td className="p-1">
                <input
                  className="border p-1 dark:bg-gray-800 w-full"
                  value={it.desc}
                  onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                />
              </td>
              <td className="p-1">
                <button
                  onClick={() => removeItem(idx)}
                  className="px-2 py-1 bg-red-200 dark:bg-red-700 rounded"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p>Total Weight: {totalWeight} / {weightLimit}</p>
        {totalWeight > weightLimit && (
          <p className="text-red-600">Encumbered!</p>
        )}
      </div>
    </div>
  );
}
