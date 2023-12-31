//function pour générer des avis
import { ajoutListenersAvis } from "./avis.js";

// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json() );

//Fonction qui génère toute la page web
function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++){
        //Rattachement de nos balises au DOM (ici la class : fiches)
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // On crée l’élément img.
        const imageElement = document.createElement("img");
        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = pieces[i].image;
    
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
    
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    
        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
    
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
    
        const StockElement = document.createElement("p");
        StockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
    
        // On rattache la balise article à la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        // Idem pour le nom, le prix et la catégorie...
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(StockElement);
    }

    // Ajout de la fonction ajoutListenersAvis
    ajoutListenersAvis();
}

//Premier affichage de la page
genererPieces(pieces);


/*********************************************
************ Gestion des boutons *************
*********************************************/

/***** bouton "Trier par ordre croissant" *****/
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort( (a, b) => a.prix - b.prix);
    console.log(piecesOrdonnees);

    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

/***** bouton "Filtrer les pièces non abordables" *****/
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(piece => piece.prix <= 35);
    //console.log(piecesFiltrees);

    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

/***** bouton "Filtrer les articles sans description" *****/
const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(piece => piece.description);
   console.log(piecesFiltrees);
   
   // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


/***** bouton "Trier par ordre décroissant" *****/
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => b.prix - a.prix);
    console.log(piecesOrdonnees);

    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});


/*********************************************
************ Gestion des LISTES *************
*********************************************/

/**** Listes pieces abordables */
const noms = pieces.map(piece => piece.nom);

for(let i = pieces.length -1 ; i >= 0; i--) {
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
 }
 
 console.log(noms);

const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";
 //Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(pElement)
    .appendChild(abordablesElements)


/**** Liste des articles disponibles */
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length -1 ; i >= 0; i--) {
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
 }

 //Création de la liste
 const DisponiblesElements = document.createElement('ul');
 //Ajout de chaque nom et prix à la liste
 for(let i=0; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    DisponiblesElements.appendChild(nomElement)
 }

 const pElementDisponible = document.createElement('p')
 pElementDisponible.innerText = "Pièces disponibles:";
 // Ajout de l'en-tête puis de la liste au bloc résultats filtres
 document.querySelector('.disponibles')
    .appendChild(pElementDisponible)
    .appendChild(DisponiblesElements)



 /**** MAJ liste en fonction du prix maximum  */
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener('input', function () {
    const piecesFiltrees = pieces.filter(piece => piece.prix <= inputPrixMax.value);

    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

