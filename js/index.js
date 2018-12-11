(function depict() {
  
  class Table {
  constructor(users, tasks) {
    this.users = users;
    this.tasks = tasks;
  }

  makeTable() {
  const table = document.createElement('table');
  const tr = document.createElement('tr');
  const name = document.createElement('th');
  name.textContent = 'Participant';
  const totalTime = document.createElement('th');
  totalTime.textContent = 'Total';
  tr.appendChild(name);

  for (let i = 0; i < this.tasks.length; i += 1) {
    const th = document.createElement('th');
    th.textContent = this.tasks[i];
    tr.appendChild(th);
  }
  tr.appendChild(totalTime);
  table.appendChild(tr);
  for (let i = 0; i < this.users.length; i += 1) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = this.users[i].name;
    tr.appendChild(td);

    let sum = 0;

    for (let j = 0; j < this.tasks.length; j++) {
      const td = document.createElement('td');
      if (this.users[i][this.tasks[j]]) {
        if (td.textContent = this.users[i][this.tasks[j]].correct === 'Correct') {
          const time = this.users[i][this.tasks[j]]['time']['$numberLong'];
          td.textContent = (time <= 150) ? time : 150;
          td.setAttribute('title', this.users[i][this.tasks[j]]['code']);
        } else {
          td.textContent = 150;
          td.setAttribute('title','Incorrect');
        }
        
      } else {
        td.textContent = 150;
        td.setAttribute('title','Incorrect');
      }
        sum += +td.textContent;
      tr.appendChild(td);
    }
    const total = document.createElement('td');
    total.textContent = sum;
    tr.appendChild(total);
    table.appendChild(tr)
  }
  document.body.appendChild(table);
}
}

const users = [];
const roundNames = [];
fetch('../storage/users.json')
.then(res => res.json())
.then(res => {
  res.forEach(item => {
  const {uid : id, displayName : name} = item
  const storage = {
    id, name
  };
  users.push(storage);
});
  return fetch('../storage/session2.json');
})
.then(res => res.json())
.then(res => {
    for(let i = 0; i < 10; i++) {
      roundNames.push(res[0].puzzles[i].name);
}
return res;
})
.then(res => users.forEach(item => {
  for (let i = 0; i < 10; i++) {
    item[roundNames[i]] = res[0].rounds[i].solutions[item.id];
  }
}))
.then(() => {
  let table = new Table(users, roundNames);
  table.makeTable();
});
})()
  