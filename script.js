let score = 0;
let time = 90;
let interval;

function startFullTest() {
  score = 0;
  time = 90;
  updateUI();

  interval = setInterval(() => {
    time--;
    updateUI();
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);

  nextGame();
}

function updateUI() {
  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("timer").innerText = "Time: " + time;
}

function endGame() {
  document.getElementById("game").innerHTML = `<h2>Final Score: ${score}</h2>`;
}

function nextGame() {
  const games = [ecosystemGame, resourceGame, dataGame, patternGame];
  let g = games[Math.floor(Math.random() * games.length)];
  g();
}

/////////////////////////
// 1. ECOSYSTEM GAME
/////////////////////////

function ecosystemGame() {
  let species = [
    {name: "Grass", type: "producer"},
    {name: "Rabbit", type: "herbivore"},
    {name: "Fox", type: "carnivore"},
    {name: "Wolf", type: "carnivore"}
  ];

  document.getElementById("game").innerHTML = `
    <h2>Build Stable Ecosystem</h2>
    <p>Select 3 species that can survive together</p>
    ${species.map(s => `<button onclick="selectSpecies('${s.name}')">${s.name}</button>`).join("")}
    <br><br>
    <button onclick="submitEco()">Submit</button>
  `;

  window.selected = [];

  window.selectSpecies = (name) => {
    if (!selected.includes(name)) selected.push(name);
  };

  window.submitEco = () => {
    // correct chain = Grass → Rabbit → Fox
    if (selected.includes("Grass") && selected.includes("Rabbit") && selected.includes("Fox")) {
      score += 3;
    }
    updateUI();
    nextGame();
  };
}

/////////////////////////
// 2. RESOURCE GAME
/////////////////////////

function resourceGame() {
  let budget = 100;

  let options = [
    {name: "Project A", cost: 50, value: 80},
    {name: "Project B", cost: 40, value: 60},
    {name: "Project C", cost: 30, value: 50}
  ];

  document.getElementById("game").innerHTML = `
    <h2>Maximize Value (Budget: ${budget})</h2>
    ${options.map(o =>
      `<button onclick="pick('${o.name}')">${o.name} (Cost ${o.cost}, Value ${o.value})</button>`
    ).join("")}
    <br><br>
    <button onclick="submitResource()">Submit</button>
  `;

  window.selectedRes = [];

  window.pick = (name) => {
    if (!selectedRes.includes(name)) selectedRes.push(name);
  };

  window.submitResource = () => {
    let totalCost = 0, totalValue = 0;

    options.forEach(o => {
      if (selectedRes.includes(o.name)) {
        totalCost += o.cost;
        totalValue += o.value;
      }
    });

    if (totalCost <= budget && totalValue >= 110) score += 3;

    updateUI();
    nextGame();
  };
}

/////////////////////////
// 3. DATA GAME
/////////////////////////

function dataGame() {
  let profits = [120, 180, 90, 200];

  document.getElementById("game").innerHTML = `
    <h2>Profit Data</h2>
    <p>${profits.join(", ")}</p>
    <p>Best choice?</p>
    <input id="ans">
    <button onclick="checkData(${Math.max(...profits)})">Submit</button>
  `;

  window.checkData = (correct) => {
    let ans = document.getElementById("ans").value;
    if (parseInt(ans) === correct) score++;
    updateUI();
    nextGame();
  };
}

/////////////////////////
// 4. PATTERN GAME
/////////////////////////

function patternGame() {
  let patterns = [
    {q:"2,4,8,16,?",a:"32"},
    {q:"3,9,27,?",a:"81"}
  ];

  let p = patterns[Math.floor(Math.random()*patterns.length)];

  document.getElementById("game").innerHTML = `
    <h2>${p.q}</h2>
    <input id="ans">
    <button onclick="checkPattern('${p.a}')">Submit</button>
  `;

  window.checkPattern = (a) => {
    let ans = document.getElementById("ans").value;
    if (ans == a) score++;
    updateUI();
    nextGame();
  };
}
