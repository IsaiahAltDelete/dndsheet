export function abilityModifier(score) {
  return Math.floor((Number(score) - 10) / 2);
}

export function rollDice(formula) {
  const clean = formula.replace(/\s+/g, '').toLowerCase();
  const groups = clean.match(/[+-]?[^+-]+/g);
  if (!groups) return { total: 0, detail: [] };

  let total = 0;
  const detail = [];

  for (const group of groups) {
    let sign = 1;
    let part = group;
    if (part[0] === '+') part = part.slice(1);
    else if (part[0] === '-') { sign = -1; part = part.slice(1); }

    const dlMatch = part.match(/(\d*)d(\d+)dl(\d+)?/); // drop lowest
    if (dlMatch) {
      const count = parseInt(dlMatch[1] || '1', 10);
      const sides = parseInt(dlMatch[2], 10);
      const drop = parseInt(dlMatch[3] || '1', 10);
      const rolls = [];
      for (let i = 0; i < count; i++) {
        rolls.push(Math.ceil(Math.random() * sides));
      }
      const kept = [...rolls].sort((a,b) => a-b).slice(drop);
      const sum = kept.reduce((a,b) => a+b, 0) * sign;
      total += sum;
      detail.push(`${sign < 0 ? '-' : ''}[${rolls.join(',')}] drop ${drop}`);
      continue;
    }

    const match = part.match(/(\d*)d(\d+)/);
    if (match) {
      const count = parseInt(match[1] || '1', 10);
      const sides = parseInt(match[2], 10);
      let subtotal = 0;
      const rolls = [];
      for (let i = 0; i < count; i++) {
        const r = Math.ceil(Math.random() * sides);
        rolls.push(r);
        subtotal += r;
      }
      total += sign * subtotal;
      detail.push(`${sign < 0 ? '-' : ''}[${rolls.join(',')}]`);
      continue;
    }

    const num = parseInt(part);
    if (!isNaN(num)) {
      total += sign * num;
      detail.push(`${sign < 0 ? '-' : ''}${num}`);
    }
  }

  return { total, detail };
}
