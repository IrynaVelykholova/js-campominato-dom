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
function stampaGriglia(container, listaQuadrati) {
    // reset del contenuto del container per evitare che ci siano altri div creati precedentemente
    container.innerHTML = "";

    for (let i = 0; i < listaQuadrati.length; i++) {
        container.append(listaQuadrati[i]);
    }
}




