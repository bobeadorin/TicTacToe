const container = document.querySelector(".container");
const reset_btn = document.querySelector("#reset");
const winner_display = document.querySelector("#winner_display");
const win_array = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let moves_array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let turn = false;
let array_space = 0;

//se creaza board-ul
for (let i = 0; i < 9; i++) {
  const box = document.createElement("div");
  box.classList.add("block");
  box.setAttribute("index", i);
  container.appendChild(box);
}

let box = document.querySelectorAll(".block");

function initializeGame() {
  box.forEach((boxes) => {
    boxes.addEventListener("click", cellClick, { once: true });
  });
  reset();
}

initializeGame();

function cellClick() {
  let index = this.getAttribute("index");
  if (checkWin() == 1 || checkWin() == 2) {
    return;
  }
  if (moves_array[index] == " " && turn === false) {
    winner_display.innerHTML = "O's turn";
    array_space += 1;
    moves_array[index] = "X";
    this.textContent = "X";
    turn = true;
    checkWin();
  } else if (checkWin() == 1 || checkWin() == 2) {
    this.textContent = " ";
    return 0;
  } else if (moves_array[index] == " " && turn === true) {
    winner_display.innerHTML = "X's turn";
    array_space += 1;
    moves_array[index] = "O";
    this.textContent = "O";
    turn = false;
    checkWin();
  }
}
function checkWin() {
  let counter = 0;
  let count = 0;
  for (let i = 0; i < win_array.length; i++) {
    const cells = win_array[i];
    for (let j = 0; j < cells.length; j++) {
      const cell_status = cells[j];
      if (moves_array[cell_status] == "X") {
        counter += 1;
      } else if (moves_array[cell_status] == "O") {
        count += 1;
      }
    }
    if (counter == 3) {
      winner_display.innerHTML = "X wins";
      return 1;
    } else if (count == 3) {
      winner_display.innerHTML = "O wins";
      return 2;
    } else if (count != 3 && counter != 3 && array_space == 9) {
      winner_display.innerHTML = "Draw";
    }
    counter = 0;
    count = 0;
  }
}

function reset() {
  reset_btn.addEventListener("click", function () {
    moves_array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    turn = false;
    array_space = 0;
    winner_display.innerHTML = "X's turn";
    box.forEach((element) => {
      element.textContent = "";
    });
    initializeGame();
  });
}
