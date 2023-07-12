`use strict`

const selezionaQuadrati = document.getElementById("seleziona-quadrati");
const btnPlay = document.getElementById("btn-play");
const gridContainer = document.querySelector(".grid-container");

//creo funzione del click sul bottone
btnPlay.addEventListener("click", function () {
    // Leggo il valore della select
    // creo costante per leggere il valore 
    // siccome il valore in questo caso è una stringa, allora lo converso in numero con parseInt
    const valoreSelect = parseInt(selezionaQuadrati.value); 
    console.log("valore scelto", valoreSelect);

    //richiamo la mia funzione creoGriglia e inserisco come valore la mia constante che ha il value
    const grigliaLista = creoGriglia(valoreSelect); 
    console.log(grigliaLista)
    //questi elementi rimangono ancora virtuali come arrey e non in HTML
    // quindi invoco funzione che si occuperà di stampare al DOM la griglia
    stampaGriglia(gridContainer, grigliaLista)
}) 

// creo un solo quadrato
function creoQuadrato(contenutoQuadrato, quadratiDaCreare) {
    const quadrato = document.createElement("div"); //creo un div 
    quadrato.classList.add("grid-square"); //aggiungo la classe (con le sue caratteristiche in css)
    quadrato.innerHTML = contenutoQuadrato; //inserisco in html il contenuto del quadrato

    const quadratiPerRiga = Math.sqrt(quadratiDaCreare);
    quadrato.style.flexBasis = `calc(100% / ${quadratiPerRiga})`
    quadrato.addEventListener("click", function () {
        quadrato.classList.add("bg-info");
    })

    return quadrato;
}

// creo la griglia che avrà dentro i quadrati
function creoGriglia(numeroQuadrati) {
    const griglia = [];

    for (let i = 0; i < numeroQuadrati; i++) {
        // salvo in una variabile l'output della funzione createSingleSquare
        const nuovoQuadrato = creoQuadrato(i + 1, numeroQuadrati); //riprendo la funzione del singolo quadrato e aggiungo numero quadrati dentro per 
        //dentro la griglia inserisco il quadrato
        griglia.push(nuovoQuadrato);

    }
    return griglia;
    //vado riga 16 e richiamo la mia funzione nel click del btn
}

// creo funzione che stampa la griglia che sarà composta da 2 elementi: container e i quadrati
// il container è il "foglio" e la listaQ sono i quadrati che verranno stampati dentro
function stampaGriglia(container, listaQuadrati) {
    // reset del contenuto del container per evitare che ci siano altri div creati precedentemente
    container.innerHTML = "";

    for (let i = 0; i < listaQuadrati.length; i++) {
        container.append(listaQuadrati[i]);
    }
}

function numeroRandom(valoreMax) { 
    let numeri=[];   

    while (numeri.length < 16){
        const random = Math.floor(Math.random() * valoreMax) + 1;

        if (numeri.indexOf(random) === -1){ 
            numeri.push(random);
        }
    }
    console.log("numeri esplosivi: " + numeri)
    return numeri;
}




const gridCContainer = document.querySelector(".grid-ccontainer");
const playingUserEl = document.querySelector(".playing-user");
let userPlaying = 1; //tiene traccia dell'utente a cui tocca giocare

for (let i = 0; i < 9; i++) {
    const square = document.createElement("div"); //creo div
    square.classList.add("grid-ssquare"); //aggiungo classe
    //square.innerHTML = i + 1;
    square.dataset.indice = i + 1;//creo nuovo attributo sull'elemento chiamato indice

    square.addEventListener("click", onSquareClick) //invoco la mia funzione click
    gridCContainer.append(square); //aggiungo nel mio container i quadrati
}

updatePlayingUser(false);//fa apparire nel h3 il turno dell'utente


function onSquareClick () {
    console.log(this); //se clikko il quadrato mi esce il mio div (quindi rappresenta il quadrato)

    if (this.dataset.user !== undefined) { //se datauser ha già un valore significa che è già stato cliccato
        return;//quindi non può essere cliccato
    }

    this.classList.add("bg-success")//this in questo caso è il mio square (guardare ciclo for sopra)
    this.dataset.user = userPlaying;//ci dice c

    if(userPlaying === 1) { //se user che gioca è true allora
        this.innerHTML = "X"; //aggiunge una X
        this.classList.add("bg-danger")
    } else {
        this.innerHTML = "O";
    }
updatePlayingUser(true); //invoco la funzione del cambio giocatore
}

function updatePlayingUser (changePlayer) {//booleano
    if (changePlayer) {
        if(userPlaying === 1) { //se user che gioca è true allora
            userPlaying = 2;    //passo turno al secondo giocatore
        } else {
            userPlaying = 1; //passo turno al primo giocatore
        }
    }
    
playingUserEl.innerHTML = "Turno dell'utente" + userPlaying; 
}

