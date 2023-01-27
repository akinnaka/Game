let spieler = document.querySelector(".player");
let playground = document.querySelector(".playground");
let timer = new Timer(100);
let song = document.querySelector(".audio");

function timerx() {
  if (timer.ready()) {
    makeGift();
    makeEnemy();
  }
}

function makeEnemy() {
  let image = document.createElement("img");
  image.src = "./Images/osterei.png";
  image.classList.add("enemy");
  playground.appendChild(image);
  image.style.width = "40px";
  image.style.left = zufall1 + "px";
}

function makeGift() {
  let image = document.createElement("img");
  image.src = "./Images/gift.png";
  image.classList.add("gift");
  playground.appendChild(image);
  image.style.width = "40px";
  image.style.left = "100px";
  image.style.left = zufall + "px";
}

let stern = document.querySelector(".star");
let punktzahl = document.querySelector(".score");
score = 0;
stern.style.right = "7px";
stern.style.top = "14px";
spieler.style.left = "0px";
spieler.style.bottom = "0px";

function bewegung() {
  if (keyboard(39)) {
    if (parseInt(spieler.style.left) < window.innerWidth)
      spieler.style.left = parseInt(spieler.style.left) + 8 + "px";
  }
  if (keyboard(37)) {
    if (parseInt(spieler.style.left) > 0)
      spieler.style.left = parseInt(spieler.style.left) - 8 + "px";
  }
}

function gift() {
  const gifts = document.querySelectorAll(".gift");
  for (const gift of gifts) {
    gift.style.top = parseInt(gift?.style?.top || 0) + 4 + "px";
    if (parseInt(gift.style.top) > window.innerHeight) {
      gift.parentNode.removeChild(gift);
    }
  }
}

function enemy() {
  const enemies = document.querySelectorAll(".enemy");
  for (const enemy of enemies) {
    enemy.style.top = parseInt(enemy?.style?.top || 0) + 10 + "px";
    if (parseInt(enemy.style.top) > window.innerHeight) {
      enemy.parentNode.removeChild(enemy);
    }
  }
}

function kollisionplayer() {
  const gifts = document.querySelectorAll(".gift");
  const enemies = document.querySelectorAll(".enemy");
  for (const geschenk of gifts) {
    if (anyCollision(spieler, [geschenk])) {
      geschenk.remove();
      score = score + 1;
      punktzahl.textContent = score;
    }
  }

  if (anyCollision(spieler, enemies)) {
    let gameover = document.createElement("a");
    gameover.href = "game.html";
    gameover.classList.add("gameover");
    document.body.appendChild(gameover);

    let menu = document.createElement("a");
    menu.classList.add("menu");
    menu.href = "index.html";
    document.body.appendChild(menu);

    let dunkel = document.createElement("div");
    dunkel.classList.add("abdunkeln");
    document.body.appendChild(dunkel);
    return true;
  }
}

function Klon() {
  let min = 0;
  let max = window.innerWidth;
  zufall = Math.random() * (max - min) + min;
  zufall1 = Math.random() * (max - min) + min;
}

function replay() {
  document.getElementById("endScreen").style.display = "block";
}

function loop() {
  bewegung();
  Klon();
  enemy();
  gift();
  if (kollisionplayer()) {
    return;
  }
  timerx();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
