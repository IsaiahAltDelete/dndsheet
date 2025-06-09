const fields = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

function abilityMod(score) {
  return Math.floor((score - 10) / 2);
}

function raceBonus(race) {
  const b = {str:0,dex:0,con:0,int:0,wis:0,cha:0};
  if (race === 'human') { for (const f of fields) b[f] = 1; }
  if (race === 'elf') b.dex = 2;
  if (race === 'dwarf') b.con = 2;
  if (race === 'halfling') b.dex = 2;
  return b;
}

function backgroundBonus(bg) {
  const b = {str:0,dex:0,con:0,int:0,wis:0,cha:0};
  if (bg === 'acolyte') b.wis = 1;
  if (bg === 'soldier') b.str = 1;
  if (bg === 'scholar') b.int = 1;
  if (bg === 'criminal') b.dex = 1;
  return b;
}

function profBonus(level) {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

function calculate() {
  const race = document.getElementById('race').value;
  const bg = document.getElementById('background').value;
  const level = parseInt(document.getElementById('level').value, 10) || 1;

  const raceB = raceBonus(race);
  const bgB = backgroundBonus(bg);

  let dexTotal = 0;
  let wisTotal = 0;

  fields.forEach(f => {
    const base = parseInt(document.getElementById(f).value, 10) || 0;
    const total = base + raceB[f] + bgB[f];
    document.getElementById(f + '-total').textContent = total;
    document.getElementById(f + '-mod').textContent = abilityMod(total);
    if (f === 'dex') dexTotal = total;
    if (f === 'wis') wisTotal = total;
  });

  document.getElementById('prof').textContent = '+' + profBonus(level);
  document.getElementById('initiative').textContent = abilityMod(dexTotal);
  document.getElementById('passive-perception').textContent = 10 + abilityMod(wisTotal);

  save();
}

function save() {
  const data = {};
  ['name', 'class', 'level', 'race', 'background', 'ac', 'hp', 'speed', ...fields].forEach(id => {
    data[id] = document.getElementById(id).value;
  });
  localStorage.setItem('sheet', JSON.stringify(data));
}

function load() {
  const data = JSON.parse(localStorage.getItem('sheet') || '{}');
  Object.entries(data).forEach(([k, v]) => {
    const el = document.getElementById(k);
    if (el) el.value = v;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  load();
  calculate();
  document.getElementById('sheet').addEventListener('input', calculate);
});
