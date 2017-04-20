document.body.style.backgroundImage = "url('https://res.cloudinary.com/takeout/image/upload/v1486398671/bg-lsw_wt5xzw.png')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundAttachment = "fixed";

var listeLiens = [
    {
        titre: "Eloquent Javascript",
        url: "http://eloquentjavascript.net/",
        auteur: "alhern",
        comment: "Great thorough book, a must-read for js."
    },
    {
        titre: "Rithm School",
        url: "https://www.rithmschool.com/courses",
        auteur: "alhern",
        comment: "Very well crafted intermediate and advanced js courses."
    },
    {
        titre: "YDKJS",
        url: "https://github.com/getify/You-Dont-Know-JS",
        auteur: "alhern",
        comment: "A classic and awesome js book collection, very easy to read."
    }
];

//Fonction qui va créer le modèle à appliquer aux liens de la liste
var creationLien = function (liens) {
var liensElt = document.createElement("p"); 
liensElt.setAttribute("class", "lien");

// Creation du titre cliquable renvoyant vers son URL
var lien = document.createElement("a");
lien.setAttribute("href", liens.url);
lien.innerHTML = liens.titre;
lien.style.color = "#DF1239"; 
lien.style.fontWeight = 'bold';
lien.style.textDecoration = 'none';
lien.style.fontSize = "17px";
lien.style.textTransform = "uppercase";
liensElt.appendChild(lien);

// Creation d'un espace pour que le titre et l'URL ne soient pas collés
var espace = document.createTextNode(" "); 
liensElt.appendChild(espace);

// Creation du tag span contenant l'URL et lui donnant ainsi son style css
var ajoutLien = document.createElement("span"); 
ajoutLien.textContent = liens.url;
ajoutLien.style.fontStyle = "italic";
ajoutLien.style.textTransform = "uppercase";
liensElt.appendChild(ajoutLien);

// Creation d'un saut de ligne
var skip = document.createElement("br");
liensElt.appendChild(skip);

// Ajout du commentaire  
let comment = document.createElement("span");
comment.textContent = liens.comment;
liensElt.appendChild(comment);
document.getElementById("contenu").appendChild(liensElt); 

//Saute encore une ligne
var skip = document.createElement("br");
liensElt.appendChild(skip);
  
// Creation du tag span et ajout d'un texte précédant l'auteur
const ajout = document.createElement("span");
ajout.textContent = "added by " + liens.auteur;
ajout.style.textTransform = "lowercase";
ajout.style.fontSize = "xx-small";
ajout.style.color = "#a49fc6";
liensElt.appendChild(ajout);
document.getElementById("contenu").appendChild(liensElt);

return liensElt;
};

//Application de la fonction à chaque lien de l'objet
listeLiens.forEach(function(lien){
  const elementLien = creationLien(lien);
  document.getElementById("contenu").appendChild(elementLien);
});

//ajout de l'input

function newInput (placeholder, size) {
const input = document.createElement("input");
input.type = "text";
input.setAttribute("placeholder", placeholder);
input.setAttribute("size", size);
input.setAttribute("required", "true");
return input;
}

//création d'un évènement en cliquant sur le bouton

const ajoutBtn = document.getElementById("ajoutBtn");

ajoutBtn.addEventListener("click", function() {
    let auteurElt = newInput("Your name", 6);
    let titreElt = newInput("Title", 8);
    let lienElt = newInput("URL", 14);
    let comElt = newInput("Add a comment", 20);

    let ajout = document.createElement("input");
    ajout.type = "submit";
    ajout.value = "Ajouter le lien";
    ajout.classList.add("addLink");

    let form = document.createElement("form");
    form.appendChild(auteurElt);
    form.appendChild(titreElt);
    form.appendChild(lienElt);
    form.appendChild(comElt);
    form.appendChild(ajout);

let p = document.querySelector("p");
p.replaceChild(form, ajoutBtn);

//aucune action sur les champs ne sont pas complétés

form.addEventListener("submit", function (e) {
    e.preventDefault();

//ajout de l'entête "http" s'il est manquant, ou si "https" est manquant

let url = lienElt.value;
if((url.indexOf("http://") !== false) && (url.indexOf("https://") !== false)) {
    url = "http://" + url;
}

//creation d'un nouvel objet

let newLien = {
    titre: titreElt.value,
    url: url,
    auteur: auteurElt.value,
    comment: comElt.value
};

let lienAjout = creationLien(newLien);
let contenu = document.getElementById("contenu");
contenu.insertBefore(lienAjout, contenu.firstChild);

//supression du bouton

p.replaceChild(ajoutBtn, form);

// ajout d'un message temporaire indiquant que le lien a bien été ajouté

let success = document.createElement("div");
success.classList.add("info");
success.textContent = "Congrats! " + newLien.titre + " has been added!";
p.insertBefore(success, ajoutBtn);

setTimeout(function () {
    p.removeChild(success);
}, 4000);

});


});
