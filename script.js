class Character {
  constructor() {
    this.fields = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    this.inventory = [];
  }

  abilityMod(score) {
    return Math.floor((score - 10) / 2);
  }

  raceBonus(race) {
    const b = {str:0,dex:0,con:0,int:0,wis:0,cha:0};
    if (race === 'human') { for (const f of this.fields) b[f] = 1; }
    if (race === 'elf') b.dex = 2;
    if (race === 'dwarf') b.con = 2;
    if (race === 'halfling') b.dex = 2;
    if (race === 'gnome') b.int = 2;
    if (race === 'half-orc') { b.str = 2; b.con = 1; }
    if (race === 'tiefling') { b.cha = 2; b.int = 1; }
    if (race === 'dragonborn') { b.str = 2; b.cha = 1; }
    if (race === 'half-elf') { b.cha = 2; b.dex = 1; }
    return b;
  }

  backgroundBonus(bg) {
    const b = {str:0,dex:0,con:0,int:0,wis:0,cha:0};
    if (bg === 'acolyte') b.wis = 1;
    if (bg === 'soldier') b.str = 1;
    if (bg === 'scholar') b.int = 1;
    if (bg === 'criminal') b.dex = 1;
    return b;
  }

  profBonus(level) {
    if (level >= 17) return 6;
    if (level >= 13) return 5;
    if (level >= 9) return 4;
    if (level >= 5) return 3;
    return 2;
  }

  calculate() {
    const race = document.getElementById('race').value;
    const bg = document.getElementById('background').value;
    const level = parseInt(document.getElementById('level').value, 10) || 1;

    const raceB = this.raceBonus(race);
    const bgB = this.backgroundBonus(bg);

    let dexTotal = 0;
    let wisTotal = 0;

    this.fields.forEach(f => {
      const base = parseInt(document.getElementById(f).value, 10) || 0;
      const total = base + raceB[f] + bgB[f];
      document.getElementById(f + '-total').textContent = total;
      document.getElementById(f + '-mod').textContent = this.abilityMod(total);
      if (f === 'dex') dexTotal = total;
      if (f === 'wis') wisTotal = total;
    });

    document.getElementById('prof').textContent = '+' + this.profBonus(level);
    document.getElementById('initiative').textContent = this.abilityMod(dexTotal);
    document.getElementById('passive-perception').textContent = 10 + this.abilityMod(wisTotal);

    this.save();
  }

  save() {
    const data = {};
    ['name','class','level','race','background','ac','hp','speed',...this.fields].forEach(id => {
      data[id] = document.getElementById(id).value;
    });
    localStorage.setItem('sheet', JSON.stringify(data));
    localStorage.setItem('inventory', JSON.stringify(this.inventory));
  }

  load() {
    const data = JSON.parse(localStorage.getItem('sheet') || '{}');
    Object.entries(data).forEach(([k,v]) => {
      const el = document.getElementById(k);
      if (el) el.value = v;
    });
    this.inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    this.renderInventory();
  }

  addItem(name, icon) {
    this.inventory.push({name, icon});
    this.renderInventory();
    this.save();
  }

  removeItem(index) {
    this.inventory.splice(index, 1);
    this.renderInventory();
    this.save();
  }

  renderInventory() {
    const list = document.getElementById('inventory-list');
    if (!list) return;
    list.innerHTML = '';
    this.inventory.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-white/70 rounded px-2 py-1';
      li.innerHTML = `<span>${item.icon} ${item.name}</span><button class="material-icons text-red-600" data-index="${idx}">delete</button>`;
      list.appendChild(li);
    });
    list.querySelectorAll('button[data-index]').forEach(btn => {
      btn.addEventListener('click', () => this.removeItem(parseInt(btn.dataset.index, 10)));
    });
  }

  rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }
}

const character = new Character();

window.addEventListener('DOMContentLoaded', () => {
  character.load();
  character.calculate();
  const form = document.getElementById('sheet');
  form.addEventListener('input', () => character.calculate());
  form.addEventListener('change', () => character.calculate());

  document.querySelectorAll('[data-sides]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sides = parseInt(btn.dataset.sides, 10);
      const result = character.rollDice(sides);
      document.getElementById('dice-result').textContent = `d${sides}: ${result}`;
    });
  });

  document.getElementById('add-item').addEventListener('click', () => {
    const name = document.getElementById('item-name').value.trim();
    const icon = document.getElementById('item-icon').value.trim() || '📦';
    if (name) {
      character.addItem(name, icon);
      document.getElementById('item-name').value = '';
      document.getElementById('item-icon').value = '';
    }
  });
});
