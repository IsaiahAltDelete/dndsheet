const fields = ['str','dex','con','int','wis','cha'];

function abilityMod(score) {
  return Math.floor((score - 10) / 2);
}

const raceBonuses = {
  human: {str:1,dex:1,con:1,int:1,wis:1,cha:1},
  dwarf: {con:2},
  elf: {dex:2},
  halfling: {dex:2},
  dragonborn: {str:2, cha:1},
  gnome: {int:2},
  'half-elf': {cha:2, dex:1},
  'half-orc': {str:2, con:1},
  tiefling: {cha:2, int:1}
};

const backgroundBonuses = {
  acolyte: {wis:1},
  criminal: {dex:1},
  folkHero: {con:1},
  noble: {cha:1},
  sage: {int:1},
  soldier: {str:1},
  hermit: {wis:1},
  entertainer: {cha:1},
  guildArtisan: {int:1},
  outlander: {str:1},
  sailor: {dex:1},
  urchin: {dex:1}
};

function bonusLookup(map, key) {
  const b = {str:0,dex:0,con:0,int:0,wis:0,cha:0};
  const src = map[key] || {};
  fields.forEach(f => { b[f] = src[f] || 0; });
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
  const level = parseInt(document.getElementById('level').value,10)||1;

  const raceB = bonusLookup(raceBonuses, race);
  const bgB = bonusLookup(backgroundBonuses, bg);

  fields.forEach(f => {
    const base = parseInt(document.getElementById(f).value,10)||0;
    const total = base + raceB[f] + bgB[f];
    document.getElementById(f+'-total').textContent = total;
    document.getElementById(f+'-mod').textContent = '(' + abilityMod(total) + ')';
  });

  document.getElementById('prof').textContent = '+' + profBonus(level);

  save();
}

function save() {
  const data = {};
  ['name','class','level','race','background',...fields].forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  localStorage.setItem('sheet', JSON.stringify(data));
}

function load() {
  const data = JSON.parse(localStorage.getItem('sheet')||'{}');
  Object.entries(data).forEach(([k,v])=>{
    const el = document.getElementById(k);
    if (el) el.value = v;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  load();
  calculate();
  document.getElementById('sheet').addEventListener('input', calculate);
});
