let score = 0;

function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
}

function startGame(type) {
  const game = document.getElementById("game");

  if (type === "math") {
    let a = rand(20), b = rand(20);
    game.innerHTML = `
      <h2>${a} × ${b}</h2>
      <input id="ans">
      <button onclick="checkMath(${a}, ${b})">Submit</button>
    `;
  }

  if (type === "pattern") {
    game.innerHTML = `
      <h2>2, 4, 8, 16, ?</h2>
      <input id="ans">
      <button onclick="checkPattern()">Submit</button>
    `;
  }

  if (type === "logic") {
    game.innerHTML = `
      <p>All dogs are animals. Some animals are black.</p>
      <p>Are all dogs black?</p>
      <input id="ans">
      <button onclick="checkLogic()">Submit</button>
    `;
  }

  if (type === "memory") {
    let num = rand(9000) + 1000;
    game.innerHTML = `<h2 id="mem">${num}</h2>`;
    setTimeout(() => {
      game.innerHTML = `
        <input id="ans">
        <button onclick="checkMemory(${num})">Submit</button>
      `;
    }, 2000);
  }

  if (type === "data") {
    game.innerHTML = `
      <p>Revenue: 100 → 150 → 120</p>
      <p>Max value?</p>
      <input id="ans">
      <button onclick="checkData()">Submit</button>
    `;
  }

  if (type === "reaction") {
    game.innerHTML = `<h2 id="color" style="color:red">WAIT</h2>`;
    setTimeout(() => {
      document.getElementById("color").innerText = "CLICK";
      document.getElementById("color").style.color = "green";
    }, 2000);

    game.innerHTML += `<br><button onclick="checkReaction()">Click</button>`;
  }
}

function checkMath(a, b) {
  let ans = document.getElementById("ans").value;
  if (parseInt(ans) === a * b) score++;
  updateScore();
}

function checkPattern() {
  let ans = document.getElementById("ans").value;
  if (ans == "32") score++;
  updateScore();
}

function checkLogic() {
  let ans = document.getElementById("ans").value.toLowerCase();
  if (ans === "no") score++;
  updateScore();
}

function checkMemory(num) {
  let ans = document.getElementById("ans").value;
  if (ans == num) score++;
  updateScore();
}

function checkData() {
  let ans = document.getElementById("ans").value;
  if (ans == "150") score++;
  updateScore();
}

function checkReaction() {
  let text = document.getElementById("color").innerText;
  if (text === "CLICK") score++;
  updateScore();
}

function rand(n) {
  return Math.floor(Math.random() * n);
}