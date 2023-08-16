//contador
let bouceCount = 1;

let r = 0;


//var da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raioBolinha = diametro/2 + 0.05;

//velocidade da bolinha
let velxBolinha = 0;//5*(bouceCount*2);
let velyBolinha = velxBolinha;//6;

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
let delayPontos = 25;

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

let jogando = false;
let fimdejogo = false;
let vitoria = false;

function preload(){
  //somTrilha = loadSound("sons/trilha.mp3");
  somPonto = loadSound("sons/ponto.mp3");
  somRaquetada = loadSound("sons/raquetada.mp3");
}

function setup() {
//  createCanvas(1024, 768);
  createCanvas(windowWidth, windowHeight);
  //somTrilha.stop(); 
  //somTrilha.loop();
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
  mostrarPlacar();
  bolinhaNaoFicaPresa();
  instrucoes();
}

function bolinhaNaoFicaPresa(){
  if (delayPontos>0 && xBolinha < xRaquete){
    xBolinha = (xBolinha + 60)*1;
  }
  if (delayPontos>0 && xBolinha > xRaqueteOponente){
    xBolinha = (xBolinha - 60)*1;
  }
}


function instrucoes() {
  if (jogando==false){
    textSize(windowWidth/5);
    fill(255);
    text("| p●ng |",windowWidth/2,windowHeight/2);
    textSize(windowWidth/50);
    text("Use as setas para cima e para baixo do teclado para movimentar sua raquete.",windowWidth/2,windowHeight/1.5);
    text("Aperte [espaço] no teclado para começar.",windowWidth/2,windowHeight/1.4);
    textSize(windowWidth/80);
    fill(200);
    //text("Ligue a música com a tecla [M] no teclado.",windowWidth/2,windowHeight/1.3);
    textSize(windowWidth/100);
    fill(100);
    text("Icaro Ferracini - Feito com p5.js - 2023",windowWidth/2,windowHeight-20);
    fill(50);
  } else {
    fill(255);
  }
  if (meusPontos>4){
    fimdejogo = true;
    autoGaming = false;
    velxBolinha = 0;
    velyBolinha = 0;
    //somTrilha.stop();
    somdamusica=false;
    textSize(windowWidth/10);
    fill(255);
    text("Você venceu!",windowWidth/2,windowHeight/2);
    textSize(windowWidth/50);
    text("Parabéns, você mandou bem!",windowWidth/2,windowHeight/1.5);
    text("Aperte [espaço] no teclado para jogar novamente.",windowWidth/2,windowHeight/1.4);
    textSize(windowWidth/100);
    fill(100);
    text("Icaro Ferracini - Feito com p5.js - 2023",windowWidth/2,windowHeight-20);
    fill(50);
  }
  if (pontosOponente>4){
    fimdejogo = true;
    autoGaming = false;
    velxBolinha = 0;
    velyBolinha = 0;
    //somTrilha.stop();
    somdamusica=false;
    textSize(windowWidth/10);
    fill(255);
    text("Você perdeu :(",windowWidth/2,windowHeight/2);
    textSize(windowWidth/50);
    text("Dessa vez não deu!",windowWidth/2,windowHeight/1.5);
    text("Aperte [espaço] no teclado para tentar novamente.",windowWidth/2,windowHeight/1.4);
    textSize(windowWidth/100);
    fill(100);
    text("Icaro Ferracini - Feito com p5.js - 2023",windowWidth/2,windowHeight-20);
    fill(50);
  }
  if (autoGaming){
    textSize(windowWidth/15);
    fill(50);
    text("autoplay mode",windowWidth/2,(windowHeight/3 + windowHeight/3));
    fill(255);
  }
}

function mostrarPlacar(){
  textSize(64);
  textAlign(CENTER);
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
    autoGaming = false;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
    autoGaming = false;
  }
  if (keyIsDown(32) && jogando==false){
    velxBolinha = 5*(bouceCount*3);
    velyBolinha = velxBolinha;
    autoGaming = false;
    jogando = true;
    for (let i = 0; i < 1; i++) {
      r = random(50, 300);
      xBolinha = window.innerWidth/10 + r;
      yBolinha = window.innerHeight/10 + r;
    }
  }
  if (keyIsDown(32) && fimdejogo==true){
    bouceCount = 1;
    velxBolinha = 5*(bouceCount*3);
    velyBolinha = velxBolinha;
    autoGaming = false;
    jogando = true;
    fimdejogo = false;
    meusPontos = 0;
    pontosOponente = 0;
    chanceOponenteErrar = 0;
    for (let i = 0; i < 1; i++) {
      r = random(50, 300);
      xBolinha = window.innerWidth/10 + r;
      yBolinha = window.innerHeight/10 + r;
    }
  }
  /*
  if (keyIsDown(77) && somdamusica==true){
    somdamusica=false;
  }
  if (keyIsDown(77) && somdamusica==false){
    somdamusica=true; 
  }
  */
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
    if (delayPontos>0){
      delayPontos--;
    }
}



function movimentaBolinha() {
  xBolinha += velxBolinha;
  yBolinha += velyBolinha;
  if (xBolinha < 20){
    if (delayPontos==0){
      pontosOponente += 1;
      chanceEuErrar = 0;
      somPonto.play();
      delayPontos=25;
    }
  }
  if (xBolinha > window.innerWidth - 20){
    
    if (delayPontos==0){
      meusPontos += 1;
      chanceOponenteErrar = 0;
      somPonto.play();
      delayPontos=25;
    }
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