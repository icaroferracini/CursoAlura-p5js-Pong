//contador
let bouceCount = 0;

//var da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raioBolinha = diametro/2 + 0.05;

//velocidade da bolinha
let velxBolinha = 5;
let velyBolinha = 7;//velxBolinha;//6;

// var raquete
let xRaquete = (30+window.innerWidth) - window.innerWidth;
let yRaquete = 150;

// var raquete oponente
let xRaqueteOponente = window.innerWidth - 40;
let yRaqueteOponente = 150;
let velYOponente;

//var desenho raquetes
let larguraRaquete = 15;
let alturaRaquete = 100;
let bordaRaquete = 4;

// colisão
let colidiu = false;
let colidiuOponente = false;

// placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// CPU vs CPU
let autoGaming = false;
let cooldown = 25;
let velYauto;

// sons
let somRaquetada;
let somPonto;
let somTrilha;

// dificuldade
let chanceOponenteErrar = 0;
let chanceEuErrar = 0;

function preload(){
  somTrilha = loadSound("sons/trilha.mp3");
  somPonto = loadSound("sons/ponto.mp3");
  somRaquetada = loadSound("sons/raquetada.mp3");
}

function setup() {
//  createCanvas(1024, 768);
  createCanvas(windowWidth, windowHeight);
  somTrilha.stop(); // somTrilha.loop();
}

function draw() {
  background(15);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaqueteOponente(xRaqueteOponente,yRaqueteOponente)
  movimentaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  colisaoMinhaRaqueteBiblioteca();
  calculaChanceDeErrar();
  mostrarPlacar();
  bolinhaNaoFicaPresa();
  drawWords();
}

function bolinhaNaoFicaPresa(){

}

function drawWords() {
  textSize(10);
  text(bouceCount + " " + autoGaming + " " + cooldown  + " " + chanceEuErrar + " " + chanceOponenteErrar,windowWidth/2,windowHeight);
}

function mostrarPlacar(){
  textSize(64);
  textAlign(CENTER);
  fill(255);
  text(meusPontos,window.innerWidth/3,90);
  text(pontosOponente,window.innerWidth-(window.innerWidth/3),90);
}

function mostraBolinha() {
  circle(xBolinha,yBolinha,diametro);
}

function mostraRaquete(x,y) {
  rect(x, y, larguraRaquete, alturaRaquete, bordaRaquete);
}

function mostraRaqueteOponente(x,y) {
  rect(x, y, larguraRaquete, alturaRaquete, bordaRaquete);
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  if (cooldown > 0) {
    cooldown--;
  } else {
    if (keyIsDown(SHIFT)){
      if (autoGaming == true){
        autoGaming = false;
        cooldown = 50;
      } else {
        autoGaming = true;
        cooldown = 50;
      }
    }
  }
  yRaquete = constrain(yRaquete, 0,window.innerHeight - alturaRaquete);
}

function movimentaRaqueteOponente(){
//  if (xBolinha > window.innerWidth/2){}
    velYOponente = yBolinha - yRaqueteOponente - alturaRaquete/2 - 30;
    yRaqueteOponente += velYOponente + chanceOponenteErrar;
    yRaqueteOponente = constrain(yRaqueteOponente, 0,window.innerHeight - alturaRaquete);
}

function calculaChanceDeErrar(){
  
}



function movimentaBolinha() {
  xBolinha += velxBolinha;
  yBolinha += velyBolinha;
  if (xBolinha < 20){
    pontosOponente += 1;
    somPonto.play();
  }
  if (xBolinha > window.innerWidth - 15){
    meusPontos += 1;
    somPonto.play();
  }
  if (autoGaming == true){
    velYauto = yBolinha - yRaquete - alturaRaquete/2 - 30;
    yRaquete += velYauto + chanceEuErrar;
    yRaquete = constrain(yRaquete, 0,window.innerHeight - alturaRaquete);
  }
}

function verificaColisaoBorda(){
  if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0){
    velxBolinha *= -1;
    bouceCount++;
  }
  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0){
    velyBolinha *= -1;
    bouceCount++;
    if (pontosOponente >= meusPontos){
      chanceOponenteErrar += 5;
      chanceEuErrar -= 1;
      if (chanceOponenteErrar > 250){
        chanceOponenteErrar = 250;
      }
      if (chanceEuErrar < 0){
        chanceEuErrar = 0;
      }
    } else {
      chanceOponenteErrar -= 5;
      chanceEuErrar += 2.5;
      if (chanceOponenteErrar < 25){
        chanceOponenteErrar = 25;
      }
    } 
  }
}
//solução inicial colisão
function verificaColisaoRaquete(){ 
  if (xBolinha - raioBolinha < xRaquete + larguraRaquete && 
    yBolinha - raioBolinha < yRaquete + alturaRaquete && 
    yBolinha + raioBolinha > yRaquete){
    velxBolinha *= -1;
  }
}
function colisaoMinhaRaqueteBiblioteca() {
  colidiu = collideRectCircle(xRaquete, yRaquete, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametro);
  colidiuOponente = collideRectCircle(xRaqueteOponente, yRaqueteOponente, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametro);
  
  if (colidiu || colidiuOponente){
    velxBolinha *= -1;
    bouceCount++;
    somRaquetada.play();
  }
}